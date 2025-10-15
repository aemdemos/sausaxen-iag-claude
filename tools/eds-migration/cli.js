#!/usr/bin/env node

import { fileURLToPath } from 'url';
// import { dirname } from 'path'; // Not currently used
import { readFileSync, writeFileSync } from 'fs';
import { convertToHtml } from './html-conversion-agent.js';
import { uploadToDa } from './da-upload-agent.js';
import fixGridTableFormatting from './utils/table-formatting.js';
import { makeUrlsAbsolute, makeMarkdownUrlsAbsolute } from './utils/url-processor.js';

// Simple logger to replace console statements
const logger = {
  log: (message) => process.stdout.write(`${message}\n`),
  error: (message) => process.stderr.write(`${message}\n`),
};

// eslint-disable-next-line no-underscore-dangle, no-unused-vars
const __filename = fileURLToPath(import.meta.url);

const commands = {
  'convert-html': {
    description: 'Convert markdown to HTML using EDS pipeline',
    usage: 'convert-html <markdown-file> [--url <base-url>]',
    handler: async (args) => {
      const markdownFile = args._[1];
      const baseUrl = args.url;

      if (!markdownFile) {
        throw new Error('Markdown file path required');
      }

      const markdown = readFileSync(markdownFile, 'utf-8');
      const state = { edsMapping: markdown, url: baseUrl };
      const result = await convertToHtml(state);

      if (result.errors?.length > 0) {
        logger.error(`Errors: ${result.errors.join(', ')}`);
        process.exit(1);
      }

      logger.log(result.htmlContent);
      writeFileSync('content.html', result.htmlContent);
    },
  },

  'upload-da': {
    description: 'Upload HTML content to Document Authoring',
    usage: 'upload-da <html-file> --owner <owner> --repo <repo> [--path <path>] [--prefix <prefix>] [--url <original-url>]',
    handler: async (args) => {
      const htmlFile = args._[1];
      const {
        owner, repo, path, prefix, url,
      } = args;

      if (!htmlFile || !owner || !repo) {
        throw new Error('HTML file, owner, and repo are required');
      }

      const htmlContent = readFileSync(htmlFile, 'utf-8');
      const state = {
        uploadToDa: true,
        daOwner: owner,
        daRepo: repo,
        daPath: path,
        daPrefix: prefix,
        htmlContent,
        url,
      };

      const result = await uploadToDa(state);

      if (result.errors?.length > 0) {
        logger.error(`Errors: ${result.errors.join(', ')}`);
        process.exit(1);
      }

      logger.log(`Upload successful: ${result.daUploadUrl}`);
    },
  },

  'fix-tables': {
    description: 'Fix grid table formatting in markdown',
    usage: 'fix-tables <markdown-file>',
    handler: async (args) => {
      const markdownFile = args._[1];

      if (!markdownFile) {
        throw new Error('Markdown file path required');
      }

      const markdown = readFileSync(markdownFile, 'utf-8');
      const fixed = fixGridTableFormatting(markdown);
      logger.log(fixed);
    },
  },

  'process-urls': {
    description: 'Convert relative URLs to absolute in HTML or markdown',
    usage: 'process-urls <file> --base-url <url> [--format html|markdown]',
    handler: async (args) => {
      const file = args._[1];
      const baseUrl = args['base-url'];
      const format = args.format || 'html';

      if (!file || !baseUrl) {
        throw new Error('File and base URL required');
      }

      const content = readFileSync(file, 'utf-8');

      let processed;
      if (format === 'markdown') {
        processed = makeMarkdownUrlsAbsolute(content, baseUrl);
      } else {
        processed = makeUrlsAbsolute(content, baseUrl);
      }

      logger.log(processed);
    },
  },

  'dl-da': {
    description: 'Download content from Document Authoring',
    usage: 'dl-da <da-url> [--output <file>] [--token <bearer-token>]',
    handler: async (args) => {
      const daUrl = args._[1];
      const { output } = args;
      const token = args.token || process.env.DA_BEARER_TOKEN;

      if (!daUrl) {
        throw new Error('DA URL required');
      }

      if (!token) {
        throw new Error('Bearer token required. Provide via --token or DA_BEARER_TOKEN env var');
      }

      logger.log(`Downloading from DA: ${daUrl}`);

      const response = await fetch(daUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
      }

      const content = await response.text();

      if (output) {
        writeFileSync(output, content, 'utf-8');
        logger.log(`Content saved to: ${output}`);
      } else {
        logger.log(content);
      }

      logger.log(`Download successful from: ${daUrl}`);
    },
  },

  preview: {
    description: 'Trigger preview build for content in AEM/EDS',
    usage: 'preview --org <org> --site <site> --path <path> [--ref <ref>] [--token <bearer-token>]',
    handler: async (args) => {
      const {
        org, site, path, ref = 'main',
      } = args;
      const token = args.token || process.env.DA_BEARER_TOKEN;

      if (!org || !site || !path) {
        throw new Error('Organization, site, and path are required');
      }

      if (!token) {
        throw new Error('Bearer token required. Provide via --token or DA_BEARER_TOKEN env var');
      }

      // Ensure path doesn't start with slash for the API
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      const previewApiUrl = `https://admin.hlx.page/preview/${org}/${site}/${ref}/${cleanPath}`;

      logger.log(`Triggering preview build: ${previewApiUrl}`);

      const response = await fetch(previewApiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Preview build failed: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
      }

      const result = await response.text();
      logger.log('Preview build triggered successfully');

      // Generate preview URL
      const pathWithoutHtml = cleanPath.replace(/\.html$/, '');
      const previewUrl = `https://${ref}--${site}--${org}.aem.page/${pathWithoutHtml}`;

      logger.log(`Preview URL: ${previewUrl}`);

      if (result) {
        logger.log(`API Response: ${result}`);
      }
    },
  },
};

function parseArgs(argv) {
  const args = { _: [] };
  let i = 2; // Skip node and script name

  while (i < argv.length) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = argv[i + 1];
      if (value && !value.startsWith('--')) {
        args[key] = value;
        i += 2;
      } else {
        args[key] = true;
        i += 1;
      }
    } else {
      args._.push(arg);
      i += 1;
    }
  }

  return args;
}

function showHelp() {
  logger.log('Usage: node cli.js <command> [options]');
  logger.log('\nCommands:');

  Object.entries(commands).forEach(([name, cmd]) => {
    logger.log(`  ${name.padEnd(15)} ${cmd.description}`);
    logger.log(`  ${' '.repeat(15)} ${cmd.usage}`);
    logger.log('');
  });
}

async function main() {
  const args = parseArgs(process.argv);
  const command = args._[0];

  if (!command || command === 'help' || args.help) {
    showHelp();
    return;
  }

  const cmd = commands[command];
  if (!cmd) {
    logger.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
  }

  try {
    await cmd.handler(args);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main().catch((error) => logger.error(`Fatal error: ${error.message}`));
