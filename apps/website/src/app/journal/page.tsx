'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Tag, ArrowUpRight, Search } from 'lucide-react';
import { JournalFrontmatter, ContentItem } from '@xrlab/types';

export default function PublicJournalPage() {
  const [entries, setEntries] = useState<ContentItem<JournalFrontmatter>[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In Next.js client component on website, we can fetch public journal items
    fetch('/api/journal')
      .then((r) => r.json())
      .then((d) => {
        if (d?.success) {
          const publishedOnly = (d.data as ContentItem<JournalFrontmatter>[]).filter(
            (item) => item.frontmatter.status === 'published'
          );
          setEntries(publishedOnly);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allTags = Array.from(
    new Set(entries.flatMap((e) => e.frontmatter.tags || []))
  );

  const filteredEntries = entries.filter((e) => {
    const matchesSearch =
      searchTerm === '' ||
      e.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.frontmatter.summary && e.frontmatter.summary.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTag =
      !selectedTag || (e.frontmatter.tags && e.frontmatter.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <BookOpen className="w-4 h-4" />
          <span>LEARNING ARCHIVE & ESSAYS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          The Journal
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Chronological reflections, mental model shifts, and spatial observations. Search by keyword or filter by tag.
        </p>
      </div>

      {/* Search & Tags Bar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search journal entries and reflections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d0f17] border border-[#1e2230] text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                selectedTag === null
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'bg-[#12141e] text-slate-400 border border-[#202538] hover:text-slate-200'
              }`}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                  selectedTag === tag
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'bg-[#12141e] text-slate-400 border border-[#202538] hover:text-slate-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Entries Stream */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0d0f17] border border-[#1c202d] text-center space-y-2">
            <BookOpen className="w-8 h-8 text-emerald-400 mx-auto opacity-75" />
            <h3 className="text-sm font-semibold text-slate-200">No journal entries found</h3>
            <p className="text-xs text-slate-500">
              {searchTerm || selectedTag
                ? 'Try adjusting your search or tag filters.'
                : 'Journal essays will publish here as you write them.'}
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
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
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#141724] text-slate-400 border border-[#22273a]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="text-emerald-400 font-mono text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Read Entry <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
