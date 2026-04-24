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

- **Bookmarks** (`src/pages/Bookmarks.tsx`): word-level bookmarks persisted to `localStorage` under the `gre_bookmarks` key. Bookmarks are added from the redesigned SetTest / MissionTest results screens (bookmark button next to each reviewed question) and managed via `bookmarks` / `isBookmarked` / `toggleBookmark` / `removeBookmark` exposed by `AppContext`. The Bookmarks page lives in the sidebar between **Test** and **Achievements** and supports search, source filtering (Set Test / Mission Test), Study and Retake actions, plus a **Practice Bookmarked** CTA in the header that launches a focused quiz session.
- **Practice Mode — Bookmarked source** (`src/pages/PracticeMode.tsx`): the Word Source picker includes a `bookmarked` option (disabled when no bookmarks exist) that builds the question pool exclusively from saved word IDs. The Bookmarks page deep-links into this mode via `onNavigate("practice", { source: "bookmarked" })`, and `PracticeMode` honors `initialSource === "bookmarked"` to preselect the source on entry.
