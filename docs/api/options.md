# Options Reference

Complete reference for all configuration options.

## Project Configuration

### `type`

Project type: `'app'` or `'lib'`.

- **Type**: `'app' | 'lib'`
- **Default**: `'app'`
- **Description**: Determines strictness of rules. Libraries have stricter rules.

```typescript
export default eslintConfig({
  type: 'lib', // Stricter rules for libraries
})
```

### `autoDetect`

Enable automatic framework detection.

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Automatically detect frameworks from package.json

```typescript
export default eslintConfig({
  autoDetect: true, // Default
})
```

## Framework Options

### `typescript`

TypeScript support configuration.

- **Type**: `boolean | TypeScriptOptions`
- **Default**: `true`

```typescript
// Boolean
export default eslintConfig({
  typescript: true,
})

// With options
export default eslintConfig({
  typescript: {
    typeAware: true,
    tsconfigPath: './tsconfig.json',
    overridesTypeAware: {
      'ts/no-floating-promises': 'warn',
    },
  },
})
```

### `vue`

Vue.js support configuration.

- **Type**: `boolean | VueOptions`
- **Default**: `'auto'`

```typescript
// Boolean (auto-detect version)
export default eslintConfig({
  vue: true,
})

// With options
export default eslintConfig({
  vue: {
    vueVersion: 3,
    a11y: true,
    stylistic: true,
  },
})
```

### `react`

React support configuration.

- **Type**: `boolean | ReactOptions`
- **Default**: `'auto'`

```typescript
// Boolean
export default eslintConfig({
  react: true,
})

// With options
export default eslintConfig({
  react: {
    reactCompiler: true,
    rsc: true,
  },
})
```

### `svelte`

Svelte support configuration.

- **Type**: `boolean`
- **Default**: `'auto'`

```typescript
export default eslintConfig({
  svelte: true,
})
```

### `solid`

SolidJS support configuration.

- **Type**: `boolean`
- **Default**: `'auto'`

```typescript
export default eslintConfig({
  solid: true,
})
```

### `nextjs`

Next.js support configuration.

- **Type**: `boolean`
- **Default**: `'auto'`

```typescript
export default eslintConfig({
  nextjs: true,
  react: true,
})
```

### `nuxt`

Nuxt support configuration.

- **Type**: `boolean`
- **Default**: `'auto'`

```typescript
export default eslintConfig({
  nuxt: true,
  vue: true,
})
```

### `angular`

Angular support configuration.

- **Type**: `boolean`
- **Default**: `'auto'`

```typescript
export default eslintConfig({
  angular: true,
  typescript: true,
})
```

### `astro`

Astro support configuration.

- **Type**: `boolean`
- **Default**: `'auto'`

```typescript
export default eslintConfig({
  astro: true,
})
```

### `unocss`

UnoCSS support configuration.

- **Type**: `boolean`
- **Default**: `'auto'`

```typescript
export default eslintConfig({
  unocss: true,
})
```

## Formatting Options

### `stylistic`

Stylistic formatting configuration.

- **Type**: `boolean | StylisticOptions`
- **Default**: `true`

```typescript
// Boolean
export default eslintConfig({
  stylistic: true,
})

// With options
export default eslintConfig({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
    trailingComma: 'always-multiline',
  },
})
```

### `prettier`

Prettier integration configuration.

- **Type**: `boolean | PrettierOptions`
- **Default**: `false`
- **Note**: Must disable `stylistic` when using Prettier

```typescript
// Boolean
export default eslintConfig({
  prettier: true,
  stylistic: false,
})

// With options
export default eslintConfig({
  prettier: {
    printWidth: 100,
    semi: false,
    singleQuote: true,
  },
  stylistic: false,
})
```

## Feature Options

### `gitignore`

Read .gitignore patterns.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  gitignore: true,
})
```

### `ignores`

Custom ignore patterns.

- **Type**: `string[] | ((defaults: string[]) => string[])`
- **Default**: Built-in ignores

```typescript
// Array
export default eslintConfig({
  ignores: ['**/dist/**', '**/custom/**'],
})

// Function
export default eslintConfig({
  ignores: (defaults) => [...defaults, '**/custom/**'],
})
```

### `command`

Relax rules for command-line scripts.

- **Type**: `boolean`
- **Default**: `true`

Applies to: `scripts/**`, `bin/**`, `cli/**`, `tasks/**`, `tools/**`

```typescript
export default eslintConfig({
  command: true,
})
```

### `disables`

Relax rules in config files.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  disables: true,
})
```

### `sortPackageJson`

Auto-sort package.json.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  sortPackageJson: true,
})
```

### `sortTsconfig`

Auto-sort tsconfig.json.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  sortTsconfig: true,
})
```

## Language Support Options

### `jsonc`

JSON/JSONC support.

- **Type**: `boolean | JsoncOptions`
- **Default**: `true`

```typescript
export default eslintConfig({
  jsonc: true,
})
```

### `yaml`

YAML support.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  yaml: true,
})
```

### `markdown`

Markdown support.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  markdown: true,
})
```

### `toml`

TOML support.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  toml: true,
})
```

## Code Quality Options

### `imports`

Import/export rules.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  imports: true,
})
```

### `unicorn`

Unicorn rule set.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  unicorn: true,
})
```

### `perfectionist`

Import/export sorting.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  perfectionist: true,
})
```

### `regexp`

Regular expression rules.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  regexp: true,
})
```

### `jsdoc`

JSDoc validation.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  jsdoc: true,
})
```

### `comments`

ESLint directive comment rules.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  comments: true,
})
```

## Additional Options

### `test`

Test file support.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  test: true,
})
```

### `node`

Node.js rules.

- **Type**: `boolean`
- **Default**: `true`

```typescript
export default eslintConfig({
  node: true,
})
```

### `pnpm`

pnpm workspace support.

- **Type**: `boolean`
- **Default**: `false`

```typescript
export default eslintConfig({
  pnpm: true,
})
```

### `jsx`

JSX support with optional a11y.

- **Type**: `boolean | JsxOptions`
- **Default**: `false`

```typescript
export default eslintConfig({
  jsx: {
    a11y: true,
  },
})
```

### `formatters`

External formatters for non-JS files.

- **Type**: `FormattersOptions`
- **Default**: `false`

```typescript
export default eslintConfig({
  formatters: {
    css: 'prettier',
    html: 'prettier',
    markdown: 'prettier',
  },
})
```

### `rules`

Custom rule overrides.

- **Type**: `Rules`
- **Default**: `{}`

```typescript
export default eslintConfig({
  rules: {
    'no-console': 'off',
    '@stylistic/semi': ['error', 'always'],
  },
})
```

### `extends`

Additional flat configs to extend.

- **Type**: `TypedFlatConfigItem[]`
- **Default**: `[]`

```typescript
import someConfig from 'some-eslint-config'

export default eslintConfig({
  extends: [someConfig],
})
```