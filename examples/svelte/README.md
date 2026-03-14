# Svelte + ESLint Sets Example

This example demonstrates how to use `@eslint-sets/eslint-config` with a Svelte 5 project.

## Features

- Svelte 5 with runes API
- TypeScript support
- Modern component patterns
- Store examples

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── CounterDisplay.svelte  # Counter component
│   │   └── UserCard.svelte        # User card with callbacks
│   ├── stores/
│   │   ├── counter.ts             # Counter store
│   │   └── localStorage.ts        # LocalStorage store
│   └── utils/
│       └── helpers.ts             # Utility functions
├── App.svelte                 # Main app component
├── main.ts                    # App entry point
└── env.d.ts                   # Type declarations
```

## ESLint Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  svelte: true,
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

## Svelte 5 Runes

This example uses Svelte 5's new runes API:

### $state

```svelte
<script lang="ts">
  let count = $state(0)
</script>
```

### $derived

```svelte
<script lang="ts">
  let count = $state(0)
  let isMax = $derived(count >= 10)
</script>
```

### $props

```svelte
<script lang="ts">
  interface Props {
    initialValue?: number
    min?: number
    max?: number
  }

  let { initialValue = 0, min = 0, max = 10 }: Props = $props()
</script>
```

### $effect

```svelte
<script lang="ts">
  $effect(() => {
    console.log('Count changed:', count)
  })
</script>
```

## Component Example

```svelte
<script lang="ts">
  interface Props {
    initialValue?: number
    min?: number
    max?: number
  }

  let { initialValue = 0, min = 0, max = 10 }: Props = $props()

  let count = $state(0)

  $effect(() => {
    count = initialValue
  })

  let isMin = $derived(count <= min)
  let isMax = $derived(count >= max)

  function increment(): void {
    if (count + 1 <= max) count++
  }

  function decrement(): void {
    if (count - 1 >= min) count--
  }

  function reset(): void {
    count = min
  }
</script>
```

## Mounting Components

Svelte 5 uses `mount()` instead of `new Component()`:

```typescript
// main.ts
import { mount } from 'svelte'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})
```
