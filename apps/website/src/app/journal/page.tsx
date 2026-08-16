import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { BookOpen, Calendar, Tag, ArrowUpRight } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { JournalFrontmatterSchema, JournalFrontmatter } from '@xrlab/types';

function getJournals() {
  const dir = path.join(process.cwd(), '../../content/journal');
  return readContentDirectory<JournalFrontmatter>(dir, JournalFrontmatterSchema, { onlyPublished: true });
}

export default function JournalArchivePage() {
  const journals = getJournals();

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <BookOpen className="w-4 h-4" />
          <span>LEARNING ARCHIVE & ESSAYS</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          The Journal
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Chronological observations, reflections, and deep dives exploring spatial interfaces, ergonomic constraints, and paradigm shifts in UX.
        </p>
      </div>

      {/* Entries Stream */}
      <div className="space-y-6">
        {journals.map((entry) => (
          <Link
            key={entry.slug}
            href={`/journal/${entry.slug}`}
            className="group block p-6 rounded-2xl bg-[#0d0f17] border border-[#1c202d] hover:border-emerald-500/40 transition-all space-y-3 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="text-emerald-400 uppercase font-semibold">
                {entry.frontmatter.type || 'JOURNAL'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {entry.frontmatter.date}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
              {entry.frontmatter.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
              {entry.frontmatter.summary}
            </p>

            <div className="pt-3 border-t border-[#181b26] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {entry.frontmatter.tags?.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#141724] text-slate-400 border border-[#22273a]">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-emerald-400 font-mono text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Read Entry <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
