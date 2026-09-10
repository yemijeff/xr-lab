import { NextRequest, NextResponse } from 'next/server';
import { JournalFrontmatter } from '@xrlab/types';
import { saveProjectFile, readProjectFile } from '@/lib/githubSync';

const JOURNAL_DATA_PATH = 'data/journal/entries.json';

async function loadEntries(): Promise<JournalFrontmatter[]> {
  const result = await readProjectFile(JOURNAL_DATA_PATH);
  if (!result.success || !result.content) return [];
  try {
    return JSON.parse(result.content) as JournalFrontmatter[];
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const entries = await loadEntries();
    // Sort newest first
    entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ success: true, data: entries });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, summary, stage, tags, skills, content, status = 'draft', type = 'journal', coverImage } = body;

    const dateStr = new Date().toISOString().slice(0, 10);
    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `jrn-${dateStr.replace(/-/g, '')}-${Date.now().toString().slice(-4)}`;

    const newEntry: JournalFrontmatter & { content?: string } = {
      id,
      title,
      slug,
      date: dateStr,
      type,
      status,
      summary: summary || '',
      stage: stage || '01-xr-foundations',
      tags: tags || [],
      skills: skills || [],
      relatedExperiments: [],
      relatedProjects: [],
      featured: false,
      coverImage: coverImage || undefined,
      publishedAt: status === 'published' ? new Date().toISOString() : undefined,
    };

    // Attach body content to the entry object so it persists
    const entryWithContent = { ...newEntry, body: content || '' };

    // Load existing entries and prepend new one
    const existing = await loadEntries();
    const updated = [entryWithContent, ...existing];

    const saveResult = await saveProjectFile(
      JOURNAL_DATA_PATH,
      JSON.stringify(updated, null, 2),
      `content(journal): ${status === 'published' ? 'publish' : 'draft'} "${title}"`
    );

    if (!saveResult.success) {
      return NextResponse.json({ success: false, error: saveResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: entryWithContent, mode: saveResult.mode }, { status: 201 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, publishedAt } = body;

    const entries = await loadEntries();
    const updated = entries.map((e: JournalFrontmatter) =>
      e.id === id
        ? {
            ...e,
            status,
            publishedAt: status === 'published' ? (publishedAt || new Date().toISOString()) : undefined,
          }
        : e
    );

    const saveResult = await saveProjectFile(
      JOURNAL_DATA_PATH,
      JSON.stringify(updated, null, 2),
      `content(journal): update status for ${id}`
    );

    if (!saveResult.success) {
      return NextResponse.json({ success: false, error: saveResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: updated, mode: saveResult.mode });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
