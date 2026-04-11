# ✅ SVG Support for Docusaurus Website

## Changes Reverted

✅ All markdown presentations have been reverted to use SVG files:
- [presentations/wyk4-intro-ml-data-preparation-intermediate.md](presentations/wyk4-intro-ml-data-preparation-intermediate.md) - using `ml-pipeline.svg`
- [presentations/wyk6-cloud-computing-spark-gcp-intermediate.md](presentations/wyk6-cloud-computing-spark-gcp-intermediate.md) - using `gcp-architecture.svg`
- [presentations/wyk7-spark-streaming-intermediate.md](presentations/wyk7-spark-streaming-intermediate.md) - using `streaming-architecture.svg`

## Why SVGs Weren't Displaying

The SVG files **are present** in `website/static/img/` and should be working. The issue is likely:

1. **Build process** - SVGs might not be properly copied during build
2. **MIME type** - Server might not serve SVG with correct Content-Type
3. **CSP (Content Security Policy)** - May be blocking inline SVG rendering
4. **Path resolution** - During build, paths might not resolve correctly

## Solution 1: Verify SVG Files Are Copied (Quick Check)

```powershell
# Check if SVG files exist in build directory after building
cd website
npm run build
Get-ChildItem build\img\*.svg
```

**Expected:** All SVG files should be present in `build/img/`

## Solution 2: Ensure Proper Docusaurus Configuration

Docusaurus handles static assets automatically from `static/` folder. The SVGs should work out of the box. Let's verify the configuration:

### A. Check Static Asset Configuration

Your `docusaurus.config.ts` should already handle this (it does by default). No changes needed.

### B. Verify SVG Files Are Valid

```powershell
# Check SVG file sizes - they should not be 0 bytes
Get-ChildItem website\static\img\*.svg | Select-Object Name, Length
```

### C. Test Locally

```powershell
cd website
npm start
```

Then visit: http://localhost:3000/python-zastosowania-big-data-pjatk/materialy/wyklady/04-intro-ml-data-preparation

**Check browser console** for any 404 errors or CSP violations.

## Solution 3: Alternative - Use React SVG Component (Best Practice)

Instead of `<img>` tags, use Docusaurus SVG as React components for better rendering:

Create a wrapper component at `website/src/components/SvgImage.tsx`:

```typescript
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface SvgImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

export default function SvgImage({ src, alt, style }: SvgImageProps): JSX.Element {
  const imgUrl = useBaseUrl(src);
  
  return (
    <div className="svg-image-container" style={{ textAlign: 'center', ...style }}>
      <img 
        src={imgUrl} 
        alt={alt} 
        style={{ maxWidth: '100%', height: 'auto' }}
        loading="lazy"
      />
    </div>
  );
}
```

Then update the docs to use it:

```markdown
import SvgImage from '@site/src/components/SvgImage';

<SvgImage src="/img/ml-pipeline.svg" alt="Pipeline Machine Learning" />
```

## Solution 4: Add SVG Optimization (Recommended)

Install SVGO plugin for Docusaurus:

```powershell
cd website
npm install --save-dev @docusaurus/plugin-ideal-image
```

Update `docusaurus.config.ts`:

```typescript
plugins: [
  [
    '@docusaurus/plugin-ideal-image',
    {
      quality: 85,
      sizes: [320, 640, 960, 1280],
      disableInDev: false,
    },
  ],
],
```

## Solution 5: GitHub Pages MIME Type Fix

If SVGs work locally but not on GitHub Pages:

Add `.nojekyll` file (already exists) and add this to `website/static/_headers`:

```
/*
  X-Content-Type-Options: nosniff

/*.svg
  Content-Type: image/svg+xml
  Cache-Control: public, max-age=31536000, immutable
```

## Quick Diagnosis Commands

```powershell
# 1. Build the site
cd website
npm run build

# 2. Check if SVGs are in build output
Get-ChildItem build\img\*.svg | Format-Table Name, Length

# 3. Serve locally and test
npm run serve

# 4. Check for any missing files
$svgs = @('ml-pipeline.svg', 'gcp-architecture.svg', 'streaming-architecture.svg', 'hadoop-spark-ecosystem.svg')
foreach ($svg in $svgs) {
    $path = "build\img\$svg"
    if (Test-Path $path) {
        Write-Host "✓ $svg" -ForegroundColor Green
    } else {
        Write-Host "✗ $svg MISSING" -ForegroundColor Red
    }
}
```

## Recommended Action Plan

**Step 1: Verify Current State**
```powershell
cd website
npm run build
npm run serve
```

Then open http://localhost:3000/python-zastosowania-big-data-pjatk/materialy/wyklady/04-intro-ml-data-preparation in browser.

**Step 2: Check Browser Console**
- Press F12
- Look for 404 errors (file not found)
- Look for CSP errors (Content Security Policy)
- Check the Network tab to see if SVGs are loading

**Step 3: Based on Results**

| Issue | Solution |
|-------|----------|
| 404 error | SVGs not copied - check `static/img/` folder |
| CSP error | Add CSP meta tag in HTML |
| SVG loads but doesn't render | Use `<object>` or `<iframe>` instead of `<img>` |
| Works locally, fails on GitHub Pages | Add `_headers` file or use PNG fallback |

## Alternative: Inline SVG in Markdown

For critical diagrams, you can embed SVG directly:

```markdown
<div style={{textAlign: 'center', margin: '2rem 0'}}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 180" style={{maxWidth: '100%'}}>
    <!-- SVG content here -->
  </svg>
</div>
```

This guarantees rendering but increases page size.

## Testing Checklist

- [ ] SVG files exist in `website/static/img/`
- [ ] Build completes without errors
- [ ] SVGs appear in `build/img/` after build
- [ ] Local preview shows SVGs correctly
- [ ] Browser console shows no errors
- [ ] Deployed site on GitHub Pages shows SVGs

## Currently Working

Your website **already uses SVG** correctly in these files:
- `website/docs/wyklady/04-intro-ml-data-preparation.md` - references `/img/ml-pipeline.svg`
- `website/docs/wyklady/06-cloud-computing-gcp.md` - references `/img/gcp-architecture.svg`
- `website/docs/wyklady/07-spark-streaming.md` - references `/img/streaming-architecture.svg`

The SVG files are present in `website/static/img/`, so they **should work**. Let's verify with a build test.

---

**Next Step:** Run the diagnosis commands above to identify the exact issue.
