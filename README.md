# @eslint-sets/eslint-config

[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]

Modern ESLint config with flat config support for Vue, React, Svelte, and TypeScript.

## Features

- 🚀 **ESLint v9 Flat Config** - Uses the modern flat config format
- 🎨 **Prettier Integration** - Seamless integration with Prettier
- ✨ **Stylistic Support** - Optional `@stylistic/eslint-plugin` for code formatting without Prettier
- 📦 **Auto-detection** - Automatically detects installed frameworks
- 🔧 **Highly Configurable** - Fine-grained control over enabled features
- 🙈 **Git Ignore Support** - Automatically read `.gitignore` patterns
- 🛠️ **Disables Support** - Automatically disable strict rules in config files
- 🖥️ **Command Support** - Relaxed rules for command-line scripts

## Installation

```shell
# use pnpm
pnpm install -D @eslint-sets/eslint-config eslint

# use npm
npm install -D @eslint-sets/eslint-config eslint

# use yarn
yarn add -D @eslint-sets/eslint-config eslint
```

## Usage

### Basic Usage

Create an `eslint.config.ts` file in your project root:

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

### With Options

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  // TypeScript support (default: true)
  typescript: true,

  // Vue support (default: 'auto' - auto-detect)
  vue: true,

  // React support (default: 'auto' - auto-detect)
  react: true,

  // Svelte support (default: 'auto' - auto-detect)
  svelte: true,

  // Test file support (default: true)
  test: true,

  // Prettier integration (default: true)
  prettier: true,

  // Stylistic formatting (default: false)
  // When enabled, Prettier is automatically disabled
  stylistic: true,
  // Or with custom options:
  stylistic: {
    indent: 'tab', // 'tab' | number
    quotes: 'single', // 'single' | 'double'
    semi: false, // boolean
    jsxQuotes: 'prefer-double', // 'prefer-double' | 'prefer-single'
    trailingComma: 'all', // 'none' | 'es5' | 'all'
    bracketSpacing: true, // boolean
    arrowParens: 'always', // 'always' | 'avoid'
  },

  // Auto-read .gitignore (default: false)
  gitignore: true,

  // Disable rules in config files (default: true)
  disables: true,

  // Relax rules for scripts (default: true)
  command: true,

  // JSON/JSONC support (default: true)
  jsonc: true,

  // YAML support (default: true)
  yaml: true,

  // Markdown support (default: true)
  markdown: true,

  // Import rules (default: true)
  imports: true,

  // Unicorn rules (default: true)
  unicorn: true,

  // Perfectionist sorting (default: true)
  perfectionist: true,

  // Regexp rules (default: true)
  regexp: true,

  // Node.js rules (default: true)
  node: true,

  // Files to ignore
  ignores: ['**/dist/**', '**/node_modules/**'],

  // Custom rule overrides
  rules: {
    'no-console': 'off',
  },
})
```

### Stylistic vs Prettier

This config supports two formatting approaches:

1. **Prettier** (default): Uses `eslint-plugin-prettier` to integrate Prettier with ESLint.
2. **Stylistic**: Uses `@stylistic/eslint-plugin` for pure ESLint-based formatting.

```typescript
// Use Prettier (default)
export default eslintConfig({
  prettier: true,
})

// Use Stylistic instead
export default eslintConfig({
  prettier: false,
  stylistic: true,
})

// Use Stylistic with custom options
export default eslintConfig({
  prettier: false,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
})
```

### Git Ignore Support

Enable automatic `.gitignore` reading:

```typescript
export default eslintConfig({
  gitignore: true, // Automatically read .gitignore patterns
})
```

### Auto-Detection

By default, the config auto-detects installed frameworks and enables the appropriate rules:

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  autoDetect: true, // Enable auto-detection (default: true)
})
```

### Framework-Specific Configurations

#### Vue Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: true,
  typescript: true,
})
```

#### React Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  react: true,
  typescript: true,
})
```

#### Svelte Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  svelte: true,
  typescript: true,
})
```

### Extending the Config

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  extends: [
    // Additional flat configs
  ],
  rules: {
    // Override rules
  },
})
```

## Individual Configs

You can also import individual configurations:

```typescript
import {
  javascript,
  typescript,
  vue,
  react,
  svelte,
  jsonc,
  yaml,
  markdown,
  imports,
  unicorn,
  perfectionist,
  regexp,
  test,
  node,
  prettier,
  stylistic,
  disables,
  command,
} from '@eslint-sets/eslint-config'
```

## Peer Dependencies

| Package | Version |
|---------|---------|
| eslint | ^9.22.0 |
| prettier | ^3.5.3 (optional, for Prettier integration) |
| typescript | >=5.0.0 (optional, for TypeScript support) |

## Optional Dependencies

The following packages are optional and will be used if installed:

- `eslint-plugin-react` - React support
- `eslint-plugin-react-hooks` - React Hooks support
- `eslint-plugin-react-refresh` - React Refresh support
- `eslint-plugin-svelte` - Svelte support
- `svelte` - Svelte parser

## Migration from v5

If you're migrating from the old `@eslint-sets/eslint-config-*` packages:

### Before (v5)

```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-vue',
}
```

### After (v6)

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: true,
})
```

## VS Code Integration

Add to your `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.experimental.useFlatConfig": true
}
```

## License

[MIT](LICENSE)

## Issues & Support

Please open an issue [here](https://github.com/saqqdy/eslint-sets/issues).

[npm-image]: https://img.shields.io/npm/v/@eslint-sets/eslint-config.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@eslint-sets/eslint-config
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
