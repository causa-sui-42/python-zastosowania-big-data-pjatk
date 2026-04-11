#!/usr/bin/env pwsh
<#
.SYNOPSIS
    SVG Support Diagnostic Tool for Docusaurus Website
.DESCRIPTION
    Checks if SVG files are properly configured and present in the build output
#>

$ErrorActionPreference = 'Continue'

Write-Host "`n🔍 SVG Support Diagnostic Report" -ForegroundColor Cyan
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host ""

# Check 1: Source SVG files in static folder
Write-Host "1️⃣  Checking source SVG files in website/static/img/..." -ForegroundColor Yellow
$staticSvgs = Get-ChildItem website\static\img\*.svg -ErrorAction SilentlyContinue
if ($staticSvgs) {
    Write-Host "   ✓ Found $($staticSvgs.Count) SVG files" -ForegroundColor Green
    $staticSvgs | ForEach-Object {
        $sizeKB = [math]::Round($_.Length / 1KB, 2)
        Write-Host "     • $($_.Name) - $sizeKB KB" -ForegroundColor Gray
    }
} else {
    Write-Host "   ✗ No SVG files found in website/static/img/" -ForegroundColor Red
}

Write-Host ""

# Check 2: Build output folder
Write-Host "2️⃣  Checking build output folder..." -ForegroundColor Yellow
if (Test-Path website\build) {
    Write-Host "   ✓ Build folder exists" -ForegroundColor Green
    
    if (Test-Path website\build\img) {
        $buildSvgs = Get-ChildItem website\build\img\*.svg -ErrorAction SilentlyContinue
        if ($buildSvgs) {
            Write-Host "   ✓ Found $($buildSvgs.Count) SVG files in build output" -ForegroundColor Green
            $buildSvgs | ForEach-Object {
                $sizeKB = [math]::Round($_.Length / 1KB, 2)
                Write-Host "     • $($_.Name) - $sizeKB KB" -ForegroundColor Gray
            }
        } else {
            Write-Host "   ⚠ No SVG files in build/img/ folder" -ForegroundColor Yellow
        }
    } else {
        Write-Host "   ⚠ build/img/ folder not found" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⚠ Build folder not found" -ForegroundColor Yellow
    Write-Host "     Run: cd website && npm run build" -ForegroundColor Gray
}

Write-Host ""

# Check 3: Verify SVG references in docs
Write-Host "3️⃣  Checking SVG references in documentation..." -ForegroundColor Yellow
$svgRefs = Select-String -Path website\docs\wyklady\*.md -Pattern '\.svg' -ErrorAction SilentlyContinue
if ($svgRefs) {
    Write-Host "   ✓ Found $($svgRefs.Count) SVG references in docs" -ForegroundColor Green
    $svgRefs | ForEach-Object {
        $file = Split-Path $_.Path -Leaf
        $line = $_.Line.Trim()
        if ($line.Length -gt 80) { $line = $line.Substring(0, 77) + "..." }
        Write-Host "     • $file" -ForegroundColor Gray
    }
} else {
    Write-Host "   ⚠ No SVG references found in docs" -ForegroundColor Yellow
}

Write-Host ""

# Check 4: Verify presentations use SVG (not PNG)
Write-Host "4️⃣  Checking presentation files..." -ForegroundColor Yellow
$presentationFiles = @(
    'presentations\wyk4-intro-ml-data-preparation-intermediate.md',
    'presentations\wyk6-cloud-computing-spark-gcp-intermediate.md',
    'presentations\wyk7-spark-streaming-intermediate.md'
)

foreach ($file in $presentationFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $svgCount = ([regex]::Matches($content, '\.svg')).Count
        $pngCount = ([regex]::Matches($content, '\.png')).Count
        
        $filename = Split-Path $file -Leaf
        if ($svgCount -gt 0 -and $pngCount -eq 0) {
            Write-Host "   ✓ $filename - using SVG ($svgCount refs)" -ForegroundColor Green
        } elseif ($pngCount -gt 0) {
            Write-Host "   ⚠ $filename - using PNG ($pngCount refs) instead of SVG" -ForegroundColor Yellow
        } else {
            Write-Host "   • $filename - no image refs" -ForegroundColor Gray
        }
    }
}

Write-Host ""

# Summary and recommendations
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host "📋 Recommendations:" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path website\build)) {
    Write-Host "→ Run build first: cd website && npm run build" -ForegroundColor Yellow
}

if ($staticSvgs -and (Test-Path website\build\img)) {
    $buildSvgs = Get-ChildItem website\build\img\*.svg -ErrorAction SilentlyContinue
    if (-not $buildSvgs) {
        Write-Host "→ SVGs not copied to build - check Docusaurus config" -ForegroundColor Yellow
    } else {
        Write-Host "✓ SVG files are properly configured!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor White
        Write-Host "  1. Test locally: cd website && npm start" -ForegroundColor Gray
        Write-Host "  2. Check browser console (F12) for any errors" -ForegroundColor Gray
        Write-Host "  3. If working locally, deploy: git push" -ForegroundColor Gray
    }
}

Write-Host ""
