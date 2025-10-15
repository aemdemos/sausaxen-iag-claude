# Positivus Landing Page - EDS Implementation

## Overview

Complete implementation of the Positivus Digital Marketing Agency landing page from Figma design to Adobe Edge Delivery Services (EDS) custom blocks with DA-compliant HTML.

**Source:** [Figma Design](https://www.figma.com/design/8WnFWP5spLzox71kgLLbrD/Positivus-Landing-Page-Design--Community-?node-id=403-333)

**Generated Files:**
- Markdown: `/pages/positivus-landing.md`
- DA-compliant HTML: `/pages/positivus-landing.html`
- 7 custom block implementations (14 files total: .js + .css)

---

## Block Mapping

| Section | EDS Block Type | Custom Name | Base Block | Strategy |
|---------|---------------|-------------|------------|----------|
| Navigation | Header/Nav | - | Standard nav.html | Standard implementation |
| Hero Section | Hero | `hero-positivus` | hero | JS reuse + custom CSS |
| Client Logos | Columns | `columns-logos` | columns | JS reuse + custom CSS |
| Services Grid | Cards | `cards-services` | cards | JS reuse + custom CSS |
| CTA Section | Hero | `hero-cta` | hero | JS reuse + custom CSS |
| Case Studies | Cards | `cards-casestudies` | cards | JS reuse + custom CSS |
| Working Process | Accordion | - | accordion | Standard implementation |
| Team Section | Cards | `cards-team` | cards | JS reuse + custom CSS |
| Testimonials | Carousel | `carousel-testimonials` | carousel | JS reuse + custom CSS |
| Contact Form | Columns | - | columns | Standard implementation |
| Footer | Footer | - | Standard footer.html | Standard implementation |

---

## Design Tokens (Positivus Brand)

### Colors

```css
/* Primary Colors */
--positivus-green: #B9FF66;
--positivus-dark: #191A23;
--positivus-light: #F3F3F3;
--positivus-white: #FFFFFF;

/* Usage */
Accent/Highlight: #B9FF66 (Lime Green)
Dark Backgrounds: #191A23 (Near Black)
Light Backgrounds: #F3F3F3 (Off White)
Text: #000000 (Black)
```

### Typography

```css
/* Font Family */
--heading-font: 'Space Grotesk', sans-serif;
--body-font: 'Space Grotesk', sans-serif;

/* Font Sizes */
Hero H1: 60px (desktop) / 43px (mobile)
Section H2: 40px (desktop) / 30px (mobile)
Card H3: 24-26px
Body: 18-20px (desktop) / 16px (mobile)
```

### Spacing & Layout

```css
/* Border Radius */
Cards: 45px
Buttons: 14px

/* Padding */
Sections: 60px (desktop) / 40px (mobile)
Cards: 40px (desktop) / 35px (mobile)
Buttons: 20px 35px

/* Shadows */
Card Shadow: 0 5px 0 0 #191A23 (solid offset shadow)

/* Max Width */
Content: 1200px
```

---

## Block Implementations

### 1. Hero Positivus (`hero-positivus`)

**Purpose:** Main hero section with illustration and CTA

**Structure:**
- 2-column layout (text + illustration)
- Responsive: stacks on mobile, side-by-side on desktop
- Black CTA button with green hover state

**Files:**
- `blocks/hero-positivus/hero-positivus.js` (reuses `hero.js`)
- `blocks/hero-positivus/hero-positivus.css`

**Key Styles:**
- Flex layout with `flex-direction: column-reverse` (mobile)
- Green accent on hover: `#B9FF66`
- Rounded button: `border-radius: 14px`

---

### 2. Columns Logos (`columns-logos`)

**Purpose:** Client logo showcase with grayscale hover effect

**Structure:**
- Flexible wrapping grid
- 6 logos (Amazon, Dribbble, HubSpot, Notion, Netflix, Zoom)

**Files:**
- `blocks/columns-logos/columns-logos.js` (reuses `columns.js`)
- `blocks/columns-logos/columns-logos.css`

**Key Styles:**
- Grayscale by default: `filter: grayscale(100%)`
- Color on hover: `filter: grayscale(0%)`
- Flexible gap: `gap: 40px 60px`

---

### 3. Cards Services (`cards-services`)

**Purpose:** Service offerings in alternating colored cards

**Structure:**
- 6 service cards in 2-column grid
- Alternating backgrounds (green, gray, black)
- Icon + title + CTA per card

**Files:**
- `blocks/cards-services/cards-services.js` (reuses `cards.js`)
- `blocks/cards-services/cards-services.css`

**Key Styles:**
- Alternating colors: `nth-child(odd)` = green, `nth-child(3,6)` = black
- Solid shadow: `box-shadow: 0 5px 0 0 #191A23`
- Arrow icon: `::after { content: '→' }`

---

### 4. Hero CTA (`hero-cta`)

**Purpose:** Call-to-action section with light background

**Structure:**
- 2-column layout (text + illustration)
- Light gray background: `#F3F3F3`
- Rounded container: `border-radius: 45px`

**Files:**
- `blocks/hero-cta/hero-cta.js` (reuses `hero.js`)
- `blocks/hero-cta/hero-cta.css`

**Key Styles:**
- Background: `#F3F3F3`
- Same button style as hero-positivus
- Contained layout with padding

---

### 5. Cards Case Studies (`cards-casestudies`)

**Purpose:** Case study showcase with dark theme

**Structure:**
- 2-column grid of dark cards
- Green accent text
- Brief description + CTA

**Files:**
- `blocks/cards-casestudies/cards-casestudies.js` (reuses `cards.js`)
- `blocks/cards-casestudies/cards-casestudies.css`

**Key Styles:**
- Dark background: `#191A23`
- Green headings: `color: #B9FF66`
- Arrow CTA with hover effect

---

### 6. Cards Team (`cards-team`)

**Purpose:** Team member profiles with photos

**Structure:**
- 3-column grid (desktop) / 1-column (mobile)
- Round profile photos
- Name, role, bio, LinkedIn link

**Files:**
- `blocks/cards-team/cards-team.js` (reuses `cards.js`)
- `blocks/cards-team/cards-team.css`

**Key Styles:**
- White cards with solid shadow
- Circular images: `border-radius: 50%`
- Bordered separator for LinkedIn link

---

### 7. Carousel Testimonials (`carousel-testimonials`)

**Purpose:** Client testimonials slider with dark theme

**Structure:**
- Carousel/slider component
- Dark background
- Navigation arrows + indicators
- Quote marks

**Files:**
- `blocks/carousel-testimonials/carousel-testimonials.js` (reuses `carousel.js`)
- `blocks/carousel-testimonials/carousel-testimonials.css`

**Key Styles:**
- Dark background: `#191A23`
- Large quote mark: `content: '"'` with `font-size: 72px`
- Green indicators: `#B9FF66`

---

## Markdown Usage Examples

### Hero Section

```markdown
+---------------------------------------------------------------+
| **Hero-positivus**                                            |
+---------------------------------------------------------------+
| ![Hero Illustration](/images/positivus-hero-illustration.svg) |
+---------------------------------------------------------------+
| # **Navigating the digital landscape for success**           |
|                                                               |
| Our digital marketing agency helps businesses grow online.    |
|                                                               |
| **[Book a consultation](/contact)**                           |
+---------------------------------------------------------------+
```

### Services Cards

```markdown
+--------------------------------------+--------------------------------------+
| **Cards-services**                                                          |
+--------------------------------------+--------------------------------------+
| ![SEO Icon][service1]                | ## **Search engine optimization**    |
|                                      |                                      |
|                                      | **[Learn more](/services/seo)**      |
+--------------------------------------+--------------------------------------+
```

### Testimonials Carousel

```markdown
+---------------------------------------------------------------+
| **Carousel-testimonials**                                     |
+---------------------------------------------------------------+
| "We have been working with Positivus for the past year..."    |
|                                                               |
| **John Smith**                                                |
|                                                               |
| Marketing Director at XYZ Corp                                |
+---------------------------------------------------------------+
```

---

## Image Assets Required

All image assets should be placed in `/images/` directory:

### Illustrations
- `positivus-hero-illustration.svg`
- `positivus-cta-illustration.svg`

### Client Logos
- `positivus-logo-amazon.svg`
- `positivus-logo-dribbble.svg`
- `positivus-logo-hubspot.svg`
- `positivus-logo-notion.svg`
- `positivus-logo-netflix.svg`
- `positivus-logo-zoom.svg`

### Service Icons
- `positivus-service-seo.svg`
- `positivus-service-ppc.svg`
- `positivus-service-social.svg`
- `positivus-service-email.svg`
- `positivus-service-content.svg`
- `positivus-service-analytics.svg`

### Team Photos
- `positivus-team-jane.jpg`
- `positivus-team-michael.jpg`
- `positivus-team-emily.jpg`
- `positivus-team-brian.jpg`
- `positivus-team-sarah.jpg`
- `positivus-team-david.jpg`

---

## Next Steps

### 1. Add Image Assets

Download or create image assets and commit to git:

```bash
# Add images
git add images/positivus-*.svg images/positivus-*.jpg

# Commit
git commit -m "Add Positivus landing page assets"

# Push
git push
```

### 2. Upload to Document Authoring

Option A: Use DA UI (Recommended)
- Create new page in DA
- Copy markdown content
- Paste and format

Option B: Upload HTML (For testing only)
```bash
node tools/eds-migration/cli.js upload-da \
  pages/positivus-landing.html \
  --owner YOUR_ORG \
  --repo YOUR_REPO \
  --path pages/positivus.html
```

### 3. Test Locally

```bash
# Start development server
npx @adobe/aem-cli up --no-open

# Open browser
http://localhost:3000/pages/positivus-landing
```

### 4. Verify Block Rendering

Check that all blocks render correctly:
- [ ] Hero section displays with illustration
- [ ] Client logos show with hover effects
- [ ] Service cards alternate colors correctly
- [ ] CTA section has light background
- [ ] Case studies display in dark theme
- [ ] Team cards show in 3-column grid
- [ ] Testimonial carousel functions properly

### 5. Responsive Testing

Test at breakpoints:
- Mobile: 375px, 414px
- Tablet: 768px, 834px
- Desktop: 1024px, 1440px, 1920px

---

## File Structure

```
/blocks/
  /hero-positivus/
    hero-positivus.js
    hero-positivus.css
  /columns-logos/
    columns-logos.js
    columns-logos.css
  /cards-services/
    cards-services.js
    cards-services.css
  /hero-cta/
    hero-cta.js
    hero-cta.css
  /cards-casestudies/
    cards-casestudies.js
    cards-casestudies.css
  /cards-team/
    cards-team.js
    cards-team.css
  /carousel-testimonials/
    carousel-testimonials.js
    carousel-testimonials.css

/images/
  positivus-hero-illustration.svg
  positivus-cta-illustration.svg
  positivus-logo-*.svg (6 files)
  positivus-service-*.svg (6 files)
  positivus-team-*.jpg (6 files)

/pages/
  positivus-landing.md
  positivus-landing.html
  POSITIVUS_IMPLEMENTATION.md (this file)
```

---

## Implementation Notes

### JavaScript Strategy

All custom blocks reuse base block JavaScript:
- `hero-positivus` → imports `hero.js`
- `columns-logos` → imports `columns.js`
- `cards-*` → imports `cards.js`
- `carousel-testimonials` → imports `carousel.js`

This approach:
- ✅ Maximizes code reuse
- ✅ Reduces maintenance burden
- ✅ Follows EDS best practices
- ✅ Keeps bundle size minimal

### CSS Strategy

Each block has independent CSS:
- Custom styling per design requirements
- Positivus brand colors and tokens
- Responsive breakpoints at 900px
- No CSS imports or dependencies

### DA Compliance

The generated HTML is DA-compliant:
- Block classes properly applied
- Semantic HTML structure
- Image paths are absolute URLs
- Links are properly formatted
- Ready for DA upload or editing

---

## Design System Tokens

If integrating into an existing EDS project, add these tokens to `styles/styles.css`:

```css
:root {
  /* Positivus Brand Colors */
  --positivus-green: #B9FF66;
  --positivus-dark: #191A23;
  --positivus-light: #F3F3F3;

  /* Or map to existing tokens */
  --color-accent: #B9FF66;
  --color-dark-bg: #191A23;
  --color-light-bg: #F3F3F3;
}
```

---

## Summary

✅ **Complete implementation** of Positivus landing page
✅ **7 custom blocks** with reused JS and custom CSS
✅ **DA-compliant HTML** generated from markdown
✅ **Design tokens** documented and applied
✅ **Responsive design** with mobile-first approach
✅ **Brand styling** with green accent and dark theme

**Total Files Generated:** 16
- 1 Markdown file
- 1 HTML file
- 7 JavaScript files
- 7 CSS files
- 1 Documentation file

The implementation is ready for image asset integration, local testing, and deployment to Document Authoring.
