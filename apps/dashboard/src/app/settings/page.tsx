import React from 'react';
import { SlidersHorizontal, User, Shield, Terminal, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <SlidersHorizontal className="w-4 h-4" />
          <span>WORKSPACE PREFERENCES & PROFILES</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Settings & Environment
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Configuration for your private XR Lab workspace, content pathways, and GitHub synchronization.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile */}
        <div className="rounded-2xl bg-[#0f111a] border border-[#1e2230] p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1a1d29]">
            <User className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-semibold text-white">Designer Profile</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono text-slate-400 mb-1">Creator Name</label>
              <div className="p-3 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 font-medium">
                Adeyemi Jeff
              </div>
            </div>
            <div>
              <label className="block font-mono text-slate-400 mb-1">Transition Focus</label>
              <div className="p-3 rounded-lg bg-[#141724] border border-[#24283b] text-slate-200 font-medium">
                Product Designer → Spatial / XR Designer
              </div>
            </div>
          </div>
        </div>

        {/* Git & Content Storage */}
        <div className="rounded-2xl bg-[#0f111a] border border-[#1e2230] p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1a1d29]">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">Git & Storage Engine</h2>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-[#1a1d29] text-slate-300">
              <span className="text-slate-400">Content Storage:</span>
              <span className="font-mono text-emerald-400">Git-Tracked Markdown (/content)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#1a1d29] text-slate-300">
              <span className="text-slate-400">Roadmap & Skills:</span>
              <span className="font-mono text-sky-400">Local JSON (/data)</span>
            </div>
            <div className="flex justify-between py-2 text-slate-300">
              <span className="text-slate-400">Remote Repository:</span>
              <span className="font-mono text-indigo-400">github.com/yemijeff/xr-lab</span>
            </div>
          </div>
        </div>

        {/* Public Website Status */}
        <div className="rounded-2xl bg-[#0f111a] border border-[#1e2230] p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1a1d29]">
            <Globe className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-white">Public Showcase Endpoint</h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The public website runs on port <code className="font-mono text-slate-200">3001</code> and only queries entries where <code className="font-mono text-emerald-400">status === &apos;published&apos;</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
