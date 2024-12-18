# Badger Deployment Frequency Dashboard

A dashboard for release data based on your commit messages. 

## What do this app do?
I wanted to be able to understand how frequently a repo is being deployed. With this app you can using a regex expression find different commit messages to help you understand how many times you are releases.

This is a small side project which will be itterated on as we go

### End goal
Be able to deploy an app to Netlify that using webhooks for GitHub & GitLab be updated each time a releases happens


## Setup
1. Configure the app depending on what commit messages we need to analyise.

```ts
export interface projectConfig {
    storageType: 'local' | 'netlify',
    gitRepoPath: string,
    commitMessageIdentifierType: 'conventionalCommits' | 'githubMergeRequest' | 'gitlabMergeRequest' | RegExp
}

export const config:projectConfig = {
    storageType: 'local', 
    gitRepoPath: `${import.meta.dirname}/../reposToScan/northern-badger-11ty-blog`,
    commitMessageIdentifierType: 'conventionalCommits'
};
```

2. Run `npm run dev`. Your release data will be written to a file called `output.json` in the root of the project and logged to your console

## Roadmap
* Configure name and location of output file
* Add some security scanning & linting to pipeline
* Setup to work with GitHub webhook
* Setup to work with GitLab webhook
