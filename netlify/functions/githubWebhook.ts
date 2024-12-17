import crypto from 'crypto';
import { fetchCommitsSinceLastRelease, GitHubReleasePayload } from '../../src/github/githubServices';
import { processCommits } from '../../src/git/gitServices';
import { fetchReleaseData, saveReleaseData } from '../../src/storage/netlify/netlifyBlobServices';

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || '';

function verifySignature(reqBody: string, signature: string): boolean {
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  hmac.update(reqBody);
  const digest = `sha256=${hmac.digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export const handler = async (event: any) => {
  try {
    const signature = event.headers['x-hub-signature-256'];
    const body = event.body;

    if (!verifySignature(body, signature)) {
      return { statusCode: 401, body: 'Invalid signature.' };
    }

    const payload: GitHubReleasePayload = JSON.parse(body);

    if (payload.action !== 'published') {
      return { statusCode: 200, body: 'No action needed.' };
    }

    const { tag_name, name, published_at } = payload.release;
    const { owner: { login: repoOwner }, name: repoName } = payload.repository;

    console.log(`Processing release ${tag_name}...`);

    const commits = await fetchCommitsSinceLastRelease(repoOwner, repoName, tag_name);
    const commitSummary = processCommits(commits);

    const releaseData = await fetchReleaseData();
    releaseData.totalReleases++;
    releaseData.releases.push({
      tag: tag_name,
      name,
      date: published_at,
      commitSummary,
    });

    await saveReleaseData(releaseData);

    return { statusCode: 200, body: 'Release data updated successfully.' };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return { statusCode: 500, body: 'Internal server error.' };
  }
};
