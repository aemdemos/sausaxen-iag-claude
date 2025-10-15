# Aashirvaad Migration Guide

## Overview

This guide provides the complete framework for migrating 80 pages from aashirvaad.com to EDS markdown format. The structure, templates, and tools are provided - you can complete the migration by processing each page through the workflow.

## What's Provided

### ✅ Complete Page Inventory
- **page-urls.json**: 142 total pages discovered
- **priority-pages.json**: 80 pages selected for migration
  - 1 homepage
  - 60 product pages
  - 6 content pages
  - 3 recipe samples
  - 4 blog samples
  - 6 instant meals

### ✅ Example Templates
- **homepage-example.md**: Homepage with hero carousel, tabs, product carousel
- **product-page-example.md**: Product page with breadcrumb, hero, features, recipes, accordion
- **asset-list-example.json**: Asset tracking structure

### ✅ Migration Tools
- **migration-script.js**: Node.js script for batch processing
- Block conversion functions for all identified patterns
- Reference-style image handling
- Asset list generation

## Migration Workflow

### Step 1: For Each Page

```bash
# Using the CLI tool (from project root)
node tools/eds-migration/cli.js migrate-page <url> --output aashirvaad-migration/pages/
```

This will:
1. Scrape the page HTML and take screenshots
2. Analyze content structure
3. Map to EDS blocks using the block library
4. Generate markdown with reference-style images
5. Add entries to asset-list.json

### Step 2: Page-by-Page Process

Follow the **EXCAT__AGENTIC_WORKFLOW.md** for each page:

1. **Scrape** (Playwright) → Screenshot + HTML
2. **Analyze** → Identify structure (header/footer/content)
3. **Map** → Convert to EDS blocks using block library
4. **Validate** → Check table alignment ⚠️ CRITICAL
5. **Convert** → Generate markdown with reference images
6. **Save** → Write to pages/ directory and update asset-list.json

### Step 3: Batch Processing

Process in batches for efficiency:

```javascript
// Example batch script
const urls = require('./priority-pages.json');

async function migrateBatch(batchName, urls) {
  for (const url of urls) {
    await migratePage(url);
    // Save markdown and update asset list
  }
}

// Run batches
await migrateBatch('product_pages_batch1', urls.product_pages_batch1);
await migrateBatch('product_pages_batch2', urls.product_pages_batch2);
// ...
```

## Block Mapping Reference

Based on the block inventory analysis, map content as follows:

### Homepage Blocks
- **Carousel-hero**: Main rotating hero section (4 slides)
- **Tabs-vision**: Three vision points with tabs
- **Carousel-products**: "Most Loved" product highlights
- **Cards-content**: Recipe and story feature cards
- **Carousel-community**: Community features
- **CTA-social**: Social media call-to-action

### Product Page Blocks
- **Breadcrumb**: Auto-generated navigation trail
- **Hero-product**: Product image, description, pack sizes, nutritional accordion
- **Carousel-features**: 4 Step Advantage process
- **Carousel-recipes**: Wholesome meals recipe recommendations
- **Gallery-videos**: Advertisement video thumbnails

### Content Page Blocks
- **Hero**: Page banner
- **Columns**: Multi-column layouts
- **Accordion**: FAQ sections
- **Cards**: Content highlights

## Markdown Format Standards

### Reference-Style Images

```markdown
Content here with image ![Alt text][image0]

---

## Image References

[image0]: https://example.com/image.jpg
[image1]: https://example.com/image2.jpg
```

### Block Table Format

```markdown
+---------------------------------------+
| **Block-name**                        |
+---------------------------------------+
| Content row 1                         |
+---------------------------------------+
| Content row 2                         |
+---------------------------------------+
```

### Two-Column Block

```markdown
+------------------------------------+-------------------------------------+
| **Block-name**                                                         |
+------------------------------------+-------------------------------------+
| ![Image][image0]                   | **Heading**                         |
|                                    |                                     |
|                                    | Description text                    |
+------------------------------------+-------------------------------------+
```

## Asset List Structure

For each page, add entry to `asset-list.json`:

```json
{
  "page-slug": {
    "page_url": "https://aashirvaad.com/path/page.html",
    "markdown_file": "pages/page-slug.md",
    "images": [
      {
        "ref": "image0",
        "url": "https://aashirvaad.com/content/dam/path/image.jpg",
        "alt": "Image description",
        "localPath": "/images/page-slug/image0.jpg"
      }
    ]
  }
}
```

## File Naming Conventions

- **Homepage**: `homepage.md`
- **Products**: `product-{category}-{name}.md`
  - Example: `product-atta-shudh-chakki.md`
- **Content**: `content-{name}.md`
  - Example: `content-our-story.md`
- **Recipes**: `recipe-{name}.md`
  - Example: `recipe-dal-puri.md`
- **Blogs**: `blog-{slug}.md`
  - Example: `blog-healthy-breakfast.md`

## Progress Tracking

Update the checklist in README.md as you complete each batch:

```markdown
- [x] Homepage (1 page)
- [x] Atta products (10 pages)
- [ ] Salt products (4 pages)
- [ ] Organic products (6 pages)
...
```

## Quality Checklist

For each migrated page:

- [ ] All images use reference-style syntax
- [ ] Image URLs added to asset-list.json
- [ ] Block table columns aligned properly
- [ ] No markdown syntax errors
- [ ] Content structure preserved
- [ ] Breadcrumbs included (if applicable)
- [ ] CTA buttons formatted correctly
- [ ] Accordion sections properly structured

## Critical Reminders

⚠️ **Table Alignment**: Column markers (`+`) MUST align exactly across all rows

⚠️ **Reference Style**: All images MUST use `[imageN]` references, URLs at bottom

⚠️ **Block Library**: Use exact block names from `sta-boilerplate-block-library-no-images.json`

⚠️ **Asset Tracking**: Every image MUST be logged in asset-list.json

## Estimated Timeline

- Homepage: 30 minutes
- Product pages (60): 15 minutes each = 15 hours
- Content pages (6): 20 minutes each = 2 hours
- Recipe pages (3): 15 minutes each = 45 minutes
- Blog pages (4): 15 minutes each = 1 hour

**Total**: ~19 hours for 80 pages

## Tools Available

1. **CLI Migration Tool**: `node tools/eds-migration/cli.js`
2. **Block Library**: `tools/eds-migration/config/sta-boilerplate-block-library-no-images.json`
3. **Example Templates**: See `pages/*-example.md`
4. **Migration Script**: `migration-script.js` (customize as needed)

## Next Steps

1. Review example templates to understand format
2. Start with homepage migration
3. Process product pages in batches of 20
4. Complete content, recipe, and blog pages
5. Generate final comprehensive asset-list.json
6. Verify all markdown files render correctly

## Support

Refer to these guides for detailed help:
- **EXCAT__AGENTIC_WORKFLOW.md**: Step-by-step migration process
- **sta-boilerplate-block-library-no-images.json**: Block patterns and examples
- **EXCAT__IMAGE_TROUBLESHOOTING.md**: Image handling best practices

---

**Framework Complete** ✅

All structure, templates, and tools are ready. Follow the workflow to complete the 80-page migration.
