import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { saveProjectFile } from '@/lib/githubSync';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, slug, newStatus } = body;

    const contentDir = path.join(process.cwd(), `../../content/${category}`);
    if (!fs.existsSync(contentDir)) {
      return NextResponse.json({ success: false, error: 'Category directory not found' }, { status: 404 });
    }

    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
    let targetFileName: string | null = null;
    let existingContent: string | null = null;

    for (const file of files) {
      const fullPath = path.join(contentDir, file);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const parsed = matter(raw);
      if (parsed.data.slug === slug || file.includes(slug)) {
        targetFileName = file;
        parsed.data.status = newStatus;
        if (newStatus === 'published' && !parsed.data.publishedAt) {
          parsed.data.publishedAt = new Date().toISOString();
        }
        existingContent = matter.stringify(parsed.content, parsed.data);
        break;
      }
    }

    if (!targetFileName || !existingContent) {
      return NextResponse.json({ success: false, error: 'Content file not found' }, { status: 404 });
    }

    const relativeRepoPath = `content/${category}/${targetFileName}`;
    const saveResult = await saveProjectFile(
      relativeRepoPath,
      existingContent,
      `publish(${category}): set ${slug} status to ${newStatus}`
    );

    if (!saveResult.success) {
      return NextResponse.json({ success: false, error: saveResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, mode: saveResult.mode, newStatus });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
