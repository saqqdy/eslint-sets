# Changelog

All notable changes to this project will be documented in this file.

## [6.0.0] - 2026-03-13

### Added

- **Project Types**: Support for `type: 'app'` and `type: 'lib'` project types
- **Framework Support**: Added support for Next.js, Nuxt, Astro, Angular, and UnoCSS
- **Accessibility Rules**: Added optional a11y rules for Vue and React
  - Vue: via `vue.a11y` option (requires eslint-plugin-vuejs-accessibility)
  - JSX: via `react.a11y` option or standalone `jsxA11y` config
- **CLI Tool**: Interactive CLI wizard for project setup
  - Run with: `npx @eslint-sets/eslint-config` or `pnpm dlx @eslint-sets/eslint-config`
  - Supports project type, TypeScript, frameworks (Vue, React, Svelte, Solid, Next.js, Nuxt, Astro, Angular, UnoCSS)
  - Accessibility and formatter options
- **Auto-sort**: Added `sortPackageJson` and `sortTsconfig` options (default: true)
- **ESLint Comments**: Added `eslintComments` option for ESLint directive rules
- **No Only Tests**: Added `noOnlyTests` config to prevent committing `.only()` tests
- **Editor Detection**: Added `isInEditor` option to auto-detect editor environment
- **Framework Options**: Framework configs now accept options objects
  - `vue: { vueVersion: 2 | 3, a11y: boolean }`
  - `react: { reactCompiler: boolean, a11y: boolean }`
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

- **Default gitignore**: Now defaults to `true` (was `false`)
- **Vitest Plugin**: Upgraded from `eslint-plugin-vitest` to `@vitest/eslint-plugin`
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

### Fixed

- Fixed compatibility with ESLint 9.10.0+
- Fixed Vue parser configuration for Vue 2/3 detection
- Fixed TypeScript type-aware rules requiring project configuration
- Fixed YAML and Markdown file parsing errors when disabled
- Consolidated all framework configs into single package

### Breaking Changes

- Requires ESLint v9.22.0+
- Configuration file changed from `.eslintrc.js` to `eslint.config.ts`
- Separate framework packages merged into single package

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
