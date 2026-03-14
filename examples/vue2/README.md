# Vue 2 + ESLint Sets Example

This example demonstrates how to use `@eslint-sets/eslint-config` with a Vue 2 project.

## Features

- Vue 2.7 with Options API
- TypeScript support
- Vite + Vue 2 plugin
- Classic Vue 2 patterns

## Project Structure

```
src/
├── components/
│   └── Counter.vue           # Counter component
├── App.vue                   # Main app component
├── main.ts                   # App entry point
└── env.d.ts                  # Type declarations
```

## ESLint Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: { vueVersion: 2 },
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

## Component Example

```vue
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Counter',
  data() {
    return {
      count: 0,
      max: 10,
      min: 0,
    }
  },
  methods: {
    increment(): void {
      if (this.count < this.max) {
        this.count++
      }
    },
    decrement(): void {
      if (this.count > this.min) {
        this.count--
      }
    },
    reset(): void {
      this.count = this.min
    },
  },
})
</script>
```

## Notes

- Vue 2.7 is the final release of Vue 2
- Uses `Vue.extend()` for TypeScript support
- Compatible with Vite via `@vitejs/plugin-vue2`
