import simpleGit, { SimpleGit } from 'simple-git';
import fs from 'fs/promises';
import { commitMessageIdentifierType, config } from './config';
import type { CommitLog, ReleaseSummary } from './gitLogReader.types';
import { consoleLogReleaseSummary } from './gitConsoleLogs';

/**
 * Reads the git log from a repository.
 */
const readGitLog = async (repoPath: string, messageFilter: RegExp): Promise<CommitLog[]> => {
  const git: SimpleGit = simpleGit(repoPath);

  try {
    console.log(`Reading Git log from: ${repoPath}`);
    const log = await git.log();

    return log.all
      .filter(({ message }) => messageFilter.test(message))
      .map(({ hash, date, message, author_name: author }) => ({
        hash,
        date,
        message,
        author,
      }));
  } catch (error) {
    console.error('Error reading Git log:', error);
    throw error;
  }
};

/**
 * Processes commit logs into a release summary for conventional commits
 */
const processConventionalCommits = (commitLogs: CommitLog[]): ReleaseSummary => {
  return commitLogs.reduce<ReleaseSummary>(
    (summary, { hash, date, message, author }) => {
      summary.total++;

      if (message.startsWith('perf:')) {
        summary.major++;
        summary.history.push({ type: 'major', hash, message, date, author });
      } else if (message.startsWith('feat:')) {
        summary.minor++;
        summary.history.push({ type: 'minor', hash, message, date, author });
      } else if (message.startsWith('fix:')) {
        summary.patch++;
        summary.history.push({ type: 'patch', hash, message, date, author });
      } else if (message.startsWith('chore:')) {
        summary.chore++;
        summary.history.push({ type: 'chore', hash, message, date, author });
      } else {
        summary.history.push({ hash, message, date, author });
      }

      return summary;
    },
    {
      total: 0,
      major: 0,
      minor: 0,
      patch: 0,
      chore: 0,
      history: [],
    }
  );
};


/**
 * Writes release summary data to a JSON file.
 */
const writeSummaryToFile = async (outputPath: string, summary: ReleaseSummary): Promise<void> => {
  try {
    const content = JSON.stringify(summary, null, 2);
    await fs.writeFile(outputPath, content, 'utf-8');
    console.log(`Release summary successfully written to ${outputPath}`);
  } catch (error) {
    console.error('Error writing release summary to file:', error);
    throw error;
  }
};

const getRegexCommitMessageIdentifier = (key: commitMessageIdentifierType) => {
  const regexMap = {
    conventionalCommits: /^(feat|fix|chore):/,
    githubMergeRequest: /^Merge pull request/
  }

  // @TODO: Improve so don't check for type?
  return key instanceof RegExp ? key : regexMap[key]
}

// Main function to orchestrate the process
export const generateReleaseSummary = async (repoPath: string, outputPath: string): Promise<void> => {
  try {
    const commitMessageIdentifierRegex = getRegexCommitMessageIdentifier(config.commitMessageIdentifierType)

    // Step 1: Read git logs
    const commitLogs = await readGitLog(repoPath, commitMessageIdentifierRegex);

    // Step 2: Process release summary
    const releaseSummary = processConventionalCommits(commitLogs);

    consoleLogReleaseSummary(releaseSummary)

    // Step 3: Write summary to file
    await writeSummaryToFile(outputPath, releaseSummary);

    console.log('Release summary generated successfully.');
  } catch (error) {
    console.error('Error generating release summary:', error);
  }
};

