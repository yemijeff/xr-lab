'use client';

import React, { useState } from 'react';
import { X, Share2, Copy, CheckCircle2, Send, Globe, FileText } from 'lucide-react';
import { LearningRecord } from '@xrlab/types';

interface ShareSnippetModalProps {
  record: LearningRecord;
  onClose: () => void;
}

export function ShareSnippetModal({ record, onClose }: ShareSnippetModalProps) {
  const [platform, setPlatform] = useState<'linkedin' | 'twitter' | 'markdown'>('linkedin');
  const [copied, setCopied] = useState(false);

  const formatLinkedInPost = () => {
    return `🚀 Documenting my transition from Product Designer into Spatial Computing & XR Design — Day update!

📖 Today's Topic: ${record.topic}
⏱️ Time Logged: ${record.durationMinutes} minutes
🎯 Active Focus: ${record.stageName}

💡 Key Spatial Takeaway:
${record.takeaway || record.notes.slice(0, 280)}

🔍 Why this matters in XR:
Spatial interfaces require thinking in volumes, resting vergence distances, and physical ergonomics rather than flat screen bounds.

Follow along with my living research lab & prototype archive:
🌐 https://xr-lab.vercel.app

#SpatialDesign #XR #VirtualReality #UXDesign #ProductDesign #AugmentedReality #InteractionDesign`;
  };

  const formatTwitterPost = () => {
    return `🥽 XR Design Journey Update:

Covered "${record.topic}" (${record.durationMinutes}m logged)

💡 Key takeaway:
"${record.takeaway || record.notes.slice(0, 140)}"

Documenting every prototype & failure openly in my spatial research lab:
👉 https://xr-lab.vercel.app

#XRDesign #SpatialComputing #UX`;
  };

  const formatMarkdownPost = () => {
    return `### 🥽 XR Lab Update: ${record.topic}

- **Date:** ${record.date}
- **Stage:** ${record.stageName}
- **Duration:** ${record.durationMinutes} mins
- **Confidence:** ${record.confidence}/5

**Notes:**
${record.notes}

**Key Takeaway:**
> ${record.takeaway || 'N/A'}`;
  };

  const getActiveText = () => {
    if (platform === 'linkedin') return formatLinkedInPost();
    if (platform === 'twitter') return formatTwitterPost();
    return formatMarkdownPost();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f111a] border border-[#22273a] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-semibold text-slate-100">Generate Social Share Snippet</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1a1d2c] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Format Tabs */}
          <div className="flex gap-2 p-1 rounded-xl bg-[#141724] border border-[#24283b]">
            <button
              onClick={() => setPlatform('linkedin')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                platform === 'linkedin'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </button>

            <button
              onClick={() => setPlatform('twitter')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                platform === 'twitter'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Twitter / X</span>
            </button>

            <button
              onClick={() => setPlatform('markdown')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                platform === 'markdown'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown</span>
            </button>
          </div>

          {/* Snippet Preview */}
          <div className="relative">
            <textarea
              readOnly
              rows={9}
              value={getActiveText()}
              className="w-full p-4 rounded-xl bg-[#0a0c12] border border-[#1e2336] text-xs font-mono text-slate-200 leading-relaxed resize-none focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] font-mono text-slate-500">
              Formatted for maximum reach and engagement
            </span>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold shadow transition-all active:scale-95 ${
                copied
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-sky-500 hover:bg-sky-400 text-slate-950'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
