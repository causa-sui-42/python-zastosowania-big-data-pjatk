# 📄 PDF Auto-Generation Setup Guide

## Current Situation: ❌ NOT Automated

**Answer:** No, changes to `/presentations` are **NOT automatically deployed to PDFs**.

### Current Workflow
```
presentations/*.md  →  [Manual]  →  website/static/pdfs/*.pdf  →  [Automatic]  →  GitHub Pages
     (edit)                         (commit to git)                              (deployed)
```

**What IS automated:**
- ✅ Changes to `website/**` trigger automatic deployment
- ✅ Docusaurus builds and deploys to GitHub Pages

**What is NOT automated:**
- ❌ Converting `.md` presentations to `.pdf`
- ❌ Triggering deployment when presentations change

## Solution: Automate PDF Generation with GitHub Actions

### Option 1: Add PDF Generation to Existing Workflow (Recommended)

Create a new workflow that generates PDFs before deploying:

```yaml
# .github/workflows/deploy.yml (Updated)
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
    paths:
      - 'website/**'
      - 'presentations/**'  # ← ADD THIS
      - '.github/workflows/deploy.yml'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-pdfs:
    name: Generate PDFs from Presentations
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Marp CLI
        run: npm install -g @marp-team/marp-cli

      - name: Generate PDFs
        run: |
          mkdir -p website/static/pdfs
          
          # Generate PDF for each presentation
          for file in presentations/wyk*.md; do
            filename=$(basename "$file" .md)
            echo "Generating $filename.pdf..."
            marp "$file" --pdf --allow-local-files -o "website/static/pdfs/$filename.pdf"
          done

      - name: Commit updated PDFs
        run: |
          git config user.name "GitHub Actions Bot"
          git config user.email "actions@github.com"
          git add website/static/pdfs/*.pdf
          git diff --quiet && git diff --staged --quiet || git commit -m "Auto-generate PDFs from presentations"
          git push
        continue-on-error: true

  deploy:
    name: Build and Deploy Website
    runs-on: ubuntu-latest
    needs: build-pdfs  # Wait for PDFs to be generated
    defaults:
      run:
        working-directory: website

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: website/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Build website
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: website/build
          cname: ''
```

### Option 2: Separate PDF Generation Workflow

Create a dedicated workflow for PDF generation:

```yaml
# .github/workflows/generate-pdfs.yml
name: Generate PDFs

on:
  push:
    branches:
      - main
    paths:
      - 'presentations/**/*.md'
      - 'presentations/img/**'
  workflow_dispatch:

jobs:
  generate-pdfs:
    name: Generate Lecture PDFs
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Marp CLI
        run: npm install -g @marp-team/marp-cli

      - name: Generate PDFs from Presentations
        run: |
          mkdir -p website/static/pdfs
          
          lectures=(
            "wyk1-statystyka-projektant-rzeczywistosci"
            "wyk2-intro-big-data-hadoop-spark-beginner"
            "wyk3-spark-sql-dataframes-intermediate"
            "wyk4-intro-ml-data-preparation-intermediate"
            "wyk5-mllib-spark-ml-intermediate"
            "wyk6-cloud-computing-spark-gcp-intermediate"
            "wyk7-spark-streaming-intermediate"
          )
          
          for lecture in "${lectures[@]}"; do
            if [ -f "presentations/$lecture.md" ]; then
              echo "📄 Generating $lecture.pdf..."
              marp "presentations/$lecture.md" \
                --pdf \
                --allow-local-files \
                -o "website/static/pdfs/$lecture.pdf"
              
              if [ $? -eq 0 ]; then
                echo "✓ Generated $lecture.pdf"
              else
                echo "✗ Failed to generate $lecture.pdf"
                exit 1
              fi
            fi
          done

      - name: Commit and push PDFs
        run: |
          git config user.name "GitHub Actions Bot"
          git config user.email "actions@github.com"
          
          git add website/static/pdfs/*.pdf
          
          if git diff --staged --quiet; then
            echo "No PDF changes to commit"
          else
            git commit -m "chore: auto-generate PDFs from presentations [skip ci]"
            git push
          fi
```

### Option 3: Pre-commit Hook (Local Automation)

For local development, create a git hook:

```bash
# .git/hooks/pre-commit
#!/bin/bash

# Check if any presentation files changed
if git diff --cached --name-only | grep -q "^presentations/.*\.md$"; then
    echo "📄 Presentations changed, regenerating PDFs..."
    
    # Run PDF generation script
    pwsh -File generate-lecture-pdfs.ps1
    
    # Stage the updated PDFs
    git add website/static/pdfs/*.pdf
    
    echo "✓ PDFs updated and staged"
fi
```

## Comparison of Options

| Option | Pros | Cons | Recommended For |
|--------|------|------|-----------------|
| **Option 1: Integrated Workflow** | Single workflow, always in sync | Slower deployment, more complex | Production sites with frequent updates |
| **Option 2: Separate Workflow** | Faster website deploys, clearer separation | Two workflows to maintain | Large sites, less frequent content changes |
| **Option 3: Pre-commit Hook** | Instant feedback, works offline | Only on dev machine, not team-wide | Personal projects, single developer |

## Implementation Steps (Option 2 - Recommended)

### Step 1: Create the Workflow File

```powershell
# Create the workflow file
New-Item -Path .github\workflows\generate-pdfs.yml -Force
```

Copy the Option 2 YAML content into it.

### Step 2: Update Main Deployment Workflow

Add `presentations/**` to the paths that trigger deployment:

```yaml
on:
  push:
    branches:
      - main
    paths:
      - 'website/**'
      - 'presentations/**'  # Add this line
      - '.github/workflows/deploy.yml'
```

### Step 3: Test the Workflow

```powershell
# Make a test change to a presentation
"<!-- Test change -->" | Add-Content presentations\wyk4-intro-ml-data-preparation-intermediate.md

# Commit and push
git add presentations\wyk4-intro-ml-data-preparation-intermediate.md
git commit -m "test: trigger PDF generation"
git push
```

### Step 4: Monitor GitHub Actions

Go to: https://github.com/causa-sui-42/python-zastosowania-big-data-pjatk/actions

You should see:
1. "Generate PDFs" workflow running
2. New commit with updated PDFs (if changed)
3. "Deploy to GitHub Pages" workflow running with latest PDFs

## Current Manual Process

Until automation is set up, you need to:

1. **Edit presentation:**
   ```powershell
   # Edit presentations/wyk4-intro-ml-data-preparation-intermediate.md
   ```

2. **Generate PDF manually:**
   ```powershell
   .\generate-lecture-pdfs.ps1
   ```

3. **Commit both files:**
   ```bash
   git add presentations/wyk4-*.md website/static/pdfs/wyk4-*.pdf
   git commit -m "Update lecture 4 content and PDF"
   git push
   ```

## Benefits of Automation

✅ **Always in sync** - PDFs match markdown source  
✅ **No manual step** - Forget about regenerating  
✅ **Version control** - PDF changes tracked in git  
✅ **Team-friendly** - Anyone can edit, PDFs auto-update  
✅ **CI/CD best practice** - Build artifacts from source

## Quick Start: Enable PDF Automation Now

```powershell
# 1. Create the workflow
New-Item .github\workflows\generate-pdfs.yml -ItemType File -Force

# 2. Copy Option 2 YAML content

# 3. Commit and push
git add .github\workflows\generate-pdfs.yml
git commit -m "feat: add automatic PDF generation workflow"
git push

# 4. Test it
echo "<!-- trigger -->" >> presentations\wyk4-intro-ml-data-preparation-intermediate.md
git add presentations\wyk4-intro-ml-data-preparation-intermediate.md
git commit -m "test: trigger PDF generation"
git push
```

---

**Status:** ❌ Not automated (manual process required)  
**Recommended:** Implement Option 2 (Separate Workflow)  
**Estimated Setup Time:** 15 minutes
