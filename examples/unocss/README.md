# UnoCSS + ESLint Sets Example

This example demonstrates how to use `@eslint-sets/eslint-config` with a Vue 3 + UnoCSS project.

## Features

- Vue 3 with Composition API
- UnoCSS for utility-first styling
- TypeScript support
- Component examples

## Project Structure

```
src/
├── components/
│   └── CounterDisplay.vue    # Counter with UnoCSS classes
├── composables/
│   └── useCounter.ts         # Counter composable
├── utils/
│   └── helpers.ts            # Utility functions
├── App.vue                   # Main app component
├── main.ts                   # App entry point
├── env.d.ts                  # Type declarations
└── uno.config.ts             # UnoCSS configuration
```

## ESLint Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  unocss: true,
  vue: true,
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
```

## UnoCSS Classes

This example uses UnoCSS utility classes:

```vue
<template>
  <div class="text-center p-5 border-2 border-blue-500 rounded-xl max-w-75 mx-auto my-5">
    <h2 class="text-xl font-bold mb-4">Counter Example</h2>
    <p class="text-5xl font-bold text-blue-500 mb-4">{{ count }}</p>
    <div class="flex justify-center gap-3 mb-4">
      <button class="px-6 py-3 text-lg border-none rounded-lg cursor-pointer bg-blue-500 text-white">
        -
      </button>
      <button class="px-6 py-3 text-lg border-none rounded-lg cursor-pointer bg-blue-500 text-white">
        Reset
      </button>
      <button class="px-6 py-3 text-lg border-none rounded-lg cursor-pointer bg-blue-500 text-white">
        +
      </button>
    </div>
  </div>
</template>
```

## Common UnoCSS Classes

| Class | Description |
|-------|-------------|
| `text-center` | Center text |
| `p-5` | Padding 1.25rem |
| `border-2` | 2px border |
| `rounded-xl` | Extra large border radius |
| `flex` | Display flex |
| `gap-3` | Gap 0.75rem |
| `bg-blue-500` | Blue background |
| `text-white` | White text color |

## Notes

- UnoCSS provides Tailwind CSS-compatible utilities
- Classes are generated on-demand
- ESLint validates class ordering and best practices
- Works seamlessly with Vue 3
