import type { WorkflowItem } from "./alfred_types.ts";

/**
 * TODO use a proper argument CLI library
 * @param argv - The process argv
 */
export const getQueryParameterFromArgv = (argv: string[]): string | null => {
  if (argv.length > 0) {
    if (argv[0] === undefined) {
      return null;
    }
    return argv[0];
  }

  return null;
};

export type WorkflowItemFilter = (item: WorkflowItem) => boolean;

export const filterItems = (
  items: WorkflowItem[],
  filter: WorkflowItemFilter,
): WorkflowItem[] => {
  const filteredItems: WorkflowItem[] = [];
  for (const item of items) {
    if (filter(item)) {
      filteredItems.push(item);
    }
  }
  return filteredItems;
};

export const filterItemsByTitle = (
  items: WorkflowItem[],
  titleFilter: string | null | undefined,
): WorkflowItem[] => {
  if (titleFilter === null || titleFilter === undefined) {
    return items;
  }

  return filterItems(items, (item: WorkflowItem): boolean => {
    return item.title.startsWith(titleFilter);
  });
};

// From https://github.com/helyo-world/fuzzysearch-ts/blob/master/index.ts
const fuzzySearch = (needle: string, haystack: string): boolean => {
  const hlen = haystack.length;
  const nlen = needle.length;
  if (nlen > hlen) {
    return false;
  }
  if (nlen === hlen) {
    return needle === haystack;
  }
  outer: for (let i = 0, j = 0; i < nlen; i++) {
    const nch = needle.charCodeAt(i);
    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
};

export const fuzzySearchItemsByTitle = (
  items: WorkflowItem[],
  titleFilter: string | null | undefined,
): WorkflowItem[] => {
  if (titleFilter === null || titleFilter === undefined) {
    return items;
  }

  return filterItems(items, (item: WorkflowItem): boolean => {
    return fuzzySearch(titleFilter, item.title);
  });
};
