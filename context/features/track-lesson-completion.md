Add local progress tracking.

The app should remember which lessons the user has successfully completed.

# Requirements:

Use localStorage
No backend
No account system

Store completed lesson IDs.

## Example:

```
[
"gap",
"justify-content",
"grid-template-columns"
]
```

When a lesson is successfully solved:

Save the lesson ID
Update the UI immediately
UI updates
Sidebar

Show completion state next to lessons.

## Example:

Flexbox

✓ gap
○ justify-content
✓ align-items

The completed indicator should be subtle and fit the dark retro-futuristic design.

# Lesson page

Show completion status near the lesson title.

## Example:

justify-content

✓ Completed

If not completed:

Not completed yet

# Validation behavior

Only mark a lesson completed when the existing validation system determines the user's CSS has achieved the goal.

Do not mark completion based on:

opening a lesson
viewing examples
clicking buttons

Completion should mean the user actually solved the challenge.

# Architecture

Keep this logic separate.

Create something like:

src/
progress/
progressStorage.js
useProgress.js

# Responsibilities:

progressStorage:

read completed lessons
save completed lessons
check completion status

useProgress:

expose React-friendly hooks

Do not put localStorage logic directly inside components.
