import { GitLogReader } from './gitLogReader';
import path from 'path';
import {config} from './config'
import fs from 'fs/promises';

// Simulate a handler function similar to serverless environments
export const handler = async (): Promise<void> => {
  try {

    console.log('Reading Git log from:', config.gitRepoPath);

    // Initialize GitLogReader
    const gitLogReader = new GitLogReader(config.gitRepoPath);

    // Fetch Git log and write it to output.json
    const gitLog = await gitLogReader.readGitLog();
    const outputPath = path.resolve('../output.json');
    await gitLogReader.writeLogToFile(outputPath, gitLog);

    console.log('Handler completed successfully.');
  } catch (err) {
    console.error('Handler error:', err);
    throw err;
  }
};

// Run the handler locally
handler();
