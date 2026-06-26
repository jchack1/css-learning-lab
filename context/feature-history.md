## List all completed features here with a short description and date they were implemented

---

### 2026-06-25 — Mobile-responsive layout

**Sidebar** (`src/components/Sidebar/Sidebar.module.css`)
On mobile (≤768px), the sidebar switches from a static flex column to a `position: fixed` overlay drawer that slides in/out via `transform` rather than `width`. Sidebar width increases to 260px for better touch targets.

**Overlay backdrop** (`src/App.tsx`, `src/App.module.css`)
A semi-transparent overlay div renders behind the open sidebar on mobile. Clicking it closes the sidebar. Hidden on desktop via `display: none`; shown only in the mobile media query.

**Stacked layout** (`src/App.module.css`, `src/components/Canvas/Canvas.module.css`, `src/components/LessonPanel/LessonPanel.module.css`)
On mobile, `main` switches to `flex-direction: column`. Canvas gets a fixed `38vh` height; LessonPanel fills the remaining space. LessonPanel border switches from `border-left` to `border-top` when stacked.

**Default closed on mobile** (`src/App.tsx`)
`sidebarOpen` initializes to `false` when `window.innerWidth <= 768`, so the menu starts closed on phones. Selecting a lesson on mobile also auto-closes the sidebar.

Desktop layout and behavior are unchanged.

---

### 2026-06-25 — 10 new modern/programmatic CSS lessons

**New lessons added** (`src/content/modern-css/`) — focused on features that previously required Sass/Less or JavaScript:

| Order | Title | Baseline | Difficulty |
|---|---|---|---|
| 210 | CSS Nesting (`&`) | newly available 2023 | intermediate |
| 215 | `@property` | newly available 2024 | advanced |
| 220 | `:where()` | widely available | intermediate |
| 225 | `:focus-visible` | widely available 2022 | intermediate |
| 230 | `text-underline-offset` | widely available 2022 | beginner |
| 235 | `color-scheme` | newly available 2022 | beginner |
| 240 | `inset` | widely available 2021 | beginner |
| 245 | `scale` & `rotate` (individual transforms) | widely available 2022 | intermediate |
| 250 | `prefers-color-scheme` | widely available 2020 | intermediate |
| 255 | `prefers-reduced-motion` | widely available 2020 | intermediate |

CSS nesting challenge validates with `targetSelector: ".card"` — the nested `&:hover { border-color }` block content is included in the extracted block and checked with `.includes()`. `@property` uses no `targetSelector` and validates on `syntax: '<number>'` existing in the whole CSS string. `:where()` lesson has no conflicting `.prose h2` rule in startingCSS — the user adds the base rule with zero-specificity, letting `.highlight` override it cleanly. Individual transforms demo shows two side-by-side cards: broken (old `transform:` overwrites the tilt) vs. working (new `scale:` stacks independently). `prefers-color-scheme` and `prefers-reduced-motion` validate on the property value inside the `@media` block — validator finds the selector inside the at-rule via brace-depth traversal. `lesson-index.json` updated.

---

### 2026-06-25 — 5 new modern CSS lessons (post-2022)

**New lessons added** (`src/content/modern-css/`)

| Order | Title | Baseline | Difficulty |
|---|---|---|---|
| 185 | accent-color | widely available 2022 | beginner |
| 190 | scroll-snap (scroll-snap-align) | widely available | intermediate |
| 195 | backdrop-filter | newly available 2022 | intermediate |
| 200 | oklch() | newly available 2023 | intermediate |
| 205 | overscroll-behavior | widely available 2022 | intermediate |

`accent-color` targets the form container with one property. `scroll-snap` pre-fills `scroll-snap-type: x mandatory` on the container; the user adds `scroll-snap-align: start` to cards. `backdrop-filter` uses colored CSS blobs behind a translucent card so the blur effect is immediately visible. `oklch()` shows a 3-swatch palette with a gray placeholder middle swatch; the user completes it with `oklch(65% 0.2 145)`. `overscroll-behavior` uses two nested scroll containers — scrolling the inner panel past its end chains to the outer page, which the user fixes with `contain`. `lesson-index.json` updated.

---

### 2026-06-25 — 10 new lessons

**New lessons added** (`src/content/`)

| Order | Title | Category | Difficulty |
|---|---|---|---|
| 100 | align-items | Flexbox | beginner |
| 110 | place-items | Grid | beginner |
| 120 | grid-template-areas | Grid | intermediate |
| 130 | grid-column (span) | Grid | intermediate |
| 140 | Custom Properties (--var) | Modern CSS | beginner |
| 150 | min() | Sizing | intermediate |
| 155 | margin-inline | Modern CSS | beginner |
| 160 | object-fit | Modern CSS | beginner |
| 170 | :is() | Modern CSS | intermediate |
| 180 | position: sticky | Modern CSS | intermediate |

Each lesson includes `oldWay`, `modernWay`, `challenge`, `expectedCSS`, and `realWorldUsage`. Several include `alternatives`. The `css-custom-properties` lesson uses a pre-broken `var(--brand-color, fallback)` pattern so the variable becomes live the moment the user defines it. The `grid-template-areas` lesson validates via a substring check on the `"header header"` row. The `:is()` lesson uses `.post :is(h2, h3) a` as the targetSelector to ensure correct specificity over the `.post a` base rule.

`src/lesson-index.json` updated: 10 new entries added to `covered`, `missing` list revised.

---

### 2026-06-25 — Real-world usage section

**`realWorldUsage` field** (`src/types/lesson.ts`, all 9 lesson JSON files)
New optional string field on `Lesson`. Added to all current lessons with concrete production scenarios: specific UI patterns, design system conventions, or well-known use cases that answer "when would I actually reach for this?" The field is omitted from lessons where the real-world context is already obvious from the challenge.

**"In the real world" toggle** (`src/components/PropertyInfo/`)
Collapsible button appears below the Old way / Modern CSS comparison whenever `realWorldUsage` is present. Always visible (not gated behind completion). State resets on lesson change via the existing `key={lesson.id}` on `PropertyInfo`.

**Content-generation guide updated** (`docs/content-generation.md`)
New `realWorldUsage` section documents when to include the field, format guidance, and what to avoid. Field reference table updated. Quality checklist extended with a `realWorldUsage` line item.

---

### 2026-06-17 — Initial build

**Project scaffold**
Vite + React + TypeScript project created with CSS Modules. Dark theme established via CSS custom properties in `src/index.css`.

**Split-screen layout**
Two-column app layout: live canvas on the left, lesson panel (property info + CSS editor) on the right.

**Live CSS preview (iframe + postMessage)**
Canvas renders lesson HTML/CSS in a sandboxed iframe (`sandbox="allow-scripts"`). CSS changes are applied live via `postMessage` into the iframe without rebuilding the document. Initial CSS is baked into the srcdoc via `buildSrcdoc()` in `src/engine/cssRunner.ts`.

**CSS validation engine**
`src/engine/validator.ts` validates user CSS against expected property/value pairs. Scoped to a `targetSelector` using a brace-depth CSS block extractor (`getBlocksForSelector`). Gives targeted feedback when a property exists on the wrong selector. Value check is scoped to the specific property declaration (not the whole block).

**Code editor**
Textarea-based CSS editor with:
- Tab key inserts 2 spaces (cursor restored via `requestAnimationFrame`)
- Ctrl+Enter triggers CSS check (with visible shortcut hint)
- Reset button restores starting CSS

**Dynamic lesson loading**
Lessons are discovered automatically from `src/content/**/*.json` via `import.meta.glob`. Adding a new lesson only requires dropping a JSON file — no component changes needed.

**Content: 9 lessons added**
Lessons across four categories, ordered modern-first by `order` field:

| Order | Title | Category |
|---|---|---|
| 10 | color-mix() | Modern CSS |
| 20 | :has() | Modern CSS |
| 30 | @container | Modern CSS |
| 40 | text-wrap: balance | Modern CSS |
| 50 | clamp() | Sizing |
| 60 | aspect-ratio | Sizing |
| 70 | grid-template-columns | Grid |
| 80 | justify-content | Flexbox |
| 90 | gap | Flexbox / Grid |

**Collapsible category sidebar**
Left sidebar replaces the flat horizontal nav. Groups lessons by category, highlights the active lesson, shows a difficulty dot per lesson (green/yellow/red). Collapses to 0px via CSS transition. Toggle button lives in the app header.

**Prev / Next lesson navigation**
Navigation strip at the top of the lesson panel shows current position (`3 / 9`) with ← Prev and Next → buttons. Disabled at the first and last lesson. Switching lessons resets the editor and validation state.

**Content generation docs**
`docs/content-generation.md` — merged guide covering JSON structure, field reference, difficulty levels, browser support guidance, and a quality checklist for authoring new lessons.

---

### 2026-06-17 — Lesson completion tracking

**Progress storage** (`src/progress/progressStorage.ts`)
Reads and writes completed lesson IDs to `localStorage` under the key `css-lab-completions`. Handles missing/malformed storage values gracefully.

**useProgress hook** (`src/progress/useProgress.ts`)
React hook exposing `completedIds`, `markComplete(id)`, and `isCompleted(id)`. State is initialised from localStorage on mount and kept in sync on each completion.

**Sidebar completion indicators** (`src/components/Sidebar/`)
Each lesson now shows `✓` (green) when completed or `○` (faint) when not. The completion mark sits to the left of the lesson title alongside the existing difficulty dot.

**Lesson page completion status** (`src/components/PropertyInfo/`)
A small status line below the lesson title reads `✓ Completed` (green) or `○ Not completed yet` (faint grey), updating immediately after the user solves the challenge.

**Validation integration** (`src/components/LessonPanel/LessonPanel.tsx`)
`onComplete(lesson.id)` is called only when `validateCSS` returns `passed: true` — completion is never awarded for opening, viewing examples, or clicking buttons.

---

### 2026-06-17 — Other solutions

**`AlternativeSolution` type** (`src/types/lesson.ts`)
New optional `alternatives` field on `Lesson`: an array of `{ name, description, css }` objects representing other modern approaches to the same challenge.

**"See other solutions" button** (`src/components/PropertyInfo/`)
Appears below the old way / modern CSS comparison only after the lesson is completed and only when `alternatives` is non-empty. Clicking toggles an alternatives panel showing each alternative's name, description, and CSS code block. State resets on lesson change via `key={lesson.id}`.

**Alternatives are strictly modern approaches** — they must not duplicate what is already shown in `oldWay`. Guidance added to `docs/content-generation.md`.

---

### 2026-06-17 — Accessibility and CSS colour system

**Contrast fix: `--color-text-faint`** (`src/index.css`)
Raised `--color-text-faint` from `#475569` (~2.3:1) to `#7a8ea5` (~5.2:1 on surface), clearing WCAG AA for all affected elements: the prev/next progress counter, completion status line, "Old Way"/"Modern CSS" comparison labels, "Other Solutions" heading, sidebar category headings, and the editor header label.

**LessonNav category label** (`src/components/LessonNav/LessonNav.module.css`)
Replaced `opacity: 0.7` on the inherited muted text with an explicit `color: var(--color-text-faint)`. The opacity approach silently reduced contrast below AA; the explicit colour is now accessible and visually equivalent.

**Colour variables for difficulty / status colours** (`src/index.css`)
Extracted three hardcoded hex values that appeared in multiple component files into named CSS custom properties:
- `--color-success` / `-dim` / `-border` (`#4ade80` green)
- `--color-warning` / `-dim` / `-border` (`#facc15` yellow)
- `--color-error` / `-dim` / `-border` (`#fb7185` pink)

All hardcoded instances in `PropertyInfo.module.css`, `Sidebar.module.css`, and `CodeEditor.module.css` replaced with the new variables.

---

### 2026-06-17 — Rainbow animation on "See other solutions"

**`rainbowBorder` keyframe animation** (`src/components/PropertyInfo/PropertyInfo.module.css`)
When a completed lesson has alternatives, the "See other solutions" button now animates its border through the full rainbow spectrum with a matching glow (`box-shadow`) on each frame — 3 passes at 1.2s each, then stops. No component changes required: the button only mounts after completion, so the animation always plays fresh on arrival. Lesson changes remount the component via `key={lesson.id}`, resetting the animation naturally.

---

### 2026-06-17 — Code review fixes

**Validator: value check scoped to declaration** (`src/engine/validator.ts`)
`checkProperties` previously checked if the expected value appeared anywhere in the CSS block, causing false positives (e.g. `gap: 2rem` passing a `gap: 1rem` check if `1rem` appeared on another property). Now extracts just the declaration value (`:` → `;`/`}`) before checking.

**Validator: guard against missing expectedCSS** (`src/engine/validator.ts`)
Added an early return if `expectedCSS` is `undefined` or not an object, preventing a `TypeError: Cannot convert undefined or null to object` crash when a lesson JSON is malformed.

**Canvas: onLoad race fix** (`src/components/Canvas/Canvas.tsx`)
Added an `onLoad` handler that re-sends `cssRef.current` after every srcdoc load. Fixes the race where a CSS change arriving while the iframe was loading a new lesson would be silently dropped.

**LessonPanel: removed redundant useEffect** (`src/components/LessonPanel/LessonPanel.tsx`)
Replaced a `useEffect` that cleared validation state on CSS change with a local `handleCSSChange` wrapper. Clears state synchronously at the event site, avoiding an extra render cycle per keystroke and aligning with the project coding standard ("use `useEffect` only when there is no better alternative").
