---
name: veyra-tdd
description: Veyra Superpower 5 - Test-Driven Verification & Anti-Mock Sentinel. Enforces Directive 24 (real functionality) and bans fake sleep timers. Engineered by Muhammad Talha Farid.
---

# VEYRA SUPERPOWER 5: TEST-DRIVEN VERIFICATION & ANTI-MOCK SENTINEL
> **Engineered by Muhammad Talha Farid**
> Directives 24, 30 & 44 Compliant

## Goal
Enforce real, authentic software engineering. Ban mock latency timers, fake databases, and placeholder code from ever entering production codebases.

---

## The Anti-Mock Directives (Directive 24)

### 1. Fake Timers are Strictly Prohibited
- ❌ NO `setTimeout(() => { ... }, 2000)` simulating API responses.
- ❌ NO `Future.delayed(Duration(seconds: 2))` simulating network latency in Flutter.
- Real software communicates with real endpoints or native local storage.

### 2. The Verification Order
1. **Define Expected Schema & Status**: What does success return? What does 400/401/404 return?
2. **Write Automated Endpoint Test**: Using native `node:test` or standard fetch.
3. **Implement Feature**: Fulfill the contract with genuine persistence.
4. **Run Test Harness**: Verify with `node VEYRA/veyra-brain.mjs test`.

---

## CLI Trigger
```bash
node VEYRA/veyra-brain.mjs test
node VEYRA/veyra-brain.mjs review
```
