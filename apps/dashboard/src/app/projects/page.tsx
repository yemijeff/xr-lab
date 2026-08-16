import React from 'react';
import fs from 'fs';
import path from 'path';
import { FolderGit2, Calendar, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { ProjectFrontmatterSchema, ProjectFrontmatter } from '@xrlab/types';

function getProjects() {
  const dir = path.join(process.cwd(), '../../content/projects');
  return readContentDirectory<ProjectFrontmatter>(dir, ProjectFrontmatterSchema);
}

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
          <FolderGit2 className="w-4 h-4" />
          <span>PORTFOLIO PRODUCTS & CASE STUDIES</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Spatial Projects
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Full-scale spatial computing products and in-depth case studies answering the core design question: <em className="text-slate-300 font-serif">&quot;Why does this need to be in XR?&quot;</em>
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((prj) => (
          <div
            key={prj.slug}
            className="rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] p-6 space-y-4 flex flex-col justify-between transition-colors shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-950/50 text-indigo-300 border border-indigo-800/40">
                  {prj.frontmatter.status.toUpperCase()}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <Calendar className="w-3.5 h-3.5" /> {prj.frontmatter.date}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-white">{prj.frontmatter.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{prj.frontmatter.summary}</p>

              {prj.frontmatter.problem && (
                <div className="p-3 rounded-xl bg-[#141724] border border-[#1e2336] text-xs space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">The Spatial Problem</span>
                  <p className="text-slate-400 leading-relaxed">{prj.frontmatter.problem}</p>
                </div>
              )}

              {prj.frontmatter.concept && (
                <div className="p-3 rounded-xl bg-[#141724] border border-[#1e2336] text-xs space-y-1">
                  <span className="text-[10px] font-mono text-sky-400 uppercase font-semibold">Spatial Concept</span>
                  <p className="text-slate-400 leading-relaxed">{prj.frontmatter.concept}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#1a1d29] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {prj.frontmatter.tools?.map((tool) => (
                  <span key={tool} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161926] text-slate-400 border border-[#22273a]">
                    {tool}
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-mono text-indigo-400 flex items-center gap-1">
                View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
