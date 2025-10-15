# Figma Asset Extraction Guide - Positivus Landing Page

## Overview

**Figma Design:** [Positivus Landing Page](https://www.figma.com/design/8WnFWP5spLzox71kgLLbrD/Positivus-Landing-Page-Design--Community-?node-id=403-333)

This guide provides step-by-step instructions for extracting all 20 assets from the Figma design.

---

## 🎯 Asset Extraction Checklist

### Illustrations (2 assets)
- [ ] Hero illustration (megaphone with orbits) → `positivus-hero-illustration.svg`
- [ ] CTA illustration (character with stars) → `positivus-cta-illustration.svg`

### Client Logos (6 assets)
- [ ] Amazon logo → `positivus-logo-amazon.svg`
- [ ] Dribbble logo → `positivus-logo-dribbble.svg`
- [ ] HubSpot logo → `positivus-logo-hubspot.svg`
- [ ] Notion logo → `positivus-logo-notion.svg`
- [ ] Netflix logo → `positivus-logo-netflix.svg`
- [ ] Zoom logo → `positivus-logo-zoom.svg`

### Service Icons (6 assets)
- [ ] SEO icon (magnifying glass) → `positivus-service-seo.svg`
- [ ] PPC icon (cursor/click) → `positivus-service-ppc.svg`
- [ ] Social Media icon (bot/character) → `positivus-service-social.svg`
- [ ] Email icon (envelope) → `positivus-service-email.svg`
- [ ] Content Creation icon (documents) → `positivus-service-content.svg`
- [ ] Analytics icon (charts/graphs) → `positivus-service-analytics.svg`

### Team Photos (6 assets)
- [ ] Jane Doe photo → `positivus-team-jane.jpg`
- [ ] Michael Brown photo → `positivus-team-michael.jpg`
- [ ] Emily Johnson photo → `positivus-team-emily.jpg`
- [ ] Brian Williams photo → `positivus-team-brian.jpg`
- [ ] Sarah Kim photo → `positivus-team-sarah.jpg`
- [ ] David Lee photo → `positivus-team-david.jpg`

---

## 📋 Step-by-Step Extraction Process

### Method 1: Manual Export (Recommended)

#### 1. Open Figma Design

1. Open [Positivus Landing Page in Figma](https://www.figma.com/design/8WnFWP5spLzox71kgLLbrD/Positivus-Landing-Page-Design--Community-?node-id=403-333)
2. Ensure you have edit or view access
3. Navigate to the main landing page frame

#### 2. Export Illustrations (SVG)

**Hero Illustration:**
- Location: Top section, right side of hero area
- Element: Megaphone with orbits, stars, and play button icons
- Selection: Click on the illustration group
- Export Settings:
  - Format: **SVG**
  - Scale: **1x**
  - Include: **"id" attribute** (checked)
  - Outline text: **No** (keep as text if possible)
- Filename: `positivus-hero-illustration.svg`

**CTA Illustration:**
- Location: "Let's make things happen" section
- Element: Character illustration with stars and green diamond
- Selection: Click on the illustration group
- Export Settings: Same as above
- Filename: `positivus-cta-illustration.svg`

#### 3. Export Client Logos (SVG)

**Location:** Below hero section, horizontal logo strip

For each logo (Amazon, Dribbble, HubSpot, Notion, Netflix, Zoom):
1. Click on individual logo
2. Export Settings:
   - Format: **SVG**
   - Scale: **1x**
   - Remove fill: **No** (keep original colors)
3. Save as: `positivus-logo-{company}.svg` (lowercase)

**Note:** Logos should maintain their original brand colors for best results.

#### 4. Export Service Icons (SVG)

**Location:** Services section, inside each service card

**Service Card Locations:**
1. **SEO** - Top left card (white/beige background)
2. **PPC** - Top right card (green background)
3. **Social Media** - Middle left card (dark background)
4. **Email** - Middle right card (white/beige background)
5. **Content Creation** - Bottom left card (green background)
6. **Analytics** - Bottom right card (dark background)

For each icon:
1. Click on the icon/illustration inside the card
2. Export Settings:
   - Format: **SVG**
   - Scale: **1x**
   - Simplify strokes: **Yes** (for cleaner SVG)
3. Save as: `positivus-service-{name}.svg` (e.g., `positivus-service-seo.svg`)

#### 5. Export Team Photos (JPG)

**Location:** Team section, cards with circular photos

**Team Members (left to right, top to bottom):**
1. **Jane Doe** - Top left (green circular background)
2. **Michael Brown** - Top center (green circular background)
3. **Emily Johnson** - Top right (green circular background)
4. **Brian Williams** - Bottom left (green circular background)
5. **Sarah Kim** - Bottom center (green circular background)
6. **David Lee** - Bottom right (green circular background)

For each photo:
1. Click on the circular photo/avatar
2. Export Settings:
   - Format: **JPG**
   - Scale: **2x** (for retina displays)
   - Quality: **85-90%**
3. Save as: `positivus-team-{firstname}.jpg` (e.g., `positivus-team-jane.jpg`)

**Note:** Photos appear to have green circular backgrounds with character illustrations. Export the entire circular element including the background.

---

### Method 2: Bulk Export (Faster)

#### Using Figma's Export Panel

1. **Select Multiple Elements:**
   - Hold `Shift` and click each asset you want to export
   - Or use layers panel to select multiple items

2. **Open Export Panel:**
   - Right-click → "Export..."
   - Or press `Cmd/Ctrl + Shift + E`

3. **Configure Export Settings:**
   - Add export preset: `SVG 1x` for vector assets
   - Add export preset: `JPG 2x` for photos

4. **Batch Export:**
   - Click "Export [X] layers"
   - Choose destination folder
   - Rename files according to naming convention

#### Figma Plugin: "Batch Export"

1. Install plugin: "Batch Export" or "Export Wizard"
2. Select all assets
3. Configure naming pattern: `positivus-{layer-name}`
4. Set format rules (SVG for vectors, JPG for photos)
5. Export all at once

---

### Method 3: Figma API (Advanced)

If you have developer access, you can use the Figma API to programmatically export assets:

```javascript
// Example: Export specific node
const fileKey = '8WnFWP5spLzox71kgLLbrD';
const nodeId = '423:1034'; // Replace with specific node ID

fetch(`https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=svg`, {
  headers: {
    'X-Figma-Token': 'YOUR_API_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data.images));
```

**Note:** Requires Figma API access token.

---

## 🎨 Export Settings Reference

### SVG Exports (Illustrations, Logos, Icons)

```
Format: SVG
Scale: 1x
Include "id" Attribute: ✓ (checked)
Outline Text: ✗ (unchecked, unless fonts unavailable)
Simplify Stroke: ✓ (for cleaner output)
Use Absolute Bounds: ✓ (for consistent sizing)
```

**Optimization After Export:**
```bash
# Install SVGO (optional)
npm install -g svgo

# Optimize SVG files
svgo -f /path/to/images/ --pretty
```

### JPG Exports (Team Photos)

```
Format: JPG
Scale: 2x (for retina displays)
Quality: 85-90%
Progressive: ✓ (checked)
```

**Optimization After Export:**
```bash
# Install imagemin (optional)
npm install -g imagemin-cli imagemin-mozjpeg

# Optimize JPG files
imagemin images/*.jpg --out-dir=images/ --plugin=mozjpeg
```

---

## 📁 File Organization

After exporting, organize files in your project:

```
/images/
  positivus-hero-illustration.svg
  positivus-cta-illustration.svg

  positivus-logo-amazon.svg
  positivus-logo-dribbble.svg
  positivus-logo-hubspot.svg
  positivus-logo-notion.svg
  positivus-logo-netflix.svg
  positivus-logo-zoom.svg

  positivus-service-seo.svg
  positivus-service-ppc.svg
  positivus-service-social.svg
  positivus-service-email.svg
  positivus-service-content.svg
  positivus-service-analytics.svg

  positivus-team-jane.jpg
  positivus-team-michael.jpg
  positivus-team-emily.jpg
  positivus-team-brian.jpg
  positivus-team-sarah.jpg
  positivus-team-david.jpg
```

---

## ✅ Verification Checklist

After exporting, verify:

### File Checks
- [ ] All 20 files exported (2 + 6 + 6 + 6)
- [ ] Correct file formats (18 SVG, 6 JPG)
- [ ] Correct filenames (lowercase, hyphenated)
- [ ] Files in `/images/` directory

### Quality Checks
- [ ] SVG files open correctly in browser
- [ ] JPG files display with good quality
- [ ] No missing elements in illustrations
- [ ] Logos maintain brand colors
- [ ] Icons are clear and recognizable
- [ ] Team photos are circular with green backgrounds

### Size Checks
- [ ] SVG files: 2-50KB each (reasonable range)
- [ ] JPG files: 20-150KB each (at 2x scale)
- [ ] No file exceeding 500KB

---

## 🚀 Next Steps After Export

1. **Commit to Git:**
   ```bash
   git add images/positivus-*.svg images/positivus-*.jpg
   git commit -m "Add Positivus landing page assets (20 files)"
   git push
   ```

2. **Verify CDN Access:**
   ```bash
   curl -I https://main--{repo}--{owner}.aem.page/images/positivus-hero-illustration.svg
   # Should return: HTTP/2 200
   ```

3. **Test Locally:**
   ```bash
   npx @adobe/aem-cli up --no-open
   # Open: http://localhost:3000/pages/positivus-landing
   ```

4. **Review Rendering:**
   - Check all images display correctly
   - Verify logos show with proper colors
   - Ensure team photos render in circles
   - Test responsive behavior

---

## 🆘 Troubleshooting

### Issue: Can't Find Specific Asset

**Solution:** Use Figma's layer panel (left sidebar)
- Expand layer hierarchy
- Look for descriptively named layers
- Use search: `Cmd/Ctrl + /` then type asset name

### Issue: Export Option Greyed Out

**Solution:**
- Ensure you have edit or export permissions
- If viewing only: Duplicate to your drafts first
- Check if element is locked

### Issue: SVG Files Look Distorted

**Solution:**
- Ensure "Use Absolute Bounds" is checked
- Try "Outline Text" if fonts are missing
- Flatten complex layers before export

### Issue: File Sizes Too Large

**Solution:**
- For SVG: Use SVGO optimization tool
- For JPG: Reduce export quality to 80%
- For JPG: Export at 1.5x instead of 2x

---

## 📞 Support

If you encounter issues:
1. Check Figma Community comments on the design
2. Review Figma's export documentation: https://help.figma.com/hc/en-us/articles/360040028114
3. Try alternative export methods listed above

---

## Summary

**Total Assets:** 20 files
**Estimated Time:** 15-30 minutes (manual) / 5 minutes (bulk)
**Formats:** SVG (illustrations, logos, icons), JPG (photos)
**Destination:** `/images/` directory
**Next:** Git commit → CDN verification → Local testing

Following this guide ensures all assets are properly exported with correct naming, formats, and quality for the Positivus EDS implementation.
