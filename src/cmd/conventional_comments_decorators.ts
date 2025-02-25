import type {
  WorkflowItem,
  WorkflowResponse,
} from "../lib/alfred/alfred_types.ts";
import {
  filterItemsByTitle,
  getQueryParameterFromArgv,
} from "../lib/alfred/alfred_helpers.ts";
import type {
  ConventionalComment,
  ConventionalCommentDecorator,
  ConventionalCommentLabel,
} from "../lib/conventional_comments/conventional_comments_types.ts";
import {
  conventionalComments,
  isConventionalCommentLabel,
} from "../lib/conventional_comments/conventional_comments_types.ts";

type InputRequest = {
  label: ConventionalCommentLabel;
  filter?: string;
};

const inputRequestFromQueryParameter = (query: string | null): InputRequest => {
  if (query === null) {
    throw new Error(`Label was weird: ${query}`);
  }
  let querySplat = query.split(" ");
  if (querySplat.length === 0) {
    throw new Error(`Label was weird: ${query}`);
  }

  // console.error(`querySplat: ${querySplat}`)

  querySplat = querySplat.filter((x) => typeof x === "string");

  const label = querySplat[0];
  if (!isConventionalCommentLabel(label)) {
    throw new Error(`Label was not valid: ${label}`);
  }

  const inputRequest: InputRequest = {
    label: label,
  };

  if (querySplat.length > 1) {
    if (querySplat[1] === undefined) {
      throw new Error(`filter was not valid: ${querySplat}`);
    }
    inputRequest.filter = querySplat[1];
  }

  return inputRequest;
};

const main = (): void => {
  const query = getQueryParameterFromArgv(Deno.args);
  const request = inputRequestFromQueryParameter(query);

  const domain = "https://conventionalcomments.org/";

  // Find our comment
  const conventionalComment = conventionalComments.find(
    (cc: ConventionalComment) => {
      return cc.label === request.label;
    },
  );
  if (conventionalComment === undefined) {
    throw new Error(`Label did not have data: ${request.label}`);
  }

  // Output an option for no decorator and each available decorator.
  const items: WorkflowItem[] = [
    {
      title: "NONE",
      subtitle: `[${conventionalComment.label}](${domain}): `,
      arg: `[${conventionalComment.label}](${domain}): `,
    },
  ];

  // Note: there may be no decorators.
  items.push(
    ...conventionalComment.validDecorators.map(
      (d: ConventionalCommentDecorator) => {
        return {
          title: d,
          subtitle: `[${conventionalComment.label} (${d})](${domain}): `,
          arg: `[${conventionalComment.label} (${d})](${domain}): `,
        };
      },
    ),
  );

  const filteredItems = filterItemsByTitle(items, request.filter);

  const response: WorkflowResponse = {
    items: filteredItems,
  };

  console.log(JSON.stringify(response));
};

main();
