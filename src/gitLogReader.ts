import simpleGit, { SimpleGit } from 'simple-git';
import fs from 'fs/promises';

export interface CommitLog {
  hash: string;
  date: string;
  message: string;
  author: string;
}

export class GitLogReader {
  private git: SimpleGit;

  constructor(private repoPath: string) {
    console.log(repoPath)
    // Initialize simple-git with the provided repository path
    this.git = simpleGit(repoPath);
  }

  /**
   * Reads the git log and returns an array of commit details.
   */
  async readGitLog(): Promise<CommitLog[]> {
    try {
      console.log(`Reading Git log from: ${this.repoPath}`);
      const log = await this.git.log(); 

      return log.all.map(commit => ({
        hash: commit.hash,
        date: commit.date,
        message: commit.message,
        author: commit.author_name,
      }));
    } catch (error) {
      console.error('Error reading Git log:', error);
      throw error;
    }
  }

  /**
   * Writes the fetched Git log to a JSON file.
   * @param outputPath - Path to the output file.
   * @param logData - Array of commit details.
   */
  async writeLogToFile(outputPath: string, logData: CommitLog[]): Promise<void> {
    try {
      const content = JSON.stringify(logData, null, 2);
      await fs.writeFile(outputPath, content, 'utf-8');
      console.log(`Git log successfully written to ${outputPath}`);
    } catch (error) {
      console.error('Error writing Git log to file:', error);
      throw error;
    }
  }
}
