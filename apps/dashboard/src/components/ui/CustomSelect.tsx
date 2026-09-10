'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  color?: string; // optional accent colour class e.g. 'text-emerald-400'
}

interface CustomSelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  /** Compact pill style (used inside roadmap topic cards) */
  compact?: boolean;
  /** Full-width block style (used in modals / forms) */
  block?: boolean;
  className?: string;
}

export function CustomSelect({
  value,
  options,
  onChange,
  compact = false,
  block = false,
  className = '',
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [dropUp, setDropUp] = useState(false);

  const selected = options.find((o) => o.value === value) ?? options[0];

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // Determine whether to open up or down based on viewport space
  const handleToggle = useCallback(() => {
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 220);
    }
    setOpen((prev) => !prev);
  }, [open]);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  if (compact) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        {/* Compact trigger pill */}
        <button
          type="button"
          onClick={handleToggle}
          className={`flex items-center gap-1 text-[10px] font-mono uppercase px-2.5 py-1 rounded-lg border transition-colors focus:outline-none ${
            selected.color
              ? `${selected.color} border-current/30 bg-black/30 hover:bg-black/50`
              : 'text-slate-400 border-[#24283b] bg-[#0a0c12] hover:border-slate-500'
          }`}
        >
          <span>{selected.label}</span>
          <ChevronDown
            className={`w-2.5 h-2.5 opacity-70 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div
            ref={listRef}
            className={`absolute ${dropUp ? 'bottom-full mb-1' : 'top-full mt-1'} right-0 z-50 min-w-[160px] py-1 rounded-xl bg-[#13151f] border border-[#252a3a] shadow-2xl shadow-black/60 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-100`}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-left text-[11px] font-mono transition-colors ${
                  opt.value === value
                    ? 'bg-[#1e2234] text-white'
                    : 'text-slate-300 hover:bg-[#181c2c] hover:text-white'
                }`}
              >
                <span className={opt.color ?? ''}>{opt.label}</span>
                {opt.value === value && (
                  <Check className="w-3 h-3 text-sky-400 shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Block / full-width style (for modals and forms)
  return (
    <div ref={containerRef} className={`relative ${block ? 'w-full' : ''} ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        className={`${block ? 'w-full' : ''} flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-[#141724] border border-[#24283b] text-slate-200 text-xs focus:outline-none focus:border-sky-500/60 hover:border-[#303650] transition-colors`}
      >
        <span className={selected.color ?? ''}>{selected.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          ref={listRef}
          className={`absolute ${dropUp ? 'bottom-full mb-1' : 'top-full mt-1'} left-0 right-0 z-50 py-1 rounded-xl bg-[#13151f] border border-[#252a3a] shadow-2xl shadow-black/60 backdrop-blur-sm max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100`}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left text-xs transition-colors ${
                opt.value === value
                  ? 'bg-[#1e2234] text-white'
                  : 'text-slate-300 hover:bg-[#181c2c] hover:text-white'
              }`}
            >
              <span className={opt.color ?? ''}>{opt.label}</span>
              {opt.value === value && (
                <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
