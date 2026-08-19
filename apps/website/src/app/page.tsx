import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import {
  Compass,
  ArrowUpRight,
  FlaskConical,
  BookOpen,
  FolderGit2,
  Lightbulb,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import {
  JournalFrontmatterSchema,
  JournalFrontmatter,
  ExperimentFrontmatterSchema,
  ExperimentFrontmatter,
  ProjectFrontmatterSchema,
  ProjectFrontmatter,
  PrincipleFrontmatterSchema,
  PrincipleFrontmatter,
} from '@xrlab/types';

function getPublishedContent() {
  const root = process.cwd();
  const journalDir = path.join(root, '../../content/journal');
  const expDir = path.join(root, '../../content/experiments');
  const prjDir = path.join(root, '../../content/projects');
  const prinDir = path.join(root, '../../content/principles');

  const journals = readContentDirectory<JournalFrontmatter>(journalDir, JournalFrontmatterSchema, { onlyPublished: true });
  const experiments = readContentDirectory<ExperimentFrontmatter>(expDir, ExperimentFrontmatterSchema, { onlyPublished: true });
  const projects = readContentDirectory<ProjectFrontmatter>(prjDir, ProjectFrontmatterSchema, { onlyPublished: false });
  const principles = readContentDirectory<PrincipleFrontmatter>(prinDir, PrincipleFrontmatterSchema);

  return { journals, experiments, projects, principles };
}

export default function PublicHomePage() {
  const { journals, experiments, projects, principles } = getPublishedContent();

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Hero Section */}
      <section className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-950/40 text-sky-400 border border-sky-800/40">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>XR LAB // RESEARCH & EXPERIMENT ARCHIVE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
          Exploring what happens when <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300 font-normal">product design</span> leaves the screen.
        </h1>

        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          I am a Product Designer documenting my transition into Spatial Computing and XR Design. This platform is a living, public record of what I learn, what I prototype, what fails, and how spatial mental models evolve.
        </p>

        {/* Current Active Exploration State */}
        <div className="p-6 rounded-2xl bg-[#0f111a] border border-[#1e2230] space-y-4 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-3 border-b border-[#1a1d29]">
            <span className="text-sky-400 font-semibold uppercase">Current Lab Focus</span>
            <span>Stage 01: XR Foundations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500 font-mono block mb-1">Active Question:</span>
              <p className="text-slate-200 font-medium leading-relaxed">
                &quot;Why does this need to be in 3D? How does 6DoF translational motion parallax alter spatial menu retention?&quot;
              </p>
            </div>
            <div>
              <span className="text-slate-500 font-mono block mb-1">Active Investigation:</span>
              <p className="text-slate-200 font-medium leading-relaxed">
                World-anchored vs head-locked UI ergonomical boundaries in 6DoF headsets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Projects & Case Studies */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#1a1d29] pb-4">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-semibold tracking-tight text-white uppercase font-mono">
              Spatial Products & Case Studies
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            All Projects <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0d0f17] border border-[#1c202d] text-center space-y-2">
            <FolderGit2 className="w-6 h-6 text-indigo-400 mx-auto" />
            <h3 className="text-xs font-semibold text-slate-300">Spatial Case Studies in Progress</h3>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
              Comprehensive case studies will be published here as full XR product prototypes are completed.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 2).map((prj) => (
              <Link
                key={prj.slug}
                href={`/projects/${prj.slug}`}
                className="group p-6 rounded-2xl bg-[#0d0f17] border border-[#1c202d] hover:border-indigo-500/40 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="px-2.5 py-0.5 rounded text-[10px] bg-indigo-950/50 text-indigo-300 border border-indigo-800/40">
                      CASE STUDY
                    </span>
                    <span>{prj.frontmatter.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {prj.frontmatter.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {prj.frontmatter.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#181b26] flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Tools: {prj.frontmatter.tools?.join(', ') || 'Figma, Unity'}</span>
                  <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                    Read Case Study ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 3. Documented Experiments */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#1a1d29] pb-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-semibold tracking-tight text-white uppercase font-mono">
              Hypothesis & Prototype Experiments
            </h2>
          </div>
          <Link
            href="/experiments"
            className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
          >
            All Experiments <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {experiments.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#0d0f17] border border-[#1c202d] text-center space-y-2">
            <FlaskConical className="w-6 h-6 text-purple-400 mx-auto" />
            <h3 className="text-xs font-semibold text-slate-300">New Experiments in Laboratory</h3>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
              Documented tests on 6DoF, spatial depth planes, and comfort zones will publish here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiments.slice(0, 2).map((exp) => (
              <Link
                key={exp.slug}
                href={`/experiments/${exp.slug}`}
                className="group p-6 rounded-2xl bg-[#0d0f17] border border-[#1c202d] hover:border-purple-500/40 transition-all space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="px-2.5 py-0.5 rounded text-[10px] bg-purple-950/50 text-purple-300 border border-purple-800/40">
                    {exp.frontmatter.id.toUpperCase()}
                  </span>
                  <span>{exp.frontmatter.date}</span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {exp.frontmatter.title}
                  </h3>
                  {exp.frontmatter.question && (
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      <strong className="text-purple-400 font-mono">Q: </strong>
                      {exp.frontmatter.question}
                    </p>
                  )}
                </div>

                {exp.frontmatter.result && (
                  <div className="p-3 rounded-xl bg-[#131622] border border-[#1e2336] text-xs text-slate-300 line-clamp-2">
                    <span className="text-emerald-400 font-mono font-medium">Result: </span>
                    {exp.frontmatter.result}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 4. Latest Journal Reflections & Principles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Journal Reflections */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#1a1d29] pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold tracking-tight text-white uppercase font-mono">
                Recent Journal Reflections
              </h2>
            </div>
            <Link
              href="/journal"
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Journal <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {journals.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#0d0f17] border border-[#1c202d] text-center space-y-1.5">
                <BookOpen className="w-5 h-5 text-emerald-400 mx-auto" />
                <h4 className="text-xs font-semibold text-slate-300">Journal entries being written</h4>
                <p className="text-[11px] text-slate-500">First reflections will appear here once published.</p>
              </div>
            ) : (
              journals.slice(0, 3).map((jrn) => (
                <Link
                  key={jrn.slug}
                  href={`/journal/${jrn.slug}`}
                  className="block p-5 rounded-2xl bg-[#0d0f17] border border-[#1c202d] hover:border-emerald-500/30 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="text-emerald-400">{jrn.frontmatter.type?.toUpperCase()}</span>
                    <span>{jrn.frontmatter.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {jrn.frontmatter.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {jrn.frontmatter.summary}
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Right: Core Principles */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#1a1d29] pb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-semibold tracking-tight text-white uppercase font-mono">
                Evolving Spatial Principles
              </h2>
            </div>
            <Link
              href="/principles"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              Principles <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {principles.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#0d0f17] border border-[#1c202d] text-center space-y-1.5">
                <Lightbulb className="w-5 h-5 text-amber-400 mx-auto" />
                <h4 className="text-xs font-semibold text-slate-300">Spatial Principles Evolving</h4>
                <p className="text-[11px] text-slate-500">Principles will crystallize through prototype testing.</p>
              </div>
            ) : (
              principles.slice(0, 3).map((prin) => (
                <div
                  key={prin.slug}
                  className="p-5 rounded-2xl bg-[#0d0f17] border border-[#1c202d] space-y-2"
                >
                  <div className="text-[10px] font-mono text-amber-400 font-semibold uppercase">
                    {prin.frontmatter.id.toUpperCase()} // CONFIDENCE: {prin.frontmatter.confidence}/5
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100">
                    &quot;{prin.frontmatter.title}&quot;
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {prin.frontmatter.statement}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
