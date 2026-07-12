# React Configuration

Complete guide for configuring ESLint in React projects.

## Installation

```bash
pnpm add -D @eslint-sets/eslint-config eslint
pnpm add -D react react-dom
```

## Basic Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  react: true,
})
```

## React Options

```typescript
export default eslintConfig({
  react: {
    // Enable React Compiler support
    reactCompiler: false,

    // React Server Components rules
    rsc: true,

    // Enable stylistic rules for React files
    stylistic: true,
  },
})
```

### React Compiler

Enable rules for React Compiler compatibility:

```typescript
export default eslintConfig({
  react: {
    reactCompiler: true,
  },
})
```

This enables rules from `eslint-plugin-react-compiler` to ensure your code is compatible with React Compiler optimizations.

### React Server Components

Control RSC-specific rules:

```typescript
export default eslintConfig({
  react: {
    rsc: true, // Default: true
  },
})
```

This configures rules for:
- Proper use of `'use client'` and `'use server'` directives
- Server component best practices
- Client component patterns

## Full Examples

### React + TypeScript + Vite

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  type: 'app',
  typescript: true,
  react: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  gitignore: true,
})
```

### React Library

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  type: 'lib',
  typescript: {
    typeAware: true,
  },
  react: true,
  sortPackageJson: true,
})
```

### React + Prettier

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  react: true,
  prettier: {
    semi: false,
    singleQuote: true,
  },
  stylistic: false,
})
```

## Next.js Integration

For Next.js projects:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  react: true,
  nextjs: true,
})
```

See [Next.js Configuration](/configs/) for details.

## Included Plugins

The React config includes:

- `@eslint-react/eslint-plugin`: Modern React linting
  - Core React rules
  - DOM rules
  - Web API rules
  - Hooks extra rules
  - Naming convention rules
- `eslint-plugin-react-refresh`: React Refresh support
- `eslint-plugin-react-hooks`: Hooks rules (via react plugin)

## Hooks Rules

Automatic hooks validation:

```typescript
// Rules enabled by default:
// - react-hooks/rules-of-hooks
// - react-hooks/exhaustive-deps
```

## React Refresh

Automatic React Refresh support for Vite projects.

## Common Rules

Example rule overrides:

```typescript
export default eslintConfig({
  react: true,
  rules: {
    // Allow any component in JSX
    'react/jsx-no-undef': 'off',

    // Require props to be alphabetically sorted
    'react/jsx-sort-props': ['warn', {
      callbacksLast: true,
      shorthandFirst: true,
    }],

    // Enforce function components
    'react/function-component-definition': ['error', {
      namedComponents: 'function-declaration',
    }],
  },
})
```

## Accessibility

Enable JSX accessibility rules:

```typescript
export default eslintConfig({
  jsx: {
    a11y: true,
  },
  react: true,
})
```

This enables rules from `eslint-plugin-jsx-a11y`:

- `jsx-a11y/alt-text`
- `jsx-a11y/aria-props`
- `jsx-a11y/aria-role`
- And more...

## File Support

The React config supports:

- `.jsx` and `.tsx` files
- React hooks
- React.memo and React.forwardRef
- Server components
- Client components

## TypeScript Integration

For TypeScript + React:

```typescript
export default eslintConfig({
  typescript: true,
  react: true,
})
```

This automatically:
- Configures JSX parser
- Enables TypeScript-specific React rules
- Supports `*.tsx` files

## VS Code Integration

Add to `.vscode/settings.json`:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## Troubleshooting

### Hooks Not Detected

If hooks rules don't work:

1. Ensure `react` is in dependencies
2. Check file extension (`.jsx` or `.tsx`)
3. Verify React version >= 16.8

### TypeScript JSX Errors

For TypeScript JSX issues:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

## Related Documentation

- [Next.js Configuration](/configs/)
- [TypeScript Configuration](/configs/)
- [JSX Accessibility](/configs/#accessibility)