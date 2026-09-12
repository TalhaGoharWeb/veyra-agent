# VEYRA AGENT • UNIVERSAL VIBE CODING ORCHESTRATOR
> **UNDERSTAND • ARCHITECT • BUILD • VERIFY**
> Intent-Driven • Resource-Aware • Credit-Efficient • Full-Stack • Production-Ready

---

## What is VEYRA?
VEYRA is a Universal AI Product Engineering Orchestrator designed to operate inside AI coding environments, IDE agents, and autonomous development platforms.

Instead of generating superficial snippets or unvetted mockups, VEYRA executes an autonomous 4-stage engineering pipeline:

```text
USER INPUT
   ↓
1. UNDERSTAND  ─── Intent Extraction • Classification • Clarification Budget
   ↓
2. ARCHITECT   ─── Tech Decision Matrix • UX Journey • Relational Schema • API Contracts
   ↓
3. BUILD       ─── Real-Functionality Enforcer • Server RBAC Barrier • No Dumb Code
   ↓
4. VERIFY      ─── Multi-Vector QA (Security, A11y, Perf, Regression) • Delivery Report
```

---

## Key Features

- **Credit Economy Controller**: Tracks token burn, assesses expected decision ROI for each tool call, and activates anti-loop safeguards.
- **Anti-Generic UI Engine**: Curated color palettes, responsive typography scale, high information density, zero arbitrary floating gradients.
- **Real-Functionality Standard**: Strictly prohibits `setTimeout(..., 2000)` mock data, fake login states, or dummy databases.
- **Interactive VEYRA Studio**: Modern Web UI to run, visualize, and inspect the 4 phases in real time with downloadable bundles and reports.
- **VEYRA CLI**: Command-line orchestration engine for any repository (`bin/veyra.mjs`).

---

## Quick Start

### 1. Launch Interactive VEYRA Studio
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to access the visual studio, presets, interactive schemas, code workbench, and QA matrix.

### 2. Run via Command Line (CLI)
```bash
# List built-in software presets
node bin/veyra.mjs presets

# Run autonomous pipeline for any software concept
node bin/veyra.mjs run "Build an AI-powered SaaS subscription platform" --mode=production
```

### 3. Build for Production
```bash
npm run build
```

---

## Project Structure
```text
VEYRA AGENT/
├── .agents/
│   ├── rules/veyra-agent.md      # Master operating rules for AI coding agents
│   └── skills/veyra/SKILL.md     # Antigravity skill cheatsheet
├── bin/
│   ├── veyra.mjs                 # Self-bootstrapping CLI launcher
│   └── veyra-core.mjs            # Command-line orchestrator engine
├── src/
│   ├── core/
│   │   ├── types.ts              # Core domain types across all 55 directives
│   │   ├── intent-engine.ts      # Phase 1: Intent & Classification
│   │   ├── architect-engine.ts   # Phase 2: Tech Matrix, UX & Schemas
│   │   ├── build-engine.ts       # Phase 3: Code synthesis & Real Functionality
│   │   ├── verify-engine.ts      # Phase 4: Multi-Vector QA & Audit
│   │   ├── credit-economy.ts     # Credit budget & Anti-loop controller
│   │   ├── templates.ts          # Ready-to-orchestrate presets
│   │   └── pipeline.ts           # Master pipeline coordinator
│   ├── components/
│   │   ├── Header.tsx            # Navigation, mode toggle, credit gauge
│   │   ├── PipelineStepper.tsx   # 4-stage visual progress navigator
│   │   ├── PromptStation.tsx     # Fast starters & execution input
│   │   ├── UnderstandView.tsx    # Phase 1 spec & intent breakdown
│   │   ├── ArchitectView.tsx     # Phase 2 decisions, UX journeys, ERD & API
│   │   ├── BuildView.tsx         # Phase 3 code viewer & bundle export
│   │   ├── VerifyView.tsx        # Phase 4 QA audit scores & delivery report
│   │   └── PresetModal.tsx       # Archetype blueprint browser
│   ├── App.tsx                   # Studio root application
│   ├── main.tsx                  # React entrypoint
│   └── index.css                 # Design tokens & glassmorphic styling
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Master Directives
1. Understand intent before implementation.
2. Inspect before modifying; reuse before creating.
3. Choose technology based on requirements, not hype.
4. Design UX before decorating UI.
5. Build complete functional workflows; never fake functionality.
6. Server-enforced authorization and zero credentials in client state.
7. Optimize for useful output per unit of computation.
8. When the solution is correct and verified, stop.
