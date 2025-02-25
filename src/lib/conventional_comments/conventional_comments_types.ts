export type ConventionalCommentDecorator =
  | "blocking"
  | "non-blocking"
  | "if-minor";

export type ConventionalComment = {
  label: ConventionalCommentLabel;
  description: string;
  validDecorators: ConventionalCommentDecorator[];
};

const ConventionalCommentLabels = [
  "praise",
  "nitpick",
  "suggestion",
  "issue",
  "todo",
  "question",
  "thought",
  "chore",
  "note",
  "typo",
  "discuss",
  "polish",
  "typo",
] as const;

export type ConventionalCommentLabel = typeof ConventionalCommentLabels[number];

export const isConventionalCommentLabel = (
  s: string | null | undefined,
): s is ConventionalCommentLabel => {
  if (s === null || s === undefined) {
    return false;
  }

  return ConventionalCommentLabels.includes(s as ConventionalCommentLabel);
};

export const conventionalComments: Readonly<ConventionalComment[]> = Object
  .freeze([
    {
      label: "praise",
      description: "Praises highlight something positive.",
      validDecorators: ["blocking", "non-blocking", "if-minor"],
    },
    {
      label: "nitpick",
      description: "Nitpicks are trivial preference-based requests.",
      validDecorators: ["blocking", "non-blocking", "if-minor"],
    },
    {
      label: "suggestion",
      description: "Suggestions propose improvements to the current subject.",
      validDecorators: ["blocking", "non-blocking", "if-minor"],
    },
    {
      label: "issue",
      description:
        "Issues highlight specific problems with the subject under review.",
      validDecorators: ["blocking", "non-blocking", "if-minor"],
    },
    {
      label: "todo",
      description: "TODOs are small, trivial, but necessary changes. ",
      validDecorators: ["blocking", "non-blocking", "if-minor"],
    },
    {
      label: "question",
      description:
        "Questions are for potential concerns, clarification, or questions!",
      validDecorators: ["blocking", "non-blocking", "if-minor"],
    },
    {
      label: "thought",
      description: "Thoughts represent an idea that popped up from reviewing.",
      validDecorators: ["blocking", "non-blocking", "if-minor"],
    },
    {
      label: "chore",
      description: "Chores are simple tasks that must be done.",
      validDecorators: ["blocking", "non-blocking", "if-minor"],
    },
    {
      label: "note",
      description:
        "Notes simply highlight something the reader should take note of.",
      validDecorators: ["blocking", "non-blocking", "if-minor"],
    },
    {
      label: "typo",
      description:
        "Typo comments are like todo:, where the main issue is a misspelling.",
      validDecorators: ["blocking", "non-blocking", "if-minor"],
    },
  ]);
