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

    const contentBase64 = Buffer.from(content, 'utf-8').toString('base64');

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
 * Commits a binary file (images, etc.) to GitHub using base64 content directly.
 */
export async function commitBinaryToGitHub(
  filePath: string,
  base64Content: string,
  commitMessage: string
): Promise<{ success: boolean; url?: string; rawUrl?: string; error?: string }> {
  if (!GITHUB_TOKEN) {
    return { success: false, error: 'GITHUB_TOKEN environment variable is not configured.' };
  }

  const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${cleanPath}`;

  try {
    let sha: string | undefined = undefined;
    const getRes = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'User-Agent': 'XR-Lab-App' },
      cache: 'no-store',
    });
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'XR-Lab-App',
      },
      body: JSON.stringify({ message: commitMessage, content: base64Content, branch: GITHUB_BRANCH, sha }),
    });

    if (!putRes.ok) {
      const errJson = await putRes.json();
      return { success: false, error: errJson.message || 'Binary GitHub commit failed' };
    }

    const result = await putRes.json();
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/${GITHUB_BRANCH}/${cleanPath}`;
    return { success: true, url: result.commit?.html_url, rawUrl };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: errorMsg };
  }
}

/**
 * Reads a text file from GitHub API (when GITHUB_TOKEN present) or local disk.
 * This ensures freshly-committed files are visible on Vercel without redeployment.
 */
export async function readProjectFile(
  relativeRepoPath: string
): Promise<{ success: boolean; content?: string; error?: string }> {
  // Cloud mode: read fresh content from GitHub API
  if (GITHUB_TOKEN) {
    const cleanPath = relativeRepoPath.startsWith('/') ? relativeRepoPath.slice(1) : relativeRepoPath;
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${cleanPath}?ref=${GITHUB_BRANCH}`;
    try {
      const res = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'XR-Lab-App',
        },
        cache: 'no-store',
      });
      if (!res.ok) {
        if (res.status === 404) return { success: true, content: undefined }; // file doesn't exist yet
        return { success: false, error: `GitHub read failed: ${res.status}` };
      }
      const data = await res.json();
      const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
      return { success: true, content: decoded };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'GitHub read error';
      return { success: false, error: errorMsg };
    }
  }

  // Local mode: read from disk
  try {
    const absolutePath = path.join(process.cwd(), '../../', relativeRepoPath);
    if (!fs.existsSync(absolutePath)) return { success: true, content: undefined };
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return { success: true, content };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Local file read failed';
    return { success: false, error: errorMsg };
  }
}

/**
 * Universal file saver:
 * - If GITHUB_TOKEN exists (deployed on Vercel), commits to GitHub directly.
 * - If running locally, writes to local filesystem.
 */
export async function saveProjectFile(
  relativeRepoPath: string,
  content: string,
  commitMessage: string
): Promise<{ success: boolean; mode: 'github' | 'local'; error?: string }> {
  if (GITHUB_TOKEN) {
    const res = await commitFileToGitHub(relativeRepoPath, content, commitMessage);
    return { success: res.success, mode: 'github', error: res.error };
  }

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
