# Monorepo Guide

## Overview

`@eslint-sets/eslint-config` provides first-class support for monorepo projects.

## Supported Tools

### pnpm-workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

**Features**:
- Workspace protocol support (`workspace:*`)
- Path alias resolution
- Cross-package imports

### Turborepo

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "lint": {
      "outputs": []
    }
  }
}
```

**Features**:
- Pipeline integration
- Task dependencies
- Cache support

### NX

```json
{
  "targetDefaults": {
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
```

**Features**:
- Project graph
- Affected projects
- Task orchestration

## Configuration

### Root Config

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: true,
  // Shared config for all packages
})
```

### Package-specific Config

```typescript
// packages/ui-lib/eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  projectType: 'lib', // Different rules for libraries
})
```

## Path Aliases

### TypeScript Config

```json
{
  "compilerOptions": {
    "paths": {
      "@company/ui-lib": ["packages/ui-lib/src"],
      "@company/shared": ["packages/shared/src"]
    }
  }
}
```

### Import Examples

```typescript
// ✅ Works correctly
import { Button } from '@company/ui-lib'
import { formatDate } from '@company/shared'

// ✅ Also works
import { helper } from '../../packages/shared/src/helper'
```

## Best Practices

### 1. Shared Configuration

Create a base config for all packages:

```typescript
// eslint.base.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export const baseConfig = eslintConfig({
  typescript: true,
  // Common settings
})
```

### 2. Package-specific Overrides

```typescript
// apps/web-app/eslint.config.ts
import { baseConfig } from '../../eslint.base.config'

export default [
  ...baseConfig,
  {
    name: 'web-app-overrides',
    rules: {
      // App-specific rules
    },
  },
]
```

### 3. Monorepo Structure

```
monorepo/
├── apps/
│   ├── web-app/
│   │   └── eslint.config.ts
│   └── admin-app/
│       └── eslint.config.ts
├── packages/
│   ├── ui-lib/
│   │   └── eslint.config.ts
│   └── shared/
│       └── eslint.config.ts
└── eslint.base.config.ts
```

## Examples


## Troubleshooting

### Path Aliases Not Working

Ensure `tsconfig.json` has correct `paths` configuration:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Cross-package Imports

For workspace imports, ensure:

1. Correct `workspace:*` version in `package.json`
2. Package is built before importing
3. ESLint config includes both packages

## Performance Tips

1. **Shared Config**: Use base config to avoid duplication
2. **Incremental**: Use Turborepo/NX for affected projects only
3. **Caching**: Enable ESLint cache in CI
