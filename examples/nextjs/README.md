# Next.js + ESLint Sets Example

This example demonstrates how to use `@eslint-sets/eslint-config` with a Next.js project.

## Features

- Next.js 15 with App Router
- React 19
- TypeScript support
- Client components
- Custom hooks

## Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   └── CounterDisplay.tsx    # Counter component
├── hooks/
│   └── useCounter.ts         # Counter hook
├── lib/
│   └── utils/
│       └── helpers.ts        # Utility functions
└── env.d.ts                  # Type declarations
```

## ESLint Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  nextjs: true,
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

# Start production server
pnpm start
```

## App Router

### Layout

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next.js Example',
  description: 'ESLint Sets Example for Next.js',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Client Component

```tsx
'use client'

import { useCounter } from '../hooks/useCounter'

export function CounterDisplay() {
  const { count, decrement, increment, isMax, isMin, reset } = useCounter({
    initialValue: 0,
    max: 10,
    min: 0,
    step: 1,
  })
  // ...
}
```

## Notes

- Use `'use client'` directive for client-side components
- Layout and page components are server components by default
- ESLint validates both server and client components
