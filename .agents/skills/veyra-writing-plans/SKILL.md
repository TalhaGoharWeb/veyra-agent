---
name: veyra-writing-plans
description: Veyra Superpower 2 - Architectural Plan Engine. Formulates atomic, bite-sized implementation phases with automated verification criteria. Engineered by Muhammad Talha Farid.
---

# VEYRA SUPERPOWER 2: ARCHITECTURAL PLAN ENGINE
> **Engineered by Muhammad Talha Farid**
> Directives 2, 42 & 43 Compliant

## Goal
Eliminate "hand-wavy" coding and sprawling unstructured changes by organizing every feature or project into phased, verifiable, atomic execution steps.

---

## Plan Structure Rules

1. **Atomic Tasks**: Every task must touch 1-3 related files at most.
2. **Build Order Optimization (Directive 42)**: Always build dependencies before dependents:
   - `Schema & DB Models` ➔ `Server Middleware & Auth` ➔ `API Endpoints` ➔ `Client State & Store` ➔ `UI Layout & Views` ➔ `End-to-End Verification`.
3. **Explicit Verification Gate**: Every phase must declare its exact automated or manual verification command.
4. **No Placeholders**: Never write tasks like "Implement the rest" or "Add logic here".

---

## The 4 Phased Standard Template
- **Phase 1: Foundation & Data Schema** (Tables, migrations, constraints).
- **Phase 2: Server-Authoritative Backend & API** (Routes, validations, auth tokens).
- **Phase 3: Anti-Generic Frontend & Optimistic UI** (Accessible components, error handling, responsive layout).
- **Phase 4: Multi-Vector Verification & Hardening** (QA test harness, Docker packaging, CI/CD).

---

## CLI Trigger
```bash
node VEYRA/veyra-brain.mjs plan "Feature or task description"
```
