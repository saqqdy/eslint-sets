# React + ESLint Sets Example

This example demonstrates how to use `@eslint-sets/eslint-config` with a React project.

## Features

- React 19 with hooks
- TypeScript support
- Custom hooks
- Component examples

## Project Structure

```
src/
├── components/
│   ├── CounterDisplay.tsx    # Counter component
│   └── UserCard.tsx          # User card with callbacks
├── hooks/
│   ├── useCounter.ts         # Counter logic hook
│   └── useLocalStorage.ts    # LocalStorage persistence
├── utils/
│   └── helpers.ts            # Utility functions
├── App.tsx                   # Main app component
├── main.tsx                  # App entry point
└── env.d.ts                  # Type declarations
```

## ESLint Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  react: true,
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

```tsx
export function CounterDisplay({
  initialValue = 0,
  max = 10,
  min = 0,
}: CounterDisplayProps) {
  const { count, decrement, increment, isMax, isMin, reset } = useCounter({
    initialValue,
    max,
    min,
    step: 1,
  })
  // ...
}
```

### UserCard

```tsx
export function UserCard({
  user,
  showEmail = false,
  onSelect,
  onDelete,
}: UserCardProps) {
  // ...
}
```

## Custom Hooks

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
const [theme, setTheme] = useLocalStorage('theme', 'light')
// Automatically syncs with localStorage
```
