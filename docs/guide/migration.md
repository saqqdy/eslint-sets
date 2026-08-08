# Migration from v5

If you're migrating from the old `@eslint-sets/eslint-config-*` packages, this guide will help you transition to v6.

## Overview

All sub-packages have been merged into a single package `@eslint-sets/eslint-config`. This simplifies installation and maintenance while providing better framework detection.

## Migration Map

| Old Package (v5) | New Config (v6) |
| ---------------- | --------------- |
| `@eslint-sets/eslint-config-basic` | `eslintConfig()` (default) |
| `@eslint-sets/eslint-config-ts` | `eslintConfig({ typescript: true })` |
| `@eslint-sets/eslint-config-vue` | `eslintConfig({ vue: { vueVersion: 2 } })` |
| `@eslint-sets/eslint-config-vue3` | `eslintConfig({ vue: { vueVersion: 3 } })` |
| `@eslint-sets/eslint-config-react` | `eslintConfig({ react: true })` |
| `@eslint-sets/eslint-config-svelte` | `eslintConfig({ svelte: true })` |
| `@eslint-sets/eslint-config-nuxt` | `eslintConfig({ nuxt: true, vue: true })` |
| `@eslint-sets/eslint-config-egg` | `eslintConfig({ node: true, typescript: true })` |

## Key Changes in v6

### 1. Flat Config Format

v6 uses ESLint's new flat config format:

**Before (v5):**
```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-vue3',
}
```

**After (v6):**
```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: {
    vueVersion: 3,
  },
})
```

### 2. ESM-only Package

v6 is pure ESM. You **must** use ESM config files:

**Supported:**
- `eslint.config.ts`
- `eslint.config.mjs`
- `eslint.config.js` (with `"type": "module"` in package.json)

**Not Supported:**
- `eslint.config.cjs`
- `eslint.config.js` (without `"type": "module"`)
- `.eslintrc.js`
- `.eslintrc.json`

### 3. Single Package

All sub-packages merged into one:

**Before (v5):**
```bash
pnpm add -D @eslint-sets/eslint-config-vue3
```

**After (v6):**
```bash
pnpm add -D @eslint-sets/eslint-config
```

### 4. Auto-detection

Frameworks are auto-detected by default:

**Before (v5):**
```javascript
// Need different packages for different frameworks
extends: '@eslint-sets/eslint-config-react'
```

**After (v6):**
```typescript
// Vue is auto-detected if vue/nuxt/vitepress is in dependencies.
// React/Svelte/Solid require explicit opt-in (v6.6.0+, aligned with @antfu/eslint-config):
export default eslintConfig({
  react: true, // when using React
})
```

> [!NOTE]
> Since v6.6.0, only `vue` auto-detects. `react`/`svelte`/`solid` default to `false`
> to prevent Vue and React from both activating in hoisted monorepos. Set `react: true`
> / `svelte: true` / `solid: true` to enable, or `'auto'` to restore auto-detection.

### 5. Stylistic by Default

Default formatting uses `@stylistic/eslint-plugin` instead of Prettier:

**Before (v5):**
- Required Prettier integration

**After (v6):**
- Stylistic formatting by default (optional Prettier)

### 6. TypeScript Types

Auto-generated types for all rules:

**Before (v5):**
- Manual type definitions
- Limited IDE support

**After (v6):**
- Full IntelliSense for all rules
- Type-safe configuration

## Migration Examples

### Basic Project

**Before (v5):**
```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-basic',
}
```

**After (v6):**
```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

### TypeScript Project

**Before (v5):**
```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-ts',
}
```

**After (v6):**
```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
})
```

### Vue 2 Project

**Before (v5):**
```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-vue',
}
```

**After (v6):**
```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: {
    vueVersion: 2,
  },
})
```

### Vue 3 Project

**Before (v5):**
```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-vue3',
}
```

**After (v6):**
```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: {
    vueVersion: 3,
  },
})
```

### React Project

**Before (v5):**
```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-react',
}
```

**After (v6):**
```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  react: true,
})
```

### Svelte Project

**Before (v5):**
```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-svelte',
}
```

**After (v6):**
```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  svelte: true,
})
```

### Nuxt Project

**Before (v5):**
```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-nuxt',
}
```

**After (v6):**
```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  nuxt: true,
  vue: true,
})
```

### Node.js Project (Egg)

**Before (v5):**
```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-egg',
}
```

**After (v6):**
```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  node: true,
  typescript: true,
})
```

## Migration Steps

1. **Remove old package:**
   ```bash
   pnpm remove @eslint-sets/eslint-config-vue3 # or other variant
   ```

2. **Install new package:**
   ```bash
   pnpm add -D @eslint-sets/eslint-config eslint
   ```

3. **Delete old config:**
   ```bash
   rm .eslintrc.js .eslintrc.json # or other legacy config files
   ```

4. **Create new config:**
   ```bash
   npx @eslint-sets/eslint-config
   ```

5. **Update package.json:**
   Make sure `"type": "module"` is set (for ESM support)

6. **Test:**
   ```bash
   pnpm eslint .
   ```

## Common Issues

### CommonJS Config Files

**Problem:** Using `.eslintrc.js` or `eslint.config.cjs`

**Solution:** Rename to `eslint.config.ts` and use ESM syntax

### Missing Peer Dependencies

**Problem:** TypeScript can't load config

**Solution:** Install `jiti` (pnpm users) or ensure peer dependencies are installed

### Rule Conflicts

**Problem:** Different rule behaviors in v6

**Solution:** Check the default rule behaviors section and override as needed

### Prettier Integration

**Problem:** Want to use Prettier instead of Stylistic

**Solution:**
```typescript
export default eslintConfig({
  prettier: true,
  stylistic: false,
})
```

## v6.6.0

### React/Svelte/Solid Now Opt-In

`react`, `svelte`, and `solid` defaults changed from `'auto'` to `false`, aligning with `@antfu/eslint-config`. Only `vue` remains auto-detected. This prevents Vue and React configs from both activating simultaneously in hoisted monorepos (where `isPackageExists` resolves both from the root `node_modules`), which caused false positives such as `react-refresh/only-export-components` firing on Vue projects' `.ts` files.

**Migration**: if you relied on auto-detection, add `react: true` / `svelte: true` / `solid: true`:

```typescript
export default eslintConfig({
  react: true, // or svelte: true / solid: true
})
```

To restore the old auto-detect behavior, set the option to `'auto'`:

```typescript
export default eslintConfig({
  react: 'auto',
})
```

A warning now prints when `react` is installed but `react` is disabled, guiding you to enable it.

### CI and Git Hooks Keep Rules Strict

`isInEditorEnv()` now returns `false` in CI, git hooks (`GIT_PARAMS` / `VSCODE_GIT_COMMAND`), and lint-staged contexts. Rules that are downgraded for editors (e.g. `prefer-const`, `unused-imports`) now stay strict (`error`) where it matters. The `TERM_PROGRAM` environment variable has been removed from `EDITOR_ENV_KEYS` (it caused CI false-positives); `VIM`, `NVIM`, and Zed (`ZED_ENVIRONMENT` without `ZED_TERM`) are now recognized as editors.

### .gitignore Handling

`.gitignore` handling is now backed by `eslint-config-flat-gitignore`, which provides correct git semantics (root-anchoring, nested `.gitignore` files). It no longer reads `.git/info/exclude` — only `.gitignore` files are read.

### Deprecated Git Utilities

`parseGitignore`, `findGitignore`, and `getGitignorePatterns` (from `src/utils/git.ts`) are **deprecated** and slated for removal in v7.0.0. Use the built-in `gitignore` option (enabled by default) instead.

### Peer Dependencies

The ESLint peer dependency requirement has been raised to `^9.10.0`.

### loadPlugin Required Flag

`loadPlugin(name, { required: true })` now warns with the plugin name and error message on failure. Optional loads (without the flag) remain silent. Core dependencies (`@typescript-eslint/eslint-plugin`, `eslint-plugin-jsdoc`, `eslint-plugin-no-only-tests`) now use `required: true`.

## v6.6.1

### React Warning No Longer Fires in Vue/Solid Projects

The `"react" package detected but react: false` warning is now gated on `!hasVue() && !hasSolid()` — it only fires when `react` is installed and neither Vue nor Solid is present (i.e. React is the only candidate JSX framework). This eliminates false positives in Vue/Solid monorepos where `react` is merely a transitive (hoisted) dependency and React rules are correctly left disabled.

### JSDoc Pinned for Node.js 18 Compatibility

`eslint-plugin-jsdoc` is pinned to `~50.8.0` (was `^61.7.1`). Versions `51.0.0+` use the ES2024 `v` (unicodeSets) regex flag and require Node.js `>=20.11.0`; on Node.js 18 they throw `Invalid regular expression flags` at import time, which `loadPlugin` reports as `Failed to load plugin "eslint-plugin-jsdoc"`. The pin restores JSDoc rule coverage on Node.js 18, matching the declared `engines` (`^18.18.0 || ^20.9.0 || >=21.1.0`).

## Need Help?

If you encounter issues during migration:

1. Check the [GitHub Issues](https://github.com/saqqdy/eslint-sets/issues)
2. Review the [documentation](/)
3. Open a new issue with your configuration and error message