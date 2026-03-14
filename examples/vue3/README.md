# Vue 3 + ESLint Sets Example

This example demonstrates how to use `@eslint-sets/eslint-config` with a Vue 3 project.

## Features

- Vue 3 with Composition API
- TypeScript support
- `<script setup>` syntax
- Custom composables
- Component examples

## Project Structure

```
src/
├── components/
│   ├── CounterDisplay.vue    # Counter component with bounds
│   └── UserCard.vue          # User card with events
├── composables/
│   ├── useCounter.ts         # Counter logic hook
│   └── useLocalStorage.ts    # LocalStorage persistence
├── utils/
│   └── helpers.ts            # Utility functions
├── App.vue                   # Main app component
├── main.ts                   # App entry point
└── env.d.ts                  # Type declarations
```

## ESLint Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: { vueVersion: 3 },
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

## Components

### CounterDisplay

A counter component with min/max bounds:

```vue
<script setup lang="ts">
import { useCounter } from '../composables/useCounter'

const { count, increment, decrement, reset, isMin, isMax } = useCounter({
  initialValue: 0,
  min: 0,
  max: 10,
  step: 1,
})
</script>
```

### UserCard

A user card component with event emission:

```vue
<script setup lang="ts">
import type { User } from '../utils/helpers'

const props = defineProps<{
  user: User
  showEmail?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', user: User): void
  (e: 'delete', userId: number): void
}>()
</script>
```

## Composables

### useCounter

```typescript
const { count, increment, decrement, reset, setCount, isMin, isMax } = useCounter({
  initialValue: 0,
  min: 0,
  max: 100,
  step: 1,
})
```

### useLocalStorage

```typescript
const theme = useLocalStorage('theme', 'light')
// Automatically syncs with localStorage
```
