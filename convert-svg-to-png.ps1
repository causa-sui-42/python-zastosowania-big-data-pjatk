# SVG to PNG Converter Script
# Converts all SVG files in presentations/img/ to PNG format

$svgFiles = Get-ChildItem -Path "presentations\img\*.svg"

Write-Host "Converting $($svgFiles.Count) SVG files to PNG..." -ForegroundColor Green

foreach ($svgFile in $svgFiles) {
    $pngFile = $svgFile.FullName -replace '\.svg$', '.png'
    $svgName = $svgFile.Name
    
    Write-Host "Converting $svgName..." -NoNewline
    
    # Using wsl with rsvg-convert (assuming it's installed)
    $wslPath = wsl wslpath -a $svgFile.FullName
    $wslOutPath = wsl wslpath -a $pngFile
    
    wsl bash -c "rsvg-convert -w 1400 -h 360 '$wslPath' -o '$wslOutPath'" 2>$null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host " ✓" -ForegroundColor Green
    } else {
        Write-Host " ✗ (trying with ImageMagick)" -ForegroundColor Yellow
        wsl bash -c "convert -background white -size 1400x360 '$wslPath' '$wslOutPath'" 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host " ✓" -ForegroundColor Green
        } else {
            Write-Host " Failed!" -ForegroundColor Red
        }
    }
}

Write-Host "`nConversion complete! Now updating markdown references..." -ForegroundColor Green
