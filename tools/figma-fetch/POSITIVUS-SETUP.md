# Fetching Positivus Landing Page Design

Specific instructions for fetching the Positivus Landing Page Design you mentioned.

## File Information

- **Design**: Positivus Landing Page Design (Community)
- **File Key**: `8WnFWP5spLzox71kgLLbrD`
- **URL**: https://www.figma.com/design/8WnFWP5spLzox71kgLLbrD/Positivus-Landing-Page-Design--Community-

## Setup Steps

### 1. Check File Access

First, make sure you can view the file:

1. Visit the URL above
2. If prompted, click "View only" or "Duplicate to your drafts"
3. You need at least view access to use the API

### 2. Get Your Token

```bash
# Visit Figma settings
open https://www.figma.com/settings

# Scroll to "Personal access tokens"
# Create new token
# Copy it immediately!
```

### 3. Configure & Run

```bash
cd tools/figma-fetch

# Set your token
export FIGMA_TOKEN="figd_YOUR_TOKEN_HERE"

# The file key is already configured in the script
# Just run:
node figma-api.js
```

## What You'll Get

### Pages in This Design

The Positivus design typically contains:
- Hero section
- Services section
- Case studies
- Team section
- Testimonials
- Contact form

### Expected Output

```
output/
├── file-structure.json      (Page & frame hierarchy)
├── file-complete.json       (All nodes & properties)
├── file-styles.json         (Color & text styles)
├── file-components.json     (Reusable components)
├── file-variables.json      (Design tokens if any)
└── design-tokens.json       (Organized tokens)
```

## Using the Data

### Extract Colors

```javascript
import { extractDesignTokens } from './figma-api.js';

const tokens = await extractDesignTokens('8WnFWP5spLzox71kgLLbrD');
console.log(tokens.colors);
```

### List Components

```javascript
import { getFileComponents } from './figma-api.js';

const { meta } = await getFileComponents('8WnFWP5spLzox71kgLLbrD');
Object.values(meta.components).forEach(c => {
  console.log(c.name); // Button, Card, etc.
});
```

### Get Page Layout

```javascript
import { getFileStructure } from './figma-api.js';

const structure = await getFileStructure('8WnFWP5spLzox71kgLLbrD');
structure.pages.forEach(page => {
  console.log(`${page.name}: ${page.children.length} frames`);
});
```

## Common Issues

### "403 Forbidden"

**Cause**: You don't have access to the file or token is invalid

**Solutions**:
1. Open the file in Figma first (click "View only")
2. Duplicate it to your drafts if it's view-only
3. Regenerate your token
4. Make sure token hasn't expired

### "File not found"

**Cause**: File key might be incorrect

**Solution**: Double-check the URL:
```
https://www.figma.com/design/8WnFWP5spLzox71kgLLbrD/...
                               ^^^^^^^^^^^^^^^^^^^^^^
                               This is your file key
```

### "No variables found"

**This is normal!** Community files often don't have variables/tokens published.

The script will still fetch:
- ✅ File structure
- ✅ Complete file data
- ✅ Styles
- ✅ Components

## Next Steps

Once you have the data:

1. **Build the page**: Use the structure to create HTML/EDS blocks
2. **Extract design tokens**: Convert styles to CSS variables
3. **Document components**: Create a component library
4. **Automate sync**: Set up CI/CD to fetch updates

## Example: Convert to EDS

```javascript
// Read the structure
const structure = JSON.parse(
  readFileSync('output/file-structure.json', 'utf-8')
);

// Convert pages to EDS markdown
structure.pages.forEach(page => {
  console.log(`# ${page.name}\n`);
  
  page.children.forEach(frame => {
    console.log(`## ${frame.name}\n`);
    // Create EDS blocks here
  });
});
```

## Support

Having issues? Check:
- ✅ Token is set: `echo $FIGMA_TOKEN`
- ✅ You can view the file in Figma
- ✅ Using Node 18+: `node --version`

Need help? See the main [README.md](./README.md) for full documentation.


