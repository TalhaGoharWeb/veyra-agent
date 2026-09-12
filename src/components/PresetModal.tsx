import React from 'react';
import { PRESET_APPS, PresetApp } from '../core/templates';
import { X, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (preset: PresetApp) => void;
}

export const PresetModal: React.FC<PresetModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-3xl rounded-3xl bg-[#0e1222] border border-slate-800 shadow-2xl p-6 space-y-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">VEYRA Preset Blueprints</h3>
              <p className="text-xs text-slate-400">Pre-configured architectural archetypes for instant orchestration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {PRESET_APPS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                onSelect(preset);
                onClose();
              }}
              className="p-5 rounded-2xl bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {preset.category}
                </span>
                <span className="text-xs font-mono text-slate-500 uppercase">{preset.suggestedMode}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {preset.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{preset.tagline}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {preset.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] font-mono text-cyan-400/90 bg-cyan-950/30 px-2 py-0.5 rounded">
                      {h}
                    </span>
                  ))}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
