import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readContentDirectory } from '@xrlab/content';
import { ResearchFrontmatterSchema, ResearchFrontmatter } from '@xrlab/types';
import { saveProjectFile } from '@/lib/githubSync';

const RES_DIR = path.join(process.cwd(), '../../content/research');

export async function GET() {
  try {
    const research = readContentDirectory<ResearchFrontmatter>(RES_DIR, ResearchFrontmatterSchema);
    return NextResponse.json({ success: true, data: research });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, stage, question, findings, conclusion, status = 'published' } = body;

    const dateStr = new Date().toISOString().slice(0, 10);
    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `res-${dateStr.replace(/-/g, '')}-${Date.now().toString().slice(-3)}`;

    const frontmatter: ResearchFrontmatter = {
      id,
      title,
      slug,
      date: dateStr,
      status,
      stage: stage || '01-xr-foundations',
      question,
      findings,
      conclusion,
      tags: body.tags || [],
      sources: body.sources || [],
      evidence: body.evidence || [],
      relatedPrinciples: body.relatedPrinciples || [],
      publishedAt: status === 'published' ? new Date().toISOString() : undefined,
    };

    const validated = ResearchFrontmatterSchema.parse(frontmatter);
    const bodyContent = body.content || `## Research Question\n${question}\n\n## Findings\n${findings || ''}\n\n## Conclusion\n${conclusion || ''}`;
    const fileContent = matter.stringify(bodyContent, validated);
    const fileName = `${dateStr}-${slug}.md`;
    const relativeRepoPath = `content/research/${fileName}`;

    const saveResult = await saveProjectFile(
      relativeRepoPath,
      fileContent,
      `content(research): ${title}`
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
