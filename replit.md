# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `PORT=5000 BASE_PATH=/ pnpm --filter @workspace/gre-flashcards run dev` — run the GRE flashcards (Vocab Ninja) frontend on Replit (port 5000)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Replit Setup

- Active app: `artifacts/gre-flashcards` (Vocab Ninja — GRE vocabulary flashcards)
- Frontend dev server: Vite on port 5000, host `0.0.0.0`, `allowedHosts: true` for the Replit iframe proxy
- Workflow `Start application` runs the dev command above and is the entry point

## Vocab Ninja — Notable Features

- **Set Pre-Read** (`src/pages/SetReading.tsx`, `src/data/setReadings.ts`): a pre-study reading experience that appears on its own page when the user clicks **Start Set N** from the Mission Detail roadmap or set cards. Each reading is keyed by `${day}-${group}` and contains a 550–650 word literary passage that uses all 10 target words in natural context (with each target word **bolded** so the page can highlight them in orange), followed by 6 GRE-style comprehension questions: two vocab-in-context, one tone/purpose, one inference, one word-substitution, and one main-idea. Users select answers, submit, see scoring with per-question feedback and explanations, then click **Continue to Flashcards** to drop into `study` at the first word of the set. `MissionDetail.startSet` checks `hasSetReading(day, group)` before navigating; if no reading exists for that set, the original behavior (jump straight into the flashcards) is preserved. The current seeded reading is **Mission 1 / Set 1 — "The Cartographer's Daughter"** covering: abound, amorphous, austere, belie, capricious, cerebral, congenial, conspicuous, cursory, daunting.
- **Bookmarks** (`src/pages/Bookmarks.tsx`): word-level bookmarks persisted to `localStorage` under the `gre_bookmarks` key. Bookmarks are added from the redesigned SetTest / MissionTest results screens (bookmark button next to each reviewed question) and managed via `bookmarks` / `isBookmarked` / `toggleBookmark` / `removeBookmark` exposed by `AppContext`. The Bookmarks page lives in the sidebar between **Test** and **Achievements** and supports search, source filtering (Set Test / Mission Test), Study and Retake actions, plus a **Practice Bookmarked** CTA in the header that launches a focused quiz session.
- **Practice Mode — Bookmarked source** (`src/pages/PracticeMode.tsx`): the Word Source picker includes a `bookmarked` option (disabled when no bookmarks exist) that builds the question pool exclusively from saved word IDs. The Bookmarks page deep-links into this mode via `onNavigate("practice", { source: "bookmarked" })`, and `PracticeMode` honors `initialSource === "bookmarked"` to preselect the source on entry.
- **Mission Detail page** (`src/pages/MissionDetail.tsx`): standalone `mission-detail` route that opens when a mission card is clicked from the dashboard's mission grid, the "Resume Mission" CTA, the daily-agenda study tile, or any mission tile inside `StudyMode`'s belt grid. It accepts a `missionDay` param and renders an orange/pink gradient hero ("All 30 Words" + mountain SVG + start/continue button + reward chips), a horizontal roadmap of Set 1 → Set 2 → Set 3 → Mission Test nodes (locked when sets are incomplete), a 4-card grid of the three Sets plus the Mission Test card (with MC / Fill-in-the-Blank / True-False breakdown and lock state), a Mission Progress 4-stat row (words mastered, accuracy, streak, mission XP) computed from `useApp()` state and `loadMissionTestScores`/`loadMissionTestAttempts`, a Quick Actions row (Continue / Review / Practice Weak / Vocabulary), and a Tip card. Navigation: Sets and "Start Learning" deep-link into `study` via the first matching `wordId` so users land directly in the flashcard view; Mission Test routes to `mission-test`. The legacy in-page `group-select` view in `StudyMode` remains as a defensive fallback when no `onNavigate` is provided.
