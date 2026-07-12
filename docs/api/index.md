# API Reference

This section provides detailed API documentation for `@eslint-sets/eslint-config`.

## Main Export

### `eslintConfig(options?)`

The main function that creates an ESLint flat config.

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig(options)
```

#### Parameters

- `options` (optional): `ConfigOptions` - Configuration options

#### Returns

- `Promise<TypedFlatConfigItem[]>` - Array of flat config items

## Types

### `ConfigOptions`

Main configuration options interface:

```typescript
interface ConfigOptions {
  // Project type
  type?: 'app' | 'lib'

  // Framework configurations
  angular?: boolean | AngularOptions
  astro?: boolean | AstroOptions
  nextjs?: boolean | NextjsOptions
  nuxt?: boolean | NuxtOptions
  react?: boolean | ReactOptions
  solid?: boolean | SolidOptions
  svelte?: boolean | SvelteOptions
  typescript?: boolean | TypeScriptOptions
  unocss?: boolean | UnoCSSOptions
  vue?: boolean | VueOptions

  // Feature toggles
  autoDetect?: boolean
  command?: boolean
  comments?: boolean
  gitignore?: boolean
  imports?: boolean
  jsdoc?: boolean
  jsonc?: boolean | JsoncOptions
  jsx?: boolean | JsxOptions
  markdown?: boolean
  node?: boolean
  perfectionist?: boolean
  pnpm?: boolean
  prettier?: boolean | PrettierOptions
  regexp?: boolean
  solid?: boolean
  sortPackageJson?: boolean
  sortTsconfig?: boolean
  stylistic?: boolean | StylisticOptions
  test?: boolean
  toml?: boolean
  unicorn?: boolean
  yaml?: boolean

  // File ignores
  ignores?: string[] | ((defaults: string[]) => string[])

  // Rule overrides
  rules?: Rules

  // Extend configs
  extends?: TypedFlatConfigItem[]

  // External formatters
  formatters?: FormattersOptions

  // Disables
  disables?: boolean
}
```

### `TypedFlatConfigItem`

Typed flat config item:

```typescript
interface TypedFlatConfigItem {
  name?: string
  files?: string[]
  ignores?: string[]
  rules?: Rules
  plugins?: Record<string, any>
  languageOptions?: any
  processor?: any
  settings?: Record<string, any>
  // ... other flat config properties
}
```

### `Rules`

All available rule names with type checking:

```typescript
type Rules = {
  [K in RuleKey]?: RuleLevelAndOptions
}

// Example usage
const rules: Rules = {
  'no-console': 'off',
  '@stylistic/semi': ['error', 'always'],
}
```

## Framework Options

### TypeScript Options

```typescript
interface TypeScriptOptions {
  // Enable type-aware rules
  typeAware?: boolean

  // Path to tsconfig.json
  tsconfigPath?: string

  // Override type-aware rules
  overridesTypeAware?: Rules

  // Enable erasable syntax only
  erasableOnly?: boolean

  // Enable stylistic rules
  stylistic?: boolean
}
```

### Vue Options

```typescript
interface VueOptions {
  // Vue version (default: auto-detect)
  vueVersion?: 2 | 3

  // Enable accessibility rules
  a11y?: boolean

  // Enable stylistic rules
  stylistic?: boolean
}
```

### React Options

```typescript
interface ReactOptions {
  // Enable React Compiler support
  reactCompiler?: boolean

  // React Server Components rules
  rsc?: boolean

  // Enable stylistic rules
  stylistic?: boolean
}
```

### Stylistic Options

```typescript
interface StylisticOptions {
  // Arrow function parentheses
  arrowParens?: boolean // true (always) | false (avoid)

  // Brace style
  braceStyle?: '1tbs' | 'stroustrup' | 'allman'

  // Object bracket spacing
  bracketSpacing?: boolean

  // Indentation
  indent?: 'tab' | number

  // JSX quotes
  jsxQuotes?: 'prefer-double' | 'prefer-single'

  // Quote props
  quoteProps?: 'always' | 'as-needed' | 'consistent' | 'consistent-as-needed'

  // Quotes
  quotes?: 'single' | 'double'

  // Semicolons
  semi?: boolean

  // Trailing commas
  trailingComma?: 'none' | 'always' | 'never' | 'only-multiline' | 'always-multiline'
}
```

### Prettier Options

```typescript
interface PrettierOptions {
  // Print width
  printWidth?: number

  // Use semicolons
  semi?: boolean

  // Use single quotes
  singleQuote?: boolean

  // Tab width
  tabWidth?: number

  // Trailing commas
  trailingComma?: 'none' | 'es5' | 'all'

  // Use tabs
  useTabs?: boolean

  // ... other Prettier options
}
```

## Individual Config Exports

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

Each export is a function that returns `TypedFlatConfigItem[]`.

### Example

```typescript
import {
  javascript,
  typescript,
  vue,
} from '@eslint-sets/eslint-config'

export default [
  ...javascript(),
  ...typescript(),
  ...vue({
    vueVersion: 3,
  }),
  {
    name: 'custom-rules',
    rules: {
      'no-console': 'warn',
    },
  },
]
```

## Type Exports

```typescript
import type {
  TypedFlatConfigItem,
  Rules,
  RuleOptions,
  ConfigNames,
  ConfigOptions,
  TypeScriptOptions,
  VueOptions,
  ReactOptions,
  StylisticOptions,
  PrettierOptions,
  // ... other option types
} from '@eslint-sets/eslint-config'
```

## Config Names

Each config has a unique name for identification:

```typescript
type ConfigNames =
  | 'eslint-sets/javascript'
  | 'eslint-sets/typescript'
  | 'eslint-sets/vue'
  | 'eslint-sets/react'
  | 'eslint-sets/svelte'
  | 'eslint-sets/solid'
  | 'eslint-sets/jsonc'
  | 'eslint-sets/yaml'
  | 'eslint-sets/markdown'
  | 'eslint-sets/toml'
  | 'eslint-sets/imports'
  | 'eslint-sets/unicorn'
  | 'eslint-sets/perfectionist'
  | 'eslint-sets/regexp'
  | 'eslint-sets/test'
  | 'eslint-sets/node'
  | 'eslint-sets/prettier'
  | 'eslint-sets/stylistic'
  | 'eslint-sets/disables'
  | 'eslint-sets/command'
  | 'eslint-sets/comments'
  | 'eslint-sets/jsdoc'
  | 'eslint-sets/jsx'
  | 'eslint-sets/nextjs'
  | 'eslint-sets/nuxt'
  | 'eslint-sets/astro'
  | 'eslint-sets/angular'
  | 'eslint-sets/unocss'
  | 'eslint-sets/pnpm'
  | 'eslint-sets/formatters'
  | 'eslint-sets/sort-package-json'
  | 'eslint-sets/sort-tsconfig'
```

## Utility Functions

### `compose(...configs)`

Compose multiple configs:

```typescript
import { compose, javascript, typescript } from '@eslint-sets/eslint-config'

export default compose(
  javascript(),
  typescript(),
  {
    name: 'custom',
    rules: { 'no-console': 'off' },
  },
)
```

## Next Steps

- [Options Reference](/api/options) - Detailed options documentation
