# Nuxt + ESLint Sets Example

This example demonstrates how to use `@eslint-sets/eslint-config` with a Nuxt project.

## Features

- Nuxt 3
- Vue 3 with Composition API
- TypeScript support
- Auto-imports
- Composables

## Project Structure

```
├── composables/
│   └── useCounter.ts         # Counter composable
├── components/
│   └── CounterDisplay.vue    # Counter component
├── utils/
│   └── helpers.ts            # Utility functions
├── app.vue                   # Main app component
├── nuxt.config.ts            # Nuxt configuration
└── tsconfig.json             # TypeScript config
```

## ESLint Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  nuxt: true,
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

# Generate static site
pnpm generate
```

## Composables

Nuxt auto-imports composables from the `composables/` directory:

```typescript
// composables/useCounter.ts
import { computed, type ComputedRef, ref, type Ref } from 'vue'

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { initialValue = 0, min = -Infinity, max = Infinity, step = 1 } = options

  const count = ref(initialValue)
  const isMin = computed(() => count.value <= min)
  const isMax = computed(() => count.value >= max)

  // ...
}
```

## Components

Components in `components/` are also auto-imported:

```vue
<!-- components/CounterDisplay.vue -->
<script setup lang="ts">
const { count, increment, decrement, reset, isMin, isMax } = useCounter({
  initialValue: 0,
  max: 10,
  min: 0,
})
</script>
```

## Notes

- Nuxt auto-imports composables and components
- No need for explicit imports in most cases
- ESLint handles auto-imported names correctly
