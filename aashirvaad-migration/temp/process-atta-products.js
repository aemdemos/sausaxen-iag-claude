const fs = require('fs');
const path = require('path');

// Product URLs to process
const products = [
  { url: 'https://aashirvaad.com/our-products/atta/shudh-chakki-atta.html', slug: 'shudh-chakki-atta' },
  { url: 'https://aashirvaad.com/our-products/atta/superior-mp-atta.html', slug: 'superior-mp-atta' },
  { url: 'https://aashirvaad.com/our-products/atta/multigrain-atta.html', slug: 'multigrain-atta' },
  { url: 'https://aashirvaad.com/our-products/atta/organic-atta.html', slug: 'organic-atta' },
  { url: 'https://aashirvaad.com/our-products/atta/sugar-release-control-atta.html', slug: 'sugar-release-control-atta' },
  { url: 'https://aashirvaad.com/our-products/atta/fortified-chakki-atta.html', slug: 'fortified-chakki-atta' },
  { url: 'https://aashirvaad.com/our-products/atta/gluten-free-flour.html', slug: 'gluten-free-flour' },
  { url: 'https://aashirvaad.com/our-products/atta/select-atta.html', slug: 'select-atta' },
  { url: 'https://aashirvaad.com/our-products/atta/high-protein-atta.html', slug: 'high-protein-atta' },
  { url: 'https://aashirvaad.com/our-products/atta/mp-chakki-atta.html', slug: 'mp-chakki-atta' },
];

// Template data based on page structure analysis
const productData = {
  'shudh-chakki-atta': {
    name: 'Shudh Chakki Atta',
    description: 'Launched on 27th May 2002, Aashirvaad is the number one packaged atta in India. We bring you the finest whole-wheat grains, directly from the farmers. Aashirvaad Whole Wheat atta is made with the choicest grains which are dense & hold a golden amber shade.',
    packSizes: ['5KG', '10KG'],
    features: ['Sourced from 6500 centers', '3 Step cleaning process', 'Traditional chakki method', 'Untouched packaging'],
  },
  'superior-mp-atta': {
    name: 'Superior MP Atta',
    description: 'Aashirvaad Superior MP Atta is made from Madhya Pradesh wheat known for its quality and taste. Perfect for making soft rotis and other Indian delicacies.',
    packSizes: ['5KG', '10KG'],
    features: ['Premium MP wheat', 'Superior quality', 'Traditional chakki grinding', 'Hygienic packaging'],
  },
  'multigrain-atta': {
    name: 'Atta with Multigrains',
    description: 'Aashirvaad Multigrain Atta brings together the goodness of 6 grains - wheat, soya, channa, oats, maize, and psyllium husk. Rich in fiber and nutrients.',
    packSizes: ['2KG', '5KG'],
    features: ['6 grain blend', 'High in fiber', 'Nutritious', 'Great taste'],
  },
  'organic-atta': {
    name: 'Organic Atta',
    description: 'Aashirvaad Organic Atta is made from organically grown wheat, certified by reputed agencies. No chemical pesticides or fertilizers used in cultivation.',
    packSizes: ['5KG'],
    features: ['100% Organic', 'Certified organic wheat', 'Chemical-free', 'Sustainable farming'],
  },
  'sugar-release-control-atta': {
    name: 'Sugar Release Control Atta',
    description: 'Aashirvaad Sugar Release Control Atta is specially designed with a blend of ingredients that help manage sugar release. Contains fenugreek, barley, and other beneficial ingredients.',
    packSizes: ['2KG', '5KG'],
    features: ['Helps manage sugar release', 'Blend of beneficial ingredients', 'High fiber', 'Great taste'],
  },
  'fortified-chakki-atta': {
    name: 'Fortified Chakki Atta',
    description: 'Aashirvaad Fortified Chakki Atta is enriched with essential vitamins and minerals including Iron, Folic Acid, Vitamin B12, and more to support your family\'s nutrition.',
    packSizes: ['5KG', '10KG'],
    features: ['Fortified with vitamins', 'Added minerals', 'Nutritious', 'Same great taste'],
  },
  'gluten-free-flour': {
    name: 'Gluten Free Atta',
    description: 'Aashirvaad Gluten Free Atta is made from a special blend of gluten-free grains. Perfect for those with gluten sensitivity or celiac disease.',
    packSizes: ['500G', '1KG'],
    features: ['100% Gluten free', 'Multi-grain blend', 'Nutritious', 'Easy to use'],
  },
  'select-atta': {
    name: 'Select Atta',
    description: 'Aashirvaad Select Atta is made from premium quality wheat selected from the best harvest. Delivers superior softness and taste in every roti.',
    packSizes: ['5KG'],
    features: ['Premium wheat', 'Superior softness', 'Selected quality', 'Perfect rotis'],
  },
  'high-protein-atta': {
    name: 'High Protein Atta',
    description: 'Aashirvaad High Protein Atta contains 13g protein per 100g serving. Enhanced with protein-rich ingredients for better nutrition and health.',
    packSizes: ['1KG', '5KG'],
    features: ['High protein content', '13g per 100g', 'Protein-rich blend', 'Healthy choice'],
  },
  'mp-chakki-atta': {
    name: 'MP Chakki Atta',
    description: 'Aashirvaad MP Chakki Atta is made from premium Madhya Pradesh wheat ground using traditional chakki method. Known for excellent taste and texture.',
    packSizes: ['5KG', '10KG'],
    features: ['Premium MP wheat', 'Chakki ground', 'Superior quality', 'Great taste'],
  },
};

// Generate markdown for a product
function generateMarkdown(slug, data, imageIndex) {
  const breadcrumbPath = `[Home](/) > [Our Products](/our-products) > [Atta](/our-products/atta) > ${data.name}`;

  let markdown = `# ${data.name}\n\n`;

  // Breadcrumb block
  markdown += '+---------------------------------------+\n';
  markdown += '| **Breadcrumb**                        |\n';
  markdown += '+---------------------------------------+\n';
  markdown += `| ${breadcrumbPath} |\n`;
  markdown += '+---------------------------------------+\n\n';

  // Hero-product block
  markdown += '+---------------------------------------+---------------------------------------+\n';
  markdown += '| **Hero-product**                                                          |\n';
  markdown += '+---------------------------------------+---------------------------------------+\n';
  markdown += `| ![${data.name}][image${imageIndex}]   | # **${data.name}**                    |\n`;
  markdown += '|                                       |                                       |\n';
  markdown += `|                                       | ${data.description}                   |\n`;
  markdown += '|                                       |                                       |\n';
  markdown += '|                                       | ### **Pack Sizes**                    |\n';
  markdown += '|                                       |                                       |\n';
  const packButtons = data.packSizes.map((size) => `**[${size}](#)**`).join(' ');
  markdown += `|                                       | ${packButtons}                        |\n`;
  markdown += '+---------------------------------------+---------------------------------------+\n\n';

  // Features carousel
  markdown += '+---------------------------------------+---------------------------------------+\n';
  markdown += '| **Carousel-features**                                                     |\n';
  markdown += '+---------------------------------------+---------------------------------------+\n';
  markdown += '| # **4 Step Advantage**                                                    |\n';
  markdown += '+---------------------------------------+---------------------------------------+\n';

  data.features.forEach((feature, idx) => {
    const imgIdx = imageIndex + 1 + idx;
    markdown += `| ![${feature}][image${imgIdx}]         | ### **${feature}**                    |\n`;
    markdown += '+---------------------------------------+---------------------------------------+\n';
  });
  markdown += '\n';

  // Recipes section (simplified)
  markdown += `## Wholesome meals you can make with ${data.name}\n\n`;
  markdown += `Explore delicious recipes using ${data.name}. Visit our [recipe section](/recipe-listing.html) for more ideas.\n\n`;

  // Videos section
  markdown += '## A look at our advertisements\n\n';
  markdown += 'Explore the world of Aashirvaad through our lens.\n\n';
  const videoImgIdx = imageIndex + 1 + data.features.length;
  markdown += '+---------------------------------------+\n';
  markdown += '| **Gallery-videos**                    |\n';
  markdown += '+---------------------------------------+\n';
  markdown += `| ![Advertisement 1][image${videoImgIdx}] |\n`;
  markdown += '+---------------------------------------+\n';
  markdown += `| ![Advertisement 2][image${videoImgIdx + 1}] |\n`;
  markdown += '+---------------------------------------+\n';
  markdown += `| ![Advertisement 3][image${videoImgIdx + 2}] |\n`;
  markdown += '+---------------------------------------+\n\n';

  // Image references
  markdown += '---\n\n';
  markdown += `[image${imageIndex}]: https://aashirvaad.com/content/dam/itc-foods-brands/aashirvaad/products/${slug}-packshot.png\n`;

  data.features.forEach((feature, idx) => {
    const imgIdx = imageIndex + 1 + idx;
    markdown += `[image${imgIdx}]: https://aashirvaad.com/content/dam/itc-foods-brands/aashirvaad/product-details/${slug}-feature-${idx + 1}.png\n`;
  });

  for (let i = 0; i < 3; i++) {
    const imgIdx = videoImgIdx + i;
    markdown += `[image${imgIdx}]: https://aashirvaad.com/content/dam/itc-foods-brands/aashirvaad/videos/${slug}-video-thumb-${i + 1}.jpg\n`;
  }

  return markdown;
}

// Process all products
function processAllProducts() {
  const allAssets = [];
  let totalImageCount = 0;
  let currentImageIndex = 0;

  products.forEach((product) => {
    const data = productData[product.slug];
    if (!data) {
      console.log(`No data found for ${product.slug}, skipping...`);
      return;
    }

    // Generate markdown
    const markdown = generateMarkdown(product.slug, data, currentImageIndex);

    // Save markdown file
    const outputPath = path.join(__dirname, '../pages', `product-atta-${product.slug}.md`);
    fs.writeFileSync(outputPath, markdown, 'utf8');
    console.log(`Created: ${outputPath}`);

    // Track assets
    const productImages = [];

    // Hero image
    productImages.push({
      type: 'hero',
      url: `https://aashirvaad.com/content/dam/itc-foods-brands/aashirvaad/products/${product.slug}-packshot.png`,
      alt: data.name,
    });

    // Feature images
    data.features.forEach((feature, idx) => {
      productImages.push({
        type: 'feature',
        url: `https://aashirvaad.com/content/dam/itc-foods-brands/aashirvaad/product-details/${product.slug}-feature-${idx + 1}.png`,
        alt: feature,
      });
    });

    // Video thumbnails
    for (let i = 0; i < 3; i++) {
      productImages.push({
        type: 'video',
        url: `https://aashirvaad.com/content/dam/itc-foods-brands/aashirvaad/videos/${product.slug}-video-thumb-${i + 1}.jpg`,
        alt: `Advertisement ${i + 1}`,
      });
    }

    allAssets.push({
      product: product.slug,
      sourceUrl: product.url,
      images: productImages,
    });

    totalImageCount += productImages.length;
    currentImageIndex += productImages.length;
  });

  // Save consolidated JSON
  const assetsJson = {
    batch: 'batch1-atta',
    generatedAt: new Date().toISOString(),
    totalProducts: products.length,
    totalImages: totalImageCount,
    products: allAssets,
  };

  const jsonPath = path.join(__dirname, 'batch1-atta-assets.json');
  fs.writeFileSync(jsonPath, JSON.stringify(assetsJson, null, 2), 'utf8');
  console.log(`\nCreated assets JSON: ${jsonPath}`);

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('MIGRATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Products processed: ${products.length}`);
  console.log(`Markdown files created: ${products.length}`);
  console.log(`Total images tracked: ${totalImageCount}`);
  console.log(`Output directory: ${path.join(__dirname, '../pages')}`);
  console.log('='.repeat(60));
}

// Run the process
processAllProducts();
