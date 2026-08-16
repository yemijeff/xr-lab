import React from 'react';
import fs from 'fs';
import path from 'path';
import { Lightbulb, CheckCircle2 } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { PrincipleFrontmatterSchema, PrincipleFrontmatter } from '@xrlab/types';

function getPrinciples() {
  const dir = path.join(process.cwd(), '../../content/principles');
  return readContentDirectory<PrincipleFrontmatter>(dir, PrincipleFrontmatterSchema);
}

export default function PublicPrinciplesPage() {
  const principles = getPrinciples();

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <Lightbulb className="w-4 h-4" />
          <span>DESIGN PHILOSOPHY GROUNDED IN EVIDENCE</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Spatial Design Principles
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Convictions formed through building and testing in headsets. Principles are not abstract theories — they are validated against concrete prototype experiments.
        </p>
      </div>

      {/* Grid */}
      <div className="space-y-6">
        {principles.map((prin) => (
          <div
            key={prin.slug}
            className="p-6 sm:p-8 rounded-2xl bg-[#0d0f17] border border-[#1c202d] space-y-4 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-3 border-b border-[#181b26]">
              <span className="text-amber-400 font-semibold">{prin.frontmatter.id.toUpperCase()}</span>
              <span>Confidence: {prin.frontmatter.confidence}/5</span>
            </div>

            <h2 className="text-2xl font-semibold text-white tracking-tight">
              &quot;{prin.frontmatter.title}&quot;
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {prin.frontmatter.statement}
            </p>

            {prin.frontmatter.evidence && prin.frontmatter.evidence.length > 0 && (
              <div className="pt-3 border-t border-[#181b26] flex items-center gap-2 text-xs font-mono text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Validated by: </span>
                {prin.frontmatter.evidence.map((ev) => (
                  <span key={ev} className="px-2 py-0.5 rounded bg-[#131622] text-sky-300 border border-[#202538]">
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
