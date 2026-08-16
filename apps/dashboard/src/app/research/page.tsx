import React from 'react';
import fs from 'fs';
import path from 'path';
import { Microscope, Calendar, CheckCircle2, HelpCircle } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { ResearchFrontmatterSchema, ResearchFrontmatter } from '@xrlab/types';

function getResearch() {
  const dir = path.join(process.cwd(), '../../content/research');
  return readContentDirectory<ResearchFrontmatter>(dir, ResearchFrontmatterSchema);
}

export default function ResearchPage() {
  const researchItems = getResearch();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Microscope className="w-4 h-4" />
          <span>SPATIAL COMPUTING RESEARCH & ERGONOMICS</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Research Investigations
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Deep investigations into perceptual psychology, spatial ergonomics, multimodal interaction constraints, and user mental models.
        </p>
      </div>

      {/* Research List */}
      <div className="space-y-6">
        {researchItems.map((item) => (
          <div
            key={item.slug}
            className="rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] p-6 space-y-4 transition-colors shadow-lg"
          >
            <div className="flex items-center justify-between text-xs pb-3 border-b border-[#1a1d29]">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-950/50 text-cyan-300 border border-cyan-800/40">
                {item.frontmatter.id.toUpperCase()}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <Calendar className="w-3.5 h-3.5" /> {item.frontmatter.date}
              </span>
            </div>

            <h2 className="text-lg font-semibold text-white">{item.frontmatter.title}</h2>

            {item.frontmatter.question && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-[#141724] border border-[#1e2336] text-xs text-slate-300">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-cyan-400 font-semibold">Research Question: </span>
                  {item.frontmatter.question}
                </div>
              </div>
            )}

            {item.frontmatter.findings && (
              <div className="p-4 rounded-xl bg-[#121624] border border-[#1c2338] text-xs space-y-1">
                <div className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">Key Findings</div>
                <p className="text-slate-300 leading-relaxed">{item.frontmatter.findings}</p>
              </div>
            )}

            {item.frontmatter.conclusion && (
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/30 text-xs text-cyan-200">
                <span className="font-mono font-semibold text-cyan-300">Design Conclusion: </span>
                {item.frontmatter.conclusion}
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1a1d29]">
              {item.frontmatter.tags?.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161926] text-slate-400 border border-[#22273a]">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
