'use client';

import React, { useState } from 'react';
import { Plus, Menu, PenTool, Sparkles } from 'lucide-react';
import { LogLearningModal } from '../learning/LogModal';
import { AIAssistantModal } from '../ai/AIAssistantModal';

interface HeaderProps {
  onOpenMobileNav?: () => void;
}

export function Header({ onOpenMobileNav }: HeaderProps) {
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-[#1e2230] bg-[#0c0d14]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Left: Mobile Hamburger & Stage Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            className="md:hidden p-2 rounded-lg bg-[#141724] border border-[#24283b] text-slate-300 hover:text-white transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-4 h-4 text-sky-400" />
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="text-xs font-mono font-medium text-slate-300">
              Stage 01: XR Foundations
            </span>
          </div>

          <span className="text-slate-600 hidden lg:inline">/</span>
          <span className="text-xs text-slate-400 hidden lg:inline truncate max-w-sm">
            Current Question: &quot;Why does this need to be in 3D?&quot;
          </span>
        </div>

        {/* Right: Quick Logging Actions */}
        <div className="flex items-center gap-2">
          {/* AI Assistant Button */}
          <button
            onClick={() => setIsAIOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 font-medium text-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">AI Co-Pilot</span>
          </button>

          <button
            onClick={() => setIsLogOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium text-xs shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Learning</span>
          </button>

          <a
            href="/journal"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141724] hover:bg-[#1c2134] text-slate-300 border border-[#24283b] font-medium text-xs transition-colors"
          >
            <PenTool className="w-3.5 h-3.5 text-slate-400" />
            <span>Write Reflection</span>
          </a>
        </div>
      </header>

      {/* Modals */}
      {isLogOpen && <LogLearningModal onClose={() => setIsLogOpen(false)} />}
      {isAIOpen && <AIAssistantModal onClose={() => setIsAIOpen(false)} />}
    </>
  );
}
