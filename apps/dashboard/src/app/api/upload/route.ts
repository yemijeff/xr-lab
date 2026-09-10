import { NextRequest, NextResponse } from 'next/server';
import { commitBinaryToGitHub } from '@/lib/githubSync';
import fs from 'fs';
import path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { base64, filename, folder = 'journal' } = body;

    if (!base64 || !filename) {
      return NextResponse.json({ success: false, error: 'base64 and filename are required' }, { status: 400 });
    }

    // Strip data URL prefix if present: "data:image/png;base64,..."
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;

    const safeFilename = filename.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
    const repoPath = `public/images/${folder}/${safeFilename}`;

    if (GITHUB_TOKEN) {
      const result = await commitBinaryToGitHub(
        repoPath,
        base64Data,
        `media: upload ${safeFilename}`
      );

      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        url: `/images/${folder}/${safeFilename}`,
        rawUrl: result.rawUrl,
        mode: 'github',
      });
    }

    // Local fallback: write to public/images/
    const localDir = path.join(process.cwd(), 'public', 'images', folder);
    if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });

    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(localDir, safeFilename), buffer);

    return NextResponse.json({
      success: true,
      url: `/images/${folder}/${safeFilename}`,
      mode: 'local',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
