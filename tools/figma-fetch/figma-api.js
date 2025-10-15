#!/usr/bin/env node

/**
 * Figma REST API Client
 * Fetches design data from Figma files using the official REST API
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

// Configuration
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || '';
const FILE_KEY = process.env.FILE_KEY || '8WnFWP5spLzox71kgLLbrD';
const OUTPUT_DIR = join(__dirname, 'output');

// Base URL for Figma API
const FIGMA_API_BASE = 'https://api.figma.com/v1';

// Logger with emojis
const logger = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  warn: (msg) => console.warn(`⚠️  ${msg}`),
  debug: (msg) => console.log(`🔍 ${msg}`),
  api: (msg) => console.log(`🌐 ${msg}`),
  save: (msg) => console.log(`💾 ${msg}`),
};

/**
 * Make a request to Figma API
 * @param {string} endpoint - API endpoint (e.g., '/files/:file_key')
 * @param {object} options - Fetch options
 * @returns {Promise<object>} - Response data
 */
async function figmaRequest(endpoint, options = {}) {
  if (!FIGMA_TOKEN) {
    throw new Error('FIGMA_TOKEN environment variable is required');
  }

  const url = `${FIGMA_API_BASE}${endpoint}`;
  logger.api(`Requesting: ${url}`);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Figma API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    logger.error(`API request failed: ${error.message}`);
    throw error;
  }
}

/**
 * Get complete file data
 * @param {string} fileKey - Figma file key
 * @param {object} params - Query parameters
 * @returns {Promise<object>} - File data
 */
export async function getFile(fileKey = FILE_KEY, params = {}) {
  logger.info(`Fetching file: ${fileKey}`);

  const queryParams = new URLSearchParams({
    depth: params.depth || '2',
    geometry: params.geometry || 'paths',
    ...params,
  });

  const data = await figmaRequest(`/files/${fileKey}?${queryParams}`);
  logger.success(`File fetched: ${data.name}`);

  return data;
}

/**
 * Get file styles
 * @param {string} fileKey - Figma file key
 * @returns {Promise<object>} - Styles data
 */
export async function getFileStyles(fileKey = FILE_KEY) {
  logger.info(`Fetching styles from file: ${fileKey}`);

  const data = await figmaRequest(`/files/${fileKey}/styles`);
  logger.success(`Found ${Object.keys(data.meta?.styles || {}).length} styles`);

  return data;
}

/**
 * Get file components
 * @param {string} fileKey - Figma file key
 * @returns {Promise<object>} - Components data
 */
export async function getFileComponents(fileKey = FILE_KEY) {
  logger.info(`Fetching components from file: ${fileKey}`);

  const data = await figmaRequest(`/files/${fileKey}/components`);
  logger.success(`Found ${Object.keys(data.meta?.components || {}).length} components`);

  return data;
}

/**
 * Get file variables (design tokens)
 * @param {string} fileKey - Figma file key
 * @returns {Promise<object>} - Variables data
 */
export async function getFileVariables(fileKey = FILE_KEY) {
  logger.info(`Fetching variables from file: ${fileKey}`);

  try {
    const data = await figmaRequest(`/files/${fileKey}/variables/local`);
    const varCount = Object.keys(data.meta?.variables || {}).length;
    logger.success(`Found ${varCount} variables`);
    return data;
  } catch (error) {
    logger.warn('Variables endpoint not available or file has no variables');
    return { meta: { variables: {} } };
  }
}

/**
 * Extract design tokens from file styles and variables
 * @param {string} fileKey - Figma file key
 * @returns {Promise<object>} - Extracted design tokens
 */
export async function extractDesignTokens(fileKey = FILE_KEY) {
  logger.info('Extracting design tokens...');

  const [styles, variables] = await Promise.all([
    getFileStyles(fileKey).catch(() => ({ meta: { styles: {} } })),
    getFileVariables(fileKey).catch(() => ({ meta: { variables: {} } })),
  ]);

  const tokens = {
    colors: {},
    typography: {},
    effects: {},
    grids: {},
    variables: {},
  };

  // Process styles
  const styleData = styles.meta?.styles || {};
  Object.entries(styleData).forEach(([id, style]) => {
    const category = style.style_type?.toLowerCase() || 'other';
    if (!tokens[category]) {
      tokens[category] = {};
    }
    tokens[category][style.name] = {
      id,
      description: style.description || '',
      type: style.style_type,
    };
  });

  // Process variables
  const variableData = variables.meta?.variables || {};
  Object.entries(variableData).forEach(([id, variable]) => {
    tokens.variables[variable.name] = {
      id,
      type: variable.resolvedType,
      value: variable.valuesByMode,
    };
  });

  logger.success('Design tokens extracted');
  return tokens;
}

/**
 * Get simplified file structure
 * @param {string} fileKey - Figma file key
 * @returns {Promise<object>} - Simplified structure
 */
export async function getFileStructure(fileKey = FILE_KEY) {
  logger.info('Building file structure...');

  const fileData = await getFile(fileKey, { depth: 3 });

  const structure = {
    name: fileData.name,
    lastModified: fileData.lastModified,
    version: fileData.version,
    thumbnailUrl: fileData.thumbnailUrl,
    pages: [],
  };

  // Process document tree
  if (fileData.document?.children) {
    structure.pages = fileData.document.children.map((page) => ({
      id: page.id,
      name: page.name,
      type: page.type,
      children: page.children?.map((node) => ({
        id: node.id,
        name: node.name,
        type: node.type,
        visible: node.visible !== false,
        childCount: node.children?.length || 0,
      })) || [],
    }));
  }

  logger.success(`Structure built: ${structure.pages.length} pages`);
  return structure;
}

/**
 * Save data to JSON file
 * @param {string} filename - Output filename
 * @param {object} data - Data to save
 */
function saveToFile(filename, data) {
  try {
    // Ensure output directory exists
    mkdirSync(OUTPUT_DIR, { recursive: true });

    const filepath = join(OUTPUT_DIR, filename);
    writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
    logger.save(`Saved: ${filename}`);
  } catch (error) {
    logger.error(`Failed to save ${filename}: ${error.message}`);
    throw error;
  }
}

/**
 * Main function - fetch all data and save to files
 * @param {string} fileKey - Figma file key
 */
export async function fetchAllData(fileKey = FILE_KEY) {
  if (!FIGMA_TOKEN) {
    logger.error('FIGMA_TOKEN environment variable is not set!');
    logger.info('Please set it using: export FIGMA_TOKEN=your_token_here');
    process.exit(1);
  }

  logger.info('🚀 Starting Figma data fetch...');
  logger.info(`📁 File Key: ${fileKey}`);
  logger.info('');

  const results = {
    success: [],
    failed: [],
  };

  try {
    // Fetch file structure
    try {
      const structure = await getFileStructure(fileKey);
      saveToFile('file-structure.json', structure);
      results.success.push('file-structure.json');
    } catch (error) {
      logger.error(`Failed to fetch structure: ${error.message}`);
      results.failed.push('file-structure.json');
    }

    // Fetch complete file
    try {
      const file = await getFile(fileKey);
      saveToFile('file-complete.json', file);
      results.success.push('file-complete.json');
    } catch (error) {
      logger.error(`Failed to fetch complete file: ${error.message}`);
      results.failed.push('file-complete.json');
    }

    // Fetch styles
    try {
      const styles = await getFileStyles(fileKey);
      saveToFile('file-styles.json', styles);
      results.success.push('file-styles.json');
    } catch (error) {
      logger.error(`Failed to fetch styles: ${error.message}`);
      results.failed.push('file-styles.json');
    }

    // Fetch components
    try {
      const components = await getFileComponents(fileKey);
      saveToFile('file-components.json', components);
      results.success.push('file-components.json');
    } catch (error) {
      logger.error(`Failed to fetch components: ${error.message}`);
      results.failed.push('file-components.json');
    }

    // Fetch variables
    try {
      const variables = await getFileVariables(fileKey);
      saveToFile('file-variables.json', variables);
      results.success.push('file-variables.json');
    } catch (error) {
      logger.warn(`Failed to fetch variables: ${error.message}`);
      results.failed.push('file-variables.json');
    }

    // Extract design tokens
    try {
      const tokens = await extractDesignTokens(fileKey);
      saveToFile('design-tokens.json', tokens);
      results.success.push('design-tokens.json');
    } catch (error) {
      logger.error(`Failed to extract tokens: ${error.message}`);
      results.failed.push('design-tokens.json');
    }

    // Summary
    logger.info('');
    logger.info('📊 Summary:');
    logger.success(`${results.success.length} files created successfully`);
    results.success.forEach((file) => logger.info(`  ✓ ${file}`));

    if (results.failed.length > 0) {
      logger.warn(`${results.failed.length} files failed`);
      results.failed.forEach((file) => logger.warn(`  ✗ ${file}`));
    }

    logger.info('');
    logger.success(`All files saved to: ${OUTPUT_DIR}`);
  } catch (error) {
    logger.error(`Fatal error: ${error.message}`);
    process.exit(1);
  }
}

// Run main function if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchAllData(FILE_KEY).catch((error) => {
    logger.error(`Execution failed: ${error.message}`);
    process.exit(1);
  });
}

