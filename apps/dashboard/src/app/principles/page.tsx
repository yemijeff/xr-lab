'use client';

import React, { useState, useEffect } from 'react';
import { Lightbulb, Plus, CheckCircle2 } from 'lucide-react';
import { PrincipleFrontmatter, ContentItem } from '@xrlab/types';
import { LogPrincipleModal } from '@/components/principles/LogPrincipleModal';

export default function PrinciplesPage() {
  const [principles, setPrinciples] = useState<ContentItem<PrincipleFrontmatter>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/principles')
      .then((r) => r.json())
      .then((data) => {
        if (data?.success) setPrinciples(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Lightbulb className="w-4 h-4" />
            <span>DESIGN PHILOSOPHY & EMPIRICAL RULES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Evolving Spatial Principles
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Convictions earned through prototyping in headsets. Principles are not abstract theories — they are validated against concrete evidence and prototype tests.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Principle</span>
        </button>
      </div>

      {/* Principles List */}
      <div className="space-y-6">
        {principles.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0f111a] border border-[#1e2230] text-center space-y-3">
            <Lightbulb className="w-8 h-8 text-amber-400 mx-auto opacity-75" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-200">No spatial principles formalized yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                As you build prototypes and observe what works and what fails, distill your core design rules here.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-medium transition-colors"
              >
                + Formalize First Principle
              </button>
            </div>
          </div>
        ) : (
          principles.map((prin) => (
            <div
              key={prin.slug}
              className="p-6 sm:p-8 rounded-2xl bg-[#0f111a] border border-[#1e2230] space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-3 border-b border-[#181b26]">
                <span className="text-amber-400 font-semibold">{prin.frontmatter.id.toUpperCase()}</span>
                <span>Confidence: {prin.frontmatter.confidence}/5</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                &quot;{prin.frontmatter.title}&quot;
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {prin.frontmatter.statement}
              </p>

              {prin.frontmatter.evidence && prin.frontmatter.evidence.length > 0 && (
                <div className="pt-3 border-t border-[#181b26] flex items-center gap-2 text-xs font-mono text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Validated by: </span>
                  {prin.frontmatter.evidence.map((ev) => (
                    <span key={ev} className="px-2 py-0.5 rounded bg-[#141724] text-sky-300 border border-[#202538]">
                      {ev}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <LogPrincipleModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => fetch('/api/principles').then(r => r.json()).then(d => d.success && setPrinciples(d.data))}
        />
      )}
    </div>
  );
}
