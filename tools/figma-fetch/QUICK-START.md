# Quick Start Guide

Get up and running with the Figma API fetcher in 3 minutes!

## 1. Get Your Figma Token

1. Go to https://www.figma.com/settings
2. Scroll to "Personal access tokens"
3. Click "Create a new personal access token"
4. Copy it (you won't see it again!)

## 2. Set Up Environment

```bash
cd tools/figma-fetch

# Set your token
export FIGMA_TOKEN="figd_your_token_here"

# Optional: Set a specific file key (defaults to Positivus design)
export FILE_KEY="8WnFWP5spLzox71kgLLbrD"
```

## 3. Run It!

```bash
node figma-api.js
```

That's it! Check the `output/` folder for your files.

## What You'll Get

- ✅ `file-structure.json` - Pages and frames
- ✅ `file-complete.json` - Full file data
- ✅ `file-styles.json` - Colors, typography, effects
- ✅ `file-components.json` - All components
- ✅ `file-variables.json` - Design variables
- ✅ `design-tokens.json` - Organized design tokens

## Common Issues

**"FIGMA_TOKEN is required"**
```bash
export FIGMA_TOKEN="your_token_here"
```

**"403 Forbidden"**
- Check you have access to the file
- Make sure token is valid
- Verify file isn't private

**"Variables endpoint not available"**
- This is normal! Not all files have variables
- Script will continue and fetch other data

## Next Steps

- See `README.md` for detailed documentation
- Use as a module in your own scripts
- Customize the output format
- Build automated design sync workflows

## Support

Need help? Check:
- 📖 [Full README](./README.md)
- 🌐 [Figma API Docs](https://www.figma.com/developers/api)
- 🔍 [Troubleshooting section in README](./README.md#troubleshooting)


