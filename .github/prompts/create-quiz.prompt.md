---
description: "Generate a quiz or assessment with multiple choice, code completion, and short answer questions on a given topic. Includes answer key."
agent: "lecturer"
---

Create a **quiz / assessment** on the following topic:

**Topic:** $input

## Requirements

- Generate **10-15 questions** with a mix of:
  - Multiple choice (4-5 options each)
  - Code completion / fill-in-the-blank
  - Short answer / explain the output
  - True/False with justification
- Escalating difficulty: 40% easy, 40% medium, 20% hard
- Include **code snippets** in at least half the questions
- Create **two files**:
  1. `quizzes/{topic}-quiz.md` — Student version (no answers)
  2. `quizzes/{topic}-quiz-answers.md` — Answer key with explanations
