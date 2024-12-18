import { generateReleaseSummary } from "./gitLogReader";
import { config } from "./config";

async function main() {
  return await generateReleaseSummary(
    config.localRepoToScan,
    config.jsonFileToWriteTo,
  );
}

main().catch((err) => console.error("Error:", err));
