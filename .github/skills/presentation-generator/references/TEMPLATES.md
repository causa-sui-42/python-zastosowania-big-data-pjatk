# Presentation Templates

## Markdown (Marp-Compatible) Template

Use this template for `.md` presentations. Compatible with [Marp](https://marp.app/), reveal.js, and Slidev.

```markdown
---
marp: true
theme: default
paginate: true
header: '📚 Course Name — Topic'
footer: 'University Name | Lecturer Name | 2025'
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
  }
  code {
    font-size: 0.85em;
  }
  h1 {
    color: #2d5986;
  }
---

# 🎯 Lecture Title
## Subtitle with a catchy one-liner

**Course Name** | Week X
Lecturer Name

---

## 📋 What We'll Cover Today

1. First main topic
2. Second main topic
3. Third main topic
4. Hands-on coding time! 💻

> 🎯 **By the end:** You'll be able to [specific learning outcome]

---

## 💡 Why This Matters

<!-- Opening hook: surprising fact, pain point, or story -->

[Real-world example or analogy that connects to students' lives]

---

## 🔑 Core Concept — [Name]

<!-- One idea per slide, code-first -->

```python
# Clear, runnable example
def example_function(data: list[int]) -> int:
    """Show the concept in action."""
    return sum(x ** 2 for x in data)  # 👈 Key technique here

result = example_function([1, 2, 3, 4])
print(result)  # Output: 30
```

---

## 🤔 Think About It

<!-- Interactive moment -->

**Question:** [Pose a question about what was just taught]

<!-- Pause for student thinking -->

---

## ⚠️ Common Pitfalls

| Pitfall | Why It's Bad | Do This Instead |
|---------|-------------|-----------------|
| Thing 1 | Reason | Better approach |
| Thing 2 | Reason | Better approach |

---

## 📝 Key Takeaways

1. ✅ First key point
2. ✅ Second key point
3. ✅ Third key point

---

## 🔮 What's Next

**Next Lecture:** [Topic]
**Reading:** [Resource]
**Practice:** [Exercise link/description]

---

## ❓ Questions?

![bg right:40% 80%](https://via.placeholder.com/400x300?text=Questions%3F)

**Thank you! 🎉**
```

## PPTX Slide-by-Slide Structure

When creating PPTX, describe each slide with this format:

```
### Slide 1: Title
- **Layout**: Title Slide
- **Title**: [Lecture Title with emoji]
- **Subtitle**: [Catchy one-liner]
- **Notes**: [Speaker notes for this slide]

### Slide 2: Agenda
- **Layout**: Content
- **Title**: 📋 What We'll Cover Today
- **Content**: [Numbered list of 3-5 topics]
- **Notes**: [Speaker notes]

### Slide N: Code Example
- **Layout**: Code + Explanation
- **Title**: [Concept Name]
- **Code**: [Python code block]
- **Callout**: [Key insight from the code]
- **Notes**: [What to say while showing this slide]
```

## PDF via Marp

For PDF output, generate the Markdown template above and instruct:

```bash
# Install Marp CLI
npm install -g @marp-team/marp-cli

# Convert to PDF
marp presentation.md --pdf --allow-local-files

# Convert to PPTX
marp presentation.md --pptx --allow-local-files
```
