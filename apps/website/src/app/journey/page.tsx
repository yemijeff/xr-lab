import React from 'react';
import Link from 'next/link';
import { Compass, CheckCircle2, CircleDot, ArrowUpRight } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    month: 'AUG 2026',
    title: 'Stage 01: XR Foundations Initialized',
    description: 'Began deep dive into spatial perceptual mechanics: 3DoF vs 6DoF, translational motion parallax, resting vergence-accommodation distance, and ergonomic comfort cones.',
    evidence: 'Experiment #001 (6DoF Menu Retention)',
    evidenceLink: '/experiments/motion-parallax-6dof-menu-retention',
    status: 'completed',
  },
  {
    month: 'SEP 2026',
    title: 'Stage 02: Spatial UX & Navigation Paradigms',
    description: 'Transitioning UI systems from 2D pixel grids to 3D spatial volumes. Designing world-locked contextual menus, radial palettes, and multi-modal gaze-pinch feedback.',
    evidence: 'Spatial Portfolio Case Study',
    evidenceLink: '/projects/spatial-portfolio-financial-telemetry',
    status: 'in_progress',
  },
  {
    month: 'OCT 2026',
    title: 'Stage 03: Multimodal XR Interaction & Prototyping',
    description: 'Testing physical handles, direct physics poke/grab vs distant raycast selection in VR headsets.',
    evidence: 'Ergonomics of Gorilla Arm Research',
    evidenceLink: '/research',
    status: 'upcoming',
  },
  {
    month: 'NOV 2026',
    title: 'Stage 04: Blender 3D & Unity Scene Architecture',
    description: 'Building custom spatial UI primitives in Blender, integrating shaders and physics colliders via Unity XR Interaction Toolkit.',
    evidence: 'Unity Interactive Prototype Demo',
    status: 'upcoming',
  },
  {
    month: 'DEC 2026',
    title: 'Stage 05: Production Spatial Products',
    description: 'Launching comprehensive spatial case studies ready for spatial product design industry showcase.',
    evidence: 'Full Spatial Portfolio Release',
    status: 'upcoming',
  },
];

export default function JourneyPage() {
  return (
    <div className="space-y-12 max-w-4xl">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
          <Compass className="w-4 h-4" />
          <span>CHRONOLOGICAL TRANSFORMATION TIMELINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          The Spatial Journey
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          A living, milestone-driven chronicle tracking my professional evolution from 2D Product Designer to Spatial / XR Designer.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l border-[#1f2438] ml-4 md:ml-8 space-y-10 pl-6 md:pl-10">
        {TIMELINE_EVENTS.map((event, idx) => {
          const isCompleted = event.status === 'completed';
          const isInProgress = event.status === 'in_progress';

          return (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  isCompleted
                    ? 'bg-emerald-400 border-[#07080b]'
                    : isInProgress
                    ? 'bg-sky-400 border-[#07080b] animate-ping'
                    : 'bg-[#1e2336] border-[#07080b]'
                }`}
              />

              <div className="p-6 rounded-2xl bg-[#0d0f17] border border-[#1c202d] hover:border-[#2a3045] transition-colors space-y-3 shadow-lg">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sky-400 font-semibold">{event.month}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      isCompleted
                        ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/40'
                        : isInProgress
                        ? 'bg-sky-950/50 text-sky-300 border border-sky-800/40'
                        : 'bg-[#141724] text-slate-500 border border-[#22273a]'
                    }`}
                  >
                    {event.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{event.description}</p>

                {event.evidenceLink ? (
                  <div className="pt-2">
                    <Link
                      href={event.evidenceLink}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      <span>Evidence: {event.evidence}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="pt-2 text-xs font-mono text-slate-500">
                    Target Evidence: {event.evidence}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
