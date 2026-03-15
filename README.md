# @eslint-sets/eslint-config

[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]

English | [简体中文](./README_CN.md)

Modern ESLint config with flat config support for Vue, React, Svelte, TypeScript, Next.js, Nuxt, Astro, Angular, UnoCSS and more.

## Quick Try

Try it online with StackBlitz:

| Framework | Link |
| --------- | ---- |
| Vue 3 | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/vue3) |
| Vue 2 | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/vue2) |
| React | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/react) |
| TypeScript | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/typescript) |
| Svelte | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/svelte) |
| Next.js | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/nextjs) |
| Nuxt | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/nuxt) |
| Astro | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/astro) |
| Angular | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/angular) |
| UnoCSS | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/unocss) |

## Features

- 🚀 **ESLint v9 Flat Config** - Uses the modern flat config format
- 🎨 **@stylistic Integration** - Default formatting with `@stylistic/eslint-plugin` (no Prettier needed)
- 📝 **TypeScript TypeGen** - Auto-generated types for all rules with full IntelliSense support
- ✨ **Prettier Support** - Optional Prettier integration for those who prefer it
- 📦 **Auto-detection** - Automatically detects installed frameworks
- 🔧 **Highly Configurable** - Fine-grained control over enabled features
- 🙈 **Git Ignore Support** - Automatically read `.gitignore` patterns (default: on)
- 🛠️ **Disables Support** - Automatically disable strict rules in config files
- 🖥️ **Command Support** - Relaxed rules for command-line scripts
- 🏷️ **Project Types** - Support for `app` and `lib` project types
- ♿ **Accessibility** - Optional a11y rules for Vue and React
- 📝 **Auto-sort** - Automatically sort package.json and tsconfig.json
- 🔍 **Editor Detection** - Automatically detect editor environment
- 🔎 **Config Inspector** - Visual tool for inspecting your ESLint config
- 📊 **Perfectionist Sorting** - Import/export sorting with natural ordering

## Supported Frameworks

| Framework  | Auto-detect | Notes                                           |
| ---------- | :---------: | ----------------------------------------------- |
| TypeScript |     ✅      | Default enabled                                 |
| Vue        |     ✅      | Vue 2 & 3 support, with a11y option             |
| React      |     ✅      | With hooks, refresh, and React Compiler support |
| Svelte     |     ✅      |                                                 |
| Solid      |     ✅      |                                                 |
| Next.js    |     ✅      | Requires `@next/eslint-plugin-next`             |
| Nuxt       |     ✅      |                                                 |
| Astro      |     ✅      | Requires `eslint-plugin-astro`                  |
| Angular    |     ✅      | Requires `@angular-eslint/eslint-plugin`        |
| UnoCSS     |     ✅      | Requires `@unocss/eslint-plugin`                |

## Installation

```shell
# use pnpm
pnpm install -D @eslint-sets/eslint-config eslint

# use npm
npm install -D @eslint-sets/eslint-config eslint

# use bun
bun add -D @eslint-sets/eslint-config eslint
```

## Requirements

- **Node.js**: `^18.18.0` or `^20.9.0` or `>=21.1.0`
- **ESLint**: `^9.10.0` or `^9.22.0`

> Note: `eslint-plugin-toml` requires Node.js `^20.19.0 || ^22.13.0 || >=24`. If you need TOML support on Node.js 18, consider downgrading to `eslint-plugin-toml@0.13.1`.

## Quick Start

### Using CLI (Recommended)

Run the interactive CLI to set up your project:

```shell
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

### Manual Setup

Create an `eslint.config.ts` file in your project root:

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

## Usage

### With Options

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	// Angular support (default: 'auto' - auto-detect)
	angular: true,

	// Astro support (default: 'auto' - auto-detect)
	astro: true,

	// Relax rules for scripts (default: true)
	// Applies to: scripts/**, bin/**, cli/**, tasks/**, tools/**
	// Allows: console, process.exit, process.env, shebang, require, etc.
	command: true,
	// Disable rules in config files (default: true)
	disables: true,

	// e18e modernization rules (default: false)
	e18e: true,
	// ESLint comments rules (default: true)
	eslintComments: true,

	// External formatters (default: false)
	formatters: {
		css: 'prettier',
		graphql: 'prettier',
		html: 'prettier',
		markdown: 'prettier',
		svg: 'prettier',
		xml: 'prettier',
	},

	// Auto-read .gitignore (default: true)
	gitignore: true,

	// Files to ignore
	ignores: ['**/dist/**', '**/node_modules/**'],

	// Or modify defaults:
	ignores: (defaults) => [...defaults, '**/custom/**'],

	// Import rules (default: true)
	imports: true,

	// JSON/JSONC support (default: true)
	jsonc: true,

	// JSX Accessibility rules (default: false)
	jsxA11y: true,

	// Markdown support (default: true)
	markdown: true,

	// Next.js support (default: 'auto' - auto-detect)
	nextjs: true,
	// Node.js rules (default: true)
	node: true,

	// Nuxt support (default: 'auto' - auto-detect)
	nuxt: true,

	// Perfectionist sorting (default: true)
	perfectionist: true,

	// pnpm workspace support (default: false)
	pnpm: true,

	// Prettier integration (default: false)
	// Note: Must set stylistic: false to use prettier
	prettier: false,

	// React support (default: 'auto' - auto-detect)
	react: true,

	// Or with options:
	react: {
		reactCompiler: true, // React Compiler support
	},

	// Regexp rules (default: true)
	regexp: true,

	// Custom rule overrides
	rules: {
		'no-console': 'off',
	},

	// Solid support (default: 'auto' - auto-detect)
	solid: true,

	// Auto-sort package.json (default: true)
	sortPackageJson: true,

	// Auto-sort tsconfig.json (default: true)
	sortTsconfig: true,

	// Stylistic formatting (default: true)
	// Uses @stylistic/eslint-plugin for code formatting
	stylistic: true,

	// Or with custom options:
	stylistic: {
		arrowParens: 'always', // 'always' | 'avoid'
		bracketSpacing: true, // boolean
		indent: 2, // 'tab' | number
		jsxQuotes: 'prefer-double', // 'prefer-double' | 'prefer-single'
		quotes: 'single', // 'single' | 'double'
		semi: false, // boolean
		trailingComma: 'always-multiline', // 'none' | 'es5' | 'always-multiline' | 'all'
	},

	// Svelte support (default: 'auto' - auto-detect)
	svelte: true,

	// Test file support (default: true)
	test: true,

	// Project type: 'app' (default) or 'lib'
	type: 'lib',

	// TypeScript support (default: true)
	typescript: true,

	// Unicorn rules (default: true)
	unicorn: true,

	// UnoCSS support (default: 'auto' - auto-detect)
	unocss: true,

	// Vue support (default: 'auto' - auto-detect)
	vue: true,
	// Or with options:
	vue: {
		a11y: true, // Enable accessibility rules
		vueVersion: 3,
	},

	// YAML support (default: true)
	yaml: true,
})
```

### Project Types

```typescript
// Application project (default)
export default eslintConfig({
	type: 'app',
})

// Library project - stricter rules
export default eslintConfig({
	type: 'lib',
})
```

### Stylistic vs Prettier

This config supports two formatting approaches:

1. **Stylistic** (default): Uses `@stylistic/eslint-plugin` for pure ESLint-based formatting - no additional tool needed.
2. **Prettier**: Uses `eslint-plugin-prettier` to integrate Prettier with ESLint.

```typescript
// Use Stylistic (default)
export default eslintConfig({
	stylistic: true, // or just use defaults
})

// Use Stylistic with custom options
export default eslintConfig({
	stylistic: {
		arrowParens: 'always', // 'always' | 'avoid'
		bracketSpacing: true, // boolean
		indent: 2, // 'tab' | number
		jsxQuotes: 'prefer-double', // 'prefer-double' | 'prefer-single'
		quotes: 'single', // 'single' | 'double'
		semi: false, // boolean
		trailingComma: 'always-multiline', // 'none' | 'es5' | 'always-multiline' | 'all'
	},
})

// Use Prettier instead (must disable stylistic)
export default eslintConfig({
	prettier: true,
	stylistic: false,
})

// Use Prettier with custom options
export default eslintConfig({
	prettier: {
		printWidth: 240,
		semi: false,
		singleQuote: true,
		tabWidth: 2,
		trailingComma: 'all',
		useTabs: false,
	},
	stylistic: false,
})
```

**Note**: Stylistic and Prettier are mutually exclusive. When `stylistic` is enabled (default), Prettier is automatically disabled.

### Accessibility Rules

```typescript
// Vue accessibility
export default eslintConfig({
	vue: {
		a11y: true,
	},
})

// React/JSX accessibility
export default eslintConfig({
	jsxA11y: true,
})

// Or standalone JSX a11y
export default eslintConfig({
	jsxA11y: true,
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
	type: 'lib',
	typescript: true,
	vue: {
		a11y: true,
		vueVersion: 3,
	},
})
```

#### React Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	react: {
		reactCompiler: true,
	},
	typescript: true,
})
```

#### Next.js Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	nextjs: true,
	react: true,
	typescript: true,
})
```

#### Nuxt Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	nuxt: true,
	typescript: true,
	vue: true,
})
```

#### Angular Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	angular: true,
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

#### Astro Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	astro: true,
	typescript: true,
})
```

#### UnoCSS Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	unocss: true,
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

## TypeScript Support

This package provides full TypeScript support with auto-generated types:

```typescript
import type { TypedFlatConfigItem, Rules, RuleOptions, ConfigNames } from '@eslint-sets/eslint-config'

// TypedFlatConfigItem - Full type checking for config objects
const myConfig: TypedFlatConfigItem = {
	name: 'my-config',
	rules: {
		'no-console': 'off',
		'@stylistic/semi': ['error', 'always'], // IDE shows available options
	},
}

// Rules - All available rule names with type checking
const myRules: Rules = {
	'no-console': 'off',
}

// ConfigNames - All available config names
type MyConfigs = ConfigNames // 'eslint-sets/javascript' | 'eslint-sets/vue' | ...
```

### Regenerating Types

If you're contributing to this package, regenerate types after adding new plugins:

```shell
pnpm run gen
```

This generates `src/typegen.d.ts` with all rule types.

## Config Inspector

Visualize and debug your ESLint configuration using the built-in Config Inspector:

```shell
# Run the inspector
npx @eslint/config-inspector

# Or using pnpm
pnpm inspector
```

Visit http://localhost:7777/ to view and interact with your ESLint config. The inspector shows:

- All configured rules and their sources
- File patterns and their matching configs
- Plugin information
- Rule configurations

You can also build a static version for sharing:

```shell
npx @eslint/config-inspector build
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
	solid,
	jsonc,
	yaml,
	markdown,
	toml,
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
	nextjs,
	nuxt,
	astro,
	angular,
	unocss,
	e18e,
	pnpm,
	formatters,
	eslintComments,
	jsxA11y,
	vueA11y,
	noOnlyTests,
	sortPackageJson,
	sortTsconfig,
} from '@eslint-sets/eslint-config'
```

## Peer Dependencies

| Package    | Version                                     |
| ---------- | ------------------------------------------- |
| eslint     | ^9.10.0 or ^9.22.0                          |
| prettier   | ^3.5.3 (optional, for Prettier integration) |
| typescript | >=5.0.0 (optional, for TypeScript support)  |

## System Requirements

| Requirement | Version                                  |
| ----------- | ---------------------------------------- |
| Node.js     | ^18.18.0 or ^20.9.0 or >=21.1.0          |
| ESLint      | ^9.10.0 or ^9.22.0                       |

## Optional Dependencies

The following packages are optional and will be used if installed:

### React

- `@eslint-react/eslint-plugin` - Modern React linting (includes core, dom, web-api, hooks-extra, naming-convention, debug)
- `eslint-plugin-react-refresh` - React Refresh support

### Vue

- `eslint-plugin-vuejs-accessibility` - Vue accessibility rules

### Svelte

- `eslint-plugin-svelte` - Svelte support
- `svelte` - Svelte parser
- `svelte-eslint-parser` - Svelte ESLint parser

### Next.js

- `@next/eslint-plugin-next` - Next.js specific rules

### Astro

- `eslint-plugin-astro` - Astro support
- `astro-eslint-parser` - Astro ESLint parser

### Angular

- `@angular-eslint/eslint-plugin` - Angular support
- `@angular-eslint/eslint-plugin-template` - Angular template rules
- `@angular-eslint/template-parser` - Angular template parser

### UnoCSS

- `@unocss/eslint-plugin` - UnoCSS rules

### Accessibility

- `eslint-plugin-jsx-a11y` - JSX accessibility rules

### Modernization

- `@e18e/eslint-plugin` - Code modernization rules

### Workspace

- `eslint-plugin-pnpm` - pnpm workspace rules

### Formatters

- `eslint-plugin-format` - External formatters for CSS, HTML, etc.

### Markdown

- `@eslint/markdown` - Markdown linting

## Migration from v5

If you're migrating from the old `@eslint-sets/eslint-config-*` packages, all sub-packages have been merged into a single package `@eslint-sets/eslint-config`.

### Migration Map

| Old Package (v5) | New Config (v6) |
| ---------------- | --------------- |
| `@eslint-sets/eslint-config-basic` | `eslintConfig()` (default) |
| `@eslint-sets/eslint-config-ts` | `eslintConfig({ typescript: true })` |
| `@eslint-sets/eslint-config-vue` | `eslintConfig({ vue: true })` |
| `@eslint-sets/eslint-config-vue3` | `eslintConfig({ vue: { vueVersion: 3 } })` |
| `@eslint-sets/eslint-config-react` | `eslintConfig({ react: true })` |
| `@eslint-sets/eslint-config-svelte` | `eslintConfig({ svelte: true })` |
| `@eslint-sets/eslint-config-nuxt` | `eslintConfig({ nuxt: true, vue: true })` |
| `@eslint-sets/eslint-config-egg` | `eslintConfig({ node: true, typescript: true })` |

### Basic

```javascript
// Before (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-basic',
}

// After (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

### TypeScript

```javascript
// Before (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-ts',
}

// After (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	typescript: true,
})
```

### Vue 2

```javascript
// Before (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-vue',
}

// After (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	vue: {
		vueVersion: 2,
	},
})
```

### Vue 3

```javascript
// Before (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-vue3',
}

// After (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	vue: {
		vueVersion: 3,
	},
})
```

### React

```javascript
// Before (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-react',
}

// After (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	react: true,
})
```

### Svelte

```javascript
// Before (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-svelte',
}

// After (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	svelte: true,
})
```

### Nuxt

```javascript
// Before (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-nuxt',
}

// After (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	nuxt: true,
	vue: true,
})
```

### Egg (Node.js)

```javascript
// Before (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-egg',
}

// After (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	node: true,
	typescript: true,
})
```

### Key Changes in v6

1. **Flat Config**: v6 uses ESLint's new flat config format (`eslint.config.ts` instead of `.eslintrc.js`)
2. **Single Package**: All sub-packages merged into one package
3. **Auto-detection**: Frameworks are auto-detected by default
4. **Stylistic**: Default formatting uses `@stylistic/eslint-plugin` instead of Prettier
5. **TypeScript Types**: Auto-generated types for all rules

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

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

[MIT](LICENSE)

## Issues & Support

Please open an issue [here](https://github.com/saqqdy/eslint-sets/issues).

[npm-image]: https://img.shields.io/npm/v/@eslint-sets/eslint-config.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@eslint-sets/eslint-config
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
