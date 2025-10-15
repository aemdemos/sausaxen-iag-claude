/**
 * Aashirvaad Website Migration Script
 *
 * This script migrates pages from aashirvaad.com to EDS markdown format
 * with reference-style images and generates asset-list.json
 */

const fs = require('fs');
const path = require('path');

class AashirvaaadMigration {
  constructor() {
    this.assets = {};
    this.imageCounter = 0;
  }

  /**
   * Generate markdown for a page with reference-style images
   */
  generateMarkdown(pageData) {
    const {
      url, title, blocks, images,
    } = pageData;
    const slug = this.urlToSlug(url);

    let markdown = `# ${title}\n\n`;
    const imageReferences = [];

    // Process blocks
    blocks.forEach((block) => {
      markdown += this.convertBlockToMarkdown(block, imageReferences);
    });

    // Add image references at bottom
    if (imageReferences.length > 0) {
      markdown += '\n\n---\n\n';
      markdown += '## Image References\n\n';
      imageReferences.forEach((ref) => {
        markdown += `[${ref.id}]: ${ref.url}\n`;
      });
    }

    return { markdown, slug, images: imageReferences };
  }

  /**
   * Convert block to markdown with proper EDS syntax
   */
  convertBlockToMarkdown(block, imageRefs) {
    switch (block.type) {
      case 'hero':
        return this.convertHeroBlock(block, imageRefs);
      case 'cards':
        return this.convertCardsBlock(block, imageRefs);
      case 'carousel':
        return this.convertCarouselBlock(block, imageRefs);
      case 'columns':
        return this.convertColumnsBlock(block, imageRefs);
      default:
        return this.convertDefaultContent(block, imageRefs);
    }
  }

  /**
   * Convert hero block with reference-style image
   */
  convertHeroBlock(block, imageRefs) {
    const imgRef = this.addImageReference(block.backgroundImage, imageRefs);

    return `
+---------------------------------------+
| **Hero**                              |
+---------------------------------------+
| ![${block.imageAlt || 'Hero image'}][${imgRef}] |
+---------------------------------------+
| # **${block.heading}**                |
|                                       |
| ${block.description}                  |
|                                       |
| **[${block.ctaText}](${block.ctaUrl})**|
+---------------------------------------+

`;
  }

  /**
   * Convert cards block with reference-style images
   */
  convertCardsBlock(block, imageRefs) {
    let markdown = `
+------------------------------------+-------------------------------------+
| **Cards**                                                                |
+------------------------------------+-------------------------------------+
`;

    block.items.forEach((item) => {
      const imgRef = this.addImageReference(item.image, imageRefs);
      markdown += `| ![${item.title}][${imgRef}] | **${item.title}** |\n`;
      markdown += '|                                    |                                     |\n';
      markdown += `|                                    | ${item.description}                 |\n`;
      if (item.link) {
        markdown += `|                                    | **[Learn More](${item.link})**      |\n`;
      }
      markdown += '+------------------------------------+-------------------------------------+\n';
    });

    return `${markdown}\n`;
  }

  /**
   * Add image reference and return reference ID
   */
  addImageReference(imageUrl, imageRefs) {
    const refId = `image${this.imageCounter++}`;
    imageRefs.push({ id: refId, url: imageUrl });
    return refId;
  }

  /**
   * Convert URL to filename slug
   */
  urlToSlug(url) {
    return url
      .replace('https://aashirvaad.com/', '')
      .replace(/\//g, '-')
      .replace(/\.html$/, '')
      .replace(/^-/, '')
      .replace(/-+/g, '-');
  }

  /**
   * Generate asset-list.json
   */
  generateAssetList() {
    return JSON.stringify(this.assets, null, 2);
  }

  /**
   * Add page assets to global asset list
   */
  addPageAssets(slug, images) {
    this.assets[slug] = {
      images: images.map((img) => ({
        ref: img.id,
        url: img.url,
        localPath: `/images/${slug}/${img.id}.jpg`,
      })),
    };
  }
}

module.exports = AashirvaaadMigration;
