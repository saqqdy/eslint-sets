# Examples

This directory contains example projects demonstrating how to use `@eslint-sets/eslint-config` with different frameworks.

## Quick Start

### StackBlitz (Online)

Click the links below to open examples in StackBlitz:

| Example | StackBlitz |
| ------- | ---------- |
| Vue 3 | [Open](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/vue3) |
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

Basic Vue 3 project with TypeScript support.

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: { vueVersion: 3 },
  typescript: true,
})
```

### React (`examples/react`)

React project with TypeScript support.

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  react: true,
  typescript: true,
})
```

### TypeScript (`examples/typescript`)

Pure TypeScript project.

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
})
```

### Svelte (`examples/svelte`)

Svelte 5 project with TypeScript support.

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  svelte: true,
  typescript: true,
})
```

### Next.js (`examples/nextjs`)

Next.js 15 project with App Router.

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

Nuxt 3 project with Vue 3.

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

Astro project with TypeScript support.

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  astro: true,
  typescript: true,
})
```

### Angular (`examples/angular`)

Angular 19 project with standalone components.

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  angular: true,
  typescript: true,
})
```

### UnoCSS (`examples/unocss`)

Vue 3 project with UnoCSS integration.

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
