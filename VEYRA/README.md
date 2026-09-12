# 🧠 VEYRA AGENT: The Original One-Man Army for Vibe Coders
> **Engineered by Muhammad Talha Farid**
> **UNDERSTAND • ARCHITECT • BUILD • VERIFY • PRODUCTION-READY**
> Intent-Driven • Resource-Aware • Credit-Efficient • Zero External Dependencies

[![Original Agent](https://img.shields.io/badge/Author-Muhammad%20Talha%20Farid-6366f1.svg)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-00f5d4.svg)](https://opensource.org/licenses/MIT)
[![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20External-10b981.svg)]()
[![Superpowers](https://img.shields.io/badge/Superpowers-7%20Active-f59e0b.svg)]()
[![Credit Economy](https://img.shields.io/badge/Credit%20Economy-80%25%20Saved-10b981.svg)]()

---

## What is VEYRA AGENT?
**VEYRA AGENT** is the original, standalone software engineering brain engineered by **Muhammad Talha Farid** to transform any vibe coder into a disciplined, self-sufficient **one-man software company**.

Vibe coders love moving fast with AI, but often get tripped up by:
- ❌ **Token & Credit Bleed**: AI agents scanning 30+ files repeatedly, burning budgets on redundant reads.
- ❌ **Fake Latency Timers**: `setTimeout` or `Future.delayed` masquerading as real code.
- ❌ **Frontend Breakdown**: Heavy bundler bloat (`node_modules`) crashing on builds.
- ❌ **Monetization Roadblocks**: Inability to safely verify Stripe webhooks or payments.
- ❌ **Database Blindness**: Inability to inspect and verify database rows live during dev.

**VEYRA permanently solves all five.** Copy this single `VEYRA/` folder into **ANY** project or workspace to instantly gain a master orchestrator, 7 engineering superpowers, production primitives, an embedded visual database studio, and an automated credit economy engine—with **zero external npm packages required**.

---

## ⚡ The 7 Vibe-Coding Superpowers

| Superpower | Command / Skill | Capability |
| :--- | :--- | :--- |
| **1. Brainstormer** | `brainstorm "<vibe>"` | Socratic intent extraction, user journey mapping, and relational data modeling before coding. |
| **2. Plan Writer** | `plan "<task>"` | Atomic 4-phase verifiable roadmap with automated verification gates. No hand-waving "implement the rest". |
| **3. Execution Sentinel** | `execute` | Progress tracking with Directive 49 anti-loop circuit breaker (stops doom-loops after 2 attempts). |
| **4. Systematic Debugger** | `debug "<error>"` | Scientific 4-layer root-cause isolation (Client State, Network, Backend, DB). Bans random trial-and-error. |
| **5. Test-Driven QA & Guard** | `test` / `guard` | Directive 24 anti-mock sentinel. Blocks fake sleep timers, placeholder TODOs, and leaked secrets. |
| **6. Anti-Generic UI & Store** | `ui` | Bespoke HSL design tokens, micro-interactions, responsive components, and native reactive signals. |
| **7. Scaffolder & Deployer** | `scaffold` / `deploy` | 1-click generation of complete SaaS, REST APIs, Flutter mobile apps, hardened Dockerfiles, and CI/CD. |

---

## 🛠️ Zero-Dependency Production Primitives (`primitives/`)

Every primitive runs natively on Node.js standard libraries with **zero npm install needed**:
- **`primitives/auth.mjs`**: PBKDF2/scrypt salted password hashing + HMAC-SHA256 stateless JWT tokens with constant-time equality checks + RBAC middleware.
- **`primitives/db.mjs`**: Native `node:sqlite` WAL mode interface with foreign key enforcement and automated migrations (`_veyra_migrations`).
- **`primitives/router.mjs`**: Regex parameterized HTTP router with 1MB body streaming DoS guard, preflight CORS, `res.json()`, and `res.error()`.
- **`primitives/reactive.mjs`**: Fine-grained reactive signals (`createSignal`), observable store (`createStore`), and optimistic UI rollbacks for zero-build web dashboards.
- **`primitives/payments.mjs`**: Native Stripe checkout sessions and constant-time HMAC-SHA256 webhook signature verification (`stripe-signature`).
- **`primitives/ui-kit.css` & `components.html`**: Curated anti-generic HSL design tokens, WCAG AA accessible contrast, dialogs, form inputs, and responsive layout.

---

## 🚀 Standalone Commands

Run directly in terminal with native Node.js:

```bash
# 1. ⚡ Superpower 1: Turn any vibe into a complete engineering spec
node VEYRA/veyra-brain.mjs brainstorm "Voice-first habit tracker"

# 2. 📋 Superpower 2: Generate an atomic, verifiable implementation roadmap
node VEYRA/veyra-brain.mjs plan "Add Stripe customer portal checkout"

# 3. 🔍 Superpower 4: Zero-guesswork scientific debugging
node VEYRA/veyra-brain.mjs debug "TypeError: Cannot read properties of undefined (reading 'token')"

# 4. 💾 Credit Economy: Generate .veyra/manifest.json (saves 80% AI tokens)
node VEYRA/veyra-brain.mjs manifest

# 5. 🗄️ Embedded Database Studio: Inspect tables and live rows
node VEYRA/veyra-brain.mjs db          # Lists all tables and row counts
node VEYRA/veyra-brain.mjs db users    # Shows live rows from users table

# 6. 🛡️ Anti-Mock Guard: Fails build if any fake timer or stub is found
node VEYRA/veyra-brain.mjs guard

# 7. 🚀 Scaffold a complete production stack
node VEYRA/veyra-brain.mjs scaffold saas "My SaaS"        # Full-stack SaaS (Auth + DB + UI)
node VEYRA/veyra-brain.mjs scaffold api "Data Microservice"  # High-performance REST API
node VEYRA/veyra-brain.mjs scaffold flutter "veyra_app"  # 2026 Flutter (Dart 3 + Riverpod + GoRouter)
node VEYRA/veyra-brain.mjs scaffold website "Landing"    # Anti-generic responsive landing page

# 8. 🛡️ Run the multi-vector automated test harness
node VEYRA/veyra-brain.mjs test

# 9. 📦 Generate hardened Dockerfile, docker-compose, and GitHub Actions CI/CD
node VEYRA/veyra-brain.mjs deploy

# 10. 💻 Launch embedded visual web studio (http://localhost:4422)
node VEYRA/veyra-brain.mjs studio

# 11. ✨ Activate Veyra rules and superpowers for Antigravity, Claude Code, Cursor, or Gemini
node VEYRA/veyra-brain.mjs activate
```

---

## 💻 Embedded Visual Web Studio

Launch the visual software factory on `http://localhost:4422`:
```bash
node VEYRA/veyra-brain.mjs studio
```
Includes interactive cockpits for:
1. **Live Vibe-to-Spec Brainstormer**
2. **Phased Plan Generator**
3. **Root-Cause Debugger Assistant**
4. **1-Click Codebase Scaffolder**
5. **QA Sentinel & Anti-Mock Guard**
6. **Production Deployment Generator**
7. **Embedded SQLite Database Studio** (visual table viewer & row browser)
8. **Credit Economy & Manifest Viewer** (1-click AI context copy)

---

## 📁 Repository Directory Structure

```text
VEYRA/
├── AGENTS.md                  # Universal operating rules for AI coding agents
├── GEMINI.md                  # Direct Antigravity cognitive brain directives
├── RULES.md                   # Full reference of all 55 Veyra directives
├── SKILL.md                   # Primary Antigravity skill cheatsheet
├── README.md                  # Complete documentation
├── activate.bat               # 1-click Windows activation
├── activate.sh                # 1-click Mac/Linux activation
├── veyra-brain.mjs            # Master orchestrator & CLI launcher
│
├── engines/                   # Autonomous engineering sub-engines
│   ├── superpowers.mjs        # 7 Core Superpowers for Vibe Coders
│   ├── manifest.mjs           # Credit Economy Engine & Project Memory Cache
│   ├── scaffolder.mjs         # Production generators for SaaS, APIs, Flutter, Web
│   ├── test-harness.mjs       # Multi-vector QA, mock timer & security sentinel
│   └── deployer.mjs           # Hardened Docker, Compose & CI/CD generator
│
├── primitives/                # Zero-dependency production building blocks
│   ├── auth.mjs               # Cryptographic auth, JWT, scrypt, RBAC
│   ├── db.mjs                 # SQLite WAL manager & migration runner
│   ├── router.mjs             # Native HTTP router, JSON validator, CORS
│   ├── reactive.mjs           # Signals, store & optimistic rollback engine
│   ├── payments.mjs           # Stripe checkout & HMAC webhook signature verifier
│   ├── ui-kit.css             # Anti-Generic UI tokens & component styles
│   └── components.html        # Accessible HTML/CSS component templates
│
├── skills/                    # Native modular skills for AI assistants
│   ├── veyra-one-man-army/    # Master one-man army workflow
│   ├── veyra-brainstorming/   # Superpower 1: Vibe-to-spec blueprinting
│   ├── veyra-writing-plans/   # Superpower 2: Atomic execution planning
│   ├── veyra-executing-plans/ # Superpower 3: Anti-loop plan execution
│   ├── veyra-systematic-debugging/ # Superpower 4: Scientific root cause isolation
│   ├── veyra-tdd/             # Superpower 5: Test-driven & real functionality
│   └── veyra-anti-generic-ui/ # Superpower 6: Bespoke design system engineering
│
└── studio/                    # Embedded local visual workbench
    └── index.html             # Cyber-grade visual dashboard (http://localhost:4422)
```

---

## ⚖️ Creator & License
- **Original Creator & Architect**: **Muhammad Talha Farid**
- **License**: MIT License. Free for indie hackers, vibe coders, and commercial teams.
