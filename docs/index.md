---
layout: home

hero:
  name: '@eslint-sets/eslint-config'
  text: Modern ESLint Flat Config
  tagline: Modern ESLint config with flat config support for Vue, React, Svelte, TypeScript, Next.js, Nuxt, Astro, Angular, UnoCSS and more
  image:
    src: /logo.svg
    alt: '@eslint-sets/eslint-config'
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/saqqdy/eslint-sets

features:
  - icon: 🚀
    title: ESLint v9 Flat Config
    details: Uses the modern flat config format with full TypeScript support
  - icon: 🎨
    title: '@stylistic Integration'
    details: Default formatting with @stylistic/eslint-plugin - no Prettier needed
  - icon: 📦
    title: Auto-detection
    details: Automatically detects installed frameworks and enables appropriate rules
  - icon: 🔧
    title: Highly Configurable
    details: Fine-grained control over enabled features and rule configurations
  - icon: ♿
    title: Accessibility
    details: Optional a11y rules for Vue and React applications
  - icon: 📝
    title: Auto-sort
    details: Automatically sort package.json and tsconfig.json files
  - icon: 🔍
    title: Config Inspector
    details: Visual tool for inspecting and debugging your ESLint config
  - icon: 🖥️
    title: CLI Tool
    details: Interactive CLI for easy project setup and configuration
  - icon: 📚
    title: TypeScript First
    details: Full TypeScript support with auto-generated types for all rules
---

## Quick Start

### Using CLI (Recommended)

```bash
# use pnpm
pnpm dlx @eslint-sets/eslint-config

# use npm
npx @eslint-sets/eslint-config

# use bun
bunx @eslint-sets/eslint-config
```

### Manual Setup

```bash
# Install
pnpm install -D @eslint-sets/eslint-config eslint

# Create config file
```

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

## Supported Frameworks

| Framework  | Auto-detect | Notes                                           |
| ---------- | :---------: | ----------------------------------------------- |
| TypeScript |     ✅      | Default enabled                                 |
| Vue        |     ✅      | Vue 2 & 3 support, with a11y option             |
| React      |     ✅      | With hooks, refresh, and React Compiler support |
| Svelte     |     ✅      | Svelte 5 runes support                          |
| Solid      |     ✅      | SolidJS support                                 |
| Next.js    |     ✅      | Requires @next/eslint-plugin-next               |
| Nuxt       |     ✅      | Nuxt 3 support                                  |
| Astro      |     ✅      | Requires eslint-plugin-astro                    |
| Angular    |     ✅      | Requires @angular-eslint/eslint-plugin          |
| UnoCSS     |     ✅      | Requires @unocss/eslint-plugin                  |

## Why @eslint-sets/eslint-config?

- **Modern Architecture**: Built for ESLint v9 flat config with ESM-only design
- **Zero Configuration**: Works out of the box with sensible defaults
- **Framework Detection**: Automatically enables rules based on your dependencies
- **Flexible**: Override any defaults or disable features you don't need
- **Well Typed**: Full TypeScript support with auto-generated rule types
- **Active Development**: Regular updates and new feature additions

## Requirements

- **Node.js**: `^18.18.0` or `^20.9.0` or `>=21.1.0`
- **ESLint**: `^9.10.0` or `^9.22.0`
- **Config file**: Must use ESM format (`eslint.config.ts` or `eslint.config.mjs`)
