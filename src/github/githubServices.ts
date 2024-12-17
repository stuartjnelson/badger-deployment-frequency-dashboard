import { Octokit } from '@octokit/rest';
import { Commit } from '../git/gitServices';

const octokit = new Octokit();

export interface GitHubReleasePayload {
  action: string;
  release: { tag_name: string; name: string; published_at: string };
  repository: { name: string; owner: { login: string } };
}

export async function fetchCommitsSinceLastRelease(
  repoOwner: string,
  repoName: string,
  releaseTag: string
): Promise<Commit[]> {
  const { data: commits } = await octokit.repos.listCommits({
    owner: repoOwner,
    repo: repoName,
    per_page: 100,
  });

  const filteredCommits: Commit[] = [];
  for (const commit of commits) {
    if (commit.sha.startsWith(releaseTag)) break;
    filteredCommits.push({
      sha: commit.sha,
      message: commit.commit.message,
      timestamp: commit?.commit?.author?.date,
    });
  }
  return filteredCommits;
}
