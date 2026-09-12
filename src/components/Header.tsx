import React from 'react';
import { ProjectMode } from '../core/types';
import { Cpu, ShieldCheck, Zap, Sparkles, Database, Layers } from 'lucide-react';

interface HeaderProps {
  mode: ProjectMode;
  onModeChange: (mode: ProjectMode) => void;
  tokensUsed: number;
  creditsSaved: number;
  efficiencyRatio: number;
  onOpenTemplates: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onModeChange,
  tokensUsed,
  creditsSaved,
  efficiencyRatio,
  onOpenTemplates,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080b14]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0d0f1e] rounded-[11px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent font-mono">
                VEYRA
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v1.0 ORCHESTRATOR
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider font-mono">
              UNDERSTAND • ARCHITECT • BUILD • VERIFY
            </p>
          </div>
        </div>

        {/* Center: Mode Selector */}
        <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium">
          {(['concept', 'prototype', 'mvp', 'production'] as ProjectMode[]).map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className={`px-3 py-1 rounded-lg capitalize transition-all duration-150 ${
                mode === m
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Right: Credit Economy & Action Widgets */}
        <div className="flex items-center gap-3">
          {/* Credit Economy Badge */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono">{tokensUsed} tokens</span>
            </div>
            <span className="w-px h-3.5 bg-slate-800" />
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono">+{creditsSaved} saved</span>
            </div>
            <span className="w-px h-3.5 bg-slate-800" />
            <div className="text-[11px] font-mono text-cyan-400 font-semibold">
              {efficiencyRatio}x ROI
            </div>
          </div>

          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Presets</span>
          </button>
        </div>
      </div>
    </header>
  );
};
