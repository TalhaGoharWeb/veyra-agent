import React, { useState } from 'react';
import { ArchitectureBlueprint } from '../core/types';
import { Cpu, Navigation, Database, Network, Palette, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';

interface ArchitectViewProps {
  blueprint: ArchitectureBlueprint;
}

export const ArchitectView: React.FC<ArchitectViewProps> = ({ blueprint }) => {
  const [activeTab, setActiveTab] = useState<'tech' | 'ux' | 'data' | 'api' | 'tokens'>('tech');

  return (
    <div className="space-y-6">
      {/* Sub-navigation bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('tech')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
            activeTab === 'tech'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" /> Tech Decision Matrix
        </button>

        <button
          onClick={() => setActiveTab('ux')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
            activeTab === 'ux'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" /> UX Journey & Edge Cases
        </button>

        <button
          onClick={() => setActiveTab('data')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
            activeTab === 'data'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Database className="w-3.5 h-3.5" /> Relational Data Entities ({blueprint.dataEntities.length})
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
            activeTab === 'api'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Network className="w-3.5 h-3.5" /> API Contracts ({blueprint.apiEndpoints.length})
        </button>

        <button
          onClick={() => setActiveTab('tokens')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
            activeTab === 'tokens'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" /> Design System Tokens
        </button>
      </div>

      {/* Tab 1: Tech Decision Matrix */}
      {activeTab === 'tech' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-sm font-bold font-mono text-slate-200">
              DIRECTIVE 7 & 33: RATIONAL TECHNOLOGY SELECTION MATRIX
            </h3>
            <span className="text-xs font-mono text-cyan-400">Official-First • Zero Hype Tech</span>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 font-mono text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Selected Technology</th>
                <th className="px-5 py-3">Rationale</th>
                <th className="px-5 py-3">Alternative Rejected</th>
                <th className="px-5 py-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {blueprint.techStack.map((tech, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-indigo-400 font-semibold">{tech.category}</td>
                  <td className="px-5 py-3.5 font-medium text-white">{tech.selected}</td>
                  <td className="px-5 py-3.5 text-slate-400">{tech.rationale}</td>
                  <td className="px-5 py-3.5 text-slate-500 line-through text-[11px]">{tech.alternativeConsidered}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-emerald-400 font-semibold">{tech.justificationScore}/10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: UX Journey & Edge Cases */}
      {activeTab === 'ux' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400 font-mono">
            Directive 14: UX-First Engine — Ensuring completeness across happy path, loading, error, and empty states.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blueprint.uxJourney.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold">
                    Step {idx + 1}: {step.stage}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500">User Action</span>
                  <p className="text-xs font-medium text-white mt-0.5">{step.userAction}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500">System Response</span>
                  <p className="text-xs text-slate-300 mt-0.5">{step.systemResponse}</p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px]">
                  <div className="text-amber-400/90 font-mono">
                    <span className="text-slate-500">Loading:</span> {step.edgeCases.loading}
                  </div>
                  <div className="text-rose-400/90 font-mono">
                    <span className="text-slate-500">Error:</span> {step.edgeCases.error}
                  </div>
                  <div className="text-cyan-400/90 font-mono">
                    <span className="text-slate-500">Empty:</span> {step.edgeCases.empty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Data Entities */}
      {activeTab === 'data' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprint.dataEntities.map((entity, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <span className="font-mono text-sm font-bold text-white">{entity.name}</span>
                  <span className="text-xs font-mono text-slate-500">({entity.table})</span>
                </div>
                <span className="text-[11px] text-slate-400">{entity.fields.length} columns</span>
              </div>
              <p className="text-xs text-slate-400">{entity.description}</p>
              <div className="space-y-1.5 pt-1">
                {entity.fields.map((f, fi) => (
                  <div key={fi} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className={f.isPrimary ? 'text-amber-400 font-bold' : 'text-slate-200'}>
                        {f.name}
                      </span>
                      {f.isPrimary && <span className="text-[10px] px-1 bg-amber-500/20 text-amber-300 rounded">PK</span>}
                      {f.isUnique && <span className="text-[10px] px-1 bg-purple-500/20 text-purple-300 rounded">UQ</span>}
                      {f.references && <span className="text-[10px] px-1 bg-cyan-500/20 text-cyan-300 rounded">FK → {f.references}</span>}
                    </div>
                    <span className="text-slate-500">{f.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: API Endpoints */}
      {activeTab === 'api' && (
        <div className="space-y-4">
          {blueprint.apiEndpoints.map((ep, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      ep.method === 'GET'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : ep.method === 'POST'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="font-mono text-sm text-white font-medium">{ep.path}</span>
                  {ep.authRequired && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                      <ShieldCheck className="w-3 h-3" /> Auth Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{ep.summary}</p>
              </div>
              <div className="font-mono text-xs text-slate-400">
                Returns HTTP <span className="text-emerald-400 font-bold">{ep.responseStatus}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Design System Tokens */}
      {activeTab === 'tokens' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div>
            <h4 className="text-xs uppercase font-mono text-slate-400 mb-3">Color Tokens (Anti-Generic Palette)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {Object.entries(blueprint.designTokens.colors).map(([name, hex]) => (
                <div key={name} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="w-full h-8 rounded-lg" style={{ backgroundColor: hex }} />
                  <div className="text-[11px] font-mono text-slate-300 font-medium capitalize">{name}</div>
                  <div className="text-[10px] font-mono text-slate-500">{hex}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div>
              <h4 className="text-xs uppercase font-mono text-slate-400 mb-2">Typography Hierarchy</h4>
              <p className="text-xs font-mono text-slate-300">Heading: {blueprint.designTokens.typography.headingFont}</p>
              <p className="text-xs font-mono text-slate-300 mt-1">Mono: {blueprint.designTokens.typography.monoFont}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase font-mono text-slate-400 mb-2">Radius & Elevation Tokens</h4>
              <p className="text-xs font-mono text-slate-300">Radius: sm(4px), md(8px), lg(12px), full(9999px)</p>
              <p className="text-xs font-mono text-slate-300 mt-1">Shadows: sm, md, subtle brand glow</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
