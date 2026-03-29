# Astro + ESLint Sets Example

This example demonstrates how to use `@eslint-sets/eslint-config` with an Astro project.

## Features

- Astro 5
- TypeScript support
- Client-side scripts
- Component examples

## Project Structure

```
src/
├── components/
│   └── Counter.astro         # Counter component
├── pages/
│   └── index.astro           # Home page
├── utils/
│   └── helpers.ts            # Utility functions
└── env.d.ts                  # Type declarations
```

## ESLint Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  astro: true,
  typescript: true,
})
```

## Scripts

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run lint
pnpm lint

# Run lint with auto-fix
pnpm lint:fix

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Component Example

```astro
---
// Frontmatter (server-side)
const { initialValue = 0, max = 10, min = 0 } = Astro.props
---

<div class="counter" data-initial={initialValue} data-max={max} data-min={min}>
  <h2>Counter Example</h2>
  <p class="count-value">{initialValue}</p>
  <button class="btn-decrement">-</button>
  <button class="btn-reset">Reset</button>
  <button class="btn-increment">+</button>
</div>

<script>
  // Client-side script
  function initCounter(counter: HTMLElement) {
    // ...
  }

  document.querySelectorAll('.counter').forEach(el => {
    initCounter(el as HTMLElement)
  })
</script>

<style>
  .counter {
    /* Styles here */
  }
</style>
```

## Notes

- Frontmatter code runs on the server
- `<script>` tags run on the client
- Styles are scoped by default
- ESLint validates both server and client code
