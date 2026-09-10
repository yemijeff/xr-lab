'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  BookMarked, Plus, Calendar, Tag, FileText, Send,
  Globe, Lock, ImagePlus, X, CheckCircle2, Eye, Sparkles,
} from 'lucide-react';
import { JournalFrontmatter } from '@xrlab/types';
import { CustomSelect } from '@/components/ui/CustomSelect';

type EntryWithBody = JournalFrontmatter & { body?: string };

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft — Private', color: 'text-amber-300' },
  { value: 'published', label: 'Published — Live', color: 'text-emerald-400' },
];

export default function JournalDashboardPage() {
  const [entries, setEntries] = useState<EntryWithBody[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'all' | 'draft' | 'published'>('all');

  // Form state
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [status, setStatus] = useState('draft');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image upload state
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImageName, setCoverImageName] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchJournal = async () => {
    try {
      const res = await fetch('/api/journal');
      const json = await res.json();
      if (json.success) setEntries(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJournal(); }, []);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB');
      return;
    }

    setIsUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result as string;
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64,
            filename: `${Date.now()}-${file.name.replace(/\s+/g, '-')}`,
            folder: 'journal',
          }),
        });
        const data = await res.json();
        if (data.success) {
          setCoverImage(data.url);
          setCoverImageName(file.name);
        }
      } catch (err) {
        console.error('Upload failed:', err);
      } finally {
        setIsUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !bodyText.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          summary: summary.trim(),
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
          content: bodyText.trim(),
          status,
          coverImage: coverImage || undefined,
        }),
      });

      if (res.ok) {
        setIsWriting(false);
        setTitle(''); setSummary(''); setBodyText(''); setTags('');
        setCoverImage(null); setCoverImageName('');
        setStatus('draft');
        fetchJournal();
      }
    } catch (err) {
      console.error('Error saving journal:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (entry: EntryWithBody) => {
    const newStatus = entry.status === 'published' ? 'draft' : 'published';
    // Optimistic update
    setEntries((prev) =>
      prev.map((e) => e.id === entry.id ? { ...e, status: newStatus as typeof e.status } : e)
    );
    try {
      await fetch('/api/journal', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entry.id, status: newStatus }),
      });
      fetchJournal();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEntries = entries.filter((e) => {
    if (tab === 'draft') return e.status === 'draft';
    if (tab === 'published') return e.status === 'published';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <BookMarked className="w-4 h-4" />
            <span>PORTABLE MARKDOWN JOURNAL & REFLECTIONS</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Journal & Case Studies</h1>
          <p className="text-slate-400 text-xs">
            Drafts stay private. Published entries appear live on your public website.
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

      {/* Writing Form */}
      {isWriting && (
        <form
          onSubmit={handleSaveEntry}
          className="p-6 rounded-2xl bg-[#0f111a] border border-emerald-500/30 shadow-2xl space-y-5 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#1e2230]">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <FileText className="w-4 h-4" />
              <span>New Journal Entry</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Status:</span>
              <CustomSelect
                value={status}
                options={STATUS_OPTIONS}
                onChange={setStatus}
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">Cover Image (optional)</label>
            {coverImage ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141724] border border-emerald-500/30">
                <img src={coverImage} alt="Cover" className="w-16 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-200 truncate">{coverImageName}</p>
                  <p className="text-[10px] text-emerald-400 font-mono">{coverImage}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setCoverImage(null); setCoverImageName(''); }}
                  className="p-1 rounded-lg hover:bg-[#1e2336] text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingImage}
                className="w-full flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-[#141724] border-2 border-dashed border-[#24283b] hover:border-emerald-500/50 hover:bg-[#161c28] transition-all text-slate-400 hover:text-slate-200"
              >
                <ImagePlus className="w-5 h-5" />
                <span className="text-xs">{isUploadingImage ? 'Uploading...' : 'Click to upload cover image (PNG, JPG, WebP — max 5MB)'}</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Title *</label>
              <input
                type="text" required
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
              required rows={10}
              placeholder={"# Heading\n\nDescribe your spatial experimentation, research conclusions, or design iterations here..."}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsWriting(false)} className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200">Cancel</button>
            <button
              type="submit" disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Saving...' : status === 'published' ? 'Publish Now' : 'Save as Draft'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0c0e17] border border-[#1e2230] w-fit">
        {(['all', 'draft', 'published'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
              tab === t
                ? 'bg-[#1e2234] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t} {t !== 'all' && `(${entries.filter(e => e.status === t).length})`}
          </button>
        ))}
      </div>

      {/* Entries */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-slate-500">Loading journal...</div>
      ) : filteredEntries.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0e1017] border border-[#1e2230] text-slate-500 space-y-3">
          <Sparkles className="w-6 h-6 mx-auto opacity-50" />
          <p className="text-xs">
            {tab === 'all'
              ? 'No journal entries yet. Write your first reflection or use the AI Co-Pilot to draft from your learning logs!'
              : `No ${tab} entries yet.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => {
            const isPublished = entry.status === 'published';
            return (
              <div
                key={entry.id}
                className={`p-6 rounded-2xl border transition-all space-y-3 shadow-lg ${
                  isPublished
                    ? 'bg-[#0f111a] border-[#1e2230] hover:border-emerald-500/30'
                    : 'bg-[#0f111a] border-[#1e2230] hover:border-amber-500/20'
                }`}
              >
                {/* Cover image */}
                {entry.coverImage && (
                  <img
                    src={entry.coverImage}
                    alt={entry.title}
                    className="w-full h-36 object-cover rounded-xl"
                  />
                )}

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                      isPublished
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        : 'bg-amber-950/50 text-amber-300 border border-amber-800/40'
                    }`}>
                      {isPublished ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      {entry.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <Calendar className="w-3.5 h-3.5" /> {entry.date}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-white">{entry.title}</h3>
                  {entry.summary && (
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{entry.summary}</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1a1d29]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Tag className="w-3 h-3 text-slate-500" />
                    {entry.tags?.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161926] text-slate-400 border border-[#22273a]">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleTogglePublish(entry)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95 ${
                      isPublished
                        ? 'bg-[#141724] hover:bg-[#1e2336] text-slate-300 border border-[#24283b]'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold'
                    }`}
                  >
                    {isPublished ? (
                      <><Lock className="w-3 h-3" /> Unpublish</>
                    ) : (
                      <><Globe className="w-3 h-3" /> Publish to Website</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
