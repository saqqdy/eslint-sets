# Basic Usage

## Configuration Options

The config function accepts an options object to customize behavior:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  // Enable TypeScript support
  typescript: true,

  // Enable Vue support
  vue: true,

  // Enable React support
  react: true,

  // Custom rules
  rules: {
    'no-console': 'warn',
  },
})
```

## Project Types

### Application Project (Default)

For application projects with relaxed rules:

```typescript
export default eslintConfig({
  type: 'app',
})
```

### Library Project

For library projects with stricter rules:

```typescript
export default eslintConfig({
  type: 'lib',
})
```

Library projects enable additional rules like `ts/explicit-function-return-type` to ensure better API documentation.

## Stylistic vs Prettier

This config supports two formatting approaches:

### Stylistic (Default)

Uses `@stylistic/eslint-plugin` for pure ESLint-based formatting:

```typescript
// Use Stylistic (default)
export default eslintConfig({
  stylistic: true,
})

// Use Stylistic with custom options
export default eslintConfig({
  stylistic: {
    arrowParens: false, // true (always) | false (avoid)
    braceStyle: '1tbs', // '1tbs' | 'stroustrup' | 'allman'
    bracketSpacing: true, // boolean
    indent: 2, // 'tab' | number
    jsxQuotes: 'prefer-double', // 'prefer-double' | 'prefer-single'
    quoteProps: 'as-needed', // 'always' | 'as-needed' | 'consistent' | 'consistent-as-needed'
    quotes: 'single', // 'single' | 'double'
    semi: false, // boolean
    trailingComma: 'always-multiline', // 'none' | 'always' | 'never' | 'only-multiline' | 'always-multiline'
  },
})
```

### Prettier

Uses `eslint-plugin-prettier` to integrate Prettier with ESLint:

```typescript
// Use Prettier instead (must disable stylistic)
export default eslintConfig({
  prettier: true,
  stylistic: false,
})

// Use Prettier with custom options
export default eslintConfig({
  prettier: {
    printWidth: 100,
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
  },
  stylistic: false,
})
```

::: warning Mutual Exclusion
Stylistic and Prettier are mutually exclusive. When `stylistic` is enabled (default), Prettier is automatically disabled.
:::

## Framework Support

### Vue

```typescript
export default eslintConfig({
  vue: true, // Auto-detect Vue version

  // Or with options
  vue: {
    a11y: true, // Enable accessibility rules
    vueVersion: 3, // Explicitly set Vue version
  },
})
```

### React

```typescript
export default eslintConfig({
  react: true,

  // Or with options
  react: {
    reactCompiler: true, // React Compiler support
    rsc: true, // React Server Components rules (default: true)
  },
})
```

### Svelte

```typescript
export default eslintConfig({
  svelte: true,
  typescript: true,
})
```

### Next.js

```typescript
export default eslintConfig({
  nextjs: true,
  react: true,
  typescript: true,
})
```

### Nuxt

```typescript
export default eslintConfig({
  nuxt: true,
  vue: true,
  typescript: true,
})
```

### Angular

```typescript
export default eslintConfig({
  angular: true,
  typescript: true,
})
```

### Astro

```typescript
export default eslintConfig({
  astro: true,
  typescript: true,
})
```

### UnoCSS

```typescript
export default eslintConfig({
  unocss: true,
})
```

## Accessibility

Enable accessibility rules for better a11y compliance:

### Vue Accessibility

```typescript
export default eslintConfig({
  vue: {
    a11y: true,
  },
})
```

### JSX Accessibility

```typescript
export default eslintConfig({
  jsx: {
    a11y: true,
  },
})
```

## Ignoring Files

### Using .gitignore

By default, the config automatically reads `.gitignore` patterns:

```typescript
export default eslintConfig({
  gitignore: true, // Enable .gitignore support (default: true)
})
```

### Custom Ignores

```typescript
export default eslintConfig({
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
    '**/.vscode/**',
  ],

  // Or modify defaults
  ignores: (defaults) => [...defaults, '**/custom/**'],
})
```

## Customizing Rules

Override any default rules:

```typescript
export default eslintConfig({
  rules: {
    'no-console': 'off',
    '@stylistic/max-len': ['error', { code: 100 }],
    'ts/explicit-function-return-type': 'warn',
  },
})
```

## Disabling Stylistic Rules per Config

You can disable stylistic rules for specific file types:

```typescript
export default eslintConfig({
  jsonc: { stylistic: false },
  yaml: { stylistic: false },
  toml: { stylistic: false },
  vue: { stylistic: false },
})
```

## Auto-sort

Automatically sort configuration files:

```typescript
export default eslintConfig({
  sortPackageJson: true, // Sort package.json (default: true)
  sortTsconfig: true, // Sort tsconfig.json (default: true)
})
```

## Command Scripts

Relax rules for command-line scripts:

```typescript
export default eslintConfig({
  command: true, // Relax rules for scripts (default: true)
})
```

This applies relaxed rules to files in:
- `scripts/**`
- `bin/**`
- `cli/**`
- `tasks/**`
- `tools/**`

Allows: `console`, `process.exit`, `process.env`, shebang, `require`, etc.

## Disables

Automatically disable strict rules in config files:

```typescript
export default eslintConfig({
  disables: true, // Disable rules in config files (default: true)
})
```

This disables strict rules in:
- Configuration files (`.eslintrc`, `eslint.config.*`, etc.)
- Script directories (`scripts/`, `tasks/`, `tools/`, `cli/`, `bin/`)
