import React from 'react';
import fs from 'fs';
import path from 'path';
import { Microscope, HelpCircle, CheckCircle2 } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { ResearchFrontmatterSchema, ResearchFrontmatter } from '@xrlab/types';

function getResearch() {
  const dir = path.join(process.cwd(), '../../content/research');
  return readContentDirectory<ResearchFrontmatter>(dir, ResearchFrontmatterSchema, { onlyPublished: true });
}

export default function PublicResearchPage() {
  const research = getResearch();

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Microscope className="w-4 h-4" />
          <span>INVESTIGATIVE REPORTS & USER ERGONOMICS</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Spatial Research
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          In-depth investigations answering questions on perceptual comfort, multimodal latency, and human factors in headset environments.
        </p>
      </div>

      {/* Grid */}
      <div className="space-y-6">
        {research.map((item) => (
          <div
            key={item.slug}
            className="p-6 rounded-2xl bg-[#0d0f17] border border-[#1c202d] space-y-4 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-[#181b26]">
              <span className="text-cyan-400 font-semibold">{item.frontmatter.id.toUpperCase()}</span>
              <span>{item.frontmatter.date}</span>
            </div>

            <h2 className="text-xl font-semibold text-white">{item.frontmatter.title}</h2>

            {item.frontmatter.question && (
              <div className="flex items-start gap-2 p-3.5 rounded-xl bg-[#131624] border border-[#1e2336] text-xs sm:text-sm text-slate-300">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-cyan-400 font-semibold">Question: </span>
                  {item.frontmatter.question}
                </div>
              </div>
            )}

            {item.frontmatter.findings && (
              <div className="p-4 rounded-xl bg-[#101420] border border-[#1a2134] text-xs sm:text-sm space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">Findings</span>
                <p className="text-slate-300 leading-relaxed">{item.frontmatter.findings}</p>
              </div>
            )}

            {item.frontmatter.conclusion && (
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/30 text-xs sm:text-sm text-cyan-200">
                <strong className="font-mono text-cyan-300">Design Conclusion: </strong>
                {item.frontmatter.conclusion}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
