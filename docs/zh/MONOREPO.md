# Monorepo 指南

## 概述

`@eslint-sets/eslint-config` 为 monorepo 项目提供一流支持。

## 支持的工具

### pnpm-workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

**功能特性**:
- Workspace 协议支持 (`workspace:*`)
- 路径别名解析
- 跨包导入

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

**功能特性**:
- Pipeline 集成
- 任务依赖
- 缓存支持

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

**功能特性**:
- 项目图
- 受影响项目
- 任务编排

## 配置

### 根配置

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: true,
  // 所有包共享的配置
})
```

### 包级配置

```typescript
// packages/ui-lib/eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  projectType: 'lib', // 库使用不同的规则
})
```

## 路径别名

### TypeScript 配置

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

### 导入示例

```typescript
// ✅ 正确工作
import { Button } from '@company/ui-lib'
import { formatDate } from '@company/shared'

// ✅ 也可以
import { helper } from '../../packages/shared/src/helper'
```

## 最佳实践

### 1. 共享配置

为所有包创建基础配置：

```typescript
// eslint.base.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export const baseConfig = eslintConfig({
  typescript: true,
  // 通用设置
})
```

### 2. 包级覆盖

```typescript
// apps/web-app/eslint.config.ts
import { baseConfig } from '../../eslint.base.config'

export default [
  ...baseConfig,
  {
    name: 'web-app-overrides',
    rules: {
      // 应用特定的规则
    },
  },
]
```

### 3. Monorepo 结构

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

## 示例


## 故障排查

### 路径别名不工作

确保 `tsconfig.json` 有正确的 `paths` 配置：

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

### 跨包导入

对于 workspace 导入，确保：

1. `package.json` 中有正确的 `workspace:*` 版本
2. 导入前包已构建
3. ESLint 配置包含两个包

## 性能建议

1. **共享配置**: 使用基础配置避免重复
2. **增量**: 仅对受影响项目使用 Turborepo/NX
3. **缓存**: 在 CI 中启用 ESLint 缓存