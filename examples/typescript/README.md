# TypeScript + ESLint Sets Example

This example demonstrates how to use `@eslint-sets/eslint-config` with a pure TypeScript project.

## Features

- Pure TypeScript
- Utility functions
- Collection classes
- Async utilities

## Project Structure

```
src/
├── utils/
│   ├── helpers.ts            # Utility functions
│   ├── collections.ts        # Collection classes
│   └── async.ts              # Async utilities
├── index.ts                  # Main entry point
└── env.d.ts                  # Type declarations
```

## ESLint Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
})
```

## Scripts

```bash
# Install dependencies
pnpm install

# Run lint
pnpm lint

# Run lint with auto-fix
pnpm lint:fix

# Type check
pnpm typecheck

# Build
pnpm build
```

## Utility Functions

### Helpers

```typescript
// User type
interface User {
  email: string
  id: number
  name: string
  role: 'admin' | 'user' | 'guest'
}

// Format date
function formatDate(date: Date): string

// Capitalize string
function capitalize(str: string): string

// Debounce function
function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void

// Group by key
function groupBy<T, K extends string | number | symbol>(
  items: T[],
  keyFn: (item: T) => K,
): Record<K, T[]>
```

### Collections

```typescript
// Linked List
class LinkedList<T> {
  append(value: T): void
  prepend(value: T): void
  remove(value: T): boolean
  find(predicate: (value: T) => boolean): T | undefined
  toArray(): T[]
}

// Queue
class Queue<T> {
  enqueue(item: T): void
  dequeue(): T | undefined
  peek(): T | undefined
}

// Stack
class Stack<T> {
  push(item: T): void
  pop(): T | undefined
  peek(): T | undefined
}
```

### Async Utilities

```typescript
// Retry with backoff
async function retry<T>(
  fn: () => Promise<T>,
  options: { maxAttempts?: number; delay?: number },
): Promise<T>

// Timeout wrapper
async function timeout<T>(promise: Promise<T>, ms: number): Promise<T>

// Async task queue
class AsyncTaskQueue<T = unknown> {
  add(task: () => Promise<T>): Promise<T>
}
```
