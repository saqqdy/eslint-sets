# Examples

This directory contains example projects demonstrating how to use `@eslint-sets/eslint-config` with different frameworks.

## Quick Start

### StackBlitz (Online)

Click the links below to open examples in StackBlitz:

| Example | StackBlitz |
| ------- | ---------- |
| Vue 3 | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/vue3) |
| Vue 2 | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/vue2) |
| React | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/react) |
| TypeScript | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/typescript) |
| Svelte | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/svelte) |
| Next.js | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/nextjs) |
| Nuxt | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/nuxt) |
| Astro | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/astro) |
| Angular | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/angular) |
| UnoCSS | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/unocss) |

### Local Development

```bash
# Clone the repository
git clone https://github.com/saqqdy/eslint-sets.git
cd eslint-sets/examples/vue3  # or any other example

# Install dependencies
pnpm install

# Run lint
pnpm lint

# Run lint with auto-fix
pnpm lint:fix

# Start dev server
pnpm dev
```

## Example Projects

### Vue 3 (`examples/vue3`)

Vue 3 project with TypeScript support, featuring:
- Composition API with `<script setup>`
- Custom composables (`useCounter`, `useLocalStorage`)
- Utility functions with full type support
- Component examples (`UserCard`, `CounterDisplay`)

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: { vueVersion: 3 },
  typescript: true,
})
```

### Vue 2 (`examples/vue2`)

Vue 2.7 project with TypeScript support, featuring:
- Options API with `Vue.extend()`
- Vite + Vue 2 plugin
- Classic Vue 2 patterns

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: { vueVersion: 2 },
  typescript: true,
})
```

### React (`examples/react`)

React project with TypeScript support, featuring:
- Function components with hooks
- Custom hooks (`useCounter`, `useLocalStorage`)
- Utility functions
- Component examples (`UserCard`, `CounterDisplay`)

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  react: true,
  typescript: true,
})
```

### TypeScript (`examples/typescript`)

Pure TypeScript project with:
- Utility functions (`helpers.ts`)
- Collection classes (`LinkedList`, `Queue`, `Stack`)
- Async utilities (`AsyncTaskQueue`, `retry`, `timeout`)

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
})
```

### Svelte (`examples/svelte`)

Svelte 5 project with TypeScript support, featuring:
- Svelte 5 runes API (`$state`, `$derived`, `$effect`, `$props`)
- Modern component patterns
- Store examples
- Counter and UserCard components

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  svelte: true,
  typescript: true,
})
```

### Next.js (`examples/nextjs`)

Next.js 15 project with App Router, featuring:
- App Router with `layout.tsx` and `page.tsx`
- Client components with `'use client'`
- Custom hooks
- Counter component

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  nextjs: true,
  react: true,
  typescript: true,
})
```

### Nuxt (`examples/nuxt`)

Nuxt 3 project with Vue 3, featuring:
- Auto-imports
- Composables
- Component examples

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  nuxt: true,
  vue: true,
  typescript: true,
})
```

### Astro (`examples/astro`)

Astro project with TypeScript support, featuring:
- Astro components
- Client-side scripts
- Counter component

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  astro: true,
  typescript: true,
})
```

### Angular (`examples/angular`)

Angular 19 project with standalone components, featuring:
- Standalone components
- Services with dependency injection
- Signals for reactive state
- Counter and UserCard components

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  angular: true,
  typescript: true,
})
```

### UnoCSS (`examples/unocss`)

Vue 3 project with UnoCSS integration, featuring:
- UnoCSS utility classes
- Vue 3 Composition API
- Counter component with utility-first styling

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  unocss: true,
  vue: true,
  typescript: true,
})
```

## Creating Your Own Project

Use the CLI to quickly set up a new project:

```bash
# Interactive setup
pnpm dlx @eslint-sets/eslint-config

# Or manually
npm install -D @eslint-sets/eslint-config eslint
```

Then create `eslint.config.ts`:

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  // Your configuration options
})
```

## Common Patterns

### Counter Component

Most examples include a counter component demonstrating:
- State management
- Event handling
- Conditional rendering
- Styling

### User Card Component

Framework-specific implementations showing:
- Props/properties
- Event emission
- Conditional rendering
- Type safety

### Custom Hooks/Composables

Reusable logic patterns:
- `useCounter` - Counter logic with min/max bounds
- `useLocalStorage` - Persistent state with localStorage
