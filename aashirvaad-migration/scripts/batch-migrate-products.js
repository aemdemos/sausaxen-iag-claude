const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const URLS = [
  'https://aashirvaad.com/our-products/atta/shudh-chakki-atta.html',
  'https://aashirvaad.com/our-products/atta/superior-mp-atta.html',
  'https://aashirvaad.com/our-products/atta/multigrain-atta.html',
  'https://aashirvaad.com/our-products/atta/organic-atta.html',
  'https://aashirvaad.com/our-products/atta/sugar-release-control-atta.html',
  'https://aashirvaad.com/our-products/atta/fortified-chakki-atta.html',
  'https://aashirvaad.com/our-products/atta/gluten-free-flour.html',
  'https://aashirvaad.com/our-products/atta/select-atta.html',
  'https://aashirvaad.com/our-products/atta/high-protein-atta.html',
  'https://aashirvaad.com/our-products/atta/mp-chakki-atta.html',
];

const OUTPUT_DIR = '/Users/sausaxen/Documents/Codebase/sausaxen-iag-claude/aashirvaad-migration/pages';
const TEMP_DIR = '/Users/sausaxen/Documents/Codebase/sausaxen-iag-claude/aashirvaad-migration/temp';

async function extractProductData(page) {
  return await page.evaluate(() => {
    const data = {};

    // Extract breadcrumb
    const breadcrumb = Array.from(document.querySelectorAll('.breadcrumb a, .breadcrumb span'))
      .map((el) => el.textContent.trim())
      .filter(Boolean);
    data.breadcrumb = breadcrumb;

    // Extract product name
    const nameEl = document.querySelector('h1');
    data.productName = nameEl ? nameEl.textContent.trim() : '';

    // Extract description
    const descEl = document.querySelector('.cmp-banner__description p');
    data.description = descEl ? descEl.textContent.trim() : '';

    // Extract product image
    const heroImg = document.querySelector('.cmp-banner__image img');
    data.heroImage = heroImg ? heroImg.src : '';

    // Extract pack sizes
    const packButtons = Array.from(document.querySelectorAll('.cmp-banner__pack-size button'));
    data.packSizes = packButtons.map((btn) => btn.textContent.trim()).filter(Boolean);

    // Extract nutritional info
    const nutritionHeading = document.querySelector('[class*="nutrition"] h3');
    data.hasNutrition = !!nutritionHeading;

    // Extract feature slides
    const featureSlides = Array.from(document.querySelectorAll('.slick-slide'))
      .filter((slide) => !slide.classList.contains('slick-cloned'))
      .slice(0, 4)
      .map((slide) => {
        const img = slide.querySelector('img');
        const heading = slide.querySelector('h5');
        return {
          image: img ? img.src : '',
          title: heading ? heading.textContent.trim() : '',
        };
      });
    data.features = featureSlides.filter((f) => f.image || f.title);

    // Extract recipe cards
    const recipeCards = Array.from(document.querySelectorAll('.cmp-teaser'))
      .slice(0, 6)
      .map((card) => {
        const img = card.querySelector('img');
        const category = card.querySelector('.cmp-teaser__pretitle');
        const title = card.querySelector('.cmp-teaser__title');
        const link = card.querySelector('a');
        const time = card.querySelector('.cmp-teaser__description-wrapper p:first-child');
        const difficulty = card.querySelector('.cmp-teaser__description-wrapper p:last-child');

        return {
          image: img ? img.src : '',
          category: category ? category.textContent.trim() : '',
          title: title ? title.textContent.trim() : '',
          url: link ? link.href : '',
          time: time ? time.textContent.trim() : '',
          difficulty: difficulty ? difficulty.textContent.trim() : '',
        };
      });
    data.recipes = recipeCards.filter((r) => r.image || r.title);

    // Extract video gallery
    const videoThumbs = Array.from(document.querySelectorAll('.cmp-video-gallery img'))
      .map((img) => ({
        thumbnail: img.src,
        alt: img.alt,
      }));
    data.videos = videoThumbs;

    return data;
  });
}

function generateMarkdown(data, slug) {
  const imageRefs = [];
  let refCounter = 0;

  const addImageRef = (url, alt = '') => {
    if (!url) return '';
    const ref = `image${refCounter++}`;
    imageRefs.push({ ref, url, alt });
    return `[${ref}]`;
  };

  // Generate slug from product name
  const productSlug = slug || data.productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  let markdown = '';

  // Breadcrumb block
  if (data.breadcrumb && data.breadcrumb.length > 0) {
    markdown += `+${'-'.repeat(70)}+\n`;
    markdown += `| **Breadcrumb**${' '.repeat(56)}|\n`;
    markdown += `+${'-'.repeat(70)}+\n`;
    markdown += `| ${data.breadcrumb.join(' > ')}${' '.repeat(70 - data.breadcrumb.join(' > ').length - 2)}|\n`;
    markdown += `+${'-'.repeat(70)}+\n\n`;
  }

  // Hero product block
  markdown += `+${'-'.repeat(70)}+\n`;
  markdown += `| **Hero-product**${' '.repeat(54)}|\n`;
  markdown += `+${'-'.repeat(70)}+\n`;

  if (data.heroImage) {
    const imgRef = addImageRef(data.heroImage, data.productName);
    markdown += `| ![][${imgRef}]${' '.repeat(70 - 8 - imgRef.length)}|\n`;
    markdown += `+${'-'.repeat(70)}+\n`;
  }

  markdown += `| # **${data.productName}**${' '.repeat(70 - data.productName.length - 8)}|\n`;
  markdown += `|${' '.repeat(72)}|\n`;

  if (data.description) {
    const desc = `${data.description.substring(0, 200)}...`;
    const lines = desc.match(/.{1,66}/g) || [desc];
    lines.forEach((line) => {
      markdown += `| ${line}${' '.repeat(70 - line.length)}|\n`;
    });
  }

  if (data.packSizes && data.packSizes.length > 0) {
    markdown += `|${' '.repeat(72)}|\n`;
    markdown += `| **Available Sizes:** ${data.packSizes.join(', ')}${' '.repeat(70 - 21 - data.packSizes.join(', ').length)}|\n`;
  }

  markdown += `+${'-'.repeat(70)}+\n\n`;

  // Features carousel
  if (data.features && data.features.length > 0) {
    markdown += '## 4 Step Advantage\n\n';
    markdown += `+${'-'.repeat(70)}+\n`;
    markdown += `| **Carousel-features**${' '.repeat(49)}|\n`;
    markdown += `+${'-'.repeat(35)}+${'-'.repeat(35)}+\n`;

    data.features.forEach((feature, idx) => {
      const imgRef = addImageRef(feature.image, feature.title);
      markdown += `| ![][${imgRef}]${' '.repeat(33 - 7 - imgRef.length)}| `;
      markdown += `**${feature.title}**${' '.repeat(33 - feature.title.length - 4)}|\n`;
      if (idx < data.features.length - 1) {
        markdown += `+${'-'.repeat(35)}+${'-'.repeat(35)}+\n`;
      }
    });

    markdown += `+${'-'.repeat(35)}+${'-'.repeat(35)}+\n\n`;
  }

  // Recipes carousel
  if (data.recipes && data.recipes.length > 0) {
    markdown += '## Wholesome Meals\n\n';
    markdown += `+${'-'.repeat(70)}+\n`;
    markdown += `| **Carousel-recipes**${' '.repeat(50)}|\n`;
    markdown += `+${'-'.repeat(70)}+\n`;

    data.recipes.slice(0, 4).forEach((recipe, idx) => {
      const imgRef = addImageRef(recipe.image, recipe.title);
      markdown += `| ![][${imgRef}]${' '.repeat(70 - 8 - imgRef.length)}|\n`;
      markdown += `|${' '.repeat(72)}|\n`;
      markdown += `| **${recipe.title.substring(0, 60)}**${' '.repeat(70 - recipe.title.substring(0, 60).length - 4)}|\n`;
      markdown += `|${' '.repeat(72)}|\n`;
      markdown += `| _${recipe.category}_${' '.repeat(70 - recipe.category.length - 3)}|\n`;
      markdown += `| ${recipe.time} | ${recipe.difficulty}${' '.repeat(70 - recipe.time.length - recipe.difficulty.length - 4)}|\n`;

      if (idx < data.recipes.length - 1) {
        markdown += `+${'-'.repeat(70)}+\n`;
      }
    });

    markdown += `+${'-'.repeat(70)}+\n\n`;
  }

  // Video gallery
  if (data.videos && data.videos.length > 0) {
    markdown += '## Video Gallery\n\n';
    markdown += `+${'-'.repeat(70)}+\n`;
    markdown += `| **Gallery-videos**${' '.repeat(52)}|\n`;
    markdown += `+${'-'.repeat(70)}+\n`;

    data.videos.forEach((video, idx) => {
      const imgRef = addImageRef(video.thumbnail, video.alt);
      markdown += `| ![][${imgRef}]${' '.repeat(70 - 8 - imgRef.length)}|\n`;
      if (idx < data.videos.length - 1) {
        markdown += `+${'-'.repeat(70)}+\n`;
      }
    });

    markdown += `+${'-'.repeat(70)}+\n\n`;
  }

  // Add image references at the bottom
  markdown += '\n---\n\n## Image References\n\n';
  imageRefs.forEach(({ ref, url, alt }) => {
    markdown += `[${ref}]: ${url}\n`;
  });

  return { markdown, imageRefs, slug: productSlug };
}

async function processAllPages() {
  console.log('Starting batch migration...');

  // Ensure directories exist
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(TEMP_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];
  const allAssets = [];

  for (let i = 0; i < URLS.length; i++) {
    const url = URLS[i];
    console.log(`\n[${i + 1}/${URLS.length}] Processing: ${url}`);

    try {
      // Navigate to page
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(2000);

      // Extract data
      const data = await extractProductData(page);

      // Generate slug from URL
      const urlSlug = url.split('/').pop().replace('.html', '');

      // Generate markdown
      const { markdown, imageRefs, slug } = generateMarkdown(data, urlSlug);

      // Save markdown file
      const filename = `product-atta-${slug}.md`;
      const filepath = path.join(OUTPUT_DIR, filename);
      await fs.writeFile(filepath, markdown);
      console.log(`  ✓ Saved: ${filename}`);

      // Collect assets
      imageRefs.forEach((img) => {
        allAssets.push({
          page: slug,
          ref: img.ref,
          url: img.url,
          alt: img.alt || '',
        });
      });

      results.push({
        url,
        slug,
        filename,
        status: 'success',
        imageCount: imageRefs.length,
      });
    } catch (error) {
      console.error(`  ✗ Error processing ${url}:`, error.message);
      results.push({
        url,
        status: 'failed',
        error: error.message,
      });
    }
  }

  // Save asset list JSON
  const assetListPath = path.join(TEMP_DIR, 'batch1-assets.json');
  await fs.writeFile(assetListPath, JSON.stringify({ assets: allAssets }, null, 2));
  console.log(`\n✓ Asset list saved: ${assetListPath}`);

  await browser.close();

  // Print summary
  console.log(`\n${'='.repeat(80)}`);
  console.log('MIGRATION SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total pages: ${URLS.length}`);
  console.log(`Successful: ${results.filter((r) => r.status === 'success').length}`);
  console.log(`Failed: ${results.filter((r) => r.status === 'failed').length}`);
  console.log(`Total assets: ${allAssets.length}`);
  console.log('='.repeat(80));

  results.forEach((result, idx) => {
    if (result.status === 'success') {
      console.log(`${idx + 1}. ✓ ${result.filename} (${result.imageCount} images)`);
    } else {
      console.log(`${idx + 1}. ✗ ${result.url} - ${result.error}`);
    }
  });

  return results;
}

processAllPages().catch(console.error);
