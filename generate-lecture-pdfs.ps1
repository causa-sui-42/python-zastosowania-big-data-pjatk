#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Generate PDF presentations from Markdown files using Marp CLI
.DESCRIPTION
    Converts lectures 3-7 from Markdown to PDF format using Marp.
    PNG images will be embedded in the PDFs.
.NOTES
    Requirements: Node.js and npm must be installed
#>

$ErrorActionPreference = 'Stop'

Write-Host "📚 PDF Generation Script for Lectures 3-7" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

# Check if npm is available
try {
    $npmVersion = npm --version 2>$null
    Write-Host "✓ npm found (version $npmVersion)" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found. Please install Node.js first." -ForegroundColor Red
    Write-Host "  Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Install Marp CLI globally if not present
Write-Host "`n📦 Checking Marp CLI installation..." -ForegroundColor Cyan
try {
    $marpVersion = npx -y @marp-team/marp-cli --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Marp CLI is available" -ForegroundColor Green
    }
} catch {
    Write-Host "  Installing Marp CLI..." -ForegroundColor Yellow
}

# Lectures to convert
$lectures = @(
    'wyk3-spark-sql-dataframes-intermediate',
    'wyk4-intro-ml-data-preparation-intermediate',
    'wyk5-mllib-spark-ml-intermediate',
    'wyk6-cloud-computing-spark-gcp-intermediate',
    'wyk7-spark-streaming-intermediate'
)

Write-Host "`n🎨 Generating PDFs..." -ForegroundColor Cyan
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($lecture in $lectures) {
    $mdPath = "presentations\$lecture.md"
    $pdfPath = "website\static\pdfs\$lecture.pdf"
    
    Write-Host "  📄 Processing $lecture.md..." -NoNewline
    
    try {
        # Run marp-cli via npx
        $output = npx -y @marp-team/marp-cli $mdPath --pdf --allow-local-files -o $pdfPath 2>&1
        
        if ($LASTEXITCODE -eq 0 -and (Test-Path $pdfPath)) {
            $size = [math]::Round((Get-Item $pdfPath).Length / 1KB, 1)
            Write-Host " ✓ ($size KB)" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host " ✗ Failed" -ForegroundColor Red
            Write-Host "    Error: $output" -ForegroundColor Red
            $failCount++
        }
    } catch {
        Write-Host " ✗ Error: $_" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "✓ Generated: $successCount PDFs" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "✗ Failed: $failCount PDFs" -ForegroundColor Red
}

Write-Host "`n📁 Output directory: website\static\pdfs\" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Review the generated PDFs" -ForegroundColor White
Write-Host "  2. Commit changes: git add website/static/pdfs presentations/img" -ForegroundColor White
Write-Host "  3. Push to deploy: git push" -ForegroundColor White
