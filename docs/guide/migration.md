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
// Auto-detects React if react is in dependencies
export default eslintConfig()
```

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

## Need Help?

If you encounter issues during migration:

1. Check the [GitHub Issues](https://github.com/saqqdy/eslint-sets/issues)
2. Review the [documentation](/)
3. Open a new issue with your configuration and error message