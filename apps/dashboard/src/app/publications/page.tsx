import React from 'react';
import fs from 'fs';
import path from 'path';
import { Send, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { JournalFrontmatterSchema, JournalFrontmatter, ExperimentFrontmatterSchema, ExperimentFrontmatter, ProjectFrontmatterSchema, ProjectFrontmatter } from '@xrlab/types';

function getPublications() {
  const root = process.cwd();
  const journalDir = path.join(root, '../../content/journal');
  const expDir = path.join(root, '../../content/experiments');
  const prjDir = path.join(root, '../../content/projects');

  const journals = readContentDirectory<JournalFrontmatter>(journalDir, JournalFrontmatterSchema);
  const experiments = readContentDirectory<ExperimentFrontmatter>(expDir, ExperimentFrontmatterSchema);
  const projects = readContentDirectory<ProjectFrontmatter>(prjDir, ProjectFrontmatterSchema);

  return [
    ...journals.map((j) => ({ ...j, category: 'Journal' })),
    ...experiments.map((e) => ({ ...e, category: 'Experiment' })),
    ...projects.map((p) => ({ ...p, category: 'Project' })),
  ];
}

export default function PublicationsPage() {
  const items = getPublications();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Send className="w-4 h-4" />
          <span>CONTENT STAGING & PUBLIC SYNC</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Publications & Staging
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          The publication pipeline bridging your private workspace and public portfolio. Only records marked as <code className="font-mono text-emerald-400">published</code> are rendered on the public website.
        </p>
      </div>

      {/* Publications Table */}
      <div className="rounded-2xl bg-[#0f111a] border border-[#1e2230] p-6 space-y-4 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1e2336] text-slate-500 font-mono">
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-right">Destination</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161a29]">
              {items.map((item) => (
                <tr key={item.slug} className="hover:bg-[#141726]/40 transition-colors">
                  <td className="py-3.5 font-medium text-slate-200">{item.frontmatter.title}</td>
                  <td className="py-3.5 font-mono text-slate-400">{item.category}</td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono ${
                        item.frontmatter.status === 'published'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                          : 'bg-amber-950/40 text-amber-300 border border-amber-800/30'
                      }`}
                    >
                      {item.frontmatter.status === 'published' && <CheckCircle2 className="w-3 h-3" />}
                      {item.frontmatter.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-500 font-mono">{item.frontmatter.date}</td>
                  <td className="py-3.5 text-right">
                    <span className="text-[11px] font-mono text-sky-400">
                      /{item.category.toLowerCase()}s/{item.slug}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
