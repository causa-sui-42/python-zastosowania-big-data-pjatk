---
description: "Create a new lecture presentation on a given topic. Generates Markdown slides (Marp-compatible) with engaging visual style, code examples, and progressive structure."
agent: "lecturer"
---

Create a lecture presentation for university students on the following topic:

**Topic:** $input

## Requirements

- Generate as a **Markdown file** with Marp front matter for PDF/PPTX export
- Use slide separator `---` between slides
- Follow the engaging teaching style: emojis, humor, real-world analogies
- Include **runnable Python code examples** on relevant slides
- Structure: Title → Agenda → Motivation → Core Content → Demo → Pitfalls → Takeaways → Q&A
- Target **45 minutes** (~25-35 slides) unless specified otherwise
- Save to `presentations/` directory
