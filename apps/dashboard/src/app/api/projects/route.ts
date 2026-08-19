import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readContentDirectory } from '@xrlab/content';
import { ProjectFrontmatterSchema, ProjectFrontmatter } from '@xrlab/types';
import { saveProjectFile } from '@/lib/githubSync';

const PRJ_DIR = path.join(process.cwd(), '../../content/projects');

export async function GET() {
  try {
    const projects = readContentDirectory<ProjectFrontmatter>(PRJ_DIR, ProjectFrontmatterSchema);
    return NextResponse.json({ success: true, data: projects });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, summary, stage, problem, concept, spatialUX, tools, skills, prototypeLinks, githubLinks, status = 'in_progress' } = body;

    const dateStr = new Date().toISOString().slice(0, 10);
    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `prj-${dateStr.replace(/-/g, '')}-${Date.now().toString().slice(-3)}`;

    const frontmatter: ProjectFrontmatter = {
      id,
      title,
      slug,
      date: dateStr,
      status,
      stage: stage || '02-spatial-ux',
      summary,
      problem,
      concept,
      spatialUX,
      skills: skills || [],
      tools: tools || [],
      images: [],
      videos: [],
      prototypeLinks: prototypeLinks || [],
      githubLinks: githubLinks || [],
      featured: false,
      publishedAt: status === 'published' ? new Date().toISOString() : undefined,
    };

    const validated = ProjectFrontmatterSchema.parse(frontmatter);
    const bodyContent = body.content || `## Overview\n${summary}\n\n## The Spatial Problem\n${problem || ''}\n\n## Spatial Concept\n${concept || ''}`;
    const fileContent = matter.stringify(bodyContent, validated);
    const fileName = `${dateStr}-${slug}.md`;
    const relativeRepoPath = `content/projects/${fileName}`;

    const saveResult = await saveProjectFile(
      relativeRepoPath,
      fileContent,
      `content(project): ${title}`
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
