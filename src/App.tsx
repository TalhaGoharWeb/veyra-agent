import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PipelineStepper, StageId } from './components/PipelineStepper';
import { PromptStation } from './components/PromptStation';
import { UnderstandView } from './components/UnderstandView';
import { ArchitectView } from './components/ArchitectView';
import { BuildView } from './components/BuildView';
import { VerifyView } from './components/VerifyView';
import { PresetModal } from './components/PresetModal';
import { VeyraOrchestrator } from './core/pipeline';
import { ProjectMode, UserIntent, ArchitectureBlueprint, BuildOutput, FinalDeliveryReport, OrchestrationState } from './core/types';
import { PresetApp } from './core/templates';
import { Terminal, Shield, Zap, Sparkles } from 'lucide-react';

const orchestrator = new VeyraOrchestrator();

export function App() {
  const [mode, setMode] = useState<ProjectMode>('production');
  const [activeTab, setActiveTab] = useState<StageId>('understand');
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const [state, setState] = useState<OrchestrationState>({
    currentStage: 'idle',
    stageProgress: 0,
    intent: null,
    blueprint: null,
    build: null,
    report: null,
    creditTracker: {
      tokensUsed: 0,
      toolCallsMade: 0,
      creditsEstimated: 0,
      efficiencyRatio: 1.0,
    },
    logs: [],
  });

  // Run initial synthesis on mount with default prompt to ensure the UI is immediately alive with rich data
  useEffect(() => {
    handleRunOrchestration(
      'Build an autonomous, credit-efficient AI SaaS platform that lets developers monitor microservice latencies, inspect database schemas, and trigger multi-vector verification audits with zero mock data.',
      'production'
    );
  }, []);

  const handleRunOrchestration = async (promptText: string, targetMode: ProjectMode) => {
    setIsRunning(true);
    setState((prev) => ({ ...prev, currentStage: 'understanding', stageProgress: 10 }));

    try {
      const result = await orchestrator.executePipeline(promptText, targetMode, (progressUpdate) => {
        setState((prev) => ({
          ...prev,
          ...progressUpdate,
          logs: progressUpdate.logs ? [...prev.logs, ...progressUpdate.logs] : prev.logs,
        }));
      });

      setState((prev) => ({
        ...prev,
        currentStage: 'completed',
        stageProgress: 100,
        intent: result.intent,
        blueprint: result.blueprint,
        build: result.build,
        report: result.report,
        creditTracker: {
          tokensUsed: result.creditMetrics.tokensUsed,
          toolCallsMade: result.creditMetrics.toolCallsMade,
          creditsEstimated: result.creditMetrics.estimatedCreditsConservedTokens,
          efficiencyRatio: result.creditMetrics.efficiencyRatio,
        },
      }));
    } catch (err: any) {
      console.error('Orchestration failed:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSelectPreset = (preset: PresetApp) => {
    setMode(preset.suggestedMode);
    handleRunOrchestration(preset.prompt, preset.suggestedMode);
  };

  return (
    <div className="min-h-screen bg-[#080b14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Top Header */}
      <Header
        mode={mode}
        onModeChange={(newMode) => setMode(newMode)}
        tokensUsed={state.creditTracker.tokensUsed}
        creditsSaved={state.creditTracker.creditsEstimated}
        efficiencyRatio={state.creditTracker.efficiencyRatio}
        onOpenTemplates={() => setIsPresetModalOpen(true)}
      />

      {/* Main Execution Prompt Box */}
      <PromptStation
        onRunOrchestrator={handleRunOrchestration}
        isRunning={isRunning}
        currentStage={state.currentStage}
        mode={mode}
      />

      {/* 4-Stage Stepper Navigation */}
      <PipelineStepper
        currentStage={state.currentStage}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        hasUnderstand={!!state.intent}
        hasArchitect={!!state.blueprint}
        hasBuild={!!state.build}
        hasVerify={!!state.report}
      />

      {/* Main Content Stage View */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'understand' && state.intent && (
          <UnderstandView intent={state.intent} />
        )}

        {activeTab === 'architect' && state.blueprint && (
          <ArchitectView blueprint={state.blueprint} />
        )}

        {activeTab === 'build' && state.build && (
          <BuildView build={state.build} />
        )}

        {activeTab === 'verify' && state.report && (
          <VerifyView report={state.report} />
        )}
      </main>

      {/* Live System Log Stream (Bottom Drawer) */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-900 pb-2">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> LIVE ORCHESTRATION EVENT STREAM
            </span>
            <span className="text-[11px] text-slate-500">Autonomous Execution Log</span>
          </div>
          <div className="max-h-32 overflow-y-auto space-y-1.5 font-mono text-xs pr-1">
            {state.logs.length === 0 ? (
              <div className="text-slate-600">Waiting for orchestrator trigger...</div>
            ) : (
              state.logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2.5 text-[11px]">
                  <span className="text-slate-600 shrink-0">{log.timestamp}</span>
                  <span className="text-indigo-400 font-bold shrink-0">[{log.engine}]</span>
                  <span
                    className={
                      log.level === 'success'
                        ? 'text-emerald-400'
                        : log.level === 'decision'
                        ? 'text-cyan-300'
                        : 'text-slate-300'
                    }
                  >
                    {log.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Preset Modal */}
      <PresetModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelect={handleSelectPreset}
      />
    </div>
  );
}

export default App;
