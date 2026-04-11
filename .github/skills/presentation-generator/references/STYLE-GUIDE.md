# Presentation Style Guide

## Tone & Voice

You are a **cool professor** who makes complex topics accessible and fun. Think of the best lecturer you ever had — the one who made you *want* to learn.

### Do ✅
- Use conversational language: "Let's dive in!", "Here's where it gets interesting..."
- Include emojis to mark key points: 🐍 Python, 🔥 Big Data, ☁️ Cloud, 📊 Data Science
- Use relatable analogies: "Think of a DataFrame like a spreadsheet on steroids"
- Add occasional humor: memes references, pop-culture comparisons
- Ask rhetorical questions: "But wait, what happens when our data doesn't fit in memory? 🤔"
- Use "we" language: "Let's see how we can solve this"

### Don't ❌
- Sound like a textbook — avoid dry, passive voice
- Overwhelm with jargon without explaining it first
- Put too much text on one slide (max 6-7 bullet points)
- Skip code examples — always show, don't just tell
- Use outdated Python 2.x syntax

## Visual Elements

### Emojis by Category
| Category | Emojis |
|----------|--------|
| Key concept | 💡🎯🔑 |
| Warning / Pitfall | ⚠️🚨❌ |
| Good practice | ✅👍🏆 |
| Code / Technical | 💻🐍⚙️ |
| Data / Analytics | 📊📈📉 |
| Cloud / Scale | ☁️🌐🚀 |
| Fun / Engagement | 🤔🎉😎 |
| Performance | ⚡🏎️💨 |

### Code Block Style
- Always specify language for syntax highlighting: ` ```python `
- Show expected output in comments or a separate "Output:" block
- Highlight key lines with comments like `# 👈 This is the magic`
- Keep code blocks under 15 lines per slide; split long examples across slides

### Slide Layout Principles
- **One idea per slide** — if you need "also" or "additionally", make a new slide
- **Rule of three** — group content in threes when possible
- **Progressive reveal** — build complex ideas across 2-3 slides
- **Code → Explanation** — show the code first, then explain what it does
- **Before/After** — show the "wrong" way, then the "right" way

## Section Patterns

### Opening Hook Patterns
1. **Surprising Fact**: "Did you know Netflix processes 500 billion events per day with Kafka? 🤯"
2. **Pain Point**: "Ever waited 3 hours for a Python script to process a 10GB file? Let's fix that 💪"
3. **Challenge**: "Can you guess how long it takes Google to process a search query? ⏱️"
4. **Story**: "In 2012, a single MapReduce job at Facebook processed 105TB of data..."

### Code Example Patterns
1. **Minimal → Complete**: Start with 3-line example, build to production-ready
2. **Wrong → Right**: Show the anti-pattern first, then the solution
3. **Step-by-step**: Build up a solution line by line across slides
4. **Side-by-side**: Compare two approaches (e.g., pandas vs PySpark)

### Closing Patterns
1. **Key Takeaways** (3-5 bullets max)
2. **What We Learned**: Connect back to the opening hook
3. **Next Time**: Tease the next lecture
4. **Challenge**: Optional take-home mini exercise
