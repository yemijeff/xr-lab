'use client';

import React, { useState } from 'react';
import { X, FlaskConical, CheckCircle2 } from 'lucide-react';

interface LogExperimentModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function LogExperimentModal({ onClose, onSuccess }: LogExperimentModalProps) {
  const [title, setTitle] = useState('');
  const [stage, setStage] = useState('01-xr-foundations');
  const [question, setQuestion] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [tools, setTools] = useState('Unity, XR Interaction Toolkit');
  const [result, setResult] = useState('');
  const [whatWorked, setWhatWorked] = useState('');
  const [whatFailed, setWhatFailed] = useState('');
  const [whatWasLearned, setWhatWasLearned] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !question.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/experiments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          stage,
          question: question.trim(),
          hypothesis: hypothesis.trim() || undefined,
          tools: tools.split(',').map((t) => t.trim()).filter(Boolean),
          result: result.trim() || undefined,
          whatWorked: whatWorked.trim() || undefined,
          whatFailed: whatFailed.trim() || undefined,
          whatWasLearned: whatWasLearned.trim() || undefined,
          status: 'published',
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
      console.error('Failed to log experiment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f111a] border border-[#22273a] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-semibold text-slate-100">Log New Spatial Experiment</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1a1d2c] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Experiment Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ergonomics of Gaze-Pinch vs Physical Handles"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Research Question *</label>
            <input
              type="text"
              required
              placeholder="What spatial question or interaction are you testing?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Hypothesis</label>
            <textarea
              rows={2}
              placeholder="What did you predict would happen before testing?"
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="01-xr-foundations">01 — XR Foundations</option>
                <option value="02-spatial-ux">02 — Spatial UX</option>
                <option value="03-xr-interaction">03 — XR Interaction</option>
                <option value="04-3d-dev">04 — 3D + Development</option>
                <option value="05-real-xr-products">05 — Real XR Products</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Tools Used</label>
              <input
                type="text"
                placeholder="e.g. Unity, Blender, WebXR"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Result Observed</label>
            <textarea
              rows={2}
              placeholder="What actually happened in the headset during testing?"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-emerald-400 mb-1 uppercase">What Worked</label>
              <input
                type="text"
                placeholder="Key success factors"
                value={whatWorked}
                onChange={(e) => setWhatWorked(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-rose-400 mb-1 uppercase">What Failed</label>
              <input
                type="text"
                placeholder="Breakdowns or friction"
                value={whatFailed}
                onChange={(e) => setWhatFailed(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-amber-400 mb-1 uppercase">Core Spatial Insight</label>
            <input
              type="text"
              placeholder="What principle or insight did this experiment prove?"
              value={whatWasLearned}
              onChange={(e) => setWhatWasLearned(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-[#1e2230]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isSaved}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-medium text-xs shadow transition-all disabled:opacity-50"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>{isSubmitting ? 'Saving...' : 'Save & Publish Experiment'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
