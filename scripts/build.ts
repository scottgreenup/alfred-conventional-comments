#!/usr/bin/env -S deno run --allow-run

type CommandInfo = {
  command: string;
  args: string[];
}

// Utility function to run a command and wait for it to complete
async function runCommand(command: CommandInfo): Promise<number> {
  const childCommand = new Deno.Command(command.command, {
    args: command.args,
    stdout: "inherit", // Pipe output directly to the console
    stderr: "inherit", // Pipe errors directly to the console
  });

  const child = childCommand.spawn();
  return (await child.status).code
}

// Projects we want to turn into binaries.
const projects = [
  "conventional_comments_decorators",
  "conventional_comments_labels",
]

// Commands we will be running
const commandsToRun = projects.map((projectName: string): CommandInfo => {
  return {
    command: "deno",
    args: [
      "compile",
      "--check",
      "--output",
      `dist/${projectName}`,
      `src/cmd/${projectName}.ts`,
    ],
  }
})

// Execute all commands sequentially
for (const command of commandsToRun) {
  const exitCode = await runCommand(command);
  if (exitCode !== 0) {
    console.log("process exited with non-zero exit code")
    break;
  }
}
