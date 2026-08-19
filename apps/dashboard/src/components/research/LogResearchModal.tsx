'use client';

import React, { useState } from 'react';
import { X, Microscope, CheckCircle2 } from 'lucide-react';

interface LogResearchModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function LogResearchModal({ onClose, onSuccess }: LogResearchModalProps) {
  const [title, setTitle] = useState('');
  const [stage, setStage] = useState('01-xr-foundations');
  const [question, setQuestion] = useState('');
  const [findings, setFindings] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !question.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          stage,
          question: question.trim(),
          findings: findings.trim() || undefined,
          conclusion: conclusion.trim() || undefined,
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
      console.error('Failed to log research:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f111a] border border-[#22273a] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Microscope className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-slate-100">Log Research Investigation</h2>
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
            <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Research Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ergonomics of Arm Fatigue in 6DoF Spatial Menus"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Stage</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="01-xr-foundations">01 — XR Foundations</option>
              <option value="02-spatial-ux">02 — Spatial UX</option>
              <option value="03-xr-interaction">03 — XR Interaction</option>
              <option value="04-3d-dev">04 — 3D + Development</option>
              <option value="05-real-xr-products">05 — Real XR Products</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-400 mb-1 uppercase">Core Investigation Question *</label>
            <textarea
              rows={2}
              required
              placeholder="What specific ergonomic, cognitive, or perceptual problem are you researching?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-emerald-400 mb-1 uppercase">Observed Findings & Data</label>
            <textarea
              rows={3}
              placeholder="What evidence, user trials, or literature findings were synthesized?"
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-amber-400 mb-1 uppercase">Actionable Design Conclusion</label>
            <textarea
              rows={2}
              placeholder="How does this finding change how you design spatial interfaces?"
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium text-xs shadow transition-all disabled:opacity-50"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>{isSubmitting ? 'Saving...' : 'Save Research'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
