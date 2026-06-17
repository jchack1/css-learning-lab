The app should support showing users multiple valid ways to solve a CSS challenge.

The purpose is to teach that CSS often has multiple approaches, and the goal is understanding tradeoffs rather than memorizing one "correct" answer.

# Content changes

Update the lesson data structure to support alternative solutions.

Lessons should be able to include:

{
"solution": {
"primary": {
"description": "Modern recommended approach",
"css": "..."
},

    "alternatives": [
      {
        "name": "Alternative approach",
        "description": "When this might be useful",
        "css": "..."
      }
    ]

}
}

#Examples:

A lesson about centering might include:

Primary:

```
.container {
display: flex;
justify-content: center;
align-items: center;
}
```

Alternative:

```
.container {
display: grid;
place-items: center;
}
```

The UI should not show alternatives before the user experiments. They should appear after the lesson is completed or through a button like:

"See other solutions"

# The feature should communicate:

- multiple solutions exist
- the recommended solution is chosen intentionally
- different approaches have different use cases

Avoid presenting alternatives as "better" or "worse" without context.

# Update documentation

Also update:

`@docs/content-generation.md`

Add a section explaining alternative solutions.

When generating new lessons:

Include alternatives when multiple valid CSS approaches exist
Prefer modern recommended approaches as the primary solution
Explain when alternatives are useful
Avoid alternatives that are technically possible but poor practice

## Example:

### Good:

Primary:
gap

Alternative:
individual margins

Explanation:
"Older approach, still seen in existing codebases"

### Avoid:

Listing random CSS tricks just because they work.

# Implementation notes

Keep the current architecture.

Do not add:

- authentication
- database
- API
- new dependencies unless necessary

The goal is to make the learning experience better, not to expand the app unnecessarily.
