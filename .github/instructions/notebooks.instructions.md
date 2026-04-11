---
description: "Use when creating or editing Jupyter notebook (.ipynb) files for student exercises, labs, or homework. Ensures Colab compatibility, proper structure, and testing patterns."
applyTo: "**/*.ipynb"
---

# Notebook Exercise Standards

## Colab Compatibility
- First code cell must be setup: imports, `!pip install -q` for non-standard packages
- Never rely on local file paths — use URLs for datasets or generate inline
- Test that all cells run top-to-bottom without errors (Restart & Run All)

## Exercise Cell Pattern
Every exercise must have this sequence:
1. **Markdown cell** — Instructions with difficulty rating (⭐), expected output
2. **Code cell** — Starter code with `# TODO` and `...` placeholders
3. **Code cell** — Hint (collapsible: `# @title 💡 Hint`)
4. **Code cell** — Test assertions (`# @title ✅ Test`)

## Language
- All Markdown cells (instructions, descriptions, hints, feedback) must be in **Polish**
- Keep English technical terms as-is (e.g., "DataFrame", "assert", "list comprehension")
- Code comments may be in English or Polish, prefer Polish for student-facing notebooks

## Code Style
- Python 3.10+ with type hints
- PEP 8 compliant
- Use f-strings, not `.format()` or `%`
- Include output comments: `# Output: 42`

## Testing
- Use `assert` with descriptive error messages
- Print `"✅ Correct! 🎉"` on success
- Catch common errors gracefully with try/except in test cells
