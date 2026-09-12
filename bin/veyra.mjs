#!/usr/bin/env node

/**
 * VEYRA AGENT - COMMAND LINE ORCHESTRATOR LAUNCHER
 * Universal Vibe Coding Orchestrator
 */

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// If running directly without strip-types flag, re-spawn with --experimental-strip-types
if (!process.execArgv.includes('--experimental-strip-types')) {
  const currentFile = fileURLToPath(import.meta.url);
  const child = spawn(process.execPath, ['--experimental-strip-types', currentFile, ...process.argv.slice(2)], {
    stdio: 'inherit',
  });
  child.on('exit', (code) => process.exit(code || 0));
} else {
  // Now run the actual CLI orchestrator
  const { runCli } = await import('./veyra-core.mjs');
  await runCli();
}
