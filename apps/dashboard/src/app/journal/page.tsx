'use client';

import React, { useState, useEffect } from 'react';
import { BookMarked, Plus, Calendar, Tag, CheckCircle2, FileText, Send } from 'lucide-react';
import { JournalFrontmatter, ContentItem } from '@xrlab/types';

export default function JournalDashboardPage() {
  const [entries, setEntries] = useState<ContentItem<JournalFrontmatter>[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [stage, setStage] = useState('01-xr-foundations');
  const [tags, setTags] = useState('spatial-ux, learning');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchJournal = async () => {
    try {
      const res = await fetch('/api/journal');
      const json = await res.json();
      if (json.success) {
        setEntries(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournal();
  }, []);

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          summary: summary.trim(),
          stage,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
          content: content.trim(),
          status,
        }),
      });

      if (res.ok) {
        setIsWriting(false);
        setTitle('');
        setSummary('');
        setContent('');
        fetchJournal();
      }
    } catch (err) {
      console.error('Error saving journal:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <BookMarked className="w-4 h-4" />
            <span>PORTABLE MARKDOWN JOURNAL & REFLECTIONS</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Journal & Case Studies
          </h1>
          <p className="text-slate-400 text-xs">
            Stored directly in <code className="font-mono text-slate-300">/content/journal</code> and published to the public website.
          </p>
        </div>

        <button
          onClick={() => setIsWriting(!isWriting)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium text-xs shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isWriting ? 'Close Editor' : 'Write Journal Reflection'}</span>
        </button>
      </div>

      {/* Inline Writing Form */}
      {isWriting && (
        <form
          onSubmit={handleSaveEntry}
          className="p-6 rounded-2xl bg-[#0f111a] border border-emerald-500/30 shadow-2xl space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#1e2230]">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <FileText className="w-4 h-4" />
              <span>Create New Journal Entry (Markdown)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <label className="text-slate-400">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="px-2 py-1 rounded bg-[#141724] border border-[#24283b] text-slate-200 text-xs"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Public Website)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ergonomics of Gaze and Pinch in Mixed Reality"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. spatial-ux, ergonomics, eye-tracking"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Summary</label>
            <input
              type="text"
              placeholder="Brief overview for cards and meta descriptions"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Markdown Body *</label>
            <textarea
              required
              rows={8}
              placeholder="# Heading&#10;&#10;Describe your spatial experimentation, research conclusions, or design iterations here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsWriting(false)}
              className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium text-xs transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Saving...' : 'Save & Publish Markdown'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Entries List */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-slate-500">Loading journal...</div>
      ) : entries.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0e1017] border border-[#1e2230] text-slate-500">
          No journal reflections found in <code className="font-mono">/content/journal</code>.
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.slug}
              className="p-6 rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#252b40] transition-colors space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    <CheckCircle2 className="w-3 h-3" /> {entry.frontmatter.status.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    TYPE: {entry.frontmatter.type}
                  </span>
                </div>

                <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <Calendar className="w-3.5 h-3.5" /> {entry.frontmatter.date}
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white">{entry.frontmatter.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{entry.frontmatter.summary}</p>
              </div>

              {entry.content && (
                <div className="p-4 rounded-xl bg-[#141724]/70 border border-[#1e2336] text-xs text-slate-300 font-mono line-clamp-3 leading-relaxed">
                  {entry.content}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1a1d29]">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Tag className="w-3 h-3 text-slate-500" />
                  {entry.frontmatter.tags?.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161926] text-slate-400 border border-[#22273a]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-slate-600">
                  slug: {entry.slug}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
