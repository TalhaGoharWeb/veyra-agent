#!/usr/bin/env node

/**
 * VEYRA AGENT - THE ORIGINAL ONE-MAN ARMY FOR VIBE CODERS
 * Engineered by Muhammad Talha Farid
 * 
 * Standalone Software Factory & Cognitive Brain (Zero External Dependencies)
 * Drop this folder into any project to brainstorm, architect, scaffold, debug, audit, and deploy.
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

import { VeyraScaffolder } from './engines/scaffolder.mjs';
import { VeyraTestHarness } from './engines/test-harness.mjs';
import { VeyraDeployer } from './engines/deployer.mjs';
import { VeyraSuperpowers } from './engines/superpowers.mjs';
import { VeyraManifest } from './engines/manifest.mjs';
import { VeyraDB } from './primitives/db.mjs';

const args = process.argv.slice(2);
const command = args[0] || 'help';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

console.log('\n\x1b[1m\x1b[38;5;99m========================================================================\x1b[0m');
console.log('\x1b[1m\x1b[38;5;99m  VEYRA AGENT • The Original One-Man Army for Vibe Coders              \x1b[0m');
console.log('\x1b[90m  Engineered by Muhammad Talha Farid • Zero External Dependencies      \x1b[0m');
console.log('\x1b[90m  UNDERSTAND • ARCHITECT • BUILD • VERIFY • 7 SUPERPOWERS ACTIVE       \x1b[0m');
console.log('\x1b[1m\x1b[38;5;99m========================================================================\x1b[0m\n');

switch (command) {
  case 'brainstorm':
  case 'vibe':
    handleBrainstorm(args.slice(1).join(' '));
    break;

  case 'plan':
  case 'spec':
    handlePlan(args.slice(1).join(' '));
    break;

  case 'debug':
  case 'fix':
    handleDebug(args.slice(1).join(' '));
    break;

  case 'review':
  case 'lint':
    handleReview();
    break;

  case 'guard':
    handleGuard();
    break;

  case 'manifest':
  case 'context':
    handleManifest();
    break;

  case 'db':
  case 'database':
    handleDatabaseInspector(args[1]);
    break;

  case 'superpowers':
  case 'arsenal':
    printSuperpowers();
    break;

  case 'scaffold':
    handleScaffold(args[1], args[2]);
    break;

  case 'test':
  case 'qa':
    VeyraTestHarness.runFullSuite(projectRoot);
    break;

  case 'deploy':
  case 'deploy-spec':
    VeyraDeployer.generate(projectRoot, args[1] || 'veyra-app');
    break;

  case 'studio':
    startEmbeddedStudio();
    break;

  case 'activate':
  case 'setup':
  case 'init':
    activateProject();
    break;

  case 'audit':
  case 'scan':
    VeyraTestHarness.runFullSuite(projectRoot);
    break;

  case 'advise':
    adviseTask(args.slice(1).join(' '));
    break;

  case 'help':
  default:
    printHelp();
    break;
}

function handleBrainstorm(idea) {
  if (!idea) {
    console.log('\x1b[33mUsage: node VEYRA/veyra-brain.mjs brainstorm "<your vibe idea>"\x1b[0m\n');
    return;
  }
  const spec = VeyraSuperpowers.brainstorm(idea);
  console.log(`\x1b[1m\x1b[36m⚡ [SUPERPOWER 1: VIBE-TO-SPEC BLUEPRINT]\x1b[0m`);
  console.log(`\x1b[1mTitle:\x1b[0m ${spec.title}`);
  console.log(`\x1b[1mEngineered by:\x1b[0m ${spec.author}`);
  console.log(`\n\x1b[35m1. Problem & Value Proposition:\x1b[0m`);
  console.log(`   • ${spec.pillars.intent.coreProblem}`);
  console.log(`   • ${spec.pillars.intent.primaryValueProp}`);
  console.log(`\n\x1b[34m2. End-to-End User Journey:\x1b[0m`);
  spec.pillars.userJourney.forEach((j) => {
    console.log(`   [Step ${j.step}] ${j.action} ➔ ${j.outcome}`);
  });
  console.log(`\n\x1b[32m3. Recommended Production Stack:\x1b[0m`);
  Object.entries(spec.pillars.recommendedStack).forEach(([k, v]) => {
    console.log(`   • ${k.padEnd(12)}: ${v}`);
  });
  console.log(`\n\x1b[33m4. Directive 24 Anti-Mock Rules:\x1b[0m`);
  spec.pillars.antiMockChecklist.forEach((rule) => console.log(`   ✔ ${rule}`));
  console.log('');
}

function handlePlan(task) {
  if (!task) {
    console.log('\x1b[33mUsage: node VEYRA/veyra-brain.mjs plan "<feature or task>"\x1b[0m\n');
    return;
  }
  const plan = VeyraSuperpowers.writePlan(task);
  console.log(`\x1b[1m\x1b[36m📋 [SUPERPOWER 2: ARCHITECTURAL EXECUTION PLAN]\x1b[0m`);
  console.log(`\x1b[1mTarget:\x1b[0m ${plan.planTitle}`);
  console.log(`\x1b[1mStandards:\x1b[0m ${plan.directiveStandards}\n`);
  plan.phases.forEach((p) => {
    console.log(`\x1b[1m\x1b[35m[${p.name}]\x1b[0m`);
    console.log(`  Summary: ${p.description}`);
    p.tasks.forEach((t) => console.log(`   - ${t}`));
    console.log(`  \x1b[32m✔ Verification Command:\x1b[0m ${p.verification}\n`);
  });
}

function handleDebug(errorText) {
  if (!errorText) {
    console.log('\x1b[33mUsage: node VEYRA/veyra-brain.mjs debug "<error message or symptom>"\x1b[0m\n');
    return;
  }
  const report = VeyraSuperpowers.systematicDebug(errorText);
  const d = report.diagnostics;
  console.log(`\x1b[1m\x1b[31m🔍 [SUPERPOWER 4: ZERO-GUESSWORK SYSTEMATIC DEBUGGER]\x1b[0m`);
  console.log(`\x1b[1mFailure Domain:\x1b[0m \x1b[33m${d.failureDomain}\x1b[0m`);
  console.log(`\x1b[1mHypothesis:\x1b[0m     ${d.hypothesis}\n`);
  console.log(`\x1b[34mDiagnostic Isolation Protocol:\x1b[0m`);
  d.isolationSteps.forEach((s, idx) => console.log(`   ${idx + 1}. ${s}`));
  console.log(`\n\x1b[32mSurgical Remedy:\x1b[0m`);
  d.surgicalRemedy.forEach((r, idx) => console.log(`   ✔ ${r}`));
  console.log(`\n\x1b[90m${d.antiLoopDirective}\x1b[0m\n`);
}

function handleReview() {
  console.log(`\x1b[36m▶ Running Veyra Code & Directive Review on project...\x1b[0m\n`);
  const review = VeyraSuperpowers.reviewCode(projectRoot);
  console.log(`Scanned ${review.totalFilesScanned} source files. Status: \x1b[1m${review.status === 'CLEAN' ? '\x1b[32mCLEAN' : '\x1b[33mATTENTION REQUIRED'}\x1b[0m\n`);
  if (review.findings.length === 0) {
    console.log(`\x1b[32m✔ Zero directive violations, mock timers, or stubs detected!\x1b[0m\n`);
  } else {
    review.findings.forEach((f) => {
      console.log(`  [${f.severity}] \x1b[33m${f.directive}\x1b[0m: ${f.issue}`);
      console.log(`    File: \x1b[90m${f.file}\x1b[0m`);
    });
    console.log('');
  }
}

function handleGuard() {
  console.log(`\x1b[36m🛡️ [VEYRA ANTI-MOCK & ANTI-DUMB-CODE GUARD ACTIVATED]\x1b[0m\n`);
  const review = VeyraSuperpowers.reviewCode(projectRoot);
  const qa = VeyraTestHarness.checkRealFunctionality(projectRoot);
  const sanity = VeyraTestHarness.checkVibeCoderSanity(projectRoot);

  if (review.findings.length > 0 || !qa.passed || !sanity.passed) {
    console.error(`\x1b[31m✘ GUARD FAILED: Unacceptable mock code or TODO stubs detected!\x1b[0m`);
    process.exit(1);
  } else {
    console.log(`\x1b[32m✔ GUARD PASSED: 100% Real Functionality & Clean Code Guaranteed!\x1b[0m\n`);
  }
}

function handleManifest() {
  console.log(`\x1b[36m▶ Generating Veyra Credit Economy Manifest...\x1b[0m\n`);
  const manifest = VeyraManifest.generate(projectRoot);
  console.log(`  ✔ Generated: \x1b[32m.veyra/manifest.json\x1b[0m`);
  console.log(`  Summary: ${manifest.summary.totalTables} DB tables, ${manifest.summary.totalRoutes} API routes, ${manifest.summary.totalViews} views.`);
  console.log(`\n\x1b[1m\x1b[35m[COMPACT TOKEN CONTEXT FOR AI AGENTS (Saves 80% Credits)]:\x1b[0m`);
  console.log(VeyraManifest.getCompactContext(projectRoot));
  console.log('');
}

function handleDatabaseInspector(tableName) {
  const dbFile = findSqliteDb();
  if (!dbFile) {
    console.log('\x1b[33mNo active SQLite database file found. Scaffold a SaaS or run migrations first.\x1b[0m\n');
    return;
  }

  try {
    const db = new VeyraDB(dbFile);
    if (!tableName) {
      const tables = db.query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
      console.log(`\x1b[36mDatabase: ${path.relative(projectRoot, dbFile)}\x1b[0m`);
      console.log(`Tables found: ${tables.length}`);
      tables.forEach((t) => {
        const count = db.queryOne(`SELECT COUNT(*) as c FROM "${t.name}"`);
        console.log(`  • \x1b[1m${t.name}\x1b[0m (${count?.c || 0} rows)`);
      });
      console.log(`\nView table rows with: node VEYRA/veyra-brain.mjs db <table_name>\n`);
    } else {
      const rows = db.query(`SELECT * FROM "${tableName}" LIMIT 20`);
      console.log(`\x1b[36mShowing up to 20 rows from table: ${tableName}\x1b[0m\n`);
      console.table(rows);
    }
  } catch (err) {
    console.error('\x1b[31mDatabase inspection error:\x1b[0m', err.message);
  }
}

function findSqliteDb() {
  const candidates = [
    path.join(projectRoot, 'data.sqlite'),
    path.join(projectRoot, 'database.sqlite'),
    path.join(projectRoot, 'app.db'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

function printSuperpowers() {
  console.log(`\x1b[1m\x1b[35mTHE 7 VEYRA SUPERPOWERS FOR VIBE CODERS:\x1b[0m`);
  console.log(`Engineered by \x1b[1mMuhammad Talha Farid\x1b[0m\n`);
  console.log(`  1. ⚡ \x1b[1mBrainstormer\x1b[0m       (vibe-to-spec blueprinting & socratic intent)`);
  console.log(`  2. 📋 \x1b[1mPlan Writer\x1b[0m        (atomic 4-phase verifiable roadmap)`);
  console.log(`  3. 🎯 \x1b[1mExecution Sentinel\x1b[0m (anti-loop circuit breaker & stop conditions)`);
  console.log(`  4. 🔍 \x1b[1mSystematic Debug\x1b[0m   (4-layer scientific root cause isolation)`);
  console.log(`  5. 🛡️ \x1b[1mTest-Driven QA\x1b[0m     (Directive 24 anti-mock & real functionality)`);
  console.log(`  6. 🎨 \x1b[1mAnti-Generic UI\x1b[0m    (bespoke HSL tokens, micro-interactions, WCAG AA)`);
  console.log(`  7. 🚀 \x1b[1mDeploy & Scaffolder\x1b[0m(zero-dependency SaaS, API, Flutter, Docker)\n`);
}

function handleScaffold(type = 'saas', name) {
  const appName = name || (type === 'saas' ? 'Veyra SaaS' : type === 'api' ? 'Veyra API' : type === 'flutter' ? 'veyra_mobile' : 'Veyra Web');
  if (type === 'saas') {
    VeyraScaffolder.scaffoldSaas(projectRoot, appName);
  } else if (type === 'api') {
    VeyraScaffolder.scaffoldApi(projectRoot, appName);
  } else if (type === 'flutter') {
    VeyraScaffolder.scaffoldFlutter(projectRoot, appName);
  } else if (type === 'website' || type === 'site') {
    VeyraScaffolder.scaffoldWebsite(projectRoot, appName);
  } else {
    console.error('\x1b[31mUnknown scaffold type. Supported: saas, api, flutter, website\x1b[0m');
  }
}

function startEmbeddedStudio(port = 4422) {
  const studioHtmlPath = path.join(__dirname, 'studio', 'index.html');
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    // CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      return res.end();
    }

    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'GET' && url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return fs.createReadStream(studioHtmlPath).pipe(res);
    }

    if (req.method === 'POST' && url.pathname === '/api/brainstorm') {
      return parseJsonBody(req, res, (data) => {
        const result = VeyraSuperpowers.brainstorm(data.idea || 'Vibe App');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/plan') {
      return parseJsonBody(req, res, (data) => {
        const result = VeyraSuperpowers.writePlan(data.task || 'Veyra Feature');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/debug') {
      return parseJsonBody(req, res, (data) => {
        const result = VeyraSuperpowers.systematicDebug(data.error || 'Unknown Error');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      });
    }

    if (req.method === 'GET' && url.pathname === '/api/review') {
      const result = VeyraSuperpowers.reviewCode(projectRoot);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    }

    if (req.method === 'GET' && url.pathname === '/api/manifest') {
      const manifest = VeyraManifest.getOrGenerate(projectRoot);
      const compactContext = VeyraManifest.getCompactContext(projectRoot);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ manifest, compactContext }));
    }

    if (req.method === 'GET' && url.pathname === '/api/db/tables') {
      const dbFile = findSqliteDb();
      if (!dbFile) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ tables: [], error: 'No SQLite file found.' }));
      }
      try {
        const db = new VeyraDB(dbFile);
        const tables = db.query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
        const tableList = tables.map((t) => {
          const count = db.queryOne(`SELECT COUNT(*) as c FROM "${t.name}"`);
          const columns = db.query(`PRAGMA table_info("${t.name}")`);
          return { name: t.name, rowsCount: count?.c || 0, columns };
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ tables: tableList, dbPath: path.relative(projectRoot, dbFile) }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
      }
    }

    if (req.method === 'GET' && url.pathname.startsWith('/api/db/table/')) {
      const tableName = decodeURIComponent(url.pathname.slice('/api/db/table/'.length));
      const dbFile = findSqliteDb();
      if (!dbFile) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Database not found' }));
      }
      try {
        const db = new VeyraDB(dbFile);
        const rows = db.query(`SELECT * FROM "${tableName}" LIMIT 100`);
        const columns = db.query(`PRAGMA table_info("${tableName}")`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ tableName, columns, rows }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: err.message }));
      }
    }

    if (req.method === 'POST' && url.pathname === '/api/scaffold') {
      return parseJsonBody(req, res, (data) => {
        handleScaffold(data.type, data.name);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: `Successfully scaffolded ${data.type} into project root.` }));
      });
    }

    if (req.method === 'GET' && url.pathname === '/api/audit') {
      const result = await VeyraTestHarness.runFullSuite(projectRoot);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    }

    if (req.method === 'POST' && url.pathname === '/api/deploy') {
      VeyraDeployer.generate(projectRoot);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, message: 'Deployment manifests generated.' }));
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  });

  server.listen(port, () => {
    console.log(`\x1b[1m\x1b[32m✔ VEYRA EMBEDDED STUDIO RUNNING:\x1b[0m \x1b[36mhttp://localhost:${port}\x1b[0m`);
    console.log(`  Engineered by Muhammad Talha Farid • Zero external dependencies.\n`);
  });
}

function parseJsonBody(req, res, callback) {
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    try {
      const data = body ? JSON.parse(body) : {};
      callback(data);
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
  });
}

function activateProject() {
  console.log(`\x1b[36m▶ Activating Veyra in project root:\x1b[0m ${projectRoot}\n`);

  try {
    fs.copyFileSync(path.join(__dirname, 'AGENTS.md'), path.join(projectRoot, 'AGENTS.md'));
    console.log(`  ✔ Created: \x1b[32m${path.join(projectRoot, 'AGENTS.md')}\x1b[0m`);

    fs.copyFileSync(path.join(__dirname, 'GEMINI.md'), path.join(projectRoot, 'GEMINI.md'));
    console.log(`  ✔ Created: \x1b[32m${path.join(projectRoot, 'GEMINI.md')}\x1b[0m`);

    const rulesDir = path.join(projectRoot, '.agents', 'rules');
    const skillsBaseDir = path.join(projectRoot, '.agents', 'skills');
    fs.mkdirSync(rulesDir, { recursive: true });
    fs.mkdirSync(skillsBaseDir, { recursive: true });

    fs.copyFileSync(path.join(__dirname, 'RULES.md'), path.join(rulesDir, 'veyra-agent.md'));
    console.log(`  ✔ Created: \x1b[32m${path.join(rulesDir, 'veyra-agent.md')}\x1b[0m`);

    // Copy all Veyra skills to project
    const skillsSourceDir = path.join(__dirname, 'skills');
    if (fs.existsSync(skillsSourceDir)) {
      const skillFolders = fs.readdirSync(skillsSourceDir);
      for (const folder of skillFolders) {
        const srcSkillFile = path.join(skillsSourceDir, folder, 'SKILL.md');
        if (fs.existsSync(srcSkillFile)) {
          const destDir = path.join(skillsBaseDir, folder);
          fs.mkdirSync(destDir, { recursive: true });
          fs.copyFileSync(srcSkillFile, path.join(destDir, 'SKILL.md'));
          console.log(`  ✔ Installed Skill: \x1b[32m.agents/skills/${folder}/SKILL.md\x1b[0m`);
        }
      }
    }

    // Default primary skill
    const primarySkillDir = path.join(skillsBaseDir, 'veyra');
    fs.mkdirSync(primarySkillDir, { recursive: true });
    fs.copyFileSync(path.join(__dirname, 'SKILL.md'), path.join(primarySkillDir, 'SKILL.md'));
    console.log(`  ✔ Created: \x1b[32m${path.join(primarySkillDir, 'SKILL.md')}\x1b[0m`);

    // Generate initial manifest
    VeyraManifest.generate(projectRoot);
    console.log(`  ✔ Generated: \x1b[32m.veyra/manifest.json (Credit Economy Cache)\x1b[0m`);

    console.log(`\n\x1b[1m\x1b[32mSUCCESS: VEYRA Superpowers activated! Engineered by Muhammad Talha Farid.\x1b[0m\n`);
  } catch (err) {
    console.error(`\x1b[31mActivation failed:\x1b[0m`, err.message);
  }
}

function adviseTask(task) {
  if (!task) {
    console.error('\x1b[31mError: Please specify the feature or task to advise.\x1b[0m');
    return;
  }
  handleBrainstorm(task);
}

function printHelp() {
  console.log(`
Usage:
  node VEYRA/veyra-brain.mjs <command> [arguments]

Commands:
  brainstorm "<idea>"     ⚡ Superpower 1: Generate complete product spec & architecture from a vibe
  plan "<task>"           📋 Superpower 2: Generate atomic, phased implementation roadmap
  debug "<error>"         🔍 Superpower 4: 4-layer root cause isolation (zero guesswork)
  review                  🛡️ Superpower 5: Audit code for mock timers, TODO stubs, and secret leaks
  guard                   🛡️ Blocking check: fails if any mock timer, fake delay, or stub exists
  manifest                💾 Credit Economy: Generate .veyra/manifest.json to save 80% tokens
  db [table]              🗄️ Inspect SQLite tables, row counts, and live database records
  superpowers             ✨ Display the 7 Vibe-Coding Superpowers
  scaffold <type> [name]  🚀 Scaffold complete system (saas | api | flutter | website)
  test                    Multi-vector QA & security test harness on current project
  deploy                  Generate hardened Dockerfile, docker-compose, and GitHub Actions CI/CD
  studio                  Launch embedded visual software factory on http://localhost:4422
  activate                Install Veyra rules & skills into project for Antigravity & AI agents
  help                    Show this help message

Examples:
  node VEYRA/veyra-brain.mjs brainstorm "Voice-first habit tracker"
  node VEYRA/veyra-brain.mjs manifest
  node VEYRA/veyra-brain.mjs db users
  node VEYRA/veyra-brain.mjs guard
  node VEYRA/veyra-brain.mjs studio
`);
}
