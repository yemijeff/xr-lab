import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import {
  Compass,
  ArrowUpRight,
  Clock,
  Award,
  Layers,
  BookOpen,
  FlaskConical,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { readContentDirectory } from '@xrlab/content';
import { JournalFrontmatterSchema, JournalFrontmatter, RoadmapStage, Skill, LearningRecord } from '@xrlab/types';

function getData() {
  const rootDir = process.cwd();
  
  // Roadmap stages
  const stagesPath = path.join(rootDir, '../../data/roadmap/stages.json');
  let stages: RoadmapStage[] = [];
  if (fs.existsSync(stagesPath)) {
    stages = JSON.parse(fs.readFileSync(stagesPath, 'utf8'));
  }

  // Skills
  const skillsPath = path.join(rootDir, '../../data/skills/skills.json');
  let skills: Skill[] = [];
  if (fs.existsSync(skillsPath)) {
    skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  }

  // Learning logs
  const logsPath = path.join(rootDir, '../../data/learning/records.json');
  let learningLogs: LearningRecord[] = [];
  if (fs.existsSync(logsPath)) {
    learningLogs = JSON.parse(fs.readFileSync(logsPath, 'utf8'));
  }

  // Journal entries
  const journalDir = path.join(rootDir, '../../content/journal');
  const journalEntries = readContentDirectory<JournalFrontmatter>(journalDir, JournalFrontmatterSchema);

  return { stages, skills, learningLogs, journalEntries };
}

export default function DashboardOverviewPage() {
  const { stages, skills, learningLogs, journalEntries } = getData();

  const totalLearningHours = Math.round(
    learningLogs.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0) / 60
  );

  const activeStage = stages.find((s) => s.status === 'in_progress') || stages[0];

  return (
    <div className="space-y-8">
      {/* 1. Command Center Hero / Active Stage Focus */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#101320] via-[#0d0f19] to-[#08090f] border border-[#202538] p-6 md:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                ACTIVE LAB FOCUS
              </span>
              <span className="text-xs text-slate-500 font-mono">STAGE {activeStage?.number || '01'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              {activeStage?.title || 'XR Foundations'}
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              {activeStage?.tagline || 'Understanding physical, perceptual, and spatial realities.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-sky-300">
                <Compass className="w-4 h-4 text-sky-400" />
                Current Question: &quot;Why does this need to be in 3D?&quot;
              </span>
            </div>
          </div>

          {/* Quick Stage Progress Gauge */}
          <div className="shrink-0 bg-[#141726]/80 border border-[#252b40] rounded-xl p-5 w-full md:w-64 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Stage Progress</span>
              <span className="font-mono text-sky-400 font-bold">{activeStage?.progress || 0}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#1e2336] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${activeStage?.progress || 0}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between font-mono">
              <span>{activeStage?.topics.filter((t) => t.status === 'mastered' || t.status === 'understood').length} Completed</span>
              <span>{activeStage?.topics.length} Topics</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0f111a] border border-[#1e2230] space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-mono uppercase">Logged Time</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">{totalLearningHours}h</div>
          <div className="text-[11px] text-slate-500">{learningLogs.length} learning sessions recorded</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0f111a] border border-[#1e2230] space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-mono uppercase">Active Skills</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">{skills.length}</div>
          <div className="text-[11px] text-slate-500">Tracked in capability matrix</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0f111a] border border-[#1e2230] space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-mono uppercase">Journal & Notes</span>
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">{journalEntries.length}</div>
          <div className="text-[11px] text-slate-500">Markdown posts in repository</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0f111a] border border-[#1e2230] space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-mono uppercase">Evidence Count</span>
            <FlaskConical className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">
            {stages.reduce((acc, s) => acc + (s.evidenceCount || 0), 0)}
          </div>
          <div className="text-[11px] text-slate-500">Prototypes & experiments built</div>
        </div>
      </div>

      {/* 3. 5-Stage Spatial Roadmap Progression */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-semibold text-slate-200 tracking-tight uppercase font-mono">
              Learning Stages Roadmap
            </h2>
          </div>
          <Link
            href="/roadmap"
            className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
          >
            Full Roadmap <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {stages.map((stage) => {
            const isCurrent = stage.status === 'in_progress';
            return (
              <div
                key={stage.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'bg-[#121524] border-sky-500/40 shadow-md ring-1 ring-sky-500/20'
                    : 'bg-[#0e1017] border-[#1c202d] text-slate-400'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className={isCurrent ? 'text-sky-400 font-bold' : 'text-slate-500'}>
                      STAGE {stage.number}
                    </span>
                    <span className="text-slate-500">{stage.progress}%</span>
                  </div>
                  <h3 className="text-xs font-semibold text-slate-200 line-clamp-1">{stage.title}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {stage.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1a1d29] flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{stage.topics.length} topics</span>
                  <span className="capitalize">{stage.status.replace('_', ' ')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Recent Daily Learning Sessions & Reflections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Latest Daily Learning Logs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h2 className="text-sm font-semibold text-slate-200 uppercase font-mono">
                Recent Learning Sessions
              </h2>
            </div>
            <Link
              href="/learning"
              className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              View All ({learningLogs.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {learningLogs.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#0f111a] border border-[#1e2230] text-center space-y-3">
                <Sparkles className="w-6 h-6 text-sky-400 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-slate-200">No learning sessions logged yet</h4>
                  <p className="text-[11px] text-slate-500">Your journey starts here. Record what you explore today!</p>
                </div>
                <div className="pt-1">
                  <Link
                    href="/learning"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-medium transition-colors"
                  >
                    + Log Day 1 Session
                  </Link>
                </div>
              </div>
            ) : (
              learningLogs.slice(0, 3).map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      {log.stageName}
                    </span>
                    <span className="text-slate-500 text-[11px] font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {log.date}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-100">{log.topic}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {log.notes}
                  </p>
                  {log.takeaway && (
                    <div className="p-2 rounded-lg bg-[#141724] border border-[#202538] text-[11px] text-sky-300 font-mono">
                      💡 <span className="text-slate-300 font-sans">{log.takeaway}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Published Journal Reflections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-slate-200 uppercase font-mono">
                Journal & Case Reflections
              </h2>
            </div>
            <Link
              href="/journal"
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View All ({journalEntries.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {journalEntries.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#0f111a] border border-[#1e2230] text-center space-y-3">
                <BookOpen className="w-6 h-6 text-emerald-400 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-slate-200">No reflections written yet</h4>
                  <p className="text-[11px] text-slate-500">Document your thoughts, discoveries, or failed assumptions.</p>
                </div>
                <div className="pt-1">
                  <Link
                    href="/journal"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141724] hover:bg-[#1c2134] text-slate-300 border border-[#24283b] text-xs font-medium transition-colors"
                  >
                    Write First Reflection
                  </Link>
                </div>
              </div>
            ) : (
              journalEntries.slice(0, 3).map((entry) => (
                <div
                  key={entry.slug}
                  className="p-4 rounded-xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/50 text-emerald-400 border border-emerald-800/40">
                      <CheckCircle2 className="w-3 h-3" /> {entry.frontmatter.status.toUpperCase()}
                    </span>
                    <span className="text-slate-500 text-[11px] font-mono">{entry.frontmatter.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-100">{entry.frontmatter.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {entry.frontmatter.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {entry.frontmatter.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#141724] text-slate-400 border border-[#22273a]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
