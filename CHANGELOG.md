# Changelog

All notable changes to this project will be documented in this file.

## [6.0.0] - 2026-03-14

### Added

- **TypeGen Support**: Added automatic type generation for ESLint rules
  - Generates `TypedFlatConfigItem`, `RuleOptions`, `Rules`, `ConfigNames` types
  - Full TypeScript IntelliSense for rule names and options
  - Run `pnpm run gen` to regenerate types
- **@stylistic Integration**: Default formatting now uses `@stylistic/eslint-plugin` instead of Prettier
  - No additional formatting tool needed
  - Fully integrated with ESLint rules
  - Customizable via `stylistic` option
- **Prettier as Optional**: Prettier is now optional and disabled by default
  - Enable with `stylistic: false, prettier: true`
- **Perfectionist Sorting**: Added import/export sorting with natural ordering
  - Uses `eslint-plugin-perfectionist`
  - Sorts imports, exports, and object keys
  - Groups: type imports, external, internal, etc.
- **Solid.js Support**: Added `solid` config for Solid.js projects
  - Uses `eslint-plugin-solid`
  - Includes reactivity rules and component best practices
- **TOML Support**: Added `toml` config for TOML files
  - Uses `eslint-plugin-toml` and `toml-eslint-parser`
  - Validates TOML syntax and formatting
- **Type-Aware TypeScript Rules**: Added optional type-aware rules
  - Enable with `typescript: { typeAware: true }`
  - Requires `tsconfig.json` with proper includes
- **eslint-plugin-n**: Replaced Node.js rules with `eslint-plugin-n`
  - Better Node.js specific rules
  - ES modules and CommonJS support
- **Project Types**: Support for `type: 'app'` and `type: 'lib'` project types
- **Framework Support**: Added support for Next.js, Nuxt, Astro, Angular, and UnoCSS
- **Accessibility Rules**: Added optional a11y rules for Vue and React
  - Vue: via `vue.a11y` option (requires eslint-plugin-vuejs-accessibility)
  - JSX: via `jsxA11y` config
- **CLI Tool**: Interactive CLI wizard for project setup
  - Run with: `npx @eslint-sets/eslint-config` or `pnpm dlx @eslint-sets/eslint-config`
  - Supports project type, TypeScript, frameworks (Vue, React, Svelte, Solid, Next.js, Nuxt, Astro, Angular, UnoCSS)
  - Accessibility and formatter options
- **Auto-sort**: Added `sortPackageJson` and `sortTsconfig` options (default: true)
  - Sorts package.json keys according to best practices
  - Sorts tsconfig.json keys
- **ESLint Comments**: Added `eslintComments` option for ESLint directive rules
- **No Only Tests**: Added `noOnlyTests` config to prevent committing `.only()` tests
- **Editor Detection**: Added `isInEditor` option to auto-detect editor environment
- **Framework Options**: Framework configs now accept options objects
  - `vue: { vueVersion: 2 | 3, a11y: boolean }`
  - `react: { reactCompiler: boolean }`
- **Improved Ignores**: `ignores` can now be a function to modify defaults
- **Per-framework overrides**: Each framework option now supports `overrides` for custom rules
- **Angular Support**: Added `angular` config with template support
  - Uses `@angular-eslint/eslint-plugin` and `@angular-eslint/eslint-plugin-template`
  - Supports template accessibility rules
- **UnoCSS Support**: Added `unocss` config for UnoCSS projects
  - Uses `@unocss/eslint-plugin`
  - Enforces class ordering and best practices
- **e18e Modernization**: Added `e18e` config for code modernization rules
  - Rules like `prefer-array-flat`, `prefer-array-flat-map`, etc.
- **pnpm Workspace**: Added `pnpm` config for pnpm catalogs and workspace support
  - Uses `eslint-plugin-pnpm`
- **External Formatters**: Added `formatters` config for CSS, HTML, XML, SVG, GraphQL formatting
  - Uses `eslint-plugin-format`
  - Supports prettier integration for various file types
- **Vue Accessibility**: Added standalone `vueA11y` config for Vue accessibility rules
- **Config Inspector**: Added `inspector` npm script for visual config debugging
  - Run with: `pnpm inspector` or `npx @eslint/config-inspector`

### Changed

- **Build System**: Replaced tsup with custom esbuild build script for better Node.js 24 compatibility
  - CLI now correctly includes shebang (`#!/usr/bin/env node`)
  - Smaller bundle sizes with `packages: 'external'` option
- **JavaScript Rules**: Updated rules to align with antfu/eslint-config best practices
  - `no-labels`: Now enforces `['error', { allowLoop: false, allowSwitch: false }]`
  - `no-prototype-builtins`: Changed from `'off'` to `'error'`
  - `no-template-curly-in-string`: Changed from `'off'` to `'error'`
  - `no-throw-literal`: Changed from `'off'` to `'error'`
  - `object-shorthand`: Enhanced with `['error', 'always', { avoidQuotes: true, ignoreConstructors: false }]`
  - `valid-typeof`: Added `requireStringLiterals: true` option
- **Node.js Rules**: Disabled `n/no-callback-literal` (not used by antfu/eslint-config)
- **prefer-node-protocol**: Changed from `n/prefer-node-protocol` to `unicorn/prefer-node-protocol` (matching antfu/eslint-config)
- **Ignores**: Updated `GLOB_EXCLUDES` to match antfu/eslint-config with more comprehensive ignore patterns
- **React Plugin Migration**: Migrated from `eslint-plugin-react` + `eslint-plugin-react-hooks` to `@eslint-react/eslint-plugin`
  - Modern React linting with modular design
  - Includes core, dom, web-api, hooks-extra, naming-convention, and debug sub-plugins
  - Better performance and more focused rules
  - Integrated with `eslint-plugin-react-refresh` for Fast Refresh support
- **Simplified Config Rules**: Streamlined all framework configs for minimal and essential rules
  - Vue: Reduced to recommended + 10 core custom rules
  - React: Uses @eslint-react recommended config with react-refresh integration
  - Svelte: Reduced to recommended + 15 core custom rules with processor support
  - Astro: Reduced to recommended + 4 core custom rules with processor support
  - TypeScript: Uses rule renaming (`ts/*` instead of `@typescript-eslint/*`)
  - Unicorn: Curated 15 essential rules instead of all recommended
  - Imports: Simplified to core import rules
- **TypeScript Rule Renaming**: All `@typescript-eslint/*` rules are now `ts/*`
  - Cleaner rule names
  - Better IDE experience
  - Updated all dependent configs (disables, command, test, nuxt)
- **Rule Optimization**: Improved rule configurations for better consistency
  - `@stylistic/no-mixed-spaces-and-tabs`: Now uses `['error', 'smart-tabs']` in stylistic config
  - `ts/no-redeclare`: Now enabled in TypeScript config (replaces disabled `no-redeclare`)
  - `unicorn/prefer-node-protocol`: Disabled to avoid conflict with `n/prefer-node-protocol`
  - `n/prefer-node-protocol`: Enabled in node config for Node.js protocol imports
  - `n/hashbang`: Disabled in command config to allow shebang in scripts
  - `unicorn/prefer-module`: Disabled in command config for CommonJS scripts
  - `unicorn/prefer-top-level-await`: Disabled in command config for scripts
- **Default trailingComma**: Changed from `'all'` to `'always-multiline'`
- **@stylistic/configs.customize()**: Now uses `configs.customize()` API for better configuration
- **Markdown config**: Simplified to use `@eslint/markdown` plugin directly
- **Default formatter**: Changed from Prettier to `@stylistic/eslint-plugin`
- **Default gitignore**: Now defaults to `true` (was `false`)
- **Vitest Plugin**: Upgraded from `eslint-plugin-vitest` to `@vitest/eslint-plugin`
- **Import sorting**: Replaced `import-x/order` with `perfectionist/sort-imports`
- **JavaScript Rules**: Added more best practice rules
  - `no-alert`: error
  - `no-eval`: error
  - `no-implied-eval`: error
  - `no-new-func`: error
  - `dot-notation`: error
  - And more...
- **TypeScript Rules**: Enhanced with more strict rules, separated type-aware rules
- **Vue Rules**: Improved Vue 3 support and added Composition API globals
- **ESLint Compatibility**: Now supports ESLint ^9.10.0 || ^9.22.0
- **Lint script**: Added `lint:fix` script for auto-fixing lint errors
- **CLI Tool**: Updated to suggest `@eslint-react/eslint-plugin` and `eslint-plugin-react-refresh` for React/Next.js projects

### Fixed

- Fixed CLI shebang missing in built output
- Fixed build compatibility with Node.js 24 and esbuild
- Fixed markdown code block linting - rules now properly disabled for code blocks
- Fixed `@stylistic/comma-dangle` configuration to accept string values
- Fixed `@eslint/markdown` plugin loading with default export
- Fixed compatibility with ESLint 9.10.0+
- Fixed Vue parser configuration for Vue 2/3 detection
- Fixed TypeScript type-aware rules requiring project configuration
- Fixed YAML and Markdown file parsing errors when disabled
- Fixed import sorting conflicts between `import-x/order` and `perfectionist/sort-imports`
- Fixed `sort-imports` conflict with perfectionist
- Consolidated all framework configs into single package
- Fixed ESM default export handling in plugin loader
- Fixed npm package exports for proper ESM/CJS support
- Fixed Angular config with updated rule names
- Fixed config file detection for Angular and UnoCSS
- Fixed Vue/Svelte TypeScript parser configuration

### Breaking Changes

- Requires ESLint v9.22.0+
- Configuration file changed from `.eslintrc.js` to `eslint.config.ts`
- Separate framework packages merged into single package
- **Default formatting changed**: Now uses `@stylistic/eslint-plugin` instead of Prettier
  - To continue using Prettier, set `stylistic: false, prettier: true`
- **TypeScript rules renamed**: All `@typescript-eslint/*` rules are now `ts/*`
  - Update any custom rule overrides to use new prefix

## [5.14.0] - 2024.11.20

1. upgrade `eslint-plugin-import` from ^2.29 to ^2.31
2. upgrade `eslint-plugin-jsdoc` from ^48.2 to ^50.5
3. upgrade `eslint-plugin-jsonc` from ^2.15 to ^2.18
4. upgrade `eslint-plugin-prettier` from ^5.1 to ^5.2
5. upgrade `eslint-plugin-promise` from ^6.1 to ^7.1
6. upgrade `eslint-plugin-react` from ^7.34 to ^7.37
7. upgrade `eslint-plugin-react-hooks` from ^4.6 to ^5.0
8. upgrade `eslint-plugin-svelte` from ^2.38 to ^2.46
9. upgrade `eslint-plugin-tsdoc` from ^0.2 to ^0.3
10. upgrade `eslint-plugin-vue` from ^9.25 to ^9.31
11. upgrade `eslint-plugin-yml` from ^1.14 to ^1.15
12. upgrade `svelte-eslint-parser` from ^0.35 to ^0.43

## [5.13.0] - 2024.04.27

1. upgrade `@typescript-eslint/eslint-plugin` from ^6.20 to ^6.21
2. upgrade `@typescript-eslint/parser` from ^6.18 to ^6.20
3. upgrade `eslint-plugin-jsdoc` from ^48.0 to ^48.2
4. upgrade `eslint-plugin-jsonc` from ^2.13 to ^2.15
5. upgrade `eslint-plugin-react` from ^7.33 to ^7.34
6. upgrade `eslint-plugin-svelte` from ^2.35 to ^2.38
7. upgrade `eslint-plugin-vitest-globals` from ^1.4 to ^1.5
8. upgrade `eslint-plugin-vue` from ^9.21 to ^9.25
9. upgrade `eslint-plugin-vue-scoped-css` from ^2.7 to 2.8
10. upgrade `eslint-plugin-yml` from ^1.12 to ^1.14
11. upgrade `svelte-eslint-parser` from ^0.33 to ^0.35

For older versions, see GitHub releases.
