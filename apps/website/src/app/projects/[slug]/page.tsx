import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, FolderGit2, Wrench, Sparkles } from 'lucide-react';
import { readContentBySlug } from '@xrlab/content';
import { ProjectFrontmatterSchema, ProjectFrontmatter } from '@xrlab/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dir = path.join(process.cwd(), '../../content/projects');
  const project = readContentBySlug<ProjectFrontmatter>(dir, slug, ProjectFrontmatterSchema);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <article className="max-w-3xl mx-auto space-y-12">
      {/* Back link */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-[#1c202e]">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="px-2.5 py-0.5 rounded text-[10px] bg-indigo-950/50 text-indigo-300 border border-indigo-800/40">
            CASE STUDY
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {frontmatter.date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
          {frontmatter.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {frontmatter.summary}
        </p>
      </header>

      {/* Structured Problem & Concept */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {frontmatter.problem && (
          <div className="p-5 rounded-2xl bg-[#0d0f17] border border-[#1c202d] space-y-2 text-xs sm:text-sm">
            <span className="text-[11px] font-mono text-rose-400 uppercase font-semibold block">
              The Spatial Problem
            </span>
            <p className="text-slate-300 leading-relaxed">{frontmatter.problem}</p>
          </div>
        )}

        {frontmatter.concept && (
          <div className="p-5 rounded-2xl bg-[#0d0f17] border border-[#1c202d] space-y-2 text-xs sm:text-sm">
            <span className="text-[11px] font-mono text-sky-400 uppercase font-semibold block">
              Spatial Concept
            </span>
            <p className="text-slate-300 leading-relaxed">{frontmatter.concept}</p>
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
          <span>Tools: {frontmatter.tools?.join(', ') || 'Figma, Blender, Unity'}</span>
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
