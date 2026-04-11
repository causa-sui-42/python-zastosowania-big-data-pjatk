# SVG to PNG Conversion & PDF Deployment - Completion Guide

## ✓ Completed Tasks

### 1. SVG to PNG Conversion
All SVG diagram files have been successfully converted to PNG format:

- ✅ `presentations/img/ml-pipeline.png` - ML Pipeline diagram (used in wyk4)
- ✅ `presentations/img/gcp-architecture.png` - GCP Architecture diagram (used in wyk6)
- ✅ `presentations/img/streaming-architecture.png` - Spark Streaming + Kafka diagram (used in wyk7)
- ✅ `presentations/img/hadoop-spark-stack.png` - Hadoop/Spark stack diagram

### 2. Markdown References Updated  
All presentation markdown files have been updated to reference PNG instead of SVG:

- ✅ `presentations/wyk4-intro-ml-data-preparation-intermediate.md`
- ✅ `presentations/wyk6-cloud-computing-spark-gcp-intermediate.md`
- ✅ `presentations/wyk7-spark-streaming-intermediate.md`

## 📋 Remaining Tasks

### Task 1: Copy PNG Files to Website Static Folder

**Why:** Docusaurus needs the PNG files in `website/static/img/` for proper deployment.

**Command:**
```powershell
Copy-Item presentations\img\*.png website\static\img\ -Force
```

**Or using WSL:**
```bash
cp presentations/img/*.png website/static/img/
```

**Verification:**
```powershell
Get-ChildItem website\static\img\*.png
```

### Task 2: Regenerate PDF Files for Lectures 3-7

**Why:** The PDF files need to be regenerated with the new PNG images instead of SVG.

**Prerequisites:**
- Node.js and npm must be installed
- Internet connection (to download Marp CLI and Chromium)

**Option A: Using the PowerShell Script**
```powershell
.\generate-lecture-pdfs.ps1
```

**Option B: Manual Generation**
```powershell
# Install Marp CLI globally (one-time)
npm install -g @marp-team/marp-cli

# Generate each PDF
marp presentations/wyk3-spark-sql-dataframes-intermediate.md --pdf --allow-local-files -o website/static/pdfs/wyk3-spark-sql-dataframes-intermediate.pdf
marp presentations/wyk4-intro-ml-data-preparation-intermediate.md --pdf --allow-local-files -o website/static/pdfs/wyk4-intro-ml-data-preparation-intermediate.pdf
marp presentations/wyk5-mllib-spark-ml-intermediate.md --pdf --allow-local-files -o website/static/pdfs/wyk5-mllib-spark-ml-intermediate.pdf
marp presentations/wyk6-cloud-computing-spark-gcp-intermediate.md --pdf --allow-local-files -o website/static/pdfs/wyk6-cloud-computing-spark-gcp-intermediate.pdf
marp presentations/wyk7-spark-streaming-intermediate.md --pdf --allow-local-files -o website/static/pdfs/wyk7-spark-streaming-intermediate.pdf
```

**Option C: Using WSL**
```bash
cd /mnt/c/Projects/learning/python-big-data
./generate-pdfs.sh
```

**Option D: Using VS Code Marp Extension**
1. Install "Marp for VS Code" extension
2. Open each presentation `.md` file
3. Click "Marp: Export slide deck..." from command palette
4. Choose "PDF" as export format
5. Save to `website/static/pdfs/`

### Task 3: Commit and Deploy

Once PNG copying and PDF generation are complete:

```bash
# Stage the changes
git add presentations/img/*.png
git add website/static/img/*.png
git add website/static/pdfs/wyk*.pdf
git add presentations/wyk*.md

# Commit
git commit -m "Convert SVG diagrams to PNG and regenerate PDFs for lectures 3-7"

# Push to deploy
git push origin main
```

## 🔍 Verification Checklist

Before pushing to production:

- [ ] PNG files exist in `presentations/img/` (4 files)
- [ ] PNG files copied to `website/static/img/` (4 files)
- [ ] Markdown files reference `.png` instead of `.svg` (3 files)
- [ ] PDF files regenerated for lectures 3-7 (5 files)
- [ ] PDFs display PNG images correctly (open each PDF to verify)
- [ ] Website builds successfully (`cd website && npm run build`)
- [ ] Local preview shows images correctly (`npm start`)

## 🚀 Expected Results

After deployment:
- Diagram images will be visible on the website (they weren't visible before when using SVG)
- PDF downloads will contain embedded PNG diagrams instead of SVG
- All lectures 3-7 will have updated PDF files with correct visualizations

## 📁 File Locations

| File Type | Source | Destination | Count |
|-----------|--------|-------------|-------|
| PNG images | `presentations/img/` | `website/static/img/` | 4 |
| MD presentations | `presentations/` | (stays same) | 5 (wyk3-7) |
| PDF presentations | Generated from MD | `website/static/pdfs/` | 5 (wyk3-7) |

## 🛠️ Troubleshooting

### PNG files not visible after copy
```powershell
# Check if files exist
Test-Path presentations\img\ml-pipeline.png  # Should be True
Test-Path website\static\img\ml-pipeline.png  # Should be True

# Copy manually if needed
Copy-Item presentations\img\ml-pipeline.png website\static\img\ -Force
# Repeat for other 3 PNG files
```

### Marp CLI fails to generate PDF
- **Error: "Chromium download failed"** → Check internet connection, try VPN
- **Error: "Cannot find module"** → Run `npm install -g @marp-team/marp-cli` again
- **Error: "Permission denied"** → Run terminal as administrator (Windows) or use `sudo` (Linux)

### Network issues with npm
```powershell
# Configure proxy if behind corporate firewall
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Or bypass SSL (not recommended for production)
npm config set strict-ssl false
```

## 📞 Next Steps

1. Copy PNG files to `website/static/img/`
2. Regenerate PDFs using one of the methods above
3. Verify everything works locally
4. Commit and push to deploy

**Estimated time:** 10-15 minutes (including PDF generation)
