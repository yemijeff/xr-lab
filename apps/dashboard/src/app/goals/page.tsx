import React from 'react';
import fs from 'fs';
import path from 'path';
import { Target, Calendar, CheckCircle2 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  type: string;
  status: string;
  targetDate: string;
  progress: number;
  measurableOutcome: string;
  relatedStage: string;
}

function getGoals(): Goal[] {
  const filePath = path.join(process.cwd(), '../../data/goals/goals.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export default function GoalsPage() {
  const goals = getGoals();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
          <Target className="w-4 h-4" />
          <span>OBJECTIVES & MEASURABLE OUTCOMES</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Journey Goals
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Structured milestones tracking the transition into Spatial Design. Every goal is anchored to a measurable output or prototype.
        </p>
      </div>

      {/* Goals Grid */}
      <div className="space-y-6">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] p-6 space-y-4 transition-colors shadow-lg"
          >
            <div className="flex items-center justify-between text-xs pb-3 border-b border-[#1a1d29]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-rose-950/50 text-rose-300 border border-rose-800/40 uppercase">
                  {goal.type.replace('_', ' ')}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  STAGE: {goal.relatedStage}
                </span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <Calendar className="w-3.5 h-3.5" /> Target: {goal.targetDate}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">{goal.title}</h2>
              <div className="mt-2 p-3.5 rounded-xl bg-[#141724] border border-[#1e2336] text-xs text-slate-300">
                <span className="font-mono text-rose-400 font-semibold">Measurable Outcome: </span>
                {goal.measurableOutcome}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Progress</span>
                <span className="text-rose-400 font-bold">{goal.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#1e2336] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
