---
name: colab-exercise-creator
description: "Create student exercises and assignments as Jupyter Notebooks for Google Colab. Use when the user asks to create exercises, homework, assignments, labs, practice problems, or Colab notebooks for Python, Big Data, Cloud, or Data Science courses."
argument-hint: "Topic and difficulty, e.g. 'pandas DataFrames - intermediate'"
---

# Google Colab Exercise Creator

Create engaging, hands-on exercises as Jupyter Notebooks designed to run in Google Colab. Exercises teach Python, Big Data, Cloud Computing, and Data Science through guided practice.

## When to Use

- User asks to create **exercises**, **homework**, **assignments**, **labs**, or **practice problems**
- User wants a **Colab notebook**, **Jupyter notebook**, or **interactive worksheet**
- User needs student materials for Python, Big Data, Cloud, or Data Science courses

## Procedure

### Step 1: Determine Parameters

Before generating, confirm or infer:

1. **Topic** — Specific subject (e.g., "pandas GroupBy operations")
2. **Difficulty** — Beginner / Intermediate / Advanced. Default: **Intermediate**
3. **Duration** — Expected completion time. Default: **60 minutes**
4. **Exercise Count** — Number of exercises. Default: **5-7 exercises**
5. **Audience** — Undergraduate or Graduate? Default: **Undergraduate**
6. **Prerequisites** — What students should already know
7. **Include Solutions** — Create a separate solution notebook? Default: **Yes**

### Step 2: Structure the Notebook

Every exercise notebook MUST follow this structure. Refer to [NOTEBOOK-STRUCTURE.md](./references/NOTEBOOK-STRUCTURE.md) for detailed cell-by-cell guidance.

1. **Header Cell** (Markdown) — Title, description, learning objectives, estimated time
2. **Setup Cell** (Code) — Package installs (`!pip install`), imports, Colab configs
3. **Introduction** (Markdown) — Brief topic overview with key concepts
4. **Guided Example** (Code + Markdown) — Complete worked example students can run
5. **Exercises** (repeated pattern):
   - Exercise description (Markdown) — clear instructions, expected output
   - Starter code (Code) — scaffolded with `# TODO` placeholders
   - Hint cell (Markdown, collapsed) — optional hints
   - Test cell (Code) — automated verification of student answer
6. **Bonus Challenge** (optional) — Extra-credit advanced problem
7. **Summary** (Markdown) — What was practiced, link to further resources

### Step 3: Apply Exercise Design Principles

Follow the design principles in [EXERCISE-DESIGN.md](./references/EXERCISE-DESIGN.md).

Key principles:
- **Language** — Write all instructions, descriptions, and feedback messages in **Polish**, keeping English technical terms as-is (e.g., "DataFrame", "assert", "groupby")
- **Scaffolded difficulty** — Start easy, progressively harder
- **Real datasets** — Use interesting, relatable data (movies, sports, weather, music)
- **Immediate feedback** — Every exercise has automated test/assertion cells
- **Clear TODOs** — Students know exactly what to fill in
- **Fun context** — Frame problems as stories or scenarios

### Step 4: Generate the Notebook

Create the notebook as a `.ipynb` file with these conventions:

**Cell Types:**
- **Markdown cells** — Instructions, explanations, exercise descriptions
- **Code cells** — Setup, examples, student code, tests

**Code Conventions:**
- Python 3.10+ syntax with type hints
- Colab-compatible (no local file dependencies)
- Use `!pip install -q` for any non-default packages
- Include `# @title` for collapsible sections in Colab
- Mount Google Drive only when necessary: `from google.colab import drive`

**Testing Pattern:**
```python
# ✅ Test your answer
assert result == expected, f"Expected {expected}, got {result}"
print("✅ Correct! Great job! 🎉")
```

### Step 5: Create Solution Notebook (if requested)

- Copy the exercise notebook
- Fill in all `# TODO` sections with correct solutions
- Add explanatory comments to solutions
- Name: `{exercise-name}-solutions.ipynb`

### Step 6: Save and Confirm

- Save to `exercises/` directory (create if needed)
- Naming: `{topic-slug}-{difficulty}.ipynb` (e.g., `pandas-groupby-intermediate.ipynb`)
- If solutions: `{topic-slug}-{difficulty}-solutions.ipynb`

## Exercise Difficulty Guidelines

| Difficulty | Characteristics | Code Length | Hints |
|-----------|----------------|-------------|-------|
| Beginner | Fill-in-the-blank, single function calls | 1-5 lines | Many |
| Intermediate | Multi-step, combine concepts, some design | 5-15 lines | Some |
| Advanced | Open-ended, optimization, real-world scale | 15-30+ lines | Few |

## Exercise Count by Duration

| Duration | Exercises | Guided Examples |
|----------|-----------|-----------------|
| 30 min   | 3-4       | 1               |
| 60 min   | 5-7       | 1-2             |
| 90 min   | 7-10      | 2-3             |
| 120 min  | 10-14     | 2-3             |

## Topic Quick References

| Domain | Exercise Ideas |
|--------|---------------|
| Python Basics | String manipulation, list comprehensions, dict operations, file I/O |
| Python Advanced | Decorators, generators, context managers, dataclasses, async |
| pandas | Loading data, filtering, groupby, merging, pivot tables, time series |
| NumPy | Array operations, broadcasting, linear algebra, statistical functions |
| Visualization | matplotlib, seaborn, plotly charts from real datasets |
| PySpark | RDD operations, DataFrames, SQL queries, transformations, actions |
| ML/scikit-learn | Classification, regression, preprocessing, model evaluation |
| Cloud/GCP | BigQuery SQL, GCS operations, Dataflow basics |

## Output Examples

See [EXAMPLES.md](./references/EXAMPLES.md) for sample notebook excerpts.
