# 🎓 Python in Big Data Applications — PJATK

An AI-assisted workspace for creating university-level teaching materials for Python, Big Data, Cloud Computing, and Data Science courses.

🌐 **Course website:** [causa-sui-42.github.io/python-zastosowania-big-data-pjatk](https://causa-sui-42.github.io/python-zastosowania-big-data-pjatk/)

## 🌐 Course Website

The `website/` directory contains a full **Docusaurus v3** course site with:

- **Lectures** — lecture pages with PDF links
- **Exercises** — lab pages with Google Colab links
- **Flashcards** — interactive flashcards (40+ cards, 3 categories, progress stored in `localStorage`)
- **Resources** — curated books, cheat sheets, and useful links
- **Schedule** — semester plan and timeline
- **About the Course** — requirements, grading, and general course information

### Requirements

- Node.js >= 18
- npm >= 9

> **Windows note:** if `node` and `npm` are not available on your system `PATH`, but WSL is installed, run npm commands inside WSL:
>
> ```powershell
> cd /mnt/c/Projects/sandbox/python-big-data/website
> npm install
> npm start
> ```
>
> Alternatively, install Node.js for Windows from [nodejs.org](https://nodejs.org/).

### Install and Run Locally

```bash
cd website
npm install
npm start
# opens http://localhost:3000/python-zastosowania-big-data-pjatk/
```

### Build for Production

```bash
cd website
npm run build
# output will be generated in website/build/
```

### Preview the Production Build

```bash
cd website
npm run serve
```

### Deploy to GitHub Pages

Deployment is **automated through GitHub Actions**. Every push to the `main` branch that changes the `website/` directory triggers a build and deploys the site to the `gh-pages` branch.

**One-time setup in the GitHub repository settings:**

1. Go to **Settings → Actions → General → Workflow permissions**.
2. Select **Read and write permissions** and save.
3. Go to **Settings → Pages**.
4. Set the source to **Deploy from a branch**, choose branch `gh-pages`, folder `/ (root)`, and save.

After that, every push to `main` will deploy automatically. You can also trigger the workflow manually from the **Actions** tab.

#### Manual Deployment

```bash
cd website
GIT_USER=causa-sui-42 npm run deploy
```

### Adding Content

| What | Where | How |
|------|-------|-----|
| New lecture | `website/docs/wyklady/` | Add a `.md` file and register it in `sidebars.ts` |
| New exercise | `website/docs/cwiczenia/` | Add a `.md` file with a Colab link |
| New flashcards | `website/src/data/flashcards.ts` | Append items to the `FLASHCARDS` array |
| New PDF | `website/static/pdfs/` | Place the file there and link it as `/pdfs/file-name.pdf` |

> **Initial PDF setup:** copy the existing lecture PDF into the static folder:
>
> ```bash
> cp presentations/intro-big-data-hadoop-spark-beginner.pdf website/static/pdfs/
> ```

---

## 📁 Project Structure

```
.github/
├── copilot-instructions.md
├── agents/
│   └── lecturer.agent.md
├── skills/
│   ├── presentation-generator/
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── STYLE-GUIDE.md
│   │       ├── TEMPLATES.md
│   │       └── EXAMPLES.md
│   └── colab-exercise-creator/
│       ├── SKILL.md
│       └── references/
│           ├── NOTEBOOK-STRUCTURE.md
│           ├── EXERCISE-DESIGN.md
│           └── EXAMPLES.md
├── prompts/
│   ├── create-lecture.prompt.md
│   ├── create-exercise.prompt.md
│   ├── mini-lecture.prompt.md
│   └── create-quiz.prompt.md
└── instructions/
    ├── notebooks.instructions.md
    └── presentations.instructions.md
exercises/
└── 01-big-data-pyspark-ecommerce.ipynb
presentations/
└── intro-big-data-hadoop-spark-beginner.pdf
website/
├── docusaurus.config.ts
├── sidebars.ts
├── package.json
├── tsconfig.json
├── static/
│   ├── img/logo.svg
│   └── pdfs/
├── src/
│   ├── css/custom.css
│   ├── data/flashcards.ts
│   ├── components/Flashcard/
│   └── pages/
│       ├── index.tsx
│       ├── plan-zajec.tsx
│       ├── o-kursie.tsx
│       └── fiszki.tsx
└── docs/
    ├── wyklady/
    ├── cwiczenia/
    └── zasoby/
```

## 🚀 How to Use

| Action | How |
|--------|-----|
| **Create a presentation** | Type `/create-lecture` or ask for a lecture deck |
| **Create an exercise** | Type `/create-exercise` or ask for a Colab notebook |
| **Create a short explainer** | Type `/mini-lecture` |
| **Generate a quiz** | Type `/create-quiz` |
| **Use the lecturer persona** | Select the **lecturer** agent from the agent picker |

### Examples

```
/create-lecture Introduction to PySpark DataFrames
/create-exercise pandas GroupBy - intermediate
/mini-lecture Python decorators
/create-quiz Python list comprehensions
```

## 🌐 Language Policy

Teaching materials are written primarily in **Polish** 🇵🇱, while common technical terms remain in English where appropriate, for example `DataFrame`, `SparkSession`, `list comprehension`, `Big Data`, and `Cloud Computing`.

This policy is defined in `.github/copilot-instructions.md` and is followed by the workspace instructions, skills, and agents.