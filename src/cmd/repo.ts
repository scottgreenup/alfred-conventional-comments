import type {
  WorkflowItem,
  WorkflowResponse,
} from "../lib/alfred/alfred_types.ts";
import {
  fuzzySearchItemsByTitle,
  getQueryParameterFromArgv,
} from "../lib/alfred/alfred_helpers.ts";

export type Repository = {
  name: string;
  link: string;
};

export const repositories: Repository[] = [
  {
    name: "micros-server",
    link: "https://stash.atlassian.com/projects/MICROS/repos/micros-server",
  },
  {
    name: "service-central",
    link: "https://stash.atlassian.com/projects/MICROS/repos/central/browse",
  },
  {
    name: "network-probe",
    link: "https://bitbucket.org/atlassian/network-probe/src/master/",
  },
  {
    name: "network-probe-segmented",
    link: "https://bitbucket.org/atlassian/network-probe-segmented/src/master/",
  },
  {
    name: "resource-provisioning-service",
    link:
      "https://stash.atlassian.com/projects/MICROS/repos/resource-provisioning-service/browse",
  },
];

const main = (): void => {
  // Create our Alfred Workflow Item list
  const items: WorkflowItem[] = repositories.map((repo: Repository) => {
    return {
      title: repo.name,
      subtitle: repo.link,
      arg: repo.link,
    };
  });

  // Query our list by title, as that is what the user will expect.
  const queryParam = getQueryParameterFromArgv(Deno.args);
  const filteredItems = fuzzySearchItemsByTitle(items, queryParam);

  // Create a response with our filtered items to output to Alfred
  const response: WorkflowResponse = {
    items: filteredItems,
  };

  // Send the response to Alfred.
  console.log(JSON.stringify(response));
};

main();
