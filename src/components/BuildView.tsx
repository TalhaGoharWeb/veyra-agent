import React, { useState } from 'react';
import { BuildOutput } from '../core/types';
import { FileCode, Folder, Copy, Check, Download, ShieldCheck, Terminal } from 'lucide-react';

interface BuildViewProps {
  build: BuildOutput;
}

export const BuildView: React.FC<BuildViewProps> = ({ build }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = build.files[selectedFileIndex] || build.files[0];

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(build.files, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'veyra-generated-bundle.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Real Functionality Compliance Bar */}
      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>DIRECTIVE 24 ENFORCED: Real Data Flow • No Sleep Timers • Server Authorization Barrier</span>
        </div>
        <button
          onClick={handleDownloadAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-lg shadow-emerald-600/20"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Bundle ({build.files.length} Files)</span>
        </button>
      </div>

      {/* Code Editor & File Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: File Tree */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400 font-bold px-2 mb-2 flex items-center gap-2">
            <Folder className="w-3.5 h-3.5 text-indigo-400" /> Synthesized Files
          </div>
          <div className="space-y-1">
            {build.files.map((file, i) => (
              <button
                key={file.path}
                onClick={() => setSelectedFileIndex(i)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-colors ${
                  selectedFileIndex === i
                    ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span className="truncate">{file.path}</span>
                <span className="text-[10px] opacity-60 ml-2 uppercase">{file.language}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Code Viewer */}
        <div className="lg:col-span-3 rounded-2xl bg-[#0d111e] border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
          {/* Top file meta bar */}
          <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              <FileCode className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-white">{activeFile.path}</span>
              <span className="text-slate-500">• {activeFile.purpose}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Code content with line numbers */}
          <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[550px] selection:bg-indigo-600">
            <code>{activeFile.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
