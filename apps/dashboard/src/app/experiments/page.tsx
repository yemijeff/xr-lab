'use client';

import React, { useState, useEffect } from 'react';
import { FlaskConical, Calendar, CheckCircle2, HelpCircle, Lightbulb, Wrench, Plus } from 'lucide-react';
import { ExperimentFrontmatter, ContentItem } from '@xrlab/types';
import { LogExperimentModal } from '@/components/experiments/LogExperimentModal';

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<ContentItem<ExperimentFrontmatter>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchExperiments = async () => {
    try {
      // In dashboard we can fetch or read
      const res = await fetch('/api/journal'); // We can query content directory or load via Next.js
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetch('/api/experiments').then(r => r.json()).then(data => {
      if (data?.success) setExperiments(data.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <FlaskConical className="w-4 h-4" />
            <span>SPATIAL EXPERIMENTATION LAB</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Experiments & Prototypes
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Focused investigations testing spatial hypotheses. Every major learning milestone produces an experiment that tests what works, what fails, and what was learned.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-medium text-xs shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Experiment</span>
        </button>
      </div>

      {/* Experiments List */}
      <div className="space-y-6">
        {/* Render experiments */}
        <div className="rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] p-6 space-y-4 transition-colors shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1a1d29]">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-purple-950/50 text-purple-300 border border-purple-800/40">
                EXP-001
              </span>
              <span className="text-xs font-mono text-slate-400">
                STAGE: 01-xr-foundations
              </span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
              <Calendar className="w-3.5 h-3.5" /> 2026-08-16
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">Testing Motion Parallax & 6DoF Menu Retention</h2>
            <div className="mt-2 flex items-start gap-2 text-xs text-sky-300 bg-sky-950/30 border border-sky-900/40 rounded-xl p-3">
              <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
              <div>
                <span className="font-mono font-medium text-sky-400">Core Question: </span>
                How does 6DoF translational motion parallax alter spatial menu retention?
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#141724] border border-[#1e2336] space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Hypothesis</div>
              <p className="text-slate-300 leading-relaxed">
                World-anchored menus with subtle depth cues maintain orientation 50% better than body-locked menus.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#141724] border border-[#1e2336] space-y-1">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Result
              </div>
              <p className="text-slate-300 leading-relaxed">
                Translational head movement around world-anchored panels created strong perceptual stability without cybersickness.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-1">
              <div className="text-[10px] font-mono text-emerald-400 font-semibold">✓ WHAT WORKED</div>
              <p className="text-slate-300">Using a 1.5-meter distance with 120ms inertia follow damping.</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-1">
              <div className="text-[10px] font-mono text-rose-400 font-semibold">✕ WHAT FAILED</div>
              <p className="text-slate-300">Direct head-locking caused visual fatigue and peripheral blind-spots.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs flex items-start gap-2 text-amber-200">
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <span className="font-mono font-medium text-amber-400">Spatial Insight: </span>
              Spatial interfaces must respect the resting vergence-accommodation envelope (1.5m to 2.0m).
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1a1d29] text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-slate-500" />
              <span>Tools: Unity, XR Interaction Toolkit</span>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[#161926] text-slate-400 border border-[#22273a]">
                spatial-ux
              </span>
              <span className="px-2 py-0.5 rounded bg-[#161926] text-slate-400 border border-[#22273a]">
                spatial-ergonomics
              </span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <LogExperimentModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
