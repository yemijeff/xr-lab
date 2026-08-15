'use client';

import React, { useState } from 'react';
import { X, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface LogLearningModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const STAGES = [
  { id: 'stage-01', name: '01 — XR Foundations' },
  { id: 'stage-02', name: '02 — Spatial UX' },
  { id: 'stage-03', name: '03 — XR Interaction & Prototyping' },
  { id: 'stage-04', name: '04 — 3D + Development' },
  { id: 'stage-05', name: '05 — Real XR Product Design' },
];

export function LogLearningModal({ onClose, onSuccess }: LogLearningModalProps) {
  const [stageId, setStageId] = useState('stage-01');
  const [topic, setTopic] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [confidence, setConfidence] = useState(3);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [notes, setNotes] = useState('');
  const [takeaway, setTakeaway] = useState('');
  const [resources, setResources] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !notes.trim()) return;

    setIsSubmitting(true);
    const selectedStage = STAGES.find((s) => s.id === stageId)?.name || 'XR Foundations';

    try {
      const res = await fetch('/api/learning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stageId,
          stageName: selectedStage,
          topic: topic.trim(),
          durationMinutes: Number(durationMinutes),
          confidence: Number(confidence),
          difficulty,
          notes: notes.trim(),
          takeaway: takeaway.trim() || undefined,
          resources: resources ? resources.split(',').map((r) => r.trim()).filter(Boolean) : [],
        }),
      });

      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => {
          onSuccess?.();
          onClose();
          window.location.reload();
        }, 800);
      }
    } catch (err) {
      console.error('Failed to save learning log:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f111a] border border-[#22273a] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-semibold text-slate-100">Log Daily Learning Session</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1a1d2c] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Stage & Topic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Learning Stage</label>
              <select
                value={stageId}
                onChange={(e) => setStageId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-sky-500"
              >
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Duration (mins)</label>
              <div className="relative">
                <input
                  type="number"
                  min="15"
                  step="15"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                />
                <Clock className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Topic or Concept Explored *</label>
            <input
              type="text"
              required
              placeholder="e.g., Gaze-pinch selection vs direct raycast pointing"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Difficulty & Confidence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Difficulty</label>
              <div className="flex gap-2">
                {(['easy', 'medium', 'hard'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`flex-1 py-1.5 rounded-lg text-xs capitalize transition-colors ${
                      difficulty === lvl
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-medium'
                        : 'bg-[#141724] text-slate-400 border border-[#24283b] hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                Confidence (1 to 5): <span className="text-sky-400 font-semibold">{confidence}/5</span>
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Exploration Notes *</label>
            <textarea
              required
              rows={3}
              placeholder="What did you learn? What experiments did you try? What challenged your flat-screen intuition?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Key Takeaway */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Core Spatial Insight / Takeaway</label>
            <input
              type="text"
              placeholder="e.g., Depth planes must adhere to resting focal length (1.5m - 2.0m)"
              value={takeaway}
              onChange={(e) => setTakeaway(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Resources */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Resources / References (comma separated)</label>
            <input
              type="text"
              placeholder="e.g., Apple HIG Spatial Guidelines, Unity Docs"
              value={resources}
              onChange={(e) => setResources(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-3 border-t border-[#1e2230]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#141724] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isSaved}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium text-xs shadow transition-all disabled:opacity-50"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-950" />
                  <span>Logged!</span>
                </>
              ) : (
                <span>{isSubmitting ? 'Saving...' : 'Save Learning Log'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
