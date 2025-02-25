# Contribution guide

## Guidelines

### How to submit changes

All contributions are welcome, please feel free to open a pull request or an
issue and we can discuss there. If you are unsure, you can reach out via an
issue as well.

### How to report a bug

Please open an issue on Github with ample details of what occurred.

### How to request an enhancement

Please open an issue on Github.

## Developer handbook

### Installation

```shell
brew install deno
```

### Running on CLI

```shell
# deno ./src/cmd/conventional_comments_labels.ts | jq
{
  "items": [
    {
      "title": "praise",
      "subtitle": "Praises highlight something positive.",
      "arg": "praise "
    },
    {
      "title": "nitpick",
      "subtitle": "Nitpicks are trivial preference-based requests.",
      "arg": "nitpick "
    },
    {
      "title": "suggestion",
      "subtitle": "Suggestions propose improvements to the current subject.",
      "arg": "suggestion "
    },
    {
      "title": "issue",
      "subtitle": "Issues highlight specific problems with the subject under review.",
      "arg": "issue "
    },
    {
      "title": "todo",
      "subtitle": "TODOs are small, trivial, but necessary changes. ",
      "arg": "todo "
    },
    {
      "title": "question",
      "subtitle": "Questions are for potential concerns, clarification, or questions!",
      "arg": "question "
    },
    {
      "title": "thought",
      "subtitle": "Thoughts represent an idea that popped up from reviewing.",
      "arg": "thought "
    },
    {
      "title": "chore",
      "subtitle": "Chores are simple tasks that must be done.",
      "arg": "chore "
    },
    {
      "title": "note",
      "subtitle": "Notes simply highlight something the reader should take note of.",
      "arg": "note "
    },
    {
      "title": "typo",
      "subtitle": "Typo comments are like todo:, where the main issue is a misspelling.",
      "arg": "typo "
    }
  ]
}

```

```shell
# deno ./src/cmd/conventional_comments_decorators.ts praise | jq .
{
  "items": [
    {
      "title": "NONE",
      "subtitle": "[praise](https://conventionalcomments.org/): ",
      "arg": "[praise](https://conventionalcomments.org/): "
    },
    {
      "title": "blocking",
      "subtitle": "[praise (blocking)](https://conventionalcomments.org/): ",
      "arg": "[praise (blocking)](https://conventionalcomments.org/): "
    },
    {
      "title": "non-blocking",
      "subtitle": "[praise (non-blocking)](https://conventionalcomments.org/): ",
      "arg": "[praise (non-blocking)](https://conventionalcomments.org/): "
    },
    {
      "title": "if-minor",
      "subtitle": "[praise (if-minor)](https://conventionalcomments.org/): ",
      "arg": "[praise (if-minor)](https://conventionalcomments.org/): "
    }
  ]
}
```


## Release process

Run these commands

```
./scripts/build.ts # Compiles
./scripts/release.ts # Creates alfred workflow
```

Then create a Github release with our ".alfredworkflow" file.
