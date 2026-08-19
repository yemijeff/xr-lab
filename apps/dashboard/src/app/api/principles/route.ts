import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readContentDirectory } from '@xrlab/content';
import { PrincipleFrontmatterSchema, PrincipleFrontmatter } from '@xrlab/types';
import { saveProjectFile } from '@/lib/githubSync';

const PRIN_DIR = path.join(process.cwd(), '../../content/principles');

export async function GET() {
  try {
    const principles = readContentDirectory<PrincipleFrontmatter>(PRIN_DIR, PrincipleFrontmatterSchema);
    return NextResponse.json({ success: true, data: principles });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, statement, confidence = 3, stage, evidence = [], status = 'published' } = body;

    const dateStr = new Date().toISOString().slice(0, 10);
    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `prin-${dateStr.replace(/-/g, '')}-${Date.now().toString().slice(-3)}`;

    const frontmatter: PrincipleFrontmatter = {
      id,
      title,
      slug,
      date: dateStr,
      status,
      statement,
      confidence: Number(confidence),
      stage: stage || '01-xr-foundations',
      evidence,
      exceptions: body.exceptions || '',
    };

    const validated = PrincipleFrontmatterSchema.parse(frontmatter);
    const bodyContent = body.content || `## Principle Statement\n${statement}\n\n## Empirical Rationale\nDocumented through prototyping.`;
    const fileContent = matter.stringify(bodyContent, validated);
    const fileName = `${dateStr}-${slug}.md`;
    const relativeRepoPath = `content/principles/${fileName}`;

    const saveResult = await saveProjectFile(
      relativeRepoPath,
      fileContent,
      `content(principle): ${title}`
    );

    if (!saveResult.success) {
      return NextResponse.json({ success: false, error: saveResult.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: { frontmatter: validated, slug, path: relativeRepoPath, mode: saveResult.mode },
    }, { status: 201 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
