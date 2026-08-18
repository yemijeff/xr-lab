import fs from 'fs';
import path from 'path';

const GITHUB_REPO_OWNER = process.env.GITHUB_OWNER || 'yemijeff';
const GITHUB_REPO_NAME = process.env.GITHUB_REPO || 'xr-lab';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Commits or updates a file directly in the GitHub repository via GitHub REST API.
 */
export async function commitFileToGitHub(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!GITHUB_TOKEN) {
    return { success: false, error: 'GITHUB_TOKEN environment variable is not configured.' };
  }

  const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${cleanPath}`;

  try {
    // 1. Check if the file already exists to get its SHA (required for updates)
    let sha: string | undefined = undefined;
    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'XR-Lab-App',
      },
      cache: 'no-store',
    });

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // 2. Base64 encode the content (handles UTF-8 properly)
    const contentBase64 = Buffer.from(content, 'utf-8').toString('base64');

    // 3. Put content to GitHub API
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'XR-Lab-App',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: contentBase64,
        branch: GITHUB_BRANCH,
        sha,
      }),
    });

    if (!putRes.ok) {
      const errorJson = await putRes.json();
      console.error('[GitHub Sync Error]', errorJson);
      return { success: false, error: errorJson.message || 'GitHub API commit failed' };
    }

    const result = await putRes.json();
    return { success: true, url: result.commit?.html_url };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network error during GitHub commit';
    console.error('[GitHub Sync Exception]', errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Universal file saver:
 * - If GITHUB_TOKEN exists (e.g. deployed on Vercel), commits to GitHub directly.
 * - If running locally on laptop, writes directly to local filesystem.
 */
export async function saveProjectFile(
  relativeRepoPath: string,
  content: string,
  commitMessage: string
): Promise<{ success: boolean; mode: 'github' | 'local'; error?: string }> {
  // If running in cloud (Vercel) with GITHUB_TOKEN set
  if (GITHUB_TOKEN) {
    const res = await commitFileToGitHub(relativeRepoPath, content, commitMessage);
    return { success: res.success, mode: 'github', error: res.error };
  }

  // Otherwise, write to local file system
  try {
    const absolutePath = path.join(process.cwd(), '../../', relativeRepoPath);
    const dir = path.dirname(absolutePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(absolutePath, content, 'utf-8');
    return { success: true, mode: 'local' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Local file write failed';
    return { success: false, mode: 'local', error: errorMsg };
  }
}
