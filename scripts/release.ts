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

// Our release command
const commandToRun = {
  command: "zip",
  args: [
    "-j",
    "-D",
    "./conventional_comments.alfredworkflow",
    "./src/alfred/info.plist",
    "./src/media/*",
    "./dist/*",
  ],
}

// Run it
const exitCode = await runCommand(commandToRun);
if (exitCode !== 0) {
  console.log("process exited with non-zero exit code")
}

console.log("Upload 'conventional_comments.alfredworkflow'")
