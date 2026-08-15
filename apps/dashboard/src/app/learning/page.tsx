'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Calendar, Clock, Sparkles, Filter } from 'lucide-react';
import { LearningRecord } from '@xrlab/types';
import { LogLearningModal } from '@/components/learning/LogModal';

export default function LearningLogsPage() {
  const [logs, setLogs] = useState<LearningRecord[]>([]);
  const [filterStage, setFilterStage] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/learning');
      const json = await res.json();
      if (json.success) {
        setLogs(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = filterStage === 'all'
    ? logs
    : logs.filter((log) => log.stageId === filterStage);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
            <BookOpen className="w-4 h-4" />
            <span>DAILY PROGRESS & EVIDENCE LOGS</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Learning Sessions
          </h1>
          <p className="text-slate-400 text-xs">
            Chronological log of spatial computing concepts, readings, and experiments.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium text-xs shadow-md transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log Learning Session</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-mono flex items-center gap-1 text-[11px] mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter Stage:
        </span>
        {['all', 'stage-01', 'stage-02', 'stage-03', 'stage-04', 'stage-05'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStage(st)}
            className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-colors whitespace-nowrap ${
              filterStage === st
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-medium'
                : 'bg-[#12141e] text-slate-400 border border-[#1e2230] hover:text-slate-200'
            }`}
          >
            {st === 'all' ? 'All Stages' : `Stage ${st.split('-')[1]}`}
          </button>
        ))}
      </div>

      {/* Logs Feed */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-slate-500">Loading logs...</div>
      ) : filteredLogs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0e1017] border border-[#1e2230] text-slate-500 space-y-3">
          <Sparkles className="w-6 h-6 mx-auto text-slate-600" />
          <p className="text-xs">No learning sessions found for this stage.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-5 rounded-2xl bg-[#0f111a] border border-[#1e2230] hover:border-[#252b40] transition-colors space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    {log.stageName}
                  </span>
                  <span className="text-xs text-slate-400 font-mono capitalize">
                    Difficulty: <span className="text-slate-300">{log.difficulty}</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Confidence: <span className="text-sky-400 font-semibold">{log.confidence}/5</span>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-500 text-[11px] font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {log.durationMinutes} mins
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {log.date}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">{log.topic}</h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{log.notes}</p>
              </div>

              {log.takeaway && (
                <div className="p-3 rounded-xl bg-[#141726] border border-[#202538] text-xs text-slate-200">
                  <span className="text-sky-400 font-mono font-medium">Core Takeaway: </span>
                  {log.takeaway}
                </div>
              )}

              {log.resources && log.resources.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-500">
                  <span>References:</span>
                  {log.resources.map((res, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#161926] text-slate-400 border border-[#22273a]">
                      {res}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <LogLearningModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchLogs}
        />
      )}
    </div>
  );
}
