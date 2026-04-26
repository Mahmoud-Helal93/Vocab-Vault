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

- **Brand gradient theme** (`src/index.css`): the site-wide visual identity is a warm orange→pink gradient sampled from the hero banner mockup. Defined in CSS variables `--brand-orange` (`17 100% 57%` light / `17 100% 62%` dark) and `--brand-pink` (`346 87% 59%` light / `346 92% 64%` dark), composed into `--brand-gradient` (≈100° linear) and a translucent `--brand-gradient-soft`. Exposed as utility classes — `.bg-brand-gradient`, `.bg-brand-gradient-soft`, `.text-brand-gradient`, `.border-brand-gradient`, `.ring-brand`, and `.btn-brand` (a ready-to-use primary CTA with hover/active/disabled states and a soft pink-tinted shadow). The body has a two-stop radial wash (orange on the top-left, pink on the top-right) for ambient brand presence. All major primary CTAs across Dashboard, MissionDetail, MissionTest, StudyMode, SetReading, and Achievements use `.btn-brand` instead of solid orange so the gradient is consistent app-wide.
- **Set Pre-Read** (`src/pages/SetReading.tsx`, `src/data/setReadings.ts`): a pre-study reading experience that appears on its own page when the user clicks **Start Set N** from the Mission Detail roadmap or set cards. Each reading is keyed by `${day}-${group}` and contains a 550–650 word literary passage that uses all 10 target words in natural context (with each target word **bolded** so the page can highlight them in orange), followed by 6 GRE-style comprehension questions: two vocab-in-context, one tone/purpose, one inference, one word-substitution, and one main-idea. Users select answers, submit, see scoring with per-question feedback and explanations, then click **Continue to Flashcards** to drop into `study` at the first word of the set. `MissionDetail.startSet` checks `hasSetReading(day, group)` before navigating; if no reading exists for that set, the original behavior (jump straight into the flashcards) is preserved. Pre-reads are seeded for **Missions 1–25, all three sets each (75 total entries)** — every mission and set in the curriculum has a continuous-narrative pre-read. The page uses a single full-width column: a **merged hero/CTA banner** at the top combines the title, subtitle, meta row (min read · +20 XP · Step 1 of 3 · Pre-Read), an `ExplorerArt` mountain illustration, and the two primary CTAs (`Start Learning Flashcards` + `Review Story Again`) on the right — soft orange-tinted background, no separate right rail. Below it: the words-you'll-encounter chips, the story article (with a 3-button "A" font-size selector and the Focus Mode toggle in its header), and the full-width Comprehension Check.
- **Bookmarks** (`src/pages/Bookmarks.tsx`): word-level bookmarks persisted to `localStorage` under the `gre_bookmarks` key. Bookmarks are added from the redesigned SetTest / MissionTest results screens (bookmark button next to each reviewed question) and managed via `bookmarks` / `isBookmarked` / `toggleBookmark` / `removeBookmark` exposed by `AppContext`. The Bookmarks page lives in the sidebar between **Test** and **Achievements** and supports search, source filtering (Set Test / Mission Test), Study and Retake actions, plus a **Practice Bookmarked** CTA in the header that launches a focused quiz session.
- **Practice Mode — Bookmarked source** (`src/pages/PracticeMode.tsx`): the Word Source picker includes a `bookmarked` option (disabled when no bookmarks exist) that builds the question pool exclusively from saved word IDs. The Bookmarks page deep-links into this mode via `onNavigate("practice", { source: "bookmarked" })`, and `PracticeMode` honors `initialSource === "bookmarked"` to preselect the source on entry.
- **Global mission color theme** (`src/lib/missionThemes.ts`, `src/index.css` `.theme-mission-*`, `src/pages/Settings.tsx`, `src/components/ThemeChip.tsx`): one user-selectable color theme that recolors every mission's Mission Detail, Set Test, and Study Mode pages at once. A **theme chip** in the sidebar footer (above the light/dark toggles, rendered by `ThemeChip` in `App.tsx`) shows the current theme's gradient swatch + label and opens a popover with the same 6-tile picker so users can swap themes from any page without visiting Settings; the chip collapses to a swatch-only square when the sidebar is collapsed. Six themes ship by default — **Sunrise** (orange→pink, the brand, default), **Twilight** (violet/pink/fuchsia, the legacy palette), **Ocean** (sky/blue/cyan), **Forest** (emerald/teal), **Ember** (amber/red), and **Royal** (indigo/purple). Each theme defines a hero gradient (used in MissionDetail's hero card), a 3-stop set-accent palette (stripes, pills, icons, buttons for Set 1/2/3 cards), a 3-stop study-accent palette (group-select cards in StudyMode), and a CSS class `.theme-mission-<id>` that remaps Tailwind's `--color-violet-*` and `--color-fuchsia-*` palette CSS variables to the theme's two color families. The remap technique cascades through entire page subtrees, so every existing `bg-violet-500`, `text-fuchsia-700`, `border-violet-200`, etc. inside a themed wrapper picks up the new color automatically with zero per-className changes. The selection is stored in `localStorage` under `gre_global_theme` (a single theme id) and exposed through `AppContext` via `globalThemeId`, `globalTheme`, and `setGlobalTheme(id)`. The Settings page has a **Mission Color Theme** section with a 6-tile picker showing each theme's gradient preview, label, and description, with the active tile highlighted by a primary-color ring and check icon.
- **Mission Detail page** (`src/pages/MissionDetail.tsx`): standalone `mission-detail` route that opens when a mission card is clicked from the dashboard's mission grid, the "Resume Mission" CTA, the daily-agenda study tile, or any mission tile inside `StudyMode`'s belt grid. It accepts a `missionDay` param and renders an orange/pink gradient hero ("All 30 Words" + mountain SVG + start/continue button + reward chips), a horizontal roadmap of Set 1 → Set 2 → Set 3 → Mission Test nodes (locked when sets are incomplete), a 4-card grid of the three Sets plus the Mission Test card (with MC / Fill-in-the-Blank / True-False breakdown and lock state), a Mission Progress 4-stat row (words mastered, accuracy, streak, mission XP) computed from `useApp()` state and `loadMissionTestScores`/`loadMissionTestAttempts`, a Quick Actions row (Continue / Review / Practice Weak / Vocabulary), and a Tip card. Navigation: Sets and "Start Learning" deep-link into `study` via the first matching `wordId` so users land directly in the flashcard view; Mission Test routes to `mission-test`. The legacy in-page `group-select` view in `StudyMode` remains as a defensive fallback when no `onNavigate` is provided.
