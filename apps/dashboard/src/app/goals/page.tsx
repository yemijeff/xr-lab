'use client';

import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Circle, Calendar, Sparkles } from 'lucide-react';
import { Goal } from '@xrlab/types';

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchGoals = async () => {
    try {
      const res = await fetch('/api/goals');
      const data = await res.json();
      if (data.success) {
        setGoals(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleToggleGoal = async (goalId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'completed' ? 'not_started' : 'completed';
    const nextProgress = nextStatus === 'completed' ? 100 : 0;
    setUpdatingId(goalId);

    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalId, status: nextStatus, progress: nextProgress }),
      });
      const data = await res.json();
      if (data.success) {
        setGoals(data.data);
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
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
          <Target className="w-4 h-4" />
          <span>MILESTONES & TARGET OUTCOMES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Goals & Milestones
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Concrete, evidence-driven milestones. Click any goal checkbox to mark it completed as you build prototypes and publish case studies.
        </p>
      </div>

      {/* Goals Stream */}
      <div className="space-y-4 max-w-3xl">
        {goals.map((goal) => {
          const isCompleted = goal.status === 'completed';
          const isUpdating = updatingId === goal.id;

          return (
            <div
              key={goal.id}
              className={`p-6 rounded-2xl border transition-all flex items-start justify-between gap-4 shadow-lg ${
                isCompleted
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                  : 'bg-[#0f111a] border-[#1e2230] hover:border-[#2a3045]'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#141724] text-slate-400 border border-[#24283b] uppercase">
                    {goal.type}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Target: {goal.targetDate}
                  </span>
                </div>

                <h3 className={`text-base font-semibold ${isCompleted ? 'text-emerald-200 line-through opacity-80' : 'text-white'}`}>
                  {goal.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Outcome: </strong>{goal.measurableOutcome}
                </p>
              </div>

              <button
                onClick={() => handleToggleGoal(goal.id, goal.status)}
                disabled={isUpdating}
                className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                  isCompleted
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-[#141724] border-[#22273a] text-slate-400 hover:text-white hover:border-slate-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
