---
name: veyra-brainstorming
description: Veyra Superpower 1 - Vibe-to-Spec Brainstormer. Deep Socratic exploration, user journeys, data entity modeling, and technical specification before writing code. Engineered by Muhammad Talha Farid.
---

# VEYRA SUPERPOWER 1: VIBE-TO-SPEC BRAINSTORMING
> **Engineered by Muhammad Talha Farid**
> Directives 1, 3, 13, 14 & 15 Compliant

## Goal
Transform vague, high-level, or messy "vibes" into crystal-clear product specifications, relational data models, API endpoints, and user journeys **before modifying code**.

---

## The Brainstorming Protocol

### Step 1: Deep Intent Extraction
Ask the 3 core clarity questions:
1. **Core Problem**: What exact friction or workflow inefficiency does this solve?
2. **Target Persona**: Who is using this, on what device, in what context?
3. **Primary Success Metric**: How do we verify this actually delivers value?

### Step 2: The 5-Step User Journey
Map out the end-to-end journey:
- **Entry & Orientation**: Landing screen, value proposition, zero cognitive overload.
- **Frictionless Auth**: Native hardware-backed session or secure JWT token.
- **Primary Trigger**: The user's direct intent action.
- **System Feedback**: Optimistic UI update + server-side validation.
- **Completion & State**: Persisted database record, success state, and rollback on error.

### Step 3: Relational Data Modeling
Define tables, columns, data types, nullability, unique constraints, and foreign key cascades.
- Never use unstructured, untyped JSON blobs where relational integrity is required.
- Always include primary keys, indexed foreign keys, and audit timestamps (`created_at`, `updated_at`).

### Step 4: Strict Anti-Mock Guardrails
- Reject any fake `setTimeout` or `Future.delayed` latency simulation.
- Require live database persistence and authentic API endpoints.

---

## CLI Trigger
```bash
node VEYRA/veyra-brain.mjs brainstorm "Your product idea or vibe"
```
