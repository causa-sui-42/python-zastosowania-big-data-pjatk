---
description: "Create a new student exercise notebook for Google Colab. Generates a Jupyter notebook with guided examples, scaffolded exercises, automated tests, and hints."
agent: "lecturer"
---

Create a student exercise notebook for Google Colab on the following topic:

**Topic:** $input

## Requirements

- Generate as a **Jupyter notebook** (`.ipynb`) compatible with Google Colab
- Include **setup cell** with all needed imports and `!pip install` commands
- Include a **guided walkthrough example** before the exercises
- Create **5-7 exercises** with escalating difficulty (⭐ to ⭐⭐⭐)
- Each exercise must have:
  - Clear instructions in a Markdown cell
  - Starter code with `# TODO` placeholders
  - A hint cell (collapsible with `# @title`)
  - An automated test cell with assertions
- Use an **interesting, relatable dataset** (real or generated)
- Add a **bonus challenge** for advanced students
- End with a **summary** of what was practiced
- Save to `exercises/` directory
- Also create a **solutions notebook** with filled-in answers
