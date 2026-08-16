import React from 'react';
import fs from 'fs';
import path from 'path';
import { Lightbulb, Award, CheckCircle2 } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { PrincipleFrontmatterSchema, PrincipleFrontmatter } from '@xrlab/types';

function getPrinciples() {
  const dir = path.join(process.cwd(), '../../content/principles');
  return readContentDirectory<PrincipleFrontmatter>(dir, PrincipleFrontmatterSchema);
}

export default function PrinciplesPage() {
  const principles = getPrinciples();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Lightbulb className="w-4 h-4" />
          <span>EVOLVING SPATIAL DESIGN PHILOSOPHY</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Design Principles
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Ground rules and convictions distilled from tangible experiments and failed prototypes. Principles evolve as spatial intuition sharpens.
        </p>
      </div>

      {/* Principles List */}
      <div className="space-y-6">
        {principles.map((prin) => (
          <div
            key={prin.slug}
            className="rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] p-6 space-y-4 transition-colors shadow-lg"
          >
            <div className="flex items-center justify-between text-xs pb-3 border-b border-[#1a1d29]">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-950/50 text-emerald-300 border border-emerald-800/40">
                {prin.frontmatter.id.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-emerald-400">
                Confidence: {prin.frontmatter.confidence}/5
              </span>
            </div>

            <h2 className="text-xl font-semibold text-white tracking-tight">
              &quot;{prin.frontmatter.title}&quot;
            </h2>

            <div className="p-4 rounded-xl bg-[#141724] border border-[#1e2336] text-xs text-slate-300 leading-relaxed">
              <span className="font-mono text-emerald-400 uppercase font-semibold block mb-1">
                Statement of Belief
              </span>
              {prin.frontmatter.statement}
            </div>

            {prin.frontmatter.evidence && prin.frontmatter.evidence.length > 0 && (
              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Backed by evidence: </span>
                {prin.frontmatter.evidence.map((ev) => (
                  <span key={ev} className="px-2 py-0.5 rounded bg-[#161926] text-sky-300 border border-[#22273a]">
                    {ev}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
