import type {
  WorkflowItem,
  WorkflowResponse,
} from "../lib/alfred/alfred_types.ts";
import {
  filterItemsByTitle,
  getQueryParameterFromArgv,
} from "../lib/alfred/alfred_helpers.ts";

export type ConventionalCommit = {
  label: ConventionalCommitLabel;
  description: string;
};

const ConventionalCommitLabels = [
  "fix",
  "feat",
  "build",
  "ci",
  "docs",
  "perf",
  "refactor",
  "style",
  "test",
] as const;

export type ConventionalCommitLabel = typeof ConventionalCommitLabels[number];

export const isConventionalCommitLabel = (
  s: string | null | undefined,
): s is ConventionalCommitLabel => {
  if (s === null || s === undefined) {
    return false;
  }

  return ConventionalCommitLabels.includes(s as ConventionalCommitLabel);
};

export const conventionalCommits: Readonly<ConventionalCommit[]> = Object
  .freeze([
    {
      label: "fix",
      description: "A bug fix",
    },
    {
      label: "feat",
      description: "A new feature",
    },
    {
      label: "build",
      description: "Affects build system or external dependencies",
    },
    {
      label: "ci",
      description: "Affects CI system, config, or scripts",
    },
    {
      label: "docs",
      description: "Documentation only",
    },
    {
      label: "perf",
      description: "A code change improving performance",
    },
    {
      label: "refactor",
      description: "A code change without bug fixes or features",
    },
    {
      label: "style",
      description: "A code change that does not affect the meaning of code",
    },
    {
      label: "test",
      description: "A code change that adds/modifies tests",
    },
  ]);

// https://www.conventionalcommits.org/en/v1.0.0/#specification
// https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines
const main = (): void => {
  const items: WorkflowItem[] = conventionalCommits.map(
    (cc: ConventionalCommit) => {
      return {
        title: cc.label,
        subtitle: cc.description,
        // Label, as we can look up the decorator in step 2
        arg: `${cc.label}: `,
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
