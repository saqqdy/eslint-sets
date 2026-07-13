# Testing Guide

## Overview

This project has comprehensive testing across multiple levels:

- **Unit Tests** - Individual config tests
- **Integration Tests** - Complete config parsing
- **E2E Tests** - Real project scenarios
- **Monorepo Tests** - Workspace configurations
- **Performance Tests** - Linting benchmarks

## Quick Start

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test examples-validation

# Run with coverage
pnpm test:coverage

# Validate example projects
pnpm validate:examples
```

## Test Structure

```
test/
├── utils/                      # Test utilities
│   ├── monorepo-helper.ts     # Monorepo test helpers
│   └── utils.ts               # Common test utilities
├── e2e/                        # E2E tests
│   ├── framework.ts           # E2E framework
│   └── scenarios/             # Test scenarios
├── monorepo-basic.test.ts     # Monorepo tests
├── examples-validation.test.ts # Examples validation
├── config-conflicts.test.ts   # Config conflict detection
├── performance.test.ts        # Performance benchmarks
└── language-options.test.ts   # languageOptions tests
```

## Monorepo Testing

### Supported Tools

- **pnpm-workspace** - Full support with workspace protocol
- **Turborepo** - Pipeline configuration
- **NX** - Project boundaries

### Example

```typescript
import { TempMonorepo, createMonorepoConfig } from './utils/monorepo-helper'

const monorepo = new TempMonorepo()
const config = createMonorepoConfig({
  packages: [
    { name: 'shared-lib', type: 'lib' },
    { name: 'web-app', type: 'app', dependencies: ['shared-lib'] },
  ],
})
const root = await monorepo.create(config)
```

## E2E Testing

### Creating Scenarios

```typescript
// test/e2e/scenarios/index.ts
export const scenarios = {
  vue3Basic: {
    name: 'vue3-basic',
    framework: 'vue',
    configOptions: { vue: true, typescript: true },
    files: {
      'src/App.vue': '<template><div>{{ message }}</div></template>',
    },
  },
}
```

### Running E2E Tests

```bash
pnpm test e2e
```

## Performance Benchmarks

### Thresholds

| Project Size | Max Time | Max Memory |
|-------------|----------|------------|
| Small (<50 files) | 2s | 100MB |
| Medium (50-200 files) | 5s | 200MB |
| Large (>200 files) | 10s | 500MB |
| Monorepo (multi-package) | 15s | 800MB |

### Running Benchmarks

```bash
pnpm test performance
```

## Coverage Goals

- **Overall**: >90%
- **Critical paths**: 100%
- **New features**: 100%

## CI Integration

Tests run automatically on:
- Push to `master` or `dev` branches
- Pull requests to `master`
- Changes to `examples/` or `src/` directories

See `.github/workflows/examples.yml` for configuration.

## Testing Tools (v6.5.0)

### Test Coverage Reports

Generate comprehensive coverage analysis for all frameworks:

```bash
# Generate coverage report
pnpm tsx scripts/coverage-report.ts

# Output: coverage-report.json and coverage-report.md
```

**Features**:
- Framework coverage matrix
- Missing scenario detection
- Improvement recommendations
- JSON and Markdown formats

### Performance Benchmarks

Built-in performance tests ensure optimal linting speed:

```bash
# Run performance tests
pnpm test test/performance.test.ts
```

**Benchmarks**:
- Configuration generation performance
- TypeScript/Vue/React linting performance
- Memory efficiency tests
- Large code file handling

### Rule Update Detection

Automatically detect deprecated ESLint rules:

```bash
# Run rule update detection
pnpm test test/rule-updates.test.ts
```

**Features**:
- Deprecated rule detection
- Migration path suggestions
- Plugin version compatibility checking
- Rule configuration validation

