export interface CommitLog {
  hash: string;
  date: string;
  message: string;
  author: string;
}

export interface ReleaseSummary {
  total: number;
  major: number;
  minor: number;
  patch: number;
  chore: number;
  history: Array<{
    type?: string;
    hash: string;
    message: string;
    date: string;
    author: string;
  }>;
}
