# Framework Configurations

This section provides framework-specific configuration examples and best practices.

## Overview

`@eslint-sets/eslint-config` supports multiple frameworks out of the box with auto-detection. However, you can explicitly configure frameworks for better control.

## Auto-Detection

By default, the config automatically detects installed frameworks:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  autoDetect: true, // Default: true
})
```

The auto-detection checks your `package.json` dependencies and enables appropriate rules.

## Available Frameworks

| Framework | Option | Auto-detect Key |
|-----------|--------|-----------------|
| TypeScript | `typescript` | `typescript` |
| Vue | `vue` | `vue` |
| React | `react` | `react`, `react-dom` |
| Svelte | `svelte` | `svelte` |
| Solid | `solid` | `solid-js` |
| Next.js | `nextjs` | `next` |
| Nuxt | `nuxt` | `nuxt` |
| Angular | `angular` | `@angular/core` |
| Astro | `astro` | `astro` |
| UnoCSS | `unocss` | `unocss` |

## Quick Start Examples

### Minimal Setup

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

### TypeScript Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
})
```

### Vue 3 Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: {
    vueVersion: 3,
  },
})
```

### React Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  react: true,
})
```

### Full-Stack Next.js

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  react: true,
  nextjs: true,
})
```

### Nuxt Project

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: true,
  nuxt: true,
})
```

## Configuration Patterns

### Library Project

For libraries with stricter rules:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  type: 'lib',
  typescript: {
    typeAware: true,
  },
})
```

### Monorepo

For monorepos with multiple frameworks:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: true,
  react: true,
  // Frameworks will only apply to relevant files
})
```

### With Prettier

If you prefer Prettier over Stylistic:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  prettier: true,
  stylistic: false,
})
```

### With Accessibility

Enable a11y rules:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: {
    a11y: true,
  },
  jsx: {
    a11y: true,
  },
})
```

## Framework-Specific Guides

Choose your framework below for detailed configuration:

- [Vue](/configs/vue)
- [React](/configs/react)
