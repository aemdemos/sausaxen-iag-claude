# Figma API Data Fetcher

A Node.js script that fetches design data from Figma files using the official REST API.

## Features

- 🌐 Direct API calls to Figma's REST API
- 🔐 Secure authentication via `X-Figma-Token` header
- 📦 Multiple data fetching functions:
  - `getFile()` - Complete file data
  - `getFileStyles()` - All styles (colors, text, effects, etc.)
  - `getFileComponents()` - All components
  - `getFileVariables()` - Design variables/tokens
  - `extractDesignTokens()` - Organized design tokens
  - `getFileStructure()` - Simplified file structure
- 💾 Automatic JSON file generation
- 🎯 Built-in error handling
- 📝 Helpful logging with emojis
- ♻️ Reusable ES6 module exports

## Prerequisites

- Node.js 18+ (for native `fetch` support)
- A Figma account with access to the file you want to fetch
- A Figma Personal Access Token

## Setup

### 1. Get Your Figma Access Token

1. Go to [Figma Settings](https://www.figma.com/settings)
2. Scroll down to "Personal access tokens"
3. Click "Create a new personal access token"
4. Give it a name (e.g., "API Fetch Script")
5. Copy the token (you won't see it again!)

### 2. Get Your File Key

The file key is in the Figma file URL:
```
https://www.figma.com/design/8WnFWP5spLzox71kgLLbrD/File-Name
                                  ^^^^^^^^^^^^^^^^^^^^^^
                                  This is your file key
```

### 3. Set Environment Variables

#### Option A: Export in terminal (temporary)
```bash
export FIGMA_TOKEN="your_personal_access_token_here"
export FILE_KEY="8WnFWP5spLzox71kgLLbrD"
```

#### Option B: Create a `.env` file (persistent)
```bash
# Create .env file in tools/figma-fetch/
cat > .env << 'EOF'
FIGMA_TOKEN=your_personal_access_token_here
FILE_KEY=8WnFWP5spLzox71kgLLbrD
EOF
```

Then load it before running:
```bash
export $(cat .env | xargs)
```

#### Option C: Add to your shell profile (persistent across sessions)
```bash
# Add to ~/.bashrc, ~/.zshrc, or ~/.bash_profile
echo 'export FIGMA_TOKEN="your_token_here"' >> ~/.zshrc
source ~/.zshrc
```

## Usage

### Basic Usage

Fetch all data from the configured file:

```bash
node figma-api.js
```

### Custom File Key

```bash
FILE_KEY="your-file-key" node figma-api.js
```

### Use as a Module

```javascript
import {
  getFile,
  getFileStyles,
  getFileComponents,
  getFileVariables,
  extractDesignTokens,
  getFileStructure,
  fetchAllData,
} from './figma-api.js';

// Fetch specific data
const fileData = await getFile('your-file-key');
const styles = await getFileStyles('your-file-key');
const tokens = await extractDesignTokens('your-file-key');

// Fetch everything
await fetchAllData('your-file-key');
```

## Output Files

The script creates these JSON files in the `output/` directory:

| File | Description |
|------|-------------|
| `file-structure.json` | Simplified file structure with pages and frames |
| `file-complete.json` | Complete file data including all nodes |
| `file-styles.json` | All styles (colors, typography, effects, grids) |
| `file-components.json` | All components and component sets |
| `file-variables.json` | Design variables and modes |
| `design-tokens.json` | Organized design tokens extracted from styles and variables |

## API Functions

### `getFile(fileKey, params)`

Fetches complete file data with all nodes and properties.

```javascript
const file = await getFile('file-key', {
  depth: 2,           // Depth of node tree to fetch
  geometry: 'paths',  // Include geometry data
});
```

### `getFileStyles(fileKey)`

Fetches all published styles from the file.

```javascript
const styles = await getFileStyles('file-key');
```

### `getFileComponents(fileKey)`

Fetches all components and component sets.

```javascript
const components = await getFileComponents('file-key');
```

### `getFileVariables(fileKey)`

Fetches design variables (colors, numbers, strings, booleans).

```javascript
const variables = await getFileVariables('file-key');
```

### `extractDesignTokens(fileKey)`

Extracts and organizes design tokens from styles and variables.

```javascript
const tokens = await extractDesignTokens('file-key');
// Returns: { colors: {}, typography: {}, effects: {}, variables: {} }
```

### `getFileStructure(fileKey)`

Gets a simplified structure of the file (pages, frames, groups).

```javascript
const structure = await getFileStructure('file-key');
```

### `fetchAllData(fileKey)`

Fetches all data and saves to JSON files. This is the main function.

```javascript
await fetchAllData('file-key');
```

## Error Handling

The script handles errors gracefully:

- ❌ Missing token: Clear error message with instructions
- ❌ API errors: HTTP status and error message logged
- ❌ Network errors: Connection error details
- ⚠️  Partial failures: Continues with other endpoints

## Troubleshooting

### "FIGMA_TOKEN environment variable is required"

**Solution:** Set your Figma personal access token:
```bash
export FIGMA_TOKEN="your_token_here"
```

### "Figma API error (403): Forbidden"

**Possible causes:**
- Invalid or expired token
- No access to the file
- Token doesn't have required scopes

**Solution:** 
1. Generate a new token in Figma settings
2. Ensure you have view access to the file
3. Make sure the file is not private

### "Variables endpoint not available"

**This is normal!** Not all files have variables. The script will warn but continue.

## Rate Limits

Figma API has rate limits:
- **100 requests per minute** per token
- Additional limits per file

The script makes 6 API calls, well within limits.

## Security Notes

⚠️ **Never commit your Figma token to version control!**

Add to `.gitignore`:
```bash
echo ".env" >> .gitignore
echo "tools/figma-fetch/output/" >> .gitignore
```

## Examples

### Example 1: Fetch Positivus Landing Page Design

```bash
export FIGMA_TOKEN="your_token"
export FILE_KEY="8WnFWP5spLzox71kgLLbrD"
node figma-api.js
```

### Example 2: Extract Only Design Tokens

```javascript
import { extractDesignTokens } from './figma-api.js';

const tokens = await extractDesignTokens('8WnFWP5spLzox71kgLLbrD');
console.log('Colors:', tokens.colors);
console.log('Typography:', tokens.typography);
```

### Example 3: Get Component List

```javascript
import { getFileComponents } from './figma-api.js';

const { meta } = await getFileComponents('your-file-key');
Object.entries(meta.components).forEach(([id, component]) => {
  console.log(`Component: ${component.name}`);
  console.log(`  Description: ${component.description}`);
});
```

## API Documentation

For more details, see the official [Figma REST API documentation](https://www.figma.com/developers/api).

## License

This script uses the Figma REST API which is subject to [Figma's Terms of Service](https://www.figma.com/tos/).


