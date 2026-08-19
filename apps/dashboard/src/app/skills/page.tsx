'use client';

import React, { useState, useEffect } from 'react';
import { Award, Star, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { Skill } from '@xrlab/types';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      if (data.success) {
        setSkills(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleUpdateLevel = async (skillId: string, currentLevel: number, delta: number) => {
    const nextLevel = Math.max(1, Math.min(5, currentLevel + delta));
    setUpdatingId(skillId);

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillId, level: nextLevel, confidence: nextLevel }),
      });
      const data = await res.json();
      if (data.success) {
        setSkills(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Award className="w-4 h-4" />
          <span>CAPABILITY MATRIX & PROGRESSION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Skills Matrix
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Track your transition from 2D Product Design to Spatial Designer across 6 core competency areas. Level up as you produce evidence.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => {
          const isUpdating = updatingId === skill.id;

          return (
            <div
              key={skill.id}
              className="p-6 rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#2a3045] transition-all space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950/50 text-emerald-400 border border-emerald-800/40">
                  {skill.category.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Target: Level {skill.targetLevel}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{skill.description}</p>
              </div>

              {/* Level & Controls */}
              <div className="p-4 rounded-xl bg-[#141724] border border-[#1e2336] flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Current Proficiency</div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <Star
                        key={lvl}
                        className={`w-4 h-4 ${
                          lvl <= skill.level
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-mono font-bold text-slate-200 ml-1.5">
                      Lvl {skill.level}/5
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateLevel(skill.id, skill.level, -1)}
                    disabled={skill.level <= 1 || isUpdating}
                    className="p-1.5 rounded-lg bg-[#1b2030] hover:bg-[#252b40] text-slate-300 disabled:opacity-40 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleUpdateLevel(skill.id, skill.level, 1)}
                    disabled={skill.level >= 5 || isUpdating}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-medium disabled:opacity-40 transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Level Up</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-[#1a1d29]">
                <span>Last practiced: {skill.lastPracticed || 'Not started yet'}</span>
                <span>Confidence: {skill.confidence || skill.level}/5</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
