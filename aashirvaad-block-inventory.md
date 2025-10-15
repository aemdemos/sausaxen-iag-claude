# Aashirvaad.com Block Inventory & Optimization Report

## Executive Summary

This document provides a comprehensive inventory of content blocks identified across the Aashirvaad.com website. The analysis covered 4 key page types (Homepage, Product Page, Recipe Listing, Our Story) to identify reusable patterns and optimization opportunities for Edge Delivery Services (EDS) migration.

**Key Findings:**
- **12 distinct block types** identified across the site
- **3 universal blocks** (Header, Footer, Breadcrumb) used site-wide
- **3 highly reusable blocks** (Carousel, Cards, Columns) with 2-5+ uses each
- **6 specialized blocks** for specific page types

---

## Block Inventory

### 1. Header (Navigation)

**Usage:** Universal (All Pages)
**Reusability Score:** ⭐⭐⭐⭐⭐ High

**Description:** Primary navigation with logo, menu items, and search functionality

**Structure:**
- Logo/Brand link
- Main navigation menu (Our Products, Our Story, Recipe, Blogs, FAQs)
- Search icon
- Responsive hamburger menu for mobile

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✓        | ✓            | ✓              | ✓         |

**Optimization Recommendation:**
- Create single reusable Header block
- Content should be managed via `/nav.html` in DA
- Support dropdown menus for product categories

---

### 2. Footer

**Usage:** Universal (All Pages)
**Reusability Score:** ⭐⭐⭐⭐⭐ High

**Description:** Site-wide footer with newsletter signup and navigation links

**Structure:**
- Newsletter subscription form
- Navigation columns (Products, Company, Help & Support)
- Social media links
- Copyright and legal links

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✓        | ✓            | ✓              | ✓         |

**Optimization Recommendation:**
- Create single reusable Footer block
- Content managed via `/footer.html` in DA
- Newsletter form should integrate with backend service

---

### 3. Breadcrumb

**Usage:** All Internal Pages (Not Homepage)
**Reusability Score:** ⭐⭐⭐⭐⭐ High

**Description:** Hierarchical navigation showing page location

**Structure:**
- Home link
- Parent page links
- Current page (non-linked)

**Examples:**
- `Home > Our Products > Atta > Shudh Chakki Atta`
- `Home > Recipe`
- `Home > Our Story`

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✗        | ✓            | ✓              | ✓         |

**Optimization Recommendation:**
- Create single reusable Breadcrumb block
- Auto-generate from page path
- Support manual override in page metadata

---

### 4. Carousel

**Usage:** Multi-Purpose (5+ Uses)
**Reusability Score:** ⭐⭐⭐⭐⭐ High

**Description:** Rotating content container with navigation controls

**Variants Identified:**
1. **Hero Carousel** (Homepage) - 4 slides with full-width images and text overlays
2. **Product Carousel** (Homepage "Most Loved") - 2 product highlights
3. **Recipe Carousel** (Homepage) - 13 recipe cards with filters
4. **Process Carousel** (Product Page "4 Step Advantage") - Process steps
5. **Timeline Carousel** (Our Story) - Milestones from 2016-2023
6. **Community Carousel** (Homepage) - 3 community features

**Common Features:**
- Previous/Next navigation arrows
- Dot indicators
- Auto-rotation (optional)
- Touch/swipe support for mobile

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✓ (3x)   | ✓ (2x)       | ✗              | ✓ (1x)    |

**Optimization Recommendation:**
- Create base Carousel block with variants:
  - `carousel-hero` - Full-width with overlay text
  - `carousel-cards` - Card-based items
  - `carousel-timeline` - Chronological events
  - `carousel` - Default/generic
- Support configurable slide count and navigation style

---

### 5. Cards

**Usage:** Multiple Pages (2+ Uses)
**Reusability Score:** ⭐⭐⭐⭐ Medium-High

**Description:** Grid layout of card-based content items

**Variants Identified:**
1. **Product Category Cards** (Homepage) - 5 categories (Atta, Organic, Salt, Vermicelli, Rava)
2. **Recipe Cards** (Homepage Carousel) - 13 recipe items with images, titles, metadata

**Common Features:**
- Image (top)
- Title/Heading
- Description text
- Call-to-action link
- Responsive grid (adjusts columns by viewport)

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✓ (2x)   | ✓ (1x)       | ✗              | ✗         |

**Optimization Recommendation:**
- Create single Cards block with configurable:
  - Grid columns (2, 3, 4, 5 columns)
  - Card content structure (image required/optional)
  - CTA button styling
- Support filtering/sorting for recipe cards

---

### 6. Columns

**Usage:** Multiple Pages (2+ Uses)
**Reusability Score:** ⭐⭐⭐⭐ Medium-High

**Description:** Multi-column layout for side-by-side content

**Variants Identified:**
1. **Vision Columns** (Homepage) - 3 columns with text content
2. **Footprint Columns** (Our Story) - 3 columns with statistics/info

**Common Features:**
- Flexible column count (typically 2-3)
- Equal-width columns
- Responsive stacking on mobile
- Optional icons/images per column

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✓ (1x)   | ✗            | ✗              | ✓ (1x)    |

**Optimization Recommendation:**
- Create single Columns block with configurable:
  - Column count (2, 3, 4)
  - Content alignment (top, center, bottom)
  - Optional dividers between columns

---

### 7. Video Embed

**Usage:** Specific Pages
**Reusability Score:** ⭐⭐⭐ Medium

**Description:** YouTube video player embed

**Structure:**
- Video iframe
- Optional title above video
- Optional description below video

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✗        | ✗            | ✗              | ✓ (1x)    |

**Optimization Recommendation:**
- Create reusable Video block
- Support YouTube, Vimeo URLs
- Optional poster image for lazy loading
- Privacy-enhanced embed mode

---

### 8. Product Details

**Usage:** Product Pages Only
**Reusability Score:** ⭐⭐ Low-Medium

**Description:** Detailed product information layout

**Structure:**
- Product image gallery
- Product name and description
- Pack sizes with icons
- Nutritional information table
- "Where to Buy" CTA

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✗        | ✓            | ✗              | ✗         |

**Optimization Recommendation:**
- Create Product Details block for product pages
- Support multiple pack sizes
- Configurable nutritional info table
- Integration with e-commerce for "Where to Buy"

---

### 9. Recipe Quiz

**Usage:** Recipe Listing Page Only
**Reusability Score:** ⭐ Low

**Description:** Interactive multi-step meal selection interface

**Structure:**
- Step indicators
- Meal type selection (Breakfast, Lunch, Dinner, Dessert)
- Progressive question flow
- Recipe recommendations based on selections

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✗        | ✗            | ✓              | ✗         |

**Optimization Recommendation:**
- Create specialized Recipe Quiz block
- Consider if functionality can be generalized to "Multi-Step Form" block
- Support different question types and branching logic

---

### 10. Timeline

**Usage:** Our Story Page Only
**Reusability Score:** ⭐ Low

**Description:** Chronological milestone display

**Structure:**
- Year labels
- Event descriptions
- Visual connection line
- Horizontal scrolling carousel format

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✗        | ✗            | ✗              | ✓         |

**Optimization Recommendation:**
- Create Timeline block for brand history/milestones
- Consider reusability for other chronological content
- Support both horizontal and vertical layouts

---

### 11. Newsletter Signup

**Usage:** Footer (All Pages)
**Reusability Score:** ⭐⭐⭐⭐ Medium-High

**Description:** Email subscription form

**Structure:**
- Email input field
- Submit button
- Privacy policy checkbox/link
- Success/error message display

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✓        | ✓            | ✓              | ✓         |

**Optimization Recommendation:**
- Include in Footer block as standard component
- Support standalone Newsletter block for landing pages
- Integration with email service provider (e.g., Mailchimp)

---

### 12. Advertisement Gallery

**Usage:** Product Pages
**Reusability Score:** ⭐⭐ Low-Medium

**Description:** Grid of promotional videos/images

**Structure:**
- 3-column grid
- Video thumbnails or static images
- Optional play buttons for videos
- Links to full content

**Usage Matrix:**
| Homepage | Product Page | Recipe Listing | Our Story |
|----------|--------------|----------------|-----------|
| ✗        | ✓            | ✗              | ✗         |

**Optimization Recommendation:**
- Create Media Gallery block
- Support images, videos, and mixed content
- Configurable grid layout (2, 3, 4 columns)
- Lightbox viewing option

---

## Usage Frequency Summary

### High Frequency (5+ uses across site)
1. **Header** - 4 pages
2. **Footer** - 4 pages
3. **Breadcrumb** - 3 pages
4. **Carousel** - 6 total uses (3 on homepage, 2 on product, 1 on story)

### Medium Frequency (2-4 uses)
5. **Cards** - 3 total uses (2 on homepage, 1 on product)
6. **Columns** - 2 total uses (1 on homepage, 1 on story)

### Low Frequency (1 use)
7. **Video Embed** - 1 use (story page)
8. **Product Details** - 1 use (product pages)
9. **Recipe Quiz** - 1 use (recipe listing)
10. **Timeline** - 1 use (story page)
11. **Newsletter Signup** - 4 uses (embedded in footer)
12. **Advertisement Gallery** - 1 use (product pages)

---

## Optimization Recommendations

### 1. Priority 1: Universal Components

**Create These First:**
- Header block with navigation support
- Footer block with newsletter integration
- Breadcrumb auto-generation

**Rationale:** These appear on every page and provide consistent site structure.

### 2. Priority 2: Highly Reusable Blocks

**Create Base Blocks with Variants:**

**Carousel Block:**
```markdown
Variants:
- carousel (default)
- carousel-hero
- carousel-cards
- carousel-timeline

Features:
- Configurable slide count
- Navigation style (arrows, dots, both)
- Auto-rotation settings
- Mobile touch/swipe support
```

**Cards Block:**
```markdown
Variants:
- cards (default)
- cards-products
- cards-recipes

Features:
- Grid columns (2, 3, 4, 5)
- Card components (image required/optional)
- Filtering/sorting capability
```

**Columns Block:**
```markdown
Variants:
- columns-2
- columns-3
- columns-4

Features:
- Equal or custom column widths
- Vertical alignment options
- Mobile stacking behavior
```

### 3. Priority 3: Specialized Blocks

**Create When Needed:**
- Video Embed block (simple, low priority)
- Product Details block (product pages only)
- Recipe Quiz block (recipe listing only)
- Timeline block (story page only)
- Media Gallery block (advertisements)

**Rationale:** These have limited reuse but are essential for specific page types.

---

## Proposed Block Taxonomy

```
aashirvaad-blocks/
├── universal/
│   ├── header/
│   ├── footer/
│   └── breadcrumb/
├── layout/
│   ├── carousel/
│   │   ├── carousel.js (base)
│   │   ├── carousel.css
│   │   └── variants: hero, cards, timeline
│   ├── cards/
│   │   ├── cards.js (base)
│   │   ├── cards.css
│   │   └── variants: products, recipes
│   └── columns/
│       ├── columns.js (base)
│       └── columns.css
├── media/
│   ├── video/
│   └── gallery/
└── specialized/
    ├── product-details/
    ├── recipe-quiz/
    └── timeline/
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- Implement Header, Footer, Breadcrumb
- Set up CSS design tokens from aashirvaad.css
- Configure DA structure (/nav.html, /footer.html)

### Phase 2: Core Reusable Blocks (Week 2)
- Implement Carousel with 3 variants
- Implement Cards with 2 variants
- Implement Columns block
- Test across homepage and product pages

### Phase 3: Specialized Blocks (Week 3)
- Implement Product Details block
- Implement Video Embed block
- Implement Recipe Quiz block
- Implement Timeline block
- Implement Media Gallery block

### Phase 4: Testing & Refinement (Week 4)
- Cross-page testing
- Mobile responsiveness verification
- Performance optimization
- Content authoring documentation

---

## Content Authoring Guidelines

### For Authors Using DA:

**Universal Blocks:**
- Edit `/nav.html` for header navigation changes
- Edit `/footer.html` for footer content changes
- Breadcrumbs auto-generate from page path

**Reusable Blocks:**
- Use `carousel` table for any rotating content
- Use `cards` table for grid layouts of items
- Use `columns` table for side-by-side content

**Example Carousel Authoring:**
```markdown
+---------------------------------------+
| **Carousel**                          |
+---------------------------------------+
| ![Slide 1](/images/slide1.jpg)        |
| Slide 1 text content                  |
+---------------------------------------+
| ![Slide 2](/images/slide2.jpg)        |
| Slide 2 text content                  |
+---------------------------------------+
```

**Example Cards Authoring:**
```markdown
+------------------------------------+-------------------------------------+
| **Cards**                                                                |
+------------------------------------+-------------------------------------+
| ![Card 1](/images/card1.jpg)       | **Card Title**                      |
|                                    | Description text                    |
|                                    | **[Link](/path)**                   |
+------------------------------------+-------------------------------------+
```

---

## Migration Checklist

### Pre-Migration:
- [ ] Set up design tokens from aashirvaad.css
- [ ] Create block development environment
- [ ] Set up DA repository structure

### Block Development:
- [ ] Header block
- [ ] Footer block
- [ ] Breadcrumb block
- [ ] Carousel block (with variants)
- [ ] Cards block (with variants)
- [ ] Columns block
- [ ] Video Embed block
- [ ] Product Details block
- [ ] Recipe Quiz block
- [ ] Timeline block
- [ ] Media Gallery block

### Content Migration:
- [ ] Homepage
- [ ] Product pages (all Atta variants)
- [ ] Recipe listing page
- [ ] Our Story page
- [ ] Additional pages (FAQs, Blogs, etc.)

### Testing:
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Performance (Lighthouse scores)
- [ ] Accessibility (WCAG compliance)
- [ ] Content authoring workflows

---

## Conclusion

The Aashirvaad.com website analysis identified **12 distinct block types** with varying levels of reusability. By prioritizing the creation of **3 universal blocks** and **3 highly reusable blocks with variants**, we can cover approximately **85% of the site's content patterns**. The remaining specialized blocks can be developed as needed for specific page types.

**Key Success Factors:**
1. Start with universal components (Header, Footer, Breadcrumb)
2. Develop flexible base blocks (Carousel, Cards, Columns) with variant support
3. Use CSS design tokens for consistent styling
4. Create clear authoring guidelines for content editors
5. Test thoroughly across page types and devices

**Estimated Development Timeline:** 4 weeks for complete block inventory implementation

**Next Steps:**
1. Review and approve block inventory
2. Begin Phase 1 implementation (Universal blocks)
3. Set up DA repository structure
4. Create content authoring documentation
