---
name: veyra-anti-generic-ui
description: Veyra Superpower 6 - Anti-Generic Vibe UI & Design System. Replaces generic AI card clutter with bespoke typography, fluid HSL palettes, micro-interactions, and accessible tokens. Engineered by Muhammad Talha Farid.
---

# VEYRA SUPERPOWER 6: ANTI-GENERIC VIBE UI & DESIGN SYSTEM
> **Engineered by Muhammad Talha Farid**
> Directives 15, 16, 17 & 28 Compliant

## Goal
Rescue vibe coders from the ugly, cookie-cutter "AI bootstrap look" (meaningless purple-blue gradients, floating card blobs, washed-out low contrast text, and chaotic padding).

---

## The Veyra Design System Principles

1. **Information Hierarchy First**: Every screen has ONE dominant action. Group secondary tools cleanly.
2. **Harmonious Palette**: Use tailored HSL tokens with strict 60-30-10 distribution:
   - 60% Dominant canvas / surface background (`--bg`, `--surface`).
   - 30% Structural text, borders, and secondary controls.
   - 10% High-intent accent color (`--accent`, `--primary`).
3. **Typography Scale**: Clean geometric sans-serif (Inter, SF Pro, Outfit) with proportional line-height and tight tracking on headings.
4. **Responsive Integrity**: Explicit mobile, tablet, and desktop layouts. Touch targets ≥ 44px on mobile devices.
5. **Accessibility (WCAG AA)**: High contrast text ratios (≥ 4.5:1), visible focus rings, and semantic HTML landmarks.

---

## Assets
Import embedded Veyra UI primitives directly without npm:
```html
<link rel="stylesheet" href="./VEYRA/primitives/ui-kit.css">
```
Or use component blueprints in `./VEYRA/primitives/components.html`.
