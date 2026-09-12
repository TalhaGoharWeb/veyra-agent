---
name: veyra-systematic-debugging
description: Veyra Superpower 4 - Zero-Guesswork Systematic Debugger. 4-layer root cause isolation method. Prohibits random trial-and-error code churn. Engineered by Muhammad Talha Farid.
---

# VEYRA SUPERPOWER 4: ZERO-GUESSWORK SYSTEMATIC DEBUGGER
> **Engineered by Muhammad Talha Farid**
> Directives 32, 36 & 49 Compliant

## Goal
Diagnose and resolve defects scientifically without guessing, without thrashing working code, and without endless prompt loops.

---

## The 4-Phase Diagnostic Method

```
[ Phase 1: OBSERVE ]
Capture exact failure message, HTTP status, and stack trace line numbers.
       │
       ▼
[ Phase 2: ISOLATE ]
Pinpoint which of the 5 layers contains the defect:
1. Client State / Store
2. Network / Transport / CORS
3. Server Handler / Schema Validation
4. Database Query / Constraints
5. Environment / Secrets / Config
       │
       ▼
[ Phase 3: HYPOTHESIZE ]
Form exactly ONE testable hypothesis before touching a single line of code.
       │
       ▼
[ Phase 4: SURGICALLY REMEDY ]
Apply minimal 1-function or 1-line patch and immediately verify the fix.
```

---

## Anti-Patterns Strictly Banned
- ❌ Randomly adding `console.log` everywhere and guessing solutions.
- ❌ Modifying 5 unrelated files to fix 1 symptom.
- ❌ Wrapping code in empty `try { ... } catch (e) {}` blocks that swallow errors.
- ❌ Replacing real queries with hardcoded fake responses.

---

## CLI Trigger
```bash
node VEYRA/veyra-brain.mjs debug "Error message, stack trace, or unexpected behavior"
```
