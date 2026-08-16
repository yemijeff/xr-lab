import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FlaskConical, Calendar, ArrowUpRight, HelpCircle } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { ExperimentFrontmatterSchema, ExperimentFrontmatter } from '@xrlab/types';

function getExperiments() {
  const dir = path.join(process.cwd(), '../../content/experiments');
  return readContentDirectory<ExperimentFrontmatter>(dir, ExperimentFrontmatterSchema, { onlyPublished: true });
}

export default function ExperimentsPage() {
  const experiments = getExperiments();

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
          <FlaskConical className="w-4 h-4" />
          <span>PROTOTYPES, INVESTIGATIONS & RESULTS</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Experiments Archive
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Focused micro-investigations in virtual and mixed reality. Each card presents the initial hypothesis, observed results, what worked, and what failed.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiments.map((exp) => (
          <Link
            key={exp.slug}
            href={`/experiments/${exp.slug}`}
            className="group rounded-2xl bg-[#0d0f17] border border-[#1c202d] hover:border-purple-500/40 p-6 space-y-4 flex flex-col justify-between transition-all shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="px-2.5 py-0.5 rounded text-[10px] bg-purple-950/50 text-purple-300 border border-purple-800/40">
                  {exp.frontmatter.id.toUpperCase()}
                </span>
                <span>{exp.frontmatter.date}</span>
              </div>

              <h2 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                {exp.frontmatter.title}
              </h2>

              {exp.frontmatter.question && (
                <div className="flex items-start gap-2 text-xs text-sky-300 bg-sky-950/20 border border-sky-900/30 rounded-xl p-3">
                  <HelpCircle className="w-4 h-4 shrink-0 text-sky-400 mt-0.5" />
                  <p className="line-clamp-2">{exp.frontmatter.question}</p>
                </div>
              )}

              {exp.frontmatter.result && (
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  <strong className="text-emerald-400 font-mono">Result: </strong>
                  {exp.frontmatter.result}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-[#181b26] flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Tools: {exp.frontmatter.tools?.join(', ') || 'Unity'}</span>
              <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                View Details <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
