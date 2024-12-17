export interface Commit {
    sha: string;
    message: string;
    timestamp?: string;
  }
  
  export interface ReleaseSummary {
    major: number;
    minor: number;
    patch: number;
    chore: number;
  }
  
  export function processCommits(commits: Commit[]): ReleaseSummary {
    const releaseTypes: ReleaseSummary = { major: 0, minor: 0, patch: 0, chore: 0 };
  
    for (const commit of commits) {
      if (commit.message.includes('BREAKING CHANGE') || /^feat\(.*\)!/.test(commit.message)) {
        releaseTypes.major++;
      } else if (commit.message.startsWith('feat')) {
        releaseTypes.minor++;
      } else if (commit.message.startsWith('fix')) {
        releaseTypes.patch++;
      } else if (commit.message.startsWith('chore')) {
        releaseTypes.chore++;
      }
    }
  
    return releaseTypes;
  }
  