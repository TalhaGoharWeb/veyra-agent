/**
 * VEYRA AGENT - CLI CORE IMPLEMENTATION
 */

import { VeyraOrchestrator } from '../src/core/pipeline.ts';
import { PRESET_APPS } from '../src/core/templates.ts';

export async function runCli() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  const orchestrator = new VeyraOrchestrator();

  console.log('\n\x1b[1m\x1b[38;5;99m=====================================================\x1b[0m');
  console.log('\x1b[1m\x1b[38;5;99m  VEYRA AGENT • Universal Vibe Coding Orchestrator  \x1b[0m');
  console.log('\x1b[90m  UNDERSTAND • ARCHITECT • BUILD • VERIFY • PRODUCTION-READY\x1b[0m');
  console.log('\x1b[1m\x1b[38;5;99m=====================================================\x1b[0m\n');

  if (command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  if (command === 'presets') {
    console.log('\x1b[1m\x1b[36mAVAILABLE ARCHITECTURAL PRESETS:\x1b[0m\n');
    PRESET_APPS.forEach((p, idx) => {
      console.log(`\x1b[33m[${idx + 1}] ${p.name}\x1b[0m (\x1b[35m${p.category}\x1b[0m) [Mode: ${p.suggestedMode}]`);
      console.log(`    Tagline: ${p.tagline}`);
      console.log(`    Prompt:  "${p.prompt}"\n`);
    });
    return;
  }

  if (command === 'advise' || command === 'brain') {
    const taskText = args.slice(1).join(' ');
    if (!taskText) {
      console.error('\x1b[31mError: Please provide a task description for Veyra Brain advice.\x1b[0m');
      return;
    }
    const result = await orchestrator.executePipeline(taskText, 'production');
    console.log('\x1b[1m\x1b[38;5;99m[VEYRA BRAIN ADVISORY FOR ANTIGRAVITY]\x1b[0m\n');
    console.log('\x1b[1m\x1b[34m1. WHAT TO DO:\x1b[0m');
    console.log(`   • Goal: ${result.intent.goal}`);
    console.log(`   • Category: ${result.intent.category}`);
    console.log(`   • Workflows to build:`);
    result.intent.primaryWorkflows.forEach(w => console.log(`     - ${w}`));
    console.log(`   • Inferred Defaults: ${JSON.stringify(result.intent.inferredDefaults)}`);

    console.log('\n\x1b[1m\x1b[35m2. WHY TO DO IT:\x1b[0m');
    console.log(`   • Core Problem: ${result.intent.coreProblem}`);
    console.log(`   • Business Value: Server-authoritative data integrity, zero fake mock latency.`);

    console.log('\n\x1b[1m\x1b[36m3. WHICH RESOURCES TO USE:\x1b[0m');
    result.blueprint.techStack.forEach(t => console.log(`   • ${t.category}: ${t.selected} (Reason: ${t.rationale})`));

    console.log('\n\x1b[1m\x1b[32m4. WHEN TO STOP:\x1b[0m');
    result.report.qaResults.forEach(r => console.log(`   [ ] ${r.category}: ${r.name}`));
    console.log(`   • Stop as soon as above checks are satisfied and build passes with 0 regressions.\n`);
    return;
  }

  if (command === 'install' || command === 'attach' || command === 'activate') {
    const targetDir = args[1];
    if (!targetDir) {
      console.error('\x1b[31mError: Please provide target project path.\x1b[0m\nUsage: node bin/veyra.mjs install <path-to-project>');
      return;
    }

    const fs = await import('node:fs');
    const path = await import('node:path');
    const resolvedTarget = path.resolve(process.cwd(), targetDir);

    if (!fs.existsSync(resolvedTarget)) {
      console.error(`\x1b[31mTarget directory does not exist: ${resolvedTarget}\x1b[0m`);
      return;
    }

    const sourceRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
    
    // 1. Copy AGENTS.md
    fs.copyFileSync(path.join(sourceRoot, 'AGENTS.md'), path.join(resolvedTarget, 'AGENTS.md'));
    
    // 2. Copy GEMINI.md
    fs.copyFileSync(path.join(sourceRoot, 'GEMINI.md'), path.join(resolvedTarget, 'GEMINI.md'));

    // 3. Create .agents directories and copy rules/skills
    const targetAgentsRules = path.join(resolvedTarget, '.agents', 'rules');
    const targetAgentsSkills = path.join(resolvedTarget, '.agents', 'skills', 'veyra');
    fs.mkdirSync(targetAgentsRules, { recursive: true });
    fs.mkdirSync(targetAgentsSkills, { recursive: true });

    fs.copyFileSync(
      path.join(sourceRoot, '.agents', 'rules', 'veyra-agent.md'),
      path.join(targetAgentsRules, 'veyra-agent.md')
    );
    fs.copyFileSync(
      path.join(sourceRoot, '.agents', 'skills', 'veyra', 'SKILL.md'),
      path.join(targetAgentsSkills, 'SKILL.md')
    );

    console.log(`\x1b[1m\x1b[32m✔ VEYRA AGENT ACTIVATED SUCCESSFULLY!\x1b[0m`);
    console.log(`Target: \x1b[36m${resolvedTarget}\x1b[0m\n`);
    console.log(`Installed Files:`);
    console.log(`  • ${path.join(resolvedTarget, 'AGENTS.md')}`);
    console.log(`  • ${path.join(resolvedTarget, 'GEMINI.md')}`);
    console.log(`  • ${path.join(targetAgentsRules, 'veyra-agent.md')}`);
    console.log(`  • ${path.join(targetAgentsSkills, 'SKILL.md')}`);
    console.log(`\nAntigravity will now automatically use Veyra as its brain in that project!`);
    return;
  }

  const promptText = args.slice(1).filter((a) => !a.startsWith('--')).join(' ');
  const modeArg = args.find((a) => a.startsWith('--mode='))?.split('=')[1] || 'production';

  if (!promptText) {
    console.error('\x1b[31mError: Missing prompt text.\x1b[0m\n');
    console.log('Example: node bin/veyra.mjs run "Build an invoice tracking portal with customer balance alerts"');
    return;
  }

  console.log(`\x1b[36m▶ Initializing Veyra Orchestration Engine...\x1b[0m`);
  console.log(`  \x1b[90mMode:\x1b[0m \x1b[1m${modeArg.toUpperCase()}\x1b[0m`);
  console.log(`  \x1b[90mInput Prompt:\x1b[0m "${promptText}"\n`);

  try {
    const result = await orchestrator.executePipeline(promptText, modeArg, (progress) => {
      if (progress.logs && progress.logs.length > 0) {
        const latest = progress.logs[progress.logs.length - 1];
        console.log(`  \x1b[34m[${latest.engine}]\x1b[0m ${latest.message}`);
      }
    });

    console.log('\n\x1b[1m\x1b[32m✔ ORCHESTRATION PIPELINE COMPLETE\x1b[0m');
    console.log(`-----------------------------------------------------`);
    console.log(`  \x1b[1mWhat Was Built:\x1b[0m ${result.blueprint.productName}`);
    console.log(`  \x1b[1mAudit Score:\x1b[0m    \x1b[32m${result.report.overallHealthScore}%\x1b[0m`);
    console.log(`  \x1b[1mData Entities:\x1b[0m  ${result.blueprint.dataEntities.length}`);
    console.log(`  \x1b[1mAPI Endpoints:\x1b[0m  ${result.blueprint.apiEndpoints.length}`);
    console.log(`  \x1b[1mSynthesized:\x1b[0m    ${result.build.files.length} production files`);
    console.log(`  \x1b[1mTokens Saved:\x1b[0m   ~${result.creditMetrics.estimatedCreditsConservedTokens}`);
    console.log(`  \x1b[1mStop Condition:\x1b[0m All quality & security checks satisfied.\n`);

    console.log('\x1b[1m\x1b[36mGenerated File Manifest:\x1b[0m');
    result.build.files.forEach((f) => {
      console.log(`  • \x1b[33m${f.path}\x1b[0m (${f.language}) — ${f.purpose}`);
    });
    console.log('\n');
  } catch (err) {
    console.error('\x1b[31mOrchestration execution failed:\x1b[0m', err);
  }
}

function printHelp() {
  console.log(`
Usage:
  node bin/veyra.mjs <command> [options]

Commands:
  run <prompt>       Execute complete Understand → Architect → Build → Verify lifecycle
  advise <task>      Get structured 4-pillar brain advisory (What, Why, Which, When to stop)
  install <path>     Activate Veyra in any other project directory with one command
  presets            List built-in software archetype presets
  help               Display this help text

Options:
  --mode=<mode>      Target quality level: concept | prototype | mvp | production (default: production)

Examples:
  node bin/veyra.mjs advise "Add Stripe subscription billing"
  node bin/veyra.mjs install "D:/code/my-saas-app"
  node bin/veyra.mjs run "Build a real-time task manager" --mode=production
  node bin/veyra.mjs presets
`);
}
