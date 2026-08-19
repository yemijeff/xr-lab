'use client';

import React, { useState, useEffect } from 'react';
import {
  Map,
  CheckCircle2,
  Circle,
  PlayCircle,
  Flame,
  ChevronDown,
} from 'lucide-react';
import { RoadmapStage } from '@xrlab/types';

export default function RoadmapPage() {
  const [stages, setStages] = useState<RoadmapStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingTopic, setUpdatingTopic] = useState<string | null>(null);

  const fetchStages = async () => {
    try {
      const res = await fetch('/api/roadmap');
      const data = await res.json();
      if (data.success) {
        setStages(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  const handleChangeStatus = async (stageId: string, topicId: string, newStatus: string) => {
    setUpdatingTopic(topicId);

    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stageId, topicId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setStages(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingTopic(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
          <Map className="w-4 h-4" />
          <span>CAPABILITY ROADMAP & TOPIC TRACKER</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          16-Week Spatial Roadmap
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Track your learning progression across each milestone. Use the dropdown on any topic to directly update your status. Stage completion updates automatically!
        </p>
      </div>

      {/* Stages Grid */}
      <div className="space-y-6">
        {stages.map((stage) => {
          const isCurrent = stage.status === 'in_progress';
          const isCompleted = stage.status === 'completed';

          return (
            <div
              key={stage.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isCurrent
                  ? 'bg-[#0f121e] border-sky-500/40 shadow-xl ring-1 ring-sky-500/20'
                  : isCompleted
                  ? 'bg-[#0d1017] border-emerald-800/40'
                  : 'bg-[#0c0d14] border-[#1c202d]'
              }`}
            >
              {/* Stage Header */}
              <div className="p-6 border-b border-[#181b26] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                        isCurrent
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : isCompleted
                          ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/40'
                          : 'bg-[#141724] text-slate-500 border border-[#22273a]'
                      }`}
                    >
                      STAGE {stage.number}
                    </span>
                    <span className="text-xs font-mono text-slate-500 uppercase">
                      {stage.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-white">{stage.title}</h2>
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed">{stage.tagline}</p>
                </div>

                {/* Progress Bar & Percentage */}
                <div className="sm:w-56 space-y-2 bg-[#121524] p-3 rounded-xl border border-[#1e2336] shrink-0">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-sky-400 font-bold">{stage.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1c2030] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-400'
                          : 'bg-gradient-to-r from-sky-500 to-indigo-500'
                      }`}
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                    <span>
                      {
                        stage.topics.filter(
                          (t) => t.status === 'mastered' || t.status === 'understood'
                        ).length
                      }{' '}
                      / {stage.topics.length} done
                    </span>
                  </div>
                </div>
              </div>

              {/* Topics List with Dropdown Status Selector */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stage.topics.map((topic) => {
                    const isMastered = topic.status === 'mastered';
                    const isUnderstood = topic.status === 'understood';
                    const isPracticing = topic.status === 'practicing';
                    const isLearning = topic.status === 'learning';
                    const isUpdating = updatingTopic === topic.id;

                    return (
                      <div
                        key={topic.id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                          isMastered
                            ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                            : isUnderstood
                            ? 'bg-sky-950/20 border-sky-900/40 text-sky-200'
                            : isPracticing
                            ? 'bg-purple-950/20 border-purple-900/40 text-purple-200'
                            : isLearning
                            ? 'bg-amber-950/20 border-amber-900/40 text-amber-200'
                            : 'bg-[#12141e] border-[#1f2434] text-slate-400'
                        }`}
                      >
                        {/* Topic Icon & Name */}
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          {isMastered ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : isUnderstood ? (
                            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                          ) : isPracticing ? (
                            <Flame className="w-4 h-4 text-purple-400 shrink-0" />
                          ) : isLearning ? (
                            <PlayCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span className="text-xs font-medium truncate">{topic.name}</span>
                        </div>

                        {/* Status Select Dropdown */}
                        <div className="relative shrink-0">
                          <select
                            value={topic.status}
                            disabled={isUpdating}
                            onChange={(e) => handleChangeStatus(stage.id, topic.id, e.target.value)}
                            className={`appearance-none text-[10px] font-mono uppercase px-2.5 py-1 pr-6 rounded-lg bg-[#0a0c12] border cursor-pointer focus:outline-none transition-colors ${
                              isMastered
                                ? 'text-emerald-400 border-emerald-800/60'
                                : isUnderstood
                                ? 'text-sky-400 border-sky-800/60'
                                : isPracticing
                                ? 'text-purple-300 border-purple-800/60'
                                : isLearning
                                ? 'text-amber-300 border-amber-800/60'
                                : 'text-slate-400 border-[#24283b] hover:border-slate-500'
                            }`}
                          >
                            <option value="not_started">Not Started</option>
                            <option value="learning">Learning</option>
                            <option value="practicing">Practicing</option>
                            <option value="understood">Understood</option>
                            <option value="mastered">Mastered</option>
                          </select>
                          <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
