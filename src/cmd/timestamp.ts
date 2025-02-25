import type {
  WorkflowItem,
  WorkflowResponse,
} from "../lib/alfred/alfred_types.ts";

// Object.entries(env).forEach((pair) => {
//     if (pair[0].match(/alfred_.*/)) {
//         items.push({
//             title: `${pair[0]}: ${pair[1]}`,
//             arg: 'foo'
//         });
//     }
// });
//

// I want this thing to take the timestamp and transform it.

// For example, if I get a timestamp it will convert it to UTC/Local/etc...
// It will also tell me some data about it

const main = (): void => {
  const items: WorkflowItem[] = [
    {
      title: "foo",
      arg: "foo_result",
    },
  ];

  Deno.args.forEach((val: string, index: number) => {
    items.push({
      title: `${index}: ${val}`,
      arg: "foo",
    });
  });

  const response: WorkflowResponse = {
    items,
  };

  console.log(JSON.stringify(response));
};

main();
