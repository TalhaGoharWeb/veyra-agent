import React, { useState } from 'react';
import { ProjectMode, RequestCategory } from '../core/types';
import { Play, Sparkles, Terminal, Shield, ArrowRight, CornerDownLeft } from 'lucide-react';
import { PRESET_APPS } from '../core/templates';

interface PromptStationProps {
  onRunOrchestrator: (prompt: string, mode: ProjectMode) => void;
  isRunning: boolean;
  currentStage: string;
  mode: ProjectMode;
}

export const PromptStation: React.FC<PromptStationProps> = ({
  onRunOrchestrator,
  isRunning,
  currentStage,
  mode,
}) => {
  const [prompt, setPrompt] = useState(
    'Build an autonomous, credit-efficient AI SaaS platform that lets developers monitor microservice latencies, inspect database schemas, and trigger multi-vector verification audits with zero mock data.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isRunning) return;
    onRunOrchestrator(prompt, mode);
  };

  const handleSelectPreset = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-cyan-500/20 border border-slate-800/80 shadow-2xl">
        <div className="bg-[#0b0e1b]/95 rounded-[22px] p-6 backdrop-blur-xl">
          {/* Quick preset badge pills */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Fast Starters:
            </span>
            {PRESET_APPS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.prompt)}
                className="px-3 py-1 text-xs rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to build (e.g. Full-stack E-Commerce, SaaS Billing Hub, Dev Observability Tool)..."
                rows={3}
                disabled={isRunning}
                className="w-full px-5 py-4 bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-2xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none font-sans leading-relaxed transition-all"
              />
              <div className="absolute bottom-3.5 right-4 flex items-center gap-3">
                <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500">
                  Directives 1-55 Enforced
                </span>
                <button
                  type="submit"
                  disabled={!prompt.trim() || isRunning}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-40 disabled:hover:from-indigo-600 text-white font-medium text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all transform active:scale-95"
                >
                  {isRunning ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="capitalize">{currentStage}...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Execute Orchestrator</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quality and Efficiency Directives banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-900 text-[11px] text-slate-500 font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> Real-Functionality Standard
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Credit Economy Optimized
                </span>
              </div>
              <div className="text-slate-500">
                Mode: <span className="text-indigo-400 uppercase font-semibold">{mode}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
