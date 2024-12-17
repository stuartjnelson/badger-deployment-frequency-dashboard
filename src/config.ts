export interface projectConfig {
    storageType: string | 'local' | 'netlify',
    localFilePath: string,
    gitRepoPath: string
}

export const config:projectConfig = {
    storageType: process.env.STORAGE_TYPE || 'local', // 'local' | 'netlify' 
    localFilePath: './release-data.json',             // Local file path
    gitRepoPath: `${import.meta.dirname}/../reposToScan/northern-badger-11ty-blog`
};
  