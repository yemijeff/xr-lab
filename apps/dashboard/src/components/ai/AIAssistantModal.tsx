'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, BookOpen, Lightbulb, ArrowRight, CheckCircle2, Copy } from 'lucide-react';
import { LearningRecord } from '@xrlab/types';

interface AIAssistantModalProps {
  onClose: () => void;
}

export function AIAssistantModal({ onClose }: AIAssistantModalProps) {
  const [tab, setTab] = useState<'note_to_article' | 'suggest_topics'>('note_to_article');
  const [logs, setLogs] = useState<LearningRecord[]>([]);
  const [selectedLogId, setSelectedLogId] = useState<string>('');
  const [generatedArticle, setGeneratedArticle] = useState<{ title: string; summary: string; content: string; tags: string[] } | null>(null);
  const [suggestions, setSuggestions] = useState<Array<{ title: string; stage: string; rationale: string; prototypeIdea: string }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSavedToJournal, setIsSavedToJournal] = useState(false);

  useEffect(() => {
    fetch('/api/learning')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data.length > 0) {
          setLogs(d.data);
          setSelectedLogId(d.data[0].id);
        }
      });

    fetch('/api/ai/assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'suggest_next_topics' }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setSuggestions(d.data.recommendations || []);
      });
  }, []);

  const handleSynthesizeArticle = async () => {
    const selectedLog = logs.find((l) => l.id === selectedLogId);
    if (!selectedLog) return;

    setIsGenerating(true);
    setGeneratedArticle(null);

    try {
      const res = await fetch('/api/ai/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'note_to_article',
          topic: selectedLog.topic,
          notes: selectedLog.notes,
          takeaway: selectedLog.takeaway,
          stageName: selectedLog.stageName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedArticle(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraftToJournal = async () => {
    if (!generatedArticle) return;
    const selectedLog = logs.find((l) => l.id === selectedLogId);

    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: generatedArticle.title,
          summary: generatedArticle.summary,
          stage: selectedLog?.stageId || '01-xr-foundations',
          tags: generatedArticle.tags,
          content: generatedArticle.content,
          status: 'draft',
        }),
      });
      if (res.ok) {
        setIsSavedToJournal(true);
        setTimeout(() => {
          onClose();
          window.location.href = '/journal';
        }, 1000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f111a] border border-[#24283b] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-sm font-semibold text-white">Assistive AI Co-Pilot</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1a1d2c] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 flex gap-2 border-b border-[#181b28]">
          <button
            onClick={() => setTab('note_to_article')}
            className={`pb-3 px-1 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              tab === 'note_to_article'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Note-to-Article Drafter</span>
          </button>

          <button
            onClick={() => setTab('suggest_topics')}
            className={`pb-3 px-1 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              tab === 'suggest_topics'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Next Topic Suggester</span>
          </button>
        </div>

        {/* Tab 1: Note to Article Drafter */}
        {tab === 'note_to_article' && (
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {logs.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No learning logs recorded yet. Log a daily session first!
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Select a Learning Log to Transform:
                  </label>
                  <select
                    value={selectedLogId}
                    onChange={(e) => {
                      setSelectedLogId(e.target.value);
                      setGeneratedArticle(null);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    {logs.map((log) => (
                      <option key={log.id} value={log.id}>
                        {log.date} — {log.topic} ({log.stageName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSynthesizeArticle}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-semibold text-xs transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGenerating ? 'Synthesizing Article...' : 'Draft Spatial Article'}</span>
                  </button>
                </div>

                {/* Article Preview */}
                {generatedArticle && (
                  <div className="p-5 rounded-2xl bg-[#0a0c12] border border-[#1e2336] space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-[#181b28] pb-3">
                      <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold">
                        Generated Draft Article
                      </span>
                      <button
                        onClick={handleSaveDraftToJournal}
                        disabled={isSavedToJournal}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold shadow transition-all"
                      >
                        {isSavedToJournal ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Saved to Journal!</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Save as Journal Draft</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h3 className="text-base font-semibold text-white">{generatedArticle.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed italic">{generatedArticle.summary}</p>
                    <pre className="p-3.5 rounded-xl bg-[#10131e] border border-[#1a1f30] text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                      {generatedArticle.content}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Tab 2: Suggest Next Topics */}
        {tab === 'suggest_topics' && (
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <div className="text-xs text-slate-400 leading-relaxed">
              Based on your active stage and current topic completion, here are the most valuable spatial design areas and prototype concepts to tackle next:
            </div>

            <div className="space-y-3">
              {suggestions.map((sug, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#121420] border border-[#1e2336] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-indigo-400 font-semibold">{sug.stage}</span>
                    <span className="text-[10px] text-slate-500 uppercase">Recommended Target</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{sug.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{sug.rationale}</p>
                  <div className="p-2.5 rounded-lg bg-[#0d0f17] border border-[#1a1d2c] text-[11px] text-emerald-300 font-mono">
                    🧪 <span className="text-slate-300 font-sans font-medium">Prototype Idea: </span>
                    {sug.prototypeIdea}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
