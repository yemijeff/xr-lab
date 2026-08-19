import { NextResponse } from 'next/server';
import path from 'path';
import { readContentDirectory } from '@xrlab/content';
import { JournalFrontmatterSchema, JournalFrontmatter } from '@xrlab/types';

const JOURNAL_DIR = path.join(process.cwd(), '../../content/journal');

export async function GET() {
  try {
    const entries = readContentDirectory<JournalFrontmatter>(JOURNAL_DIR, JournalFrontmatterSchema, { onlyPublished: true });
    entries.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
    return NextResponse.json({ success: true, data: entries });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
