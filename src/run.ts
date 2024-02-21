import { error, getBooleanInput, getInput, setFailed } from "@actions/core";
import { info } from "console";
import { mergeCoverage } from "./steps/merge-coverage";
import { runTests } from "./steps/run-tests";

export const run = async () => {
  const task = getInput("task");

  info(`Running task: ${task}...`);

  switch (task) {
    case "run-tests":
      await runTests({
        coverage: getBooleanInput("coverage"),
        shard: getInput("shard"),
        skipArtifactUpload: getBooleanInput("skip-artifact-upload"),
      });
      break;
    case "merge-coverage":
      await mergeCoverage({
        token: getInput("github-token"),
        skipArtifactUpload: getBooleanInput("skip-artifact-upload"),
        shardCount: +getInput("shard-count"),
        showAllFilesInSummary: getBooleanInput("show-all-files-in-summary"),
      });
      break;
    default: {
      const _error = `Invalid task: ${task}`;
      error(_error);
      setFailed(_error);
    }
  }

  info(`Running task: ${task}... DONE`);
};
