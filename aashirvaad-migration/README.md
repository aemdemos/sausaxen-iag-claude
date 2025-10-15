# Aashirvaad Website Migration - Instructions

## Overview
This directory contains the migration of 80 pages from aashirvaad.com to EDS markdown format.

## Structure

```
aashirvaad-migration/
├── pages/                    # Migrated markdown files
│   ├── homepage.md
│   ├── product-*.md
│   ├── content-*.md
│   └── ...
├── assets/                   # Downloaded images (future)
├── temp/                     # Temporary processing files
├── page-urls.json           # Complete URL inventory (142 pages)
├── priority-pages.json      # Selected 80 pages for migration
├── asset-list.json          # Generated image URL mapping
└── migration-script.js      # Migration automation script

## Migrated Pages (80 total)

### Completed
- [x] Homepage (1 page)
- [ ] Product pages (60 pages)
  - [ ] Atta products (10 pages)
  - [ ] Salt products (4 pages)
  - [ ] Organic products (6 pages)
  - [ ] Millets (4 pages)
  - [ ] Vermicelli & Rava (5 pages)
  - [ ] Frozen items (5 pages)
  - [ ] Instant meals (5 pages)
  - [ ] Spices (21 pages)
- [ ] Content pages (6 pages)
- [ ] Recipe samples (3 pages)
- [ ] Blog samples (4 pages)
- [ ] Instant meals category (6 pages)

## Markdown Format

All pages use:
- **Reference-style images** at bottom of file
- **Proper EDS block syntax** (tables with +, |, -)
- **Preserved content structure**
- **Image placeholders** with URLs in asset-list.json

### Example Format

```markdown
# Page Title

+---------------------------------------+
| **Hero**                              |
+---------------------------------------+
| ![Hero image][image0]                 |
+---------------------------------------+
| # **Main Heading**                    |
|                                       |
| Description text                      |
+---------------------------------------+

## Section Content

Regular paragraph content here.

+------------------------------------+-------------------------------------+
| **Cards**                                                                |
+------------------------------------+-------------------------------------+
| ![Card 1][image1]                  | **Card Title**                      |
|                                    | Card description                    |
+------------------------------------+-------------------------------------+

---

## Image References

[image0]: https://aashirvaad.com/images/hero.jpg
[image1]: https://aashirvaad.com/images/card1.jpg
```

## Asset List Format

`asset-list.json`:
```json
{
  "homepage": {
    "images": [
      {
        "ref": "image0",
        "url": "https://aashirvaad.com/images/hero.jpg",
        "localPath": "/images/homepage/image0.jpg"
      }
    ]
  }
}
```

## Migration Status

- **URL Discovery**: ✅ Complete (142 pages found)
- **Priority Selection**: ✅ Complete (80 pages selected)
- **Homepage Migration**: 🔄 In Progress
- **Product Pages**: ⏳ Pending
- **Content Pages**: ⏳ Pending
- **Asset List Generation**: ⏳ Pending

## Next Steps

1. Complete homepage migration
2. Migrate product pages in batches
3. Migrate content, recipe, and blog pages
4. Generate comprehensive asset-list.json
5. Verify all markdown files

## Notes

- Images use reference-style syntax for cleaner markdown
- All image URLs preserved in asset-list.json
- Block syntax follows EDS standards from block library
- Content structure maintained from original site
