import React from 'react';
import fs from 'fs';
import path from 'path';
import { BarChart3, Radar, Activity, CheckCircle2 } from 'lucide-react';
import { RoadmapStage, Skill, LearningRecord } from '@xrlab/types';

function getData() {
  const root = process.cwd();
  const stagesPath = path.join(root, '../../data/roadmap/stages.json');
  const skillsPath = path.join(root, '../../data/skills/skills.json');
  const logsPath = path.join(root, '../../data/learning/records.json');

  const stages: RoadmapStage[] = fs.existsSync(stagesPath) ? JSON.parse(fs.readFileSync(stagesPath, 'utf8')) : [];
  const skills: Skill[] = fs.existsSync(skillsPath) ? JSON.parse(fs.readFileSync(skillsPath, 'utf8')) : [];
  const logs: LearningRecord[] = fs.existsSync(logsPath) ? JSON.parse(fs.readFileSync(logsPath, 'utf8')) : [];

  return { stages, skills, logs };
}

const RADAR_AREAS = [
  { name: 'Spatial UX', importance: '5/5', currentLevel: 'Competent', priority: 'Now' },
  { name: 'XR Interaction', importance: '5/5', currentLevel: 'Practicing', priority: 'Now' },
  { name: 'XR Ergonomics', importance: '5/5', currentLevel: 'Competent', priority: 'Now' },
  { name: '3D & Blender', importance: '4/5', currentLevel: 'Beginner', priority: 'Soon' },
  { name: 'Unity & XRI', importance: '4/5', currentLevel: 'Beginner', priority: 'Soon' },
  { name: 'C# Scripting', importance: '2/5', currentLevel: 'Beginner', priority: 'Later' },
];

export default function ProgressRadarPage() {
  const { stages, skills, logs } = getData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
          <BarChart3 className="w-4 h-4" />
          <span>EVIDENCE-BASED PROGRESS & RADAR</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Progress & XR Radar
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Tracking capabilities grounded in real evidence. Avoids vanity metrics by anchoring progression to completed prototypes and documented reflections.
        </p>
      </div>

      {/* XR Radar Priority Table */}
      <div className="rounded-2xl bg-[#0f111a] border border-[#1e2230] p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 pb-3 border-b border-[#1a1d29]">
          <Radar className="w-4 h-4 text-sky-400" />
          <h2 className="text-sm font-semibold text-white font-mono uppercase">XR Capability Radar</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1e2336] text-slate-500 font-mono">
                <th className="pb-3 font-medium">Domain Area</th>
                <th className="pb-3 font-medium">Strategic Value</th>
                <th className="pb-3 font-medium">Current Status</th>
                <th className="pb-3 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161a29]">
              {RADAR_AREAS.map((row) => (
                <tr key={row.name} className="hover:bg-[#141726]/40 transition-colors">
                  <td className="py-3.5 font-medium text-slate-200">{row.name}</td>
                  <td className="py-3.5 font-mono text-sky-400">{row.importance}</td>
                  <td className="py-3.5 text-slate-300 font-mono">{row.currentLevel}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        row.priority === 'Now'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : row.priority === 'Soon'
                          ? 'bg-amber-950/40 text-amber-300 border border-amber-800/30'
                          : 'bg-[#141724] text-slate-500 border border-[#22273a]'
                      }`}
                    >
                      {row.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stage Progression Evidence Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="p-6 rounded-2xl bg-[#0f111a] border border-[#1e2230] space-y-3 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-semibold uppercase">Stage {stage.number}: {stage.title}</span>
              <span className="text-sky-400 font-bold">{stage.progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#1e2336] overflow-hidden">
              <div
                className="h-full bg-sky-400 rounded-full"
                style={{ width: `${stage.progress}%` }}
              />
            </div>
            <div className="pt-2 text-[11px] font-mono text-slate-500 flex justify-between">
              <span>Topics: {stage.topics.filter((t) => t.status === 'mastered').length}/{stage.topics.length} Mastered</span>
              <span>Evidence Items: {stage.evidenceCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
