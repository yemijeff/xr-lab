'use client';

import React, { useState } from 'react';
import { X, FolderGit2, CheckCircle2 } from 'lucide-react';

interface LogProjectModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function LogProjectModal({ onClose, onSuccess }: LogProjectModalProps) {
  const [title, setTitle] = useState('');
  const [stage, setStage] = useState('02-spatial-ux');
  const [summary, setSummary] = useState('');
  const [problem, setProblem] = useState('');
  const [concept, setConcept] = useState('');
  const [tools, setTools] = useState('Figma, Blender, Unity');
  const [status, setStatus] = useState('in_progress');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          stage,
          summary: summary.trim(),
          problem: problem.trim() || undefined,
          concept: concept.trim() || undefined,
          tools: tools.split(',').map((t) => t.trim()).filter(Boolean),
          status,
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
      console.error('Failed to log project:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f111a] border border-[#22273a] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-slate-100">Log New Spatial Project / Case Study</h2>
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
            <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Spatial Portfolio & Financial Telemetry"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Executive Summary *</label>
            <textarea
              rows={2}
              required
              placeholder="Brief overview of the product concept and spatial interaction goals..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="01-xr-foundations">01 — XR Foundations</option>
                <option value="02-spatial-ux">02 — Spatial UX</option>
                <option value="03-xr-interaction">03 — XR Interaction</option>
                <option value="04-3d-dev">04 — 3D + Development</option>
                <option value="05-real-xr-products">05 — Real XR Products</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="concept">Concept</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-rose-400 mb-1 uppercase">The Spatial Problem</label>
            <textarea
              rows={2}
              placeholder="What limitation of 2D screens does this spatial design solve?"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-sky-400 mb-1 uppercase">Spatial Concept & Ergonomics</label>
            <textarea
              rows={2}
              placeholder="How are depth, hierarchy, and physical interaction orchestrated?"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Tools Used</label>
            <input
              type="text"
              placeholder="e.g. Figma, Blender, Unity, Bezel"
              value={tools}
              onChange={(e) => setTools(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-medium text-xs shadow transition-all disabled:opacity-50"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>{isSubmitting ? 'Saving...' : 'Save Project'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
