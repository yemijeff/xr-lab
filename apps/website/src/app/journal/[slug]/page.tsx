import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { readContentBySlug } from '@xrlab/content';
import { JournalFrontmatterSchema, JournalFrontmatter } from '@xrlab/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const dir = path.join(process.cwd(), '../../content/journal');
  const journal = readContentBySlug<JournalFrontmatter>(dir, slug, JournalFrontmatterSchema);

  if (!journal) {
    notFound();
  }

  const { frontmatter, content } = journal;

  return (
    <article className="max-w-3xl mx-auto space-y-10">
      {/* Back link */}
      <div>
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-[#1c202e]">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="text-emerald-400 uppercase font-semibold">
            {frontmatter.type || 'JOURNAL'}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {frontmatter.date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
          {frontmatter.title}
        </h1>

        {frontmatter.summary && (
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {frontmatter.summary}
          </p>
        )}
      </header>

      {/* Content Body */}
      <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans space-y-4">
        {content}
      </div>

      {/* Footer Tags */}
      <footer className="pt-8 border-t border-[#1c202e] flex flex-wrap items-center gap-2">
        <Tag className="w-3.5 h-3.5 text-slate-500" />
        {frontmatter.tags?.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded text-xs font-mono bg-[#12141e] text-slate-400 border border-[#202538]">
            #{t}
          </span>
        ))}
      </footer>
    </article>
  );
}
