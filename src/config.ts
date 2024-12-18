export type commitMessageIdentifierType = 'conventionalCommits' | 'githubMergeRequest' | 'gitlabMergeRequest' | RegExp

export interface projectConfig {
    storageType: string | 'local' | 'netlify',
    gitRepoPath: string,
    commitMessageIdentifierType: commitMessageIdentifierType
}

export const config:projectConfig = {
    storageType: process.env.STORAGE_TYPE || 'local', // 'local' | 'netlify' 
    gitRepoPath: `${import.meta.dirname}/../reposToScan/northern-badger-11ty-blog`,
    commitMessageIdentifierType: 'githubMergeRequest'
    // commitMessageIdentifierType: 'conventionalCommits'
};
  