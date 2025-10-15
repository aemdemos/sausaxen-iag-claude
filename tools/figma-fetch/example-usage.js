#!/usr/bin/env node

/**
 * Example usage of the Figma API client
 * Shows how to use individual functions
 */

import {
  getFile,
  getFileStyles,
  getFileComponents,
  getFileVariables,
  extractDesignTokens,
  getFileStructure,
} from './figma-api.js';

// Example file key (Positivus Landing Page Design)
const EXAMPLE_FILE_KEY = '8WnFWP5spLzox71kgLLbrD';

/**
 * Example 1: Get basic file information
 */
async function example1GetFileInfo() {
  // eslint-disable-next-line no-console
  console.log('\n📄 Example 1: Get File Information\n');

  const file = await getFile(EXAMPLE_FILE_KEY, { depth: 1 });

  // eslint-disable-next-line no-console
  console.log('File Name:', file.name);
  // eslint-disable-next-line no-console
  console.log('Last Modified:', new Date(file.lastModified).toLocaleDateString());
  // eslint-disable-next-line no-console
  console.log('Pages:', file.document.children.length);
}

/**
 * Example 2: List all components
 */
async function example2ListComponents() {
  // eslint-disable-next-line no-console
  console.log('\n🧩 Example 2: List All Components\n');

  const { meta } = await getFileComponents(EXAMPLE_FILE_KEY);
  const components = meta.components || {};

  Object.entries(components).forEach(([id, component]) => {
    // eslint-disable-next-line no-console
    console.log(`• ${component.name}`);
    if (component.description) {
      // eslint-disable-next-line no-console
      console.log(`  └─ ${component.description}`);
    }
  });
}

/**
 * Example 3: Extract color tokens
 */
async function example3ExtractColors() {
  // eslint-disable-next-line no-console
  console.log('\n🎨 Example 3: Extract Color Tokens\n');

  const tokens = await extractDesignTokens(EXAMPLE_FILE_KEY);

  if (tokens.colors && Object.keys(tokens.colors).length > 0) {
    // eslint-disable-next-line no-console
    console.log('Color Styles:');
    Object.entries(tokens.colors).forEach(([name]) => {
      // eslint-disable-next-line no-console
      console.log(`  • ${name}`);
    });
  }

  if (tokens.variables && Object.keys(tokens.variables).length > 0) {
    // eslint-disable-next-line no-console
    console.log('\nColor Variables:');
    Object.entries(tokens.variables).forEach(([name, variable]) => {
      if (variable.type === 'COLOR') {
        // eslint-disable-next-line no-console
        console.log(`  • ${name}`);
      }
    });
  }
}

/**
 * Example 4: Get page structure
 */
async function example4GetStructure() {
  // eslint-disable-next-line no-console
  console.log('\n📐 Example 4: Get Page Structure\n');

  const structure = await getFileStructure(EXAMPLE_FILE_KEY);

  structure.pages.forEach((page) => {
    // eslint-disable-next-line no-console
    console.log(`\n📄 Page: ${page.name}`);
    // eslint-disable-next-line no-console
    console.log(`   Frames: ${page.children.length}`);

    page.children.slice(0, 5).forEach((frame) => {
      // eslint-disable-next-line no-console
      console.log(`   • ${frame.name} (${frame.type})`);
    });

    if (page.children.length > 5) {
      // eslint-disable-next-line no-console
      console.log(`   ... and ${page.children.length - 5} more`);
    }
  });
}

/**
 * Example 5: Get typography styles
 */
async function example5GetTypography() {
  // eslint-disable-next-line no-console
  console.log('\n✍️  Example 5: Get Typography Styles\n');

  const { meta } = await getFileStyles(EXAMPLE_FILE_KEY);
  const styles = meta.styles || {};

  const textStyles = Object.entries(styles).filter(
    ([, style]) => style.style_type === 'TEXT',
  );

  if (textStyles.length > 0) {
    // eslint-disable-next-line no-console
    console.log('Text Styles:');
    textStyles.forEach(([, style]) => {
      // eslint-disable-next-line no-console
      console.log(`  • ${style.name}`);
    });
  } else {
    // eslint-disable-next-line no-console
    console.log('No text styles found in this file.');
  }
}

/**
 * Run all examples
 */
async function runAllExamples() {
  try {
    await example1GetFileInfo();
    await example2ListComponents();
    await example3ExtractColors();
    await example4GetStructure();
    await example5GetTypography();

    // eslint-disable-next-line no-console
    console.log('\n✅ All examples completed!\n');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('\n❌ Error:', error.message);
    // eslint-disable-next-line no-console
    console.error('\nMake sure:');
    // eslint-disable-next-line no-console
    console.error('1. FIGMA_TOKEN is set: export FIGMA_TOKEN="your_token"');
    // eslint-disable-next-line no-console
    console.error('2. You have access to the file');
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples();
}


