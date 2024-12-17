import { GitLogReader } from './gitLogReader';
import path from 'path';
import { config } from './config';

interface Config {
  gitRepoPath: string;
}

async function main() {
  const gitLogReader = new GitLogReader(config.gitRepoPath);
  const gitLog = await gitLogReader.readGitLog();

  const outputPath = path.resolve(`${import.meta.dirname}/../output.json`);
  await gitLogReader.writeLogToFile(outputPath, gitLog);
}

main().catch(err => console.error('Error:', err));
