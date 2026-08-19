'use client';

import React, { useState, useEffect } from 'react';
import { FolderGit2, Plus, Calendar, ArrowUpRight, Wrench } from 'lucide-react';
import { ProjectFrontmatter, ContentItem } from '@xrlab/types';
import { LogProjectModal } from '@/components/projects/LogProjectModal';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ContentItem<ProjectFrontmatter>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => {
        if (data?.success) setProjects(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
            <FolderGit2 className="w-4 h-4" />
            <span>PORTFOLIO & CASE STUDY SUITE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Spatial Projects & Case Studies
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Full-scale spatial product designs solving problems only spatial computing can address. Case studies focus on ergonomics, depth hierarchy, and multimodal interaction.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-medium text-xs shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full p-12 rounded-2xl bg-[#0f111a] border border-[#1e2230] text-center space-y-3">
            <FolderGit2 className="w-8 h-8 text-indigo-400 mx-auto opacity-75" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-200">No projects logged yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Ready to build your first spatial case study? Click &quot;New Project&quot; to define your concept, spatial problem, and toolchain.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-slate-950 text-xs font-medium transition-colors"
              >
                + Create First Project
              </button>
            </div>
          </div>
        ) : (
          projects.map((prj) => (
            <div
              key={prj.slug}
              className="p-6 rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] space-y-4 flex flex-col justify-between transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="px-2.5 py-0.5 rounded text-[10px] bg-indigo-950/50 text-indigo-300 border border-indigo-800/40">
                    {prj.frontmatter.status.toUpperCase()}
                  </span>
                  <span>{prj.frontmatter.date}</span>
                </div>

                <h3 className="text-lg font-semibold text-white">{prj.frontmatter.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {prj.frontmatter.summary}
                </p>

                {prj.frontmatter.problem && (
                  <div className="p-3 rounded-xl bg-[#141724] border border-[#1e2336] text-xs text-slate-300 space-y-1">
                    <span className="text-[10px] font-mono text-rose-400 uppercase font-semibold">The Spatial Problem</span>
                    <p className="line-clamp-2">{prj.frontmatter.problem}</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#1a1d29] flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Tools: {prj.frontmatter.tools?.join(', ') || 'Figma, Unity'}</span>
                <span className="text-indigo-400">Stage: {prj.frontmatter.stage}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <LogProjectModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => fetch('/api/projects').then(r => r.json()).then(d => d.success && setProjects(d.data))}
        />
      )}
    </div>
  );
}
