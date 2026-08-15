'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Map,
  BookOpen,
  FlaskConical,
  FolderGit2,
  BookMarked,
  Microscope,
  Library,
  Lightbulb,
  Award,
  Target,
  BarChart3,
  Send,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Overview', href: '/', icon: Compass },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'Learning Logs', href: '/learning', icon: BookOpen },
  { name: 'Journal', href: '/journal', icon: BookMarked },
  { name: 'Experiments', href: '/experiments', icon: FlaskConical },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'Research', href: '/research', icon: Microscope },
  { name: 'Knowledge', href: '/knowledge', icon: Library },
  { name: 'Principles', href: '/principles', icon: Lightbulb },
  { name: 'Skills Matrix', href: '/skills', icon: Award },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Progress & Radar', href: '/progress', icon: BarChart3 },
  { name: 'Publications', href: '/publications', icon: Send },
  { name: 'Settings', href: '/settings', icon: SlidersHorizontal },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-[#1e2230] bg-[#0c0d14] flex flex-col shrink-0 h-screen sticky top-0">
      {/* Brand / Logo */}
      <div className="p-5 border-b border-[#1e2230] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono text-xs font-bold">
            XR
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-100 tracking-tight">XR LAB</div>
            <div className="text-[10px] text-slate-500 font-mono">WORKSPACE // OS</div>
          </div>
        </div>
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
          V1.0
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        <div className="px-3 pb-2 text-[10px] font-mono tracking-wider text-slate-500 uppercase">
          Workspace Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#141724]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Public Site Link & Status */}
      <div className="p-3 border-t border-[#1e2230] bg-[#090a0f]/50 space-y-2">
        <a
          href="http://localhost:3001"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-md bg-[#131520] hover:bg-[#1a1e2d] border border-[#22273a] text-xs text-slate-300 transition-colors group"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Public Website
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
        </a>
        <div className="px-3 py-1 text-[10px] font-mono text-slate-500 flex justify-between">
          <span>Active Stage</span>
          <span className="text-sky-400">01 XR Foundations</span>
        </div>
      </div>
    </aside>
  );
}
