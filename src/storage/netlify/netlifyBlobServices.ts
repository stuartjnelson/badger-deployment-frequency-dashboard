import { getBlob, setBlob } from '@netlify/blobs';

export interface ReleaseData {
  totalReleases: number;
  releases: {
    tag: string;
    name: string;
    date: string;
    commitSummary: Record<string, number>;
  }[];
}

export async function fetchReleaseData(): Promise<ReleaseData> {
  try {
    const existingBlob = await getBlob('release-data.json');
    return JSON.parse(await existingBlob.text());
  } catch (e) {
    console.log('No existing blob found, starting fresh.');
    return { totalReleases: 0, releases: [] };
  }
}

export async function saveReleaseData(releaseData: ReleaseData): Promise<void> {
  await setBlob('release-data.json', JSON.stringify(releaseData, null, 2), {
    contentType: 'application/json',
  });
  console.log('Release data saved successfully.');
}
