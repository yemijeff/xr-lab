import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, HelpCircle, CheckCircle2, XCircle, Lightbulb, Wrench } from 'lucide-react';
import { readContentBySlug } from '@xrlab/content';
import { ExperimentFrontmatterSchema, ExperimentFrontmatter } from '@xrlab/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExperimentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dir = path.join(process.cwd(), '../../content/experiments');
  const experiment = readContentBySlug<ExperimentFrontmatter>(dir, slug, ExperimentFrontmatterSchema);

  if (!experiment) {
    notFound();
  }

  const { frontmatter, content } = experiment;

  return (
    <article className="max-w-3xl mx-auto space-y-10">
      {/* Back link */}
      <div>
        <Link
          href="/experiments"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Experiments
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-[#1c202e]">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="px-2.5 py-0.5 rounded text-[10px] bg-purple-950/50 text-purple-300 border border-purple-800/40">
            {frontmatter.id.toUpperCase()}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {frontmatter.date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-snug">
          {frontmatter.title}
        </h1>

        {frontmatter.question && (
          <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-800/40 text-xs sm:text-sm text-sky-200 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono font-semibold text-sky-400 block mb-0.5">Core Question:</span>
              {frontmatter.question}
            </div>
          </div>
        )}
      </header>

      {/* Structured Investigation Breakdown */}
      <div className="space-y-4">
        {frontmatter.hypothesis && (
          <div className="p-4 rounded-xl bg-[#0e1018] border border-[#1e2336] text-xs sm:text-sm space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Hypothesis</div>
            <p className="text-slate-200 leading-relaxed">{frontmatter.hypothesis}</p>
          </div>
        )}

        {frontmatter.result && (
          <div className="p-4 rounded-xl bg-[#0e1018] border border-[#1e2336] text-xs sm:text-sm space-y-1">
            <div className="text-[11px] font-mono text-emerald-400 uppercase font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Result
            </div>
            <p className="text-slate-200 leading-relaxed">{frontmatter.result}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {frontmatter.whatWorked && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-1">
              <div className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> What Worked
              </div>
              <p className="text-slate-300">{frontmatter.whatWorked}</p>
            </div>
          )}

          {frontmatter.whatFailed && (
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-1">
              <div className="text-[11px] font-mono text-rose-400 font-semibold flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> What Failed
              </div>
              <p className="text-slate-300">{frontmatter.whatFailed}</p>
            </div>
          )}
        </div>

        {frontmatter.whatWasLearned && (
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs sm:text-sm text-amber-200 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono font-semibold text-amber-400 block mb-0.5">Spatial Insight:</span>
              {frontmatter.whatWasLearned}
            </div>
          </div>
        )}
      </div>

      {/* Markdown Body */}
      {content && (
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
          {content}
        </div>
      )}

      {/* Meta Footer */}
      <footer className="pt-6 border-t border-[#1c202e] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5 text-slate-500" />
          <span>Tools: {frontmatter.tools?.join(', ') || 'Unity'}</span>
        </div>
        <div className="flex gap-2">
          {frontmatter.skills?.map((sk) => (
            <span key={sk} className="px-2 py-0.5 rounded bg-[#131622] text-slate-400 border border-[#22273a]">
              {sk}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
