import React from 'react';
import { Compass, PenTool, Code2, CheckCircle, ArrowRight } from 'lucide-react';

export type StageId = 'understand' | 'architect' | 'build' | 'verify';

interface PipelineStepperProps {
  currentStage: string;
  activeTab: StageId;
  onSelectTab: (tab: StageId) => void;
  hasUnderstand: boolean;
  hasArchitect: boolean;
  hasBuild: boolean;
  hasVerify: boolean;
}

export const PipelineStepper: React.FC<PipelineStepperProps> = ({
  currentStage,
  activeTab,
  onSelectTab,
  hasUnderstand,
  hasArchitect,
  hasBuild,
  hasVerify,
}) => {
  const steps: { id: StageId; label: string; sub: string; icon: any; isReady: boolean }[] = [
    {
      id: 'understand',
      label: '1. UNDERSTAND',
      sub: 'Intent & Requirements',
      icon: Compass,
      isReady: hasUnderstand,
    },
    {
      id: 'architect',
      label: '2. ARCHITECT',
      sub: 'Decisions & Schemas',
      icon: PenTool,
      isReady: hasArchitect,
    },
    {
      id: 'build',
      label: '3. BUILD',
      sub: 'Real Code Synthesis',
      icon: Code2,
      isReady: hasBuild,
    },
    {
      id: 'verify',
      label: '4. VERIFY',
      sub: 'Multi-Vector QA Audit',
      icon: CheckCircle,
      isReady: hasVerify,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = activeTab === step.id;
          const isProcessing =
            currentStage === 'understanding' && step.id === 'understand' ||
            currentStage === 'architecting' && step.id === 'architect' ||
            currentStage === 'building' && step.id === 'build' ||
            currentStage === 'verifying' && step.id === 'verify';

          return (
            <button
              key={step.id}
              onClick={() => step.isReady && onSelectTab(step.id)}
              disabled={!step.isReady && !isProcessing}
              className={`relative flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-950/60 to-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                  : step.isReady
                  ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 cursor-pointer'
                  : 'bg-slate-950/40 border-slate-900/60 opacity-50 cursor-not-allowed'
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : isProcessing
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 animate-pulse'
                    : step.isReady
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-800/50 text-slate-500'
                }`}
              >
                <Icon className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-xs font-bold tracking-wide font-mono ${
                      isSelected ? 'text-white' : step.isReady ? 'text-slate-200' : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </span>
                  {step.isReady && !isProcessing && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                  {isProcessing && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{step.sub}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-700 pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
