import React from 'react';
import fs from 'fs';
import path from 'path';
import { Map, CheckCircle2, CircleDot, Circle } from 'lucide-react';
import { RoadmapStage } from '@xrlab/types';

function getRoadmapStages(): RoadmapStage[] {
  const filePath = path.join(process.cwd(), '../../data/roadmap/stages.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export default function RoadmapPage() {
  const stages = getRoadmapStages();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
          <Map className="w-4 h-4" />
          <span>CAPABILITY & STAGE PROGRESSION</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Spatial Design 16-Week Roadmap
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          A capability-driven progression model from Product Designer to Spatial Designer. Topics are marked mastered only when backed by tangible prototype or experiment evidence.
        </p>
      </div>

      {/* Stages List */}
      <div className="space-y-6">
        {stages.map((stage) => {
          const isCurrent = stage.status === 'in_progress';
          return (
            <div
              key={stage.id}
              className={`rounded-2xl border p-6 transition-all ${
                isCurrent
                  ? 'bg-[#101322] border-sky-500/30 shadow-lg'
                  : 'bg-[#0d0e17] border-[#1c202e]'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#1c202e]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-medium ${
                        isCurrent
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-[#161928] text-slate-400 border border-[#24283b]'
                      }`}
                    >
                      STAGE {stage.number}
                    </span>
                    <h2 className="text-lg font-semibold text-white">{stage.title}</h2>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl">{stage.tagline}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs font-mono text-slate-400">Stage Progress</div>
                    <div className="text-base font-bold font-mono text-sky-400">{stage.progress}%</div>
                  </div>
                  <div className="w-24 h-2 rounded-full bg-[#1c202e] overflow-hidden">
                    <div
                      className="h-full bg-sky-400 rounded-full"
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {stage.topics.map((topic) => {
                  const isMastered = topic.status === 'mastered';
                  const isUnderstood = topic.status === 'understood';
                  const isLearning = topic.status === 'learning';

                  return (
                    <div
                      key={topic.id}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-[#141724]/60 border border-[#1e2336] text-xs"
                    >
                      {isMastered && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                      {isUnderstood && <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />}
                      {isLearning && <CircleDot className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />}
                      {topic.status === 'not_started' && <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />}

                      <div className="space-y-1">
                        <div className="text-slate-200 font-medium leading-snug">{topic.name}</div>
                        <span className="inline-block text-[10px] font-mono text-slate-500 uppercase">
                          {topic.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
