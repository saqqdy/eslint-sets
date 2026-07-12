# Getting Started

## Installation

Install the package as a development dependency:

```bash
# use pnpm
pnpm install -D @eslint-sets/eslint-config eslint

# use npm
npm install -D @eslint-sets/eslint-config eslint

# use bun
bun add -D @eslint-sets/eslint-config eslint
```

::: warning Note for pnpm users
ESLint 9.x requires `jiti` for TypeScript config files. If you use `eslint.config.ts`, ensure peer dependencies are installed:

```bash
# Option 1: Add to .npmrc
echo "auto-install-peers=true" >> .npmrc

# Option 2: Install jiti manually
pnpm add -D jiti
```
:::

## Using the CLI (Recommended)

The fastest way to set up your project is using the interactive CLI:

```bash
# use pnpm
pnpm dlx @eslint-sets/eslint-config

# use npm
npx @eslint-sets/eslint-config

# use bun
bunx @eslint-sets/eslint-config
```

The CLI will guide you through:

- Project type selection (Application/Library)
- TypeScript support
- Framework selection (Vue, React, Svelte, Solid, Next.js, Nuxt, Astro, Angular, UnoCSS)
- Accessibility options
- Formatter choice (Prettier/Stylistic)
- Additional options (.gitignore, auto-sort, etc.)

## Manual Setup

Create an `eslint.config.ts` file in your project root:

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

That's it! The config will automatically detect your installed frameworks and apply appropriate rules.

## How It Works

### Auto-Detection

By default, the config auto-detects installed frameworks and enables the appropriate rules:

```typescript
export default eslintConfig({
  autoDetect: true, // Enable auto-detection (default: true)
})
```

When `autoDetect` is enabled (default), the config will:

1. Check your `package.json` dependencies
2. Enable rules for detected frameworks
3. Apply appropriate parser configurations
4. Set up framework-specific plugins

### Flat Config Architecture

This config uses ESLint's new flat config format, which provides:

- **Better Performance**: Configs are loaded once and cached
- **Type Safety**: Full TypeScript support for configuration
- **Explicit Configuration**: Clear and predictable rule application
- **Modern Tooling**: Better integration with modern build tools

## Requirements

- **Node.js**: `^18.18.0` or `^20.9.0` or `>=21.1.0`
- **ESLint**: `^9.10.0` or `^9.22.0`
- **Config file**: Must use ESM format (`eslint.config.ts` or `eslint.config.mjs`)

::: danger Important
This package is **ESM-only**. CommonJS config files (`eslint.config.cjs`, `eslint.config.js` without `"type": "module"`) are not supported. This is required because core dependencies like `@stylistic/eslint-plugin` are ESM-only.
:::

## Next Steps

- [Basic Usage](/guide/basic-usage) - Learn the basic usage patterns
- [Advanced Usage](/guide/advanced-usage) - Explore advanced features
- [CLI Tool](/guide/cli) - Master the interactive CLI
- [Framework Configs](/configs/) - Framework-specific configurations
- [API Reference](/api/) - Full API documentation

## VS Code Integration

Add to your `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.experimental.useFlatConfig": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "astro",
    "svelte"
  ]
}
```

## Config Inspector

Visualize and debug your ESLint configuration using the built-in Config Inspector:

```bash
# Run the inspector
npx @eslint/config-inspector

# Or using pnpm
pnpm inspector
```

Visit `http://localhost:7777` to view and interact with your ESLint config. The inspector shows:

- All configured rules and their sources
- File patterns and their matching configs
- Plugin information
- Rule configurations
