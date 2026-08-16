import React from 'react';
import fs from 'fs';
import path from 'path';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { Skill } from '@xrlab/types';

function getSkills(): Skill[] {
  const filePath = path.join(process.cwd(), '../../data/skills/skills.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const LEVELS = [
  '1. Heard of it',
  '2. Understand basics',
  '3. Can use it',
  '4. Can solve problems',
  '5. Can teach it',
];

export default function SkillsPage() {
  const skills = getSkills();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Award className="w-4 h-4" />
          <span>CAPABILITY MATRIX & MASTERY</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Skills Matrix
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Measuring capability over mere tutorial completion. Capability is evaluated on a 5-level scale backed by prototype evidence.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] p-6 space-y-4 transition-colors shadow-lg"
          >
            <div className="flex items-center justify-between text-xs pb-3 border-b border-[#1a1d29]">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-950/50 text-emerald-300 border border-emerald-800/40">
                {skill.category.toUpperCase()}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <Calendar className="w-3 h-3" /> Last practiced: {skill.lastPracticed}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">{skill.name}</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{skill.description}</p>
            </div>

            {/* Level Bars */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  Current: <strong className="text-emerald-400">{LEVELS[skill.level - 1]}</strong>
                </span>
                <span className="text-slate-500">
                  Target: Level {skill.targetLevel}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 h-2">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <div
                    key={lvl}
                    className={`rounded-full ${
                      lvl <= skill.level
                        ? 'bg-emerald-400'
                        : lvl <= skill.targetLevel
                        ? 'bg-[#1e2438]'
                        : 'bg-[#12141e]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
