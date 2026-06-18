## List all completed features here with a short description and date they were implemented

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

### 2026-06-17 — Code review fixes

**Validator: value check scoped to declaration** (`src/engine/validator.ts`)
`checkProperties` previously checked if the expected value appeared anywhere in the CSS block, causing false positives (e.g. `gap: 2rem` passing a `gap: 1rem` check if `1rem` appeared on another property). Now extracts just the declaration value (`:` → `;`/`}`) before checking.

**Validator: guard against missing expectedCSS** (`src/engine/validator.ts`)
Added an early return if `expectedCSS` is `undefined` or not an object, preventing a `TypeError: Cannot convert undefined or null to object` crash when a lesson JSON is malformed.

**Canvas: onLoad race fix** (`src/components/Canvas/Canvas.tsx`)
Added an `onLoad` handler that re-sends `cssRef.current` after every srcdoc load. Fixes the race where a CSS change arriving while the iframe was loading a new lesson would be silently dropped.

**LessonPanel: removed redundant useEffect** (`src/components/LessonPanel/LessonPanel.tsx`)
Replaced a `useEffect` that cleared validation state on CSS change with a local `handleCSSChange` wrapper. Clears state synchronously at the event site, avoiding an extra render cycle per keystroke and aligning with the project coding standard ("use `useEffect` only when there is no better alternative").
