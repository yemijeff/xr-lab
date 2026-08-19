import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readContentDirectory } from '@xrlab/content';
import { KnowledgeFrontmatterSchema, KnowledgeFrontmatter } from '@xrlab/types';
import { saveProjectFile } from '@/lib/githubSync';

const KNOW_DIR = path.join(process.cwd(), '../../content/knowledge');

export async function GET() {
  try {
    const knowledge = readContentDirectory<KnowledgeFrontmatter>(KNOW_DIR, KnowledgeFrontmatterSchema);
    return NextResponse.json({ success: true, data: knowledge });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, topic, summary, takeaways = [], stage, tags = [], content } = body;

    const dateStr = new Date().toISOString().slice(0, 10);
    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `knw-${dateStr.replace(/-/g, '')}-${Date.now().toString().slice(-3)}`;

    const frontmatter: KnowledgeFrontmatter = {
      id,
      title,
      slug,
      date: dateStr,
      status: 'published',
      topic: topic || title,
      summary: summary || '',
      takeaways: Array.isArray(takeaways) ? takeaways : [takeaways],
      stage: stage || '01-xr-foundations',
      confidence: body.confidence || 5,
      tags: tags || [],
    };

    const validated = KnowledgeFrontmatterSchema.parse(frontmatter);
    const bodyContent = content || `## Overview\n${summary}\n\n## Key Takeaways\n${(frontmatter.takeaways || []).map((t) => `- ${t}`).join('\n')}`;
    const fileContent = matter.stringify(bodyContent, validated);
    const fileName = `${dateStr}-${slug}.md`;
    const relativeRepoPath = `content/knowledge/${fileName}`;

    const saveResult = await saveProjectFile(
      relativeRepoPath,
      fileContent,
      `content(knowledge): ${title}`
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
