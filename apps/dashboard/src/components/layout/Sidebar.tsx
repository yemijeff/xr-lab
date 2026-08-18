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
  X,
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

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0c0d14]">
      {/* Brand / Logo */}
      <div className="p-4 sm:p-5 border-b border-[#1e2230] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono text-xs font-bold">
            XR
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-100 tracking-tight">XR LAB</div>
            <div className="text-[10px] text-slate-500 font-mono">WORKSPACE // OS</div>
          </div>
        </div>

        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a1d2c] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
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
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20 shadow-sm font-semibold'
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
          href="https://xr-lab-website.vercel.app"
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
          <span className="text-sky-400 font-medium">01 XR Foundations</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-[#1e2230] flex-col shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Slide-Over) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs h-full border-r border-[#1e2230] shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
