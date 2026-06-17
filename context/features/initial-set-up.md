I want to build a React + Vite app that is an interactive CSS learning lab.

The goal:
This app is for practicing modern CSS concepts through experimentation, not reading. It should help developers who know CSS basics but have fallen behind on newer CSS properties and patterns.

Important product direction:

- Do NOT build a generic tutorial site.
- Do NOT create multiple choice quizzes.
- The user should learn by typing CSS and seeing the result.
- The app should feel like an interactive reference + playground.

Initial UI:
Create a split-screen layout.

Left side:

- A live preview canvas.
- The canvas contains HTML elements that update based on user-entered CSS.
- Show the "current" state of the layout.
- This should be visually useful for understanding CSS changes.

Right side:

- Lesson information.
- CSS property explanation.
- Why the property exists / what problem it solves.
- Old/common workaround if applicable.
- Modern CSS approach.
- A code editor area where the user writes CSS.
- Changes in the editor should update the preview.

Architecture requirements:

- Lessons should be data-driven.
- Do not hardcode lesson content into React components.
- Lessons should live in JSON files that can easily be added later.

Example lesson structure:

{
"id": "justify-content",
"title": "justify-content",
"category": "Flexbox",
"difficulty": "beginner",
"description": "...",
"oldWay": "...",
"modernWay": "...",
"html": "...",
"startingCSS": "...",
"expectedCSS": {
"property": "value"
}
}

Build the app so adding a new lesson requires adding a JSON file, not modifying components.

Create a small CSS lesson engine:

- Load lesson data.
- Inject user CSS into the preview.
- Update preview live.
- Keep the preview sandboxed enough that user CSS does not break the entire app.

For validation:
Do not compare raw text.
Eventually the app should be able to compare the computed styles of elements using getComputedStyle().
For now, create a simple validation structure that can be expanded.

Project structure:
Use a clean component-based React structure.

Suggested organization:

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

Use CSS Modules for styling.
Do not use Tailwind.
The purpose of this project is partially to practice real CSS again.

Create:

- the initial components
- lesson loader
- example lesson data
- working live CSS preview

Start with 3 example lessons:

1. gap (replacing margin spacing hacks)
2. justify-content
3. grid-template-columns

Also create:

- docs/content-generation.md

This file should explain how future lessons should be created, including:

- what CSS properties are worth adding
- prioritizing widely used modern CSS
- including browser support information
- including old vs modern approaches
- including an interactive challenge

Keep the implementation simple and extensible. Avoid adding authentication, databases, backend, or unnecessary dependencies.
