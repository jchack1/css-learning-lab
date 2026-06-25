# Content Generation Guide

This document describes how to research, create, and add new lessons to the CSS Learning Lab.

---

## How lessons work

Each lesson is a `.json` file placed in `src/content/`. The app discovers all JSON files in that directory tree automatically — no component changes needed.

Organize files by topic:

```
src/content/
  flex/
  grid/
  sizing/
  modern-css/
  animations/
```

---

## Lesson JSON structure

```json
{
  "id": "unique-kebab-case-id",
  "title": "property-name",
  "category": "Flexbox",
  "difficulty": "beginner",
  "order": 10,
  "description": "What the property does. One or two sentences. Focus on purpose, not syntax.",
  "oldWay": "/* CSS snippet showing the old approach */\n.thing { margin-right: 1rem; }",
  "modernWay": "/* CSS snippet showing the modern approach */\n.container { gap: 1rem; }",
  "html": "<div class=\"container\">\n  <div class=\"item\">One</div>\n</div>",
  "startingCSS": ".container {\n  display: flex;\n}\n\n.item {\n  background: #a855f7;\n  color: white;\n  padding: 1rem;\n  border-radius: 6px;\n}",
  "challenge": "A single clear instruction telling the user what to accomplish.",
  "targetSelector": ".container",
  "expectedCSS": {
    "gap": "1rem"
  },
  "realWorldUsage": "One or two sentences describing where and why developers actually reach for this property in production code."
}
```

### Field reference

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique across all lessons. Kebab-case. |
| `title` | yes | Usually the CSS property name. |
| `category` | yes | Groups lessons in the nav. E.g. `Flexbox`, `Grid`, `Modern CSS`. |
| `difficulty` | yes | `beginner`, `intermediate`, or `advanced`. |
| `order` | no | Controls nav sort order. Lower numbers appear first. Use increments of 10. |
| `description` | yes | What it does and why it exists. Keep it concise. |
| `oldWay` | yes | Real CSS snippet. Show the pain of the old approach. |
| `modernWay` | yes | The clean modern CSS. Match what you're teaching. |
| `html` | yes | The HTML rendered in the preview. Must be valid. |
| `startingCSS` | yes | CSS pre-filled in the editor when the lesson loads. |
| `challenge` | yes | One clear instruction. Not a question — a task. |
| `targetSelector` | no | CSS selector the validator checks. Defaults to `.container`. |
| `expectedCSS` | yes | Property-value pairs the validator checks for. |
| `realWorldUsage` | no | Where developers actually use this in production. See below. |

---

## Lesson creation process

When adding a new lesson:

1. **Research** — check MDN, Can I Use, or the CSS Working Group spec for accurate property behavior and support status
2. **Evaluate** — confirm the property meets the selection criteria below
3. **Write** — create the JSON file with working HTML and CSS examples
4. **Verify** — load the lesson in the app and confirm the starting state and challenge both make sense visually
5. **Track** — update `src/lesson-index.json` with the new topic

---

## Selecting good lesson candidates

### Priority criteria

1. **Widely used** — the property solves a real problem developers face regularly
2. **Modern** — added in the last 5–10 years, or underused despite broad support
3. **Has an old workaround** — contrast makes the lesson more meaningful
4. **Visual** — the change should be visible and immediate in the preview

### High priority

- `gap` — replaces margin hacks
- `aspect-ratio` — replaces padding-bottom hacks
- `clamp()`, `min()`, `max()` — fluid sizing
- `justify-content`, `align-items`, `place-items`, `place-content`
- `grid-template-columns`, `grid-template-rows`, `grid-template-areas`
- `grid-column`, `grid-row` — item placement
- `container-type` + `@container` — container queries
- logical properties — `margin-inline`, `padding-block`, etc.
- modern selectors — `:is()`, `:where()`, `:has()`

### Medium priority

- advanced flexbox behavior
- custom properties (`--var`)
- cascade layers (`@layer`)
- newer color functions (`color-mix()`, `oklch()`)
- `text-wrap: balance`
- `scrollbar-gutter`

### Lower priority

Avoid unless there is a strong teaching reason:

- obscure CSS hacks
- deprecated properties
- browser-specific features
- features rarely used in production

---

## Difficulty levels

### Beginner

Common daily CSS that every frontend developer uses:

- layout, spacing, alignment, sizing
- Examples: `gap`, `justify-content`, `grid-template-columns`, `aspect-ratio`

### Intermediate

Newer or more powerful concepts with a learning curve:

- responsive behavior, advanced layout, selectors, CSS architecture
- Examples: `container-type`, `@container`, logical properties, `@layer`

### Advanced

Deeper CSS capabilities that require more context:

- animations, complex selectors, advanced rendering
- Examples: `animation-timeline`, scroll-driven animations, `@counter-style`

---

## Browser support guidance

- **Baseline widely available** — safe to use everywhere, no note needed
- **Baseline newly available** — supported in all modern browsers, may note the year
- **Limited availability** — add a note to `description` and reconsider priority

For limited-support features, note it in `description`:

```
"description": "Container queries let you style elements based on their container size rather than the viewport. Supported in all modern browsers since late 2023."
```

Check [caniuse.com](https://caniuse.com) or [web.dev/baseline](https://web.dev/baseline) before writing the lesson.

---

## Writing a good challenge

The challenge is the most important field. It should:

- Be a single clear task
- Describe the visual outcome, not the syntax
- Not give away the answer

**Good challenges:**
- "Add spacing between the flex items using only the container."
- "Spread the nav links so the first is on the left and the last is on the right."
- "Create a 3-column grid where each column takes an equal share of the space."

**Avoid:**
- "Use `gap: 1rem`." — gives it away
- "Do you know what property to use here?" — not a task
- "Make it look like the modern way." — too vague

---

## Writing the old way

Show real pain. Don't show a simplified version of the old approach:

```json
"oldWay": "/* Float-based clearfix required just to wrap columns */\n.container::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.item {\n  float: left;\n  width: calc(33.333% - 14px);\n  margin-right: 20px;\n}\n.item:nth-child(3n) {\n  margin-right: 0;\n}"
```

This contrast makes the modern approach feel meaningful, not trivial. Do not criticize older techniques — many existed because newer CSS didn't yet.

---

## Alternative solutions

Some lessons can include an `alternatives` array showing other modern approaches to the same problem.

```json
"alternatives": [
  {
    "name": "Grid layout",
    "description": "Useful when you already have a grid container — place-items: center is more concise.",
    "css": ".container {\n  display: grid;\n  place-items: center;\n}"
  }
]
```

Alternatives are hidden until the user completes the lesson, then revealed via a "See other solutions" button. The goal is to teach that CSS often has multiple valid approaches and that the primary solution is chosen intentionally.

### When to include alternatives

- Multiple genuinely modern approaches exist for the same task (e.g. flexbox vs. grid for centering)
- Each approach has a meaningful use case or tradeoff worth explaining

### When NOT to include alternatives

- The only alternative is the old way — that is already shown in `oldWay`, do not repeat it here
- The alternative is technically possible but poor practice
- There is no meaningful tradeoff to explain

### Good example

Primary: `gap` on a flex container  
Alternative: `gap` on a grid container with a note about context

### Avoid

Primary: `gap`  
Alternative: individual margins — this belongs in `oldWay`, not here

---

## Real-world usage

Some lessons include a `realWorldUsage` string describing where and why developers actually reach for this property in production code. It is displayed as a collapsible "In the real world" section in the lesson panel, always visible (not gated behind completion).

```json
"realWorldUsage": "The most universal use is video embeds — aspect-ratio: 16 / 9 on a wrapper keeps any embedded video at the correct ratio at any container width."
```

### When to include

Include `realWorldUsage` when there is a concrete, common production scenario that is not already covered by `description`, `oldWay`, or `modernWay`. The goal is to help the user answer "when would I actually reach for this?" after completing the lesson.

Good candidates:

- A specific UI pattern the property solves (e.g. "navbar with logo left, links right")
- A production convention or design system pattern (e.g. "spacing in the container, never on children")
- A well-known use case distinct from the challenge (e.g. "video embeds" for `aspect-ratio`, which teaches image cards)

### When NOT to include

- If the real-world use is already obvious from the challenge or description, leave it out
- Do not invent or speculate — only include uses you are confident are common in practice
- Keep it to one or two sentences; this is context, not a tutorial

### Format

One or two sentences. Name the specific UI pattern or context. Avoid vague generalities like "used in many projects" or "helpful for responsive design."

---

## Quality checklist

Before committing a lesson:

- [ ] The property is useful in everyday frontend work
- [ ] Browser support is acceptable (Baseline widely or newly available)
- [ ] The HTML example works and is visually clear
- [ ] The challenge describes a visual outcome, not a syntax answer
- [ ] The explanation is concise — two sentences max
- [ ] The user must type CSS to solve it (nothing is pre-solved)
- [ ] The `targetSelector` and `expectedCSS` match what the validator should check
- [ ] The lesson fits the existing JSON structure
- [ ] If `alternatives` are included, they are modern approaches distinct from `oldWay`
- [ ] If `realWorldUsage` is included, it names a specific production pattern not already covered by description or challenge

---

## Lesson tracking

Keep `src/lesson-index.json` up to date as lessons are added:

```json
{
  "covered": [
    "gap",
    "justify-content",
    "grid-template-columns"
  ],
  "missing": [
    "aspect-ratio",
    "container queries",
    "logical properties",
    "clamp()"
  ]
}
```

This gives a quick picture of what's been covered and what's next without reading every file in `src/content/`.
