export type commitMessageIdentifierType =
  | "conventionalCommits"
  | "githubMergeRequest"
  | "gitlabMergeRequest"
  | RegExp;

export interface projectConfig {
  storageType: "local" | "netlify";
  localRepoToScan: string;
  jsonFileToWriteTo: string;
  commitMessageIdentifierType: commitMessageIdentifierType;
}

export const config: projectConfig = {
  storageType: "local", // 'local' | 'netlify'
  localRepoToScan: `${import.meta.dirname}/../reposToScan/northern-badger-11ty-blog`,
  jsonFileToWriteTo: `${import.meta.dirname}/../output.json`,
  // commitMessageIdentifierType: 'githubMergeRequest'
  commitMessageIdentifierType: "conventionalCommits",
};
