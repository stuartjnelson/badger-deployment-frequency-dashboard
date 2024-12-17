import { generateReleaseSummary } from './gitLogReader';
import path from 'path';
import { config } from './config';

interface Config {
  gitRepoPath: string;
}

async function main() {
  const outputPath = path.resolve(`${import.meta.dirname}/../output.json`);

  return await generateReleaseSummary(config.gitRepoPath, outputPath);
}

main().catch(err => console.error('Error:', err));
