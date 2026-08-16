import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[#1a1d29] bg-[#07080b] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-slate-500">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-slate-200">XR Lab</div>
          <p className="text-slate-500 max-w-sm">
            Documenting the journey from Product Designer to Spatial Designer — exploring what happens when interfaces leave the screen.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 font-mono text-[11px]">
          <Link href="/journey" className="hover:text-slate-300 transition-colors">Journey</Link>
          <Link href="/experiments" className="hover:text-slate-300 transition-colors">Experiments</Link>
          <Link href="/projects" className="hover:text-slate-300 transition-colors">Projects</Link>
          <Link href="/journal" className="hover:text-slate-300 transition-colors">Journal</Link>
          <Link href="/principles" className="hover:text-slate-300 transition-colors">Principles</Link>
          <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
          <a
            href="https://github.com/yemijeff/xr-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors text-sky-400"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
