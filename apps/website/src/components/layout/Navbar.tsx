'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, ExternalLink } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Journey', href: '/journey' },
  { name: 'Experiments', href: '/experiments' },
  { name: 'Projects', href: '/projects' },
  { name: 'Journal', href: '/journal' },
  { name: 'Research', href: '/research' },
  { name: 'Principles', href: '/principles' },
  { name: 'About', href: '/about' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#1a1d29] bg-[#07080b]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono text-xs font-bold group-hover:border-sky-400 transition-colors">
            XR
          </div>
          <div>
            <span className="text-sm font-semibold tracking-tight text-white group-hover:text-sky-300 transition-colors">
              XR Lab
            </span>
            <span className="hidden sm:inline text-[11px] text-slate-500 font-mono ml-2">
              // Spatial Research
            </span>
          </div>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-[#121522]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Dashboard Shortcut & Active Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Stage 01: XR Foundations
          </div>

          <a
            href="http://localhost:3000"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#141724] hover:bg-[#1c2134] text-slate-300 border border-[#24283b] text-xs font-medium transition-colors"
          >
            <span>Dashboard OS</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </header>
  );
}
