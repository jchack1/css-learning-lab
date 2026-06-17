# CSS Learning Lab - Project Overview

## Purpose

CSS Learning Lab is an interactive tool for practicing and understanding modern CSS concepts through hands-on experimentation.

The goal is not to create another CSS documentation site or tutorial platform. The goal is to help developers strengthen CSS knowledge by:

- Seeing CSS changes happen visually
- Experimenting with properties directly
- Understanding modern CSS patterns
- Comparing older approaches with newer CSS solutions
- Building muscle memory through writing CSS

This project is especially focused on helping developers who know CSS fundamentals but have become less familiar with newer CSS features due to relying on frameworks, utility classes, component libraries, or AI-generated code.

The core idea:

**Learn CSS by changing CSS and observing the result.**

---

# Product Vision

The final application should feel like an interactive CSS reference combined with a playground.

A user should be able to:

1. Open a CSS concept
2. Read a short explanation
3. See a visual example
4. Write CSS themselves
5. Watch the layout change immediately
6. Understand why the property exists and when to use it

The experience should prioritize practice over reading.

---

# Core User Experience

## Split-Screen Layout

The application uses a two-column layout.

## Left Side: Live Canvas

The left side displays a live preview area.

The canvas contains:

- HTML elements relevant to the lesson
- A starting layout
- User-applied CSS changes

The user should immediately see the effect of their CSS.

Examples:

- A flex container changing alignment
- A grid changing columns
- Spacing changing with `gap`
- Elements resizing with modern layout properties

The canvas is the main learning area.

---

## Right Side: Lesson + Experiment Panel

The right side contains the learning content and CSS editor.

Sections:

### Property Explanation

Contains:

- CSS property name
- What it does
- What problem it solves
- When to use it
- Related properties

Example:

```
justify-content

Controls how flex items are distributed along the main axis.

Useful for:
- spacing items
- centering content
- replacing older spacing hacks
```

---

### Old Way vs Modern Way

Many lessons should include historical context.

Example:

Old approach:

```css
.item {
  margin-left: auto;
}
```

Modern approach:

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

This helps users understand why newer CSS exists.

---

### CSS Editor

The user writes CSS directly.

The editor should:

- Accept CSS input
- Apply changes live
- Feel like a code editor
- Encourage typing rather than selecting answers

Typing is intentional because the goal is memory and familiarity, not recognition.

A user should leave thinking:

"I know how to write this property."

Not:

"I recognized the right option."

---

# Learning Model

Lessons are challenge-based.

Each lesson introduces a CSS concept and gives the user something visual to accomplish.

Examples:

## gap

Goal:
Replace individual margins with modern spacing.

## justify-content

Goal:
Distribute flex items.

## grid-template-columns

Goal:
Create a responsive grid layout.

---

# Content System

Lessons should be data-driven.

React components should not contain lesson-specific content.

Each lesson should be a separate data file.

Example:

```json
{
  "id": "gap",
  "title": "gap",
  "category": "Layout",
  "difficulty": "beginner",

  "description": "Controls spacing between flex or grid items.",

  "oldWay": "...",

  "modernWay": "...",

  "html": "...",

  "startingCSS": "...",

  "challenge": "...",

  "expectedCSS": {
    "gap": "1rem"
  }
}
```

Adding new lessons should require creating a new content file, not changing application logic.

---

# Future Content Expansion

The project should support adding new CSS topics over time.

Priority areas:

## Modern Layout

- flexbox
- grid
- gap
- alignment
- sizing
- positioning

## Modern CSS Features

- container queries
- logical properties
- aspect-ratio
- clamp()
- min()
- max()
- color functions

## Advanced Topics

- animations
- transitions
- selectors
- cascade layers
- custom properties

---

# AI / Content Generation Approach

AI should assist with content creation, not run the application.

The application itself should remain simple and static.

Future workflow:

1. Identify a useful CSS property
2. Generate a lesson file
3. Review the lesson
4. Add it to the content folder

Potential AI workflow:

- Claude Code creates lesson JSON files
- Human reviews examples and explanations
- Lessons are committed with the application

Avoid adding unnecessary runtime AI features.

---

# Technology Stack

## Frontend

- Vite
- React
- JavaScript or TypeScript

## Styling

Preferred:

- CSS Modules

Reason:

This project is partially a way to practice real CSS again.

Avoid:

- Tailwind CSS / libraries

The project should require writing and organizing CSS.

---

# Visual Design Direction

The interface should feel like a focused but slightly playful “CSS lab” rather than a traditional learning platform or documentation site.

The overall aesthetic leans toward a dark-mode, retro-futuristic / experimental coding environment. It should feel technical and developer-oriented, but with more personality and visual interest than typical SaaS dashboards.

## Core Feel

- Dark, immersive workspace
- Subtle retro-futuristic or “lab-like” tone
- Slightly quirky and experimental rather than corporate
- Designed to support focus on visual CSS changes, not distract from them

## Layout Philosophy

The UI is intentionally split:

- Left side: live visual canvas (primary learning feedback loop)
- Right side: lesson + CSS input area (instruction + experimentation)

The design should reinforce this separation clearly while keeping both sides visually balanced.

## Color Approach

A dark base with controlled neon accents.

Base colors:

- Deep near-black background (not pure black)
- Slightly lighter panels for separation
- Soft contrast for readability

Accent colors:

- Neon cyan
- Electric purple
- Soft pink / magenta
- Occasional lime or green for success states

Accent colors are used sparingly for:

- active states
- highlights
- interactive feedback
- key UI signals

The goal is vibrancy without visual noise.

## Visual Style

- Subtle grid or texture in backgrounds (low contrast)
- Soft glow effects on interactive elements
- Minimal but intentional borders
- Slightly rounded UI surfaces
- Occasional animated feedback (e.g. when CSS changes apply)

The interface should feel like a “controlled experiment space” rather than a generic app.

## Typography

Clear separation between UI text and code:

- UI text: modern sans-serif (e.g. Inter, Space Grotesk, or similar)
- Code/editor: monospace font (e.g. JetBrains Mono)

This reinforces the distinction between instruction and experimentation.

## Inspiration References

The aesthetic direction draws loosely from:

- retro computing interfaces
- cyberpunk UI themes (used lightly, not exaggerated)
- creative coding tools and playgrounds
- developer tools with strong visual identity

The goal is not to mimic any one product, but to combine clarity with a slightly experimental feel.

## Design Principle

The CSS being learned is already visually expressive. The interface should stay calm enough to let those changes stand out, while still feeling engaging and distinctive.

The UI is a frame for experimentation, not the focus of attention.

# Suggested Project Structure

```
src/

  components/
    Canvas/
    LessonPanel/
    CodeEditor/
    PropertyInfo/

  engine/
    cssRunner.js
    validator.js

  lessons/
    loadLessons.js

  content/
    flex/
    grid/
    modern-css/

  styles/
```

---

# Validation

The application should not judge solutions by matching text.

Different valid CSS solutions should be allowed.

Future validation should inspect the rendered result.

Example:

```javascript
getComputedStyle(element);
```

The goal is:

"Did the user create the intended layout?"

Not:

"Did they type exactly this string?"

---

# Design Principles

## Keep it simple

Do not add:

- authentication
- databases
- backend services
- unnecessary dependencies

The value comes from the learning interaction.

---

## Prioritize practice

A short interactive example is better than a long explanation.

---

## Prefer modern CSS

Lessons should focus on CSS that is:

- currently relevant
- widely supported
- useful in everyday development

Avoid obscure tricks unless they are specifically educational.

---

# Success Criteria

The project is successful if a developer can:

- Discover a CSS property they forgot or never learned
- Understand why it exists
- Type it themselves
- See the result immediately
- Remember it the next time they need it

The end product should feel like:

"MDN examples, but interactive and practice-focused."
