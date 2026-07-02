# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Copiloto de Conexión yavendió!" — a self-service web app that walks a WhatsApp Business owner (Peru/LatAm, Spanish) through connecting their number to Meta without human hand-holding. It replaces a manual process where an operator watches a Meet call and unblocks users one by one. The product goal: raise the connection completion rate from ~15% to ~50% via (1) upfront triage that routes users and prevents known setup mistakes, (2) an interactive step-by-step guide, (3) a live SOS diagnostic tool backed by a 14-case knowledge base of real Meta/WhatsApp connection errors, and (4) a graceful fallback (a pre-verified number loaner) when a case has no quick fix.

Full product rationale and scope tradeoffs are in `DECISIONS.md` (written once the MVP is functionally complete) — read it for the "why" before making product-shape changes.

## Commands

```
npm install       # install deps
npm run dev       # start Vite dev server
npm run build     # tsc -b && vite build (type-checks, then builds)
npm run preview   # preview the production build locally
npm run lint      # oxlint
```

No test suite exists (single-day MVP scope). Deploy target is Vercel; `vercel dev` runs the `/api` serverless functions locally alongside Vite if you need to test the AI diagnosis layer.

## Architecture

**Two-layer diagnosis is the core design constraint.** Everything in the SOS module must work with zero configuration:

- **Capa 1 (deterministic, always on):** `src/data/knowledge-base.ts` holds the 14 cases (each with `sintomas` keyword phrases). `src/lib/matcher.ts` does keyword/phrase scoring against free text — no network call, no API key. The quick-select symptom grid also reads directly from this file.
- **Capa 2 (Claude, optional enhancement):** when `ANTHROPIC_API_KEY` is set, free text and screenshots are sent to a serverless function under `/api` (never called with the key from the client) which prompts Claude with the full knowledge base as context and expects strict JSON back. Any missing key, network failure, or JSON parse failure must silently fall back to Capa 1 — the demo must never break for lack of AI.

**`src/data/knowledge-base.ts` is the source of truth.** The 14 cases, their `tipo` (`setup` 🟡 vs `error` 🔴), and `disparaFallback` flag drive the SOS grid, the matcher, the Capa 2 system prompt, and which cases trigger Module D. Editing product copy/logic for a case means editing this file, not the components.

**Four modules, one flow, no router.** Given the small scope, screen switching is plain React state in `App.tsx` (`Screen` type in `src/types/app.ts`), not `react-router`:
- Module A — Triage (`src/lib/triage.ts` + triage components): 3-4 questions → routes to one of 3 connection options (`ConnectionOptionId` in `src/types/knowledge.ts`: Coexistence, API connection, or pre-verified number) and produces pre-warnings/checklist.
- Module B — Guided steps (`src/data/guides.ts`): per-route checklist with progress tracking; each step has an "Estoy atascado" button that jumps to SOS with step context pre-filled.
- Module C — SOS diagnostic: grid / free-text / screenshot entry points, all resolving to a `SolutionCard` render of a `KnowledgeCase`.
- Module D — Fallback: shown when a resolved case has `disparaFallback: true` (products Meta prohibits, exhausted restrictions) — offers the pre-verified number loaner as a positive alternative, not an error state.

**State persistence:** triage result, guide progress, and auto-logged SOS diagnoses (feeding the Growth dashboard's "casos registrados automáticamente" table) persist to `localStorage` behind try/catch guards — treat it as best-effort, not critical state.

**Growth dashboard is explicitly mock.** Funnel drop-off, top-errors, and activation-rate-before/after numbers are illustrative, not derived from real usage — don't wire them to anything that looks like real analytics without updating the copy that says so.

## Scope boundaries (by design, not oversight)

No auth/login, no real Meta/WhatsApp Embedded Signup integration, no real backend/database. These are out of scope per the product brief — don't add them speculatively.
