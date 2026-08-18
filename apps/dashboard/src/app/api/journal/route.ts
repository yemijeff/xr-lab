import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readContentDirectory } from '@xrlab/content';
import { JournalFrontmatterSchema, JournalFrontmatter } from '@xrlab/types';
import { saveProjectFile } from '@/lib/githubSync';

const JOURNAL_DIR = path.join(process.cwd(), '../../content/journal');

export async function GET() {
  try {
    const entries = readContentDirectory<JournalFrontmatter>(JOURNAL_DIR, JournalFrontmatterSchema);
    entries.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
    return NextResponse.json({ success: true, data: entries });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, summary, stage, tags, skills, content, status = 'draft', type = 'journal' } = body;

    const dateStr = new Date().toISOString().slice(0, 10);
    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `jrn-${dateStr.replace(/-/g, '')}-${Date.now().toString().slice(-4)}`;

    const frontmatter: JournalFrontmatter = {
      id,
      title,
      slug,
      date: dateStr,
      type,
      status,
      summary,
      stage,
      tags: tags || [],
      skills: skills || [],
      relatedExperiments: [],
      relatedProjects: [],
      featured: false,
      publishedAt: status === 'published' ? new Date().toISOString() : undefined,
    };

    const validated = JournalFrontmatterSchema.parse(frontmatter);
    const fileContent = matter.stringify(content || '', validated);
    const fileName = `${dateStr}-${slug}.md`;
    const relativeRepoPath = `content/journal/${fileName}`;

    const saveResult = await saveProjectFile(
      relativeRepoPath,
      fileContent,
      `content(journal): ${title}`
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
