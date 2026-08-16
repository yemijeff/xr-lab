import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FolderGit2, ArrowUpRight } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { ProjectFrontmatterSchema, ProjectFrontmatter } from '@xrlab/types';

function getProjects() {
  const dir = path.join(process.cwd(), '../../content/projects');
  return readContentDirectory<ProjectFrontmatter>(dir, ProjectFrontmatterSchema);
}

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
          <FolderGit2 className="w-4 h-4" />
          <span>SPATIAL COMPUTING CASE STUDIES</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Spatial Projects
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Comprehensive product design case studies exploring interaction ergonomics, 3D typography, spatial layout, and physics-driven manipulation.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((prj) => (
          <Link
            key={prj.slug}
            href={`/projects/${prj.slug}`}
            className="group rounded-2xl bg-[#0d0f17] border border-[#1c202d] hover:border-indigo-500/40 p-6 space-y-4 flex flex-col justify-between transition-all shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="px-2.5 py-0.5 rounded text-[10px] bg-indigo-950/50 text-indigo-300 border border-indigo-800/40">
                  {prj.frontmatter.status.toUpperCase()}
                </span>
                <span>{prj.frontmatter.date}</span>
              </div>

              <h2 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                {prj.frontmatter.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                {prj.frontmatter.summary}
              </p>

              {prj.frontmatter.problem && (
                <div className="p-3 rounded-xl bg-[#131622] border border-[#1e2336] text-xs text-slate-300 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Problem</span>
                  <p className="line-clamp-2">{prj.frontmatter.problem}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#181b26] flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Tools: {prj.frontmatter.tools?.join(', ') || 'Figma, Unity'}</span>
              <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
