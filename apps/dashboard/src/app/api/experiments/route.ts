import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ExperimentFrontmatterSchema, ExperimentFrontmatter } from '@xrlab/types';

const EXP_DIR = path.join(process.cwd(), '../../content/experiments');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, question, hypothesis, stage, tools, skills, result, whatWorked, whatFailed, whatWasLearned, status = 'published' } = body;

    const dateStr = new Date().toISOString().slice(0, 10);
    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `exp-${dateStr.replace(/-/g, '')}-${Date.now().toString().slice(-3)}`;

    const frontmatter: ExperimentFrontmatter = {
      id,
      title,
      slug,
      date: dateStr,
      status,
      stage: stage || '01-xr-foundations',
      question,
      hypothesis,
      skills: skills || [],
      tools: tools || [],
      result,
      whatWorked,
      whatFailed,
      whatWasLearned,
      images: [],
      videos: [],
      prototypeLinks: [],
      githubLinks: [],
      publishedAt: status === 'published' ? new Date().toISOString() : undefined,
    };

    const validated = ExperimentFrontmatterSchema.parse(frontmatter);
    const bodyContent = body.content || `## Objective\n${question}\n\n## Observations\n${result || ''}`;
    const fileContent = matter.stringify(bodyContent, validated);
    const fileName = `${dateStr}-${slug}.md`;
    const filePath = path.join(EXP_DIR, fileName);

    fs.writeFileSync(filePath, fileContent, 'utf-8');

    return NextResponse.json({ success: true, data: { frontmatter: validated, slug, filePath } }, { status: 201 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
