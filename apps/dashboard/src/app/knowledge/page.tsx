import React from 'react';
import fs from 'fs';
import path from 'path';
import { Library, BookOpen, Star } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { KnowledgeFrontmatterSchema, KnowledgeFrontmatter } from '@xrlab/types';

function getKnowledge() {
  const dir = path.join(process.cwd(), '../../content/knowledge');
  return readContentDirectory<KnowledgeFrontmatter>(dir, KnowledgeFrontmatterSchema);
}

export default function KnowledgePage() {
  const items = getKnowledge();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <Library className="w-4 h-4" />
          <span>PERSONAL SPATIAL ENCYCLOPEDIA</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Knowledge Base
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Fundamental spatial computing terms, definitions, and mental models explained in simple, clear product design language.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.slug}
            className="rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] p-6 space-y-4 flex flex-col justify-between transition-colors shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1a1d29]">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-950/50 text-amber-300 border border-amber-800/40">
                  {item.frontmatter.id.toUpperCase()}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {item.frontmatter.confidence}/5 Confidence
                </span>
              </div>

              <h2 className="text-lg font-semibold text-white">{item.frontmatter.title}</h2>

              <div className="p-3.5 rounded-xl bg-[#141724] border border-[#1e2336] text-xs space-y-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Technical Definition</div>
                <p className="text-slate-300 leading-relaxed">{item.frontmatter.definition}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs space-y-1">
                <div className="text-[10px] font-mono text-amber-400 uppercase font-semibold">Simple Explanation</div>
                <p className="text-slate-200 leading-relaxed">{item.frontmatter.simpleExplanation}</p>
              </div>

              {item.frontmatter.whyItMatters && (
                <div className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-300 font-mono">Why it matters: </strong>
                  {item.frontmatter.whyItMatters}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#1a1d29] flex flex-wrap gap-1.5">
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
