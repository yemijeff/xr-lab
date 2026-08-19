'use client';

import React, { useState, useEffect } from 'react';
import { Microscope, Plus, HelpCircle, CheckCircle2 } from 'lucide-react';
import { ResearchFrontmatter, ContentItem } from '@xrlab/types';
import { LogResearchModal } from '@/components/research/LogResearchModal';

export default function ResearchPage() {
  const [research, setResearch] = useState<ContentItem<ResearchFrontmatter>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/research')
      .then((r) => r.json())
      .then((data) => {
        if (data?.success) setResearch(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Microscope className="w-4 h-4" />
            <span>INVESTIGATIVE REPORTS & USER STUDIES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Spatial UX Research
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            In-depth research investigations into human factors, perceptual comfort, input latency, and spatial cognitive load in mixed reality headsets.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium text-xs shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Research</span>
        </button>
      </div>

      {/* Research List */}
      <div className="space-y-6">
        {research.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0f111a] border border-[#1e2230] text-center space-y-3">
            <Microscope className="w-8 h-8 text-cyan-400 mx-auto opacity-75" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-200">No research investigations recorded yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Investigate perceptual ergonomics, Gorilla Arm fatigue, or spatial depth planes.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-medium transition-colors"
              >
                + Log Research Investigation
              </button>
            </div>
          </div>
        ) : (
          research.map((item) => (
            <div
              key={item.slug}
              className="p-6 rounded-2xl bg-[#0f111a] border border-[#1e2230] space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-[#181b26]">
                <span className="text-cyan-400 font-semibold">{item.frontmatter.id.toUpperCase()}</span>
                <span>{item.frontmatter.date}</span>
              </div>

              <h3 className="text-lg font-semibold text-white">{item.frontmatter.title}</h3>

              {item.frontmatter.question && (
                <div className="flex items-start gap-2 p-3.5 rounded-xl bg-[#131624] border border-[#1e2336] text-xs text-slate-300">
                  <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-cyan-400 font-semibold">Question: </span>
                    {item.frontmatter.question}
                  </div>
                </div>
              )}

              {item.frontmatter.findings && (
                <div className="p-4 rounded-xl bg-[#101420] border border-[#1a2134] text-xs space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">Findings</span>
                  <p className="text-slate-300 leading-relaxed">{item.frontmatter.findings}</p>
                </div>
              )}

              {item.frontmatter.conclusion && (
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/30 text-xs text-cyan-200">
                  <strong className="font-mono text-cyan-300">Conclusion: </strong>
                  {item.frontmatter.conclusion}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <LogResearchModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => fetch('/api/research').then(r => r.json()).then(d => d.success && setResearch(d.data))}
        />
      )}
    </div>
  );
}
