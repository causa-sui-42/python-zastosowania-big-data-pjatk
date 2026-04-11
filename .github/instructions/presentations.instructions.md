---
description: "Use when creating or editing Markdown presentation files (.md) intended as lecture slides. Ensures Marp compatibility, proper slide structure, and teaching style."
applyTo: "presentations/**/*.md"
---

# Presentation Standards

## Format
- Use `---` as slide separators (Marp / reveal.js compatible)
- Include Marp front matter at the top: `marp: true`, `paginate: true`
- One concept per slide — if you need "also", make a new slide

## Structure
Every presentation must include: Title → Agenda → Motivation → Content → Demo → Pitfalls → Takeaways → Q&A

## Code Blocks
- Always specify language: ` ```python `
- Code must be complete and runnable (no pseudo-code)
- Keep code under 15 lines per slide
- Use `# 👈 Note this` style comments for highlighting

## Language
- All slide content must be in **Polish**, with English technical terms preserved (e.g., "DataFrame", "SparkSession")

## Style
- Use emojis in slide titles: 🎯💡🔑⚠️🤔
- Max 6-7 bullet points per slide
- Include "Think about it 🤔" interactive moments
- Add speaker notes with `<!-- notes -->` when helpful
