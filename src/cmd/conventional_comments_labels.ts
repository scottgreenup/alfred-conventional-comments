//import { argv } from "node:process";
import type { WorkflowItem, WorkflowResponse } from "../lib/alfred/alfred_types.ts";
import {
  filterItemsByTitle,
  getQueryParameterFromArgv,
} from "../lib/alfred/alfred_helpers.ts";
import type { ConventionalComment } from "../lib/conventional_comments/conventional_comments_types.ts";
import { conventionalComments } from "../lib/conventional_comments/conventional_comments_types.ts";

const main = (): void => {
  const items: WorkflowItem[] = conventionalComments.map(
    (cc: ConventionalComment) => {
      return {
        title: cc.label,
        subtitle: cc.description,
        // Label, as we can look up the decorator in step 2
        arg: cc.label + " ",
      };
    },
  );

  const queryParam = getQueryParameterFromArgv(Deno.args);
  const filteredItems = filterItemsByTitle(items, queryParam);

  const response: WorkflowResponse = {
    items: filteredItems,
  };

  console.log(JSON.stringify(response));
};

main();
