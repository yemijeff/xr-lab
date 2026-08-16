import React from 'react';
import fs from 'fs';
import path from 'path';
import { FlaskConical, Calendar, CheckCircle2, HelpCircle, Lightbulb, Wrench } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { ExperimentFrontmatterSchema, ExperimentFrontmatter } from '@xrlab/types';

function getExperiments() {
  const dir = path.join(process.cwd(), '../../content/experiments');
  return readContentDirectory<ExperimentFrontmatter>(dir, ExperimentFrontmatterSchema);
}

export default function ExperimentsPage() {
  const experiments = getExperiments();

  return (
    <div className="space-y-8">
      {/* Header */}
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

      {/* Experiments Grid */}
      <div className="space-y-6">
        {experiments.map((exp) => (
          <div
            key={exp.slug}
            className="rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] p-6 space-y-4 transition-colors shadow-lg"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1a1d29]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-purple-950/50 text-purple-300 border border-purple-800/40">
                  {exp.frontmatter.id.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  STAGE: {exp.frontmatter.stage}
                </span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <Calendar className="w-3.5 h-3.5" /> {exp.frontmatter.date}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">{exp.frontmatter.title}</h2>
              {exp.frontmatter.question && (
                <div className="mt-2 flex items-start gap-2 text-xs text-sky-300 bg-sky-950/30 border border-sky-900/40 rounded-xl p-3">
                  <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
                  <div>
                    <span className="font-mono font-medium text-sky-400">Core Question: </span>
                    {exp.frontmatter.question}
                  </div>
                </div>
              )}
            </div>

            {/* Hypothesis & Result Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {exp.frontmatter.hypothesis && (
                <div className="p-3.5 rounded-xl bg-[#141724] border border-[#1e2336] space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Hypothesis</div>
                  <p className="text-slate-300 leading-relaxed">{exp.frontmatter.hypothesis}</p>
                </div>
              )}
              {exp.frontmatter.result && (
                <div className="p-3.5 rounded-xl bg-[#141724] border border-[#1e2336] space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Result
                  </div>
                  <p className="text-slate-300 leading-relaxed">{exp.frontmatter.result}</p>
                </div>
              )}
            </div>

            {/* What Worked & What Failed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {exp.frontmatter.whatWorked && (
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 font-semibold">✓ WHAT WORKED</div>
                  <p className="text-slate-300">{exp.frontmatter.whatWorked}</p>
                </div>
              )}
              {exp.frontmatter.whatFailed && (
                <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-1">
                  <div className="text-[10px] font-mono text-rose-400 font-semibold">✕ WHAT FAILED</div>
                  <p className="text-slate-300">{exp.frontmatter.whatFailed}</p>
                </div>
              )}
            </div>

            {/* Core Spatial Takeaway */}
            {exp.frontmatter.whatWasLearned && (
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs flex items-start gap-2 text-amber-200">
                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <span className="font-mono font-medium text-amber-400">Spatial Insight: </span>
                  {exp.frontmatter.whatWasLearned}
                </div>
              </div>
            )}

            {/* Tools & Skills */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1a1d29] text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                <Wrench className="w-3 h-3 text-slate-500" />
                <span>Tools: {exp.frontmatter.tools?.join(', ') || 'Unity'}</span>
              </div>
              <div className="flex gap-1.5">
                {exp.frontmatter.skills?.map((sk) => (
                  <span key={sk} className="px-2 py-0.5 rounded bg-[#161926] text-slate-400 border border-[#22273a]">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
