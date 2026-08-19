'use client';

import React, { useState, useEffect } from 'react';
import { Send, Globe, CheckCircle2, Clock, Eye, Sparkles } from 'lucide-react';

interface PublicationItem {
  id: string;
  title: string;
  category: 'journal' | 'experiments' | 'projects' | 'research';
  slug: string;
  date: string;
  status: 'draft' | 'review' | 'published' | 'concept' | 'in_progress';
}

export default function PublicationsPage() {
  const [items, setItems] = useState<PublicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingSlug, setUpdatingSlug] = useState<string | null>(null);

  const fetchAllContent = async () => {
    try {
      const [jrn, exp, prj, res] = await Promise.all([
        fetch('/api/journal').then((r) => r.json()),
        fetch('/api/experiments').then((r) => r.json()).catch(() => ({ data: [] })),
        fetch('/api/projects').then((r) => r.json()).catch(() => ({ data: [] })),
        fetch('/api/research').then((r) => r.json()).catch(() => ({ data: [] })),
      ]);

      const list: PublicationItem[] = [];
      if (jrn?.data) {
        jrn.data.forEach((i: any) => list.push({ id: i.frontmatter.id, title: i.frontmatter.title, category: 'journal', slug: i.slug, date: i.frontmatter.date, status: i.frontmatter.status }));
      }
      if (exp?.data) {
        exp.data.forEach((i: any) => list.push({ id: i.frontmatter.id, title: i.frontmatter.title, category: 'experiments', slug: i.slug, date: i.frontmatter.date, status: i.frontmatter.status }));
      }
      if (prj?.data) {
        prj.data.forEach((i: any) => list.push({ id: i.frontmatter.id, title: i.frontmatter.title, category: 'projects', slug: i.slug, date: i.frontmatter.date, status: i.frontmatter.status }));
      }
      if (res?.data) {
        res.data.forEach((i: any) => list.push({ id: i.frontmatter.id, title: i.frontmatter.title, category: 'research', slug: i.slug, date: i.frontmatter.date, status: i.frontmatter.status }));
      }

      setItems(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  const handleTogglePublish = async (category: string, slug: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    setUpdatingSlug(slug);

    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, slug, newStatus }),
      });
      if (res.ok) {
        await fetchAllContent();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingSlug(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
          <Send className="w-4 h-4" />
          <span>EDITORIAL PIPELINE & STAGING</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Publications & Public Staging
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Manage what is public on your portfolio website. Only items set to <code>Published</code> are visible to the public. 1-click promote drafts anytime!
        </p>
      </div>

      {/* Publications Table */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0f111a] border border-[#1e2230] text-center space-y-3">
            <Globe className="w-8 h-8 text-sky-400 mx-auto opacity-75" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-200">No content staged yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Create a journal entry, experiment, or case study from the dashboard to manage its publication status here.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#0f111a] border border-[#1e2230] overflow-hidden shadow-lg">
            <div className="p-4 border-b border-[#1e2230] flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
              <span>Item & Category</span>
              <span>Publication Control</span>
            </div>

            <div className="divide-y divide-[#181b26]">
              {items.map((item) => {
                const isPublished = item.status === 'published';
                const isUpdating = updatingSlug === item.slug;

                return (
                  <div key={item.slug} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#141724] text-sky-300 border border-[#24283b] uppercase">
                          {item.category}
                        </span>
                        <span className="text-slate-500">{item.date}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono ${
                          isPublished
                            ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/40'
                            : 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        {isPublished ? 'Live on Website' : 'Private Draft'}
                      </span>

                      <button
                        onClick={() => handleTogglePublish(item.category, item.slug, item.status)}
                        disabled={isUpdating}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm ${
                          isPublished
                            ? 'bg-[#141724] hover:bg-[#1f2336] text-slate-300 border border-[#24283b]'
                            : 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold'
                        }`}
                      >
                        {isUpdating ? 'Syncing...' : isPublished ? 'Unpublish' : 'Publish to Website'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
