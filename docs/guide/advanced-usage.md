# Advanced Usage

## TypeScript Advanced Options

### Type-Aware Rules

Enable type-aware rules that require type information:

```typescript
export default eslintConfig({
  typescript: {
    typeAware: true,
    tsconfigPath: './tsconfig.json',
    overridesTypeAware: {
      'ts/no-floating-promises': 'warn',
      'ts/no-misused-promises': 'warn',
    },
  },
})
```

::: tip Performance
Type-aware rules are slower because they require TypeScript type information. Use them judiciously in large projects.
:::

### Erasable Syntax Only

For libraries that want type-only constructs:

```typescript
export default eslintConfig({
  typescript: {
    erasableOnly: true, // Requires eslint-plugin-erasable-syntax-only
  },
})
```

## External Formatters

Use external formatters for non-JS files:

```typescript
export default eslintConfig({
  formatters: {
    css: 'prettier',
    graphql: 'prettier',
    html: 'prettier',
    markdown: 'prettier',
    svg: 'prettier',
    xml: 'prettier',
  },
})
```

## pnpm Workspace Support

Enable pnpm workspace-specific rules:

```typescript
export default eslintConfig({
  pnpm: true, // Enable pnpm workspace support
})
```

## Extending the Config

Add additional flat configs:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'
import someOtherConfig from 'some-other-eslint-config'

export default eslintConfig({
  extends: [
    someOtherConfig,
    // Additional flat configs
  ],
  rules: {
    // Override rules
  },
})
```

## Individual Config Imports

Import individual configurations:

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
  comments,
  jsdoc,
  jsx,
  nextjs,
  nuxt,
  astro,
  angular,
  unocss,
  pnpm,
  formatters,
  sortPackageJson,
  sortTsconfig,
} from '@eslint-sets/eslint-config'
```

### Example: Custom Composition

```typescript
import {
  javascript,
  typescript,
  vue,
  prettier,
} from '@eslint-sets/eslint-config'

export default [
  ...javascript(),
  ...typescript(),
  ...vue(),
  ...prettier(),
  {
    name: 'my-custom-config',
    rules: {
      'no-console': 'error',
    },
  },
]
```

## Default Rule Behaviors

This config follows modern best practices with sensible defaults:

### No Line Length Limit

By default, `@stylistic/max-len` is not configured, allowing flexible line lengths:

```typescript
export default eslintConfig({
  rules: {
    // Add line length limit if needed
    '@stylistic/max-len': ['error', { code: 100 }],
  },
})
```

### Use Global Buffer/process

`n/prefer-global/buffer` and `n/prefer-global/process` are set to `'always'`:

```typescript
// This is allowed by default
const buffer = Buffer.from('test')
const env = process.env.NODE_ENV

// Override if you prefer imports
export default eslintConfig({
  rules: {
    'n/prefer-global/buffer': ['error', 'never'],
    'n/prefer-global/process': ['error', 'never'],
  },
})
```

### Flexible Unused Expressions

`ts/no-unused-expressions` allows:

- Short-circuit evaluation (`condition && doSomething()`)
- Ternary expressions (`condition ? a : b`)
- Tagged templates (`html`<div></div>`)

### Mixed Operators Grouping

`@stylistic/no-mixed-operators` groups operators by category:

- Comparison operators: `==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`
- Logical operators: `&&`, `||`, `??`
- `in`/`instanceof` operators

## React Compiler Support

Enable React Compiler rules:

```typescript
export default eslintConfig({
  react: {
    reactCompiler: true, // Enable React Compiler support
  },
})
```

This enables rules that help ensure your code is compatible with React Compiler optimizations.

## React Server Components

Control RSC (React Server Components) rules:

```typescript
export default eslintConfig({
  react: {
    rsc: true, // Enable RSC rules (default: true)
  },
})
```

## Vue Version Control

Explicitly set Vue version:

```typescript
export default eslintConfig({
  vue: {
    vueVersion: 2, // Or 3
  },
})
```

## Svelte 5 Runes

Svelte 5 runes are automatically supported in `.svelte` and TypeScript files:

```typescript
export default eslintConfig({
  svelte: true,
  typescript: true,
})
```

The config properly handles:
- `$state()` runes
- `$derived()` runes
- `$effect()` runes
- Other Svelte 5 reactivity primitives

## Test File Support

Configure test file rules:

```typescript
export default eslintConfig({
  test: true, // Enable test file support (default: true)
})
```

This configures rules for test files using `@vitest/eslint-plugin`.

## Node.js Rules

Enable Node.js specific rules:

```typescript
export default eslintConfig({
  node: true, // Enable Node.js rules (default: true)
})
```

## Unicorn Rules

Enable the comprehensive Unicorn rule set:

```typescript
export default eslintConfig({
  unicorn: true, // Enable Unicorn rules (default: true)
})
```

## Import Rules

Configure import/export rules:

```typescript
export default eslintConfig({
  imports: true, // Enable import rules (default: true)
})
```

## Perfectionist Sorting

Enable import/export sorting with natural ordering:

```typescript
export default eslintConfig({
  perfectionist: true, // Enable Perfectionist sorting (default: true)
})
```

This automatically sorts:
- Import statements
- Export statements
- Object properties
- Union types
- And more...

## Regexp Rules

Enable regular expression best practices:

```typescript
export default eslintConfig({
  regexp: true, // Enable Regexp rules (default: true)
})
```

## JSDoc Rules

Enable JSDoc validation:

```typescript
export default eslintConfig({
  jsdoc: true, // Enable JSDoc rules (default: true)
})
```

## ESLint Directive Comments

Control ESLint directive comments (like `// eslint-disable`):

```typescript
export default eslintConfig({
  comments: true, // Enable ESLint comments rules (default: true)
})
```

This enforces:
- Require descriptions for `eslint-disable` comments
- Warn about unused `eslint-disable` comments
- And more...
## Custom Language Options

Add custom globals and parser options for framework-specific scenarios:

```typescript
export default eslintConfig({
  vue: true,
  typescript: true,
  languageOptions: {
    globals: {
      // Taro framework globals
      defineAppConfig: 'readonly',
      definePageConfig: 'readonly',
      // Custom global variables
      myGlobal: 'writable',
    },
  },
})
```

**Key Features**:

- **Smart Merging**: Custom `globals` are intelligently merged into all relevant configurations (javascript, vue, react, etc.)
- **Framework Globals**: Perfect for adding framework-specific globals like Taro's `definePageConfig`
- **Preserves Defaults**: Default globals (console, process, window, etc.) are preserved

**Common Use Cases**:

- **Taro**: `defineAppConfig`, `definePageConfig`
- **Uni-app**: `uni`, `plus`
- **WeChat Miniprogram**: `wx`, `App`, `Page`
- **Custom Environment Variables**

**Note**: Currently, only `globals` merging is supported. Other `languageOptions` properties are not automatically merged.

