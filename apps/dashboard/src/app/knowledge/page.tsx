'use client';

import React, { useState, useEffect } from 'react';
import { Library, Plus, Tag } from 'lucide-react';
import { KnowledgeFrontmatter, ContentItem } from '@xrlab/types';
import { LogKnowledgeModal } from '@/components/knowledge/LogKnowledgeModal';

export default function KnowledgePage() {
  const [knowledge, setKnowledge] = useState<ContentItem<KnowledgeFrontmatter>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/knowledge')
      .then((r) => r.json())
      .then((data) => {
        if (data?.success) setKnowledge(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Library className="w-4 h-4" />
            <span>REFERENCE PRIMERS & KNOWLEDGE BASE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Knowledge Base & Technical Primers
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Distilled technical primers on hardware mechanics, perception science, tracking algorithms, and spatial design constraints.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium text-xs shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Primer</span>
        </button>
      </div>

      {/* Knowledge List */}
      <div className="space-y-6">
        {knowledge.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0f111a] border border-[#1e2230] text-center space-y-3">
            <Library className="w-8 h-8 text-emerald-400 mx-auto opacity-75" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-200">No knowledge primers recorded yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Document hardware mechanics, spatial tracking principles, or rendering primers.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-medium transition-colors"
              >
                + Create Reference Primer
              </button>
            </div>
          </div>
        ) : (
          knowledge.map((item) => (
            <div
              key={item.slug}
              className="p-6 rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] space-y-4 shadow-lg transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-[#181b26]">
                <span className="text-emerald-400 font-semibold">{item.frontmatter.topic}</span>
                <span>{item.frontmatter.date}</span>
              </div>

              <h3 className="text-lg font-semibold text-white">{item.frontmatter.title}</h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.frontmatter.summary}
              </p>

              {item.frontmatter.takeaways && item.frontmatter.takeaways.length > 0 && (
                <div className="p-4 rounded-xl bg-[#141724] border border-[#1e2336] space-y-1.5">
                  <div className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">Key Takeaways</div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    {item.frontmatter.takeaways.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#181b26]">
                {item.frontmatter.tags?.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#141724] text-slate-400 border border-[#22273a]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <LogKnowledgeModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => fetch('/api/knowledge').then(r => r.json()).then(d => d.success && setKnowledge(d.data))}
        />
      )}
    </div>
  );
}
