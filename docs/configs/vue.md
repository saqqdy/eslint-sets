# Vue Configuration

Complete guide for configuring ESLint in Vue projects.

## Installation

```bash
pnpm add -D @eslint-sets/eslint-config eslint
pnpm add -D vue eslint-plugin-vue
```

## Basic Configuration

### Vue 3

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: {
    vueVersion: 3,
  },
})
```

### Vue 2

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: {
    vueVersion: 2,
  },
})
```

### Auto-Detection

Let the config detect Vue version:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: true, // Auto-detects version
})
```

## Vue Options

```typescript
export default eslintConfig({
  vue: {
    // Vue version (default: auto-detect)
    vueVersion: 3,

    // Enable accessibility rules
    a11y: false,

    // Enable stylistic rules for Vue files
    stylistic: true,
  },
})
```

### Accessibility

Enable Vue a11y rules:

```typescript
export default eslintConfig({
  vue: {
    a11y: true,
    vueVersion: 3,
  },
})
```

This enables rules from `eslint-plugin-vuejs-accessibility`:

- `vuejs-accessibility/aria-role`
- `vuejs-accessibility/aria-props`
- And more...

### Disable Stylistic for Vue Files

If you want Prettier to handle Vue files:

```typescript
export default eslintConfig({
  vue: {
    stylistic: false,
  },
  prettier: true,
})
```

## Full Example

### Vue 3 + TypeScript + Vite

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  type: 'app',
  typescript: true,
  vue: {
    vueVersion: 3,
    a11y: false,
    stylistic: true,
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  gitignore: true,
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
  ],
})
```

### Vue 3 Library

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  type: 'lib',
  typescript: {
    typeAware: true,
  },
  vue: {
    vueVersion: 3,
  },
  sortPackageJson: true,
})
```

### Vue 2 + JavaScript

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: {
    vueVersion: 2,
  },
  typescript: false,
})
```

## Nuxt Integration

For Nuxt 3 projects:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: true,
  nuxt: true,
})
```

See [Nuxt Configuration](/configs/) for details.

## File Support

The Vue config supports:

- `.vue` single file components
- `<script setup>` syntax
- Vue 3 Composition API
- Vue 2 Options API
- TypeScript in `<script lang="ts">`

## Parser Configuration

The config automatically configures:

- `vue-eslint-parser` for `.vue` files
- Correct parser options based on Vue version
- TypeScript support when enabled

## Common Rules

The Vue config includes rules from:

- `eslint-plugin-vue`: Core Vue rules
- `eslint-plugin-vuejs-accessibility`: A11y rules (optional)
- Vue-specific TypeScript rules

### Example Rule Overrides

```typescript
export default eslintConfig({
  vue: true,
  rules: {
    // Allow multi-word component names
    'vue/multi-word-component-names': 'off',

    // Require explicit emits
    'vue/require-explicit-emits': 'warn',

    // Enforce script setup style
    'vue/component-api-style': ['error', {
      allowed: ['script-setup'],
    }],
  },
})
```

## VS Code Integration

Add to `.vscode/settings.json`:

```json
{
  "eslint.validate": [
    "vue",
    "javascript",
    "typescript"
  ]
}
```

## Troubleshooting

### Parser Errors

If you get parser errors:

1. Ensure `vue-eslint-parser` is configured
2. Check Vue version matches config
3. Verify TypeScript config includes `.vue` files

### Template Errors

For template-specific issues:

```typescript
export default eslintConfig({
  vue: true,
  rules: {
    // Adjust template rules
    'vue/no-unused-vars': 'warn',
    'vue/valid-v-slot': 'off',
  },
})
```

## Related Documentation

- [React Configuration](/configs/react)
- [Nuxt Configuration](/configs/)
- [TypeScript Configuration](/configs/)