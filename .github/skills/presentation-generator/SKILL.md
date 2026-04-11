---
name: presentation-generator
description: "Generate lecture presentations in Markdown, PDF, or PPTX format for university courses on Python, Big Data, Cloud, and Data Science. Use when the user asks to create a presentation, lecture slides, slide deck, talk, or teaching materials for students."
argument-hint: "Topic and format, e.g. 'Introduction to PySpark - Markdown'"
---

# Presentation Generator

Create professional, engaging lecture presentations for university students on Python, Big Data, Cloud Computing, and Data Science topics.

## When to Use

- User asks to create a **presentation**, **slides**, **lecture**, **slide deck**, or **talk**
- User wants teaching materials in **Markdown**, **PDF**, or **PPTX** format
- User needs a lecture on Python, Big Data, Cloud, Data Science, or related topics

## Procedure

### Step 1: Determine Parameters

Before generating, confirm or infer:

1. **Topic** — What specific subject? (e.g., "Introduction to PySpark RDDs")
2. **Format** — Markdown (`.md`), PDF, or PPTX? Default: **Markdown**
3. **Level** — Beginner, Intermediate, or Advanced? Default: **Intermediate**
4. **Duration** — Approximate lecture length? Default: **45 minutes** (~25-35 slides)
5. **Audience** — Undergraduate or Graduate? Default: **Undergraduate**

### Step 2: Plan the Structure

Every presentation MUST follow this arc:

1. **Title Slide** — Topic, subtitle with one-liner hook, lecturer info placeholder
2. **Agenda / Overview** — What students will learn (3-5 bullet points)
3. **Motivation / Why This Matters** — Real-world hook, relatable analogy, or fun fact
4. **Core Content** (multiple slides) — Progressive complexity, code-first approach
5. **Live Demo / Code Walkthrough** — Hands-on code example with annotations
6. **Common Pitfalls & Best Practices** — What students typically get wrong
7. **Summary / Key Takeaways** — 3-5 bullet recap
8. **What's Next** — Preview of next lecture or further reading
9. **Q&A Slide** — End slide with questions prompt

### Step 3: Apply Teaching Style

Follow the style guidelines in [STYLE-GUIDE.md](./references/STYLE-GUIDE.md).

Key principles:
- **Language** — Write all slide content in **Polish**, keeping English technical terms as-is (e.g., "DataFrame", "SparkSession", "list comprehension")
- **Fun & engaging** — Use humor, pop-culture analogies
- **Code-first** — Show code before explaining theory; let students see it work
- **Progressive** — Start simple, build up; each slide adds ONE concept
- **Visual** — Use diagrams, tables, and code blocks over walls of text
- **Interactive** — Include "Think about it 🤔" moments and mini-quizzes

### Step 4: Generate Content

Use the appropriate template from [TEMPLATES.md](./references/TEMPLATES.md) based on the chosen format.

**For Markdown presentations:**
- Use `---` as slide separators (compatible with Marp, reveal.js, Slidev)
- Include Marp front matter for direct PDF export
- One concept per slide, generous whitespace

**For PPTX presentations:**
- Use the `python-pptx` approach or describe slide-by-slide content
- Include speaker notes for each slide

**For PDF presentations:**
- Generate Markdown with Marp directives, then instruct on PDF export

### Step 5: Add Code Examples

All code examples MUST:
- Use **Python 3.10+** syntax (type hints, f-strings, match/case where appropriate)
- Be **complete and runnable** — no pseudocode unless explicitly stated
- Include **output comments** showing expected results
- Follow **PEP 8** style
- Use **syntax highlighting** in code blocks

### Step 6: Save and Confirm

- Save the file to `presentations/` directory (create if needed)
- Use naming convention: `{topic-slug}-{level}.{ext}` (e.g., `intro-pyspark-beginner.md`)
- Confirm output with a brief summary of what was generated

## Slide Count Guidelines

| Duration | Slides | Content Slides |
|----------|--------|----------------|
| 15 min   | 10-15  | 8-12           |
| 30 min   | 18-25  | 15-20          |
| 45 min   | 25-35  | 20-28          |
| 60 min   | 30-45  | 25-38          |
| 90 min   | 45-60  | 38-50          |

## Topic Quick References

| Domain | Common Topics |
|--------|--------------|
| Python | Data types, OOP, decorators, generators, async, testing, packaging |
| Big Data | Hadoop, Spark (RDD/DataFrame/SQL), Kafka, MapReduce, HDFS, Hive |
| Cloud | GCP (BigQuery, Dataflow, Pub/Sub, GCS), AWS (S3, EMR, Redshift), Azure |
| Data Science | pandas, NumPy, matplotlib, seaborn, scikit-learn, feature engineering |

## Output Examples

See [EXAMPLES.md](./references/EXAMPLES.md) for sample slide excerpts.
