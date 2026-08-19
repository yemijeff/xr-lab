'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, Award, Target, FileText, Copy, CheckCircle2, Sparkles, Download } from 'lucide-react';

interface ReportData {
  totalHours: number;
  totalSessions: number;
  completedTopicsCount: number;
  activeStage: string;
  activeStageProgress: number;
  takeaways: string[];
  markdown: string;
}

export default function ProgressPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setReport(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCopyReport = () => {
    if (!report?.markdown) return;
    navigator.clipboard.writeText(report.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
          <BarChart3 className="w-4 h-4" />
          <span>SYNTHESIS REPORTS & VELOCITY ANALYTICS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Progress & Monthly Reports
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Comprehensive synthesis of all learning logs, skill level gains, and spatial takeaways. Generate and export structured monthly progress reports for your portfolio.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0f111a] border border-[#1e2230] space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono uppercase">
            <span>Total Logged</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{report?.totalHours || 0}h</div>
          <div className="text-[11px] text-slate-500">{report?.totalSessions || 0} study sessions</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f111a] border border-[#1e2230] space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono uppercase">
            <span>Topics Done</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{report?.completedTopicsCount || 0}</div>
          <div className="text-[11px] text-slate-500">Mastered or understood</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f111a] border border-[#1e2230] space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono uppercase">
            <span>Active Stage</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-white truncate">{report?.activeStage || 'XR Foundations'}</div>
          <div className="text-[11px] text-sky-400 font-mono">{report?.activeStageProgress || 0}% completed</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0f111a] border border-[#1e2230] space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono uppercase">
            <span>Takeaways</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{report?.takeaways.length || 0}</div>
          <div className="text-[11px] text-slate-500">Synthesized insights</div>
        </div>
      </div>

      {/* Synthesis Report Preview Card */}
      <div className="rounded-2xl bg-[#0f111a] border border-[#1e2230] overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#1e2230] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-semibold text-white">Auto-Generated Monthly Synthesis Report</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm ${
                copied
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'bg-[#141724] hover:bg-[#1e2234] text-slate-200 border border-[#24283b]'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Report Markdown</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-6">
          <pre className="p-5 rounded-xl bg-[#0a0c12] border border-[#181b28] text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {report?.markdown || 'Loading report...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
