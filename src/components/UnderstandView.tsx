import React from 'react';
import { UserIntent } from '../core/types';
import { Compass, Users, AlertCircle, GitPullRequest, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface UnderstandViewProps {
  intent: UserIntent;
}

export const UnderstandView: React.FC<UnderstandViewProps> = ({ intent }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner: Category & Goal */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {intent.category}
            </span>
            <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              MODE: {intent.mode.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
            <CheckCircle2 className="w-3.5 h-3.5" /> Clarification Budget: {intent.clarificationBudgetStatus}
          </div>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">{intent.goal}</h2>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">{intent.coreProblem}</p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Target Users & Workflows */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-indigo-400">
            <Users className="w-4 h-4" /> TARGET AUDIENCE & PERSONAS
          </div>
          <div className="flex flex-wrap gap-2">
            {intent.targetUsers.map((user, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-200"
              >
                {user}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-2 text-sm font-bold font-mono text-indigo-400 mb-2">
              <GitPullRequest className="w-4 h-4" /> PRIMARY WORKFLOWS
            </div>
            <ul className="space-y-2">
              {intent.primaryWorkflows.map((flow, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="text-indigo-400 font-mono mt-0.5">{i + 1}.</span>
                  <span>{flow}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Data Entities & Business Rules */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold font-mono text-indigo-400">
            <Database className="w-4 h-4" /> DETECTED DOMAIN ENTITIES
          </div>
          <div className="flex flex-wrap gap-2">
            {intent.dataEntities.map((entity, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-xs text-indigo-300 font-mono"
              >
                {entity}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-2 text-sm font-bold font-mono text-indigo-400 mb-2">
              <ShieldAlert className="w-4 h-4" /> BUSINESS LOGIC CONSTRAINTS
            </div>
            <ul className="space-y-2">
              {intent.businessLogicRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-cyan-400 font-mono">▸</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Autonomous Inferred Defaults Table (Directive 38) */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
        <h3 className="text-sm font-bold font-mono text-slate-300 mb-3 flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" /> AUTONOMOUS INFERRED DEFAULTS (Zero Conversational Friction)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(intent.inferredDefaults).map(([key, val]) => (
            <div key={key} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-slate-500">{key}</span>
              <p className="text-xs font-medium text-slate-200 mt-0.5">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
