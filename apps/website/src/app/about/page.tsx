import React from 'react';
import Link from 'next/link';
import { User, Sparkles, ArrowUpRight, Compass, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-12 max-w-3xl">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400">
          <User className="w-4 h-4" />
          <span>ABOUT THE DESIGNER & MISSION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
          About XR Lab
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          A personal research lab documenting the transition from Senior Product Designer into Spatial Computing & XR Interaction Design.
        </p>
      </div>

      {/* Narrative */}
      <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
        <p>
          For years, digital product design has been confined to flat, rectangular surfaces: glass smartphones, desktop browsers, and tablet screens. While 2D design patterns have matured, spatial computing re-opens fundamental questions of human-computer interaction:
        </p>

        <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
          <li>How does depth alter information density and cognitive load?</li>
          <li>What replaces the mouse cursor and the mobile touch event?</li>
          <li>When should an interface be anchored to physical architecture versus floating in the user&apos;s field of view?</li>
          <li>How do we design for continuous comfort and prevent physical fatigue?</li>
        </ul>

        <p>
          Instead of keeping these explorations hidden in private Figma files or local Unity projects, <strong>XR Lab</strong> serves as a public experimentation archive. Every hypothesis is tested, every failure is documented, and every design principle is earned through tangible prototype evidence.
        </p>
      </div>

      {/* Core Values Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="p-5 rounded-2xl bg-[#0d0f17] border border-[#1c202d] space-y-1.5">
          <div className="text-xs font-mono text-sky-400 uppercase font-semibold">01 // Learn</div>
          <div className="text-sm font-semibold text-white">Study First Principles</div>
          <p className="text-xs text-slate-400">Deep dives into spatial perception, ergonomics, and tracking mechanics.</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d0f17] border border-[#1c202d] space-y-1.5">
          <div className="text-xs font-mono text-purple-400 uppercase font-semibold">02 // Build</div>
          <div className="text-sm font-semibold text-white">Produce Evidence</div>
          <p className="text-xs text-slate-400">Never claim understanding without a working prototype or recorded test.</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d0f17] border border-[#1c202d] space-y-1.5">
          <div className="text-xs font-mono text-emerald-400 uppercase font-semibold">03 // Share</div>
          <div className="text-sm font-semibold text-white">Open Knowledge</div>
          <p className="text-xs text-slate-400">Publish authentic observations and reflections for the XR community.</p>
        </div>
      </div>
    </div>
  );
}
