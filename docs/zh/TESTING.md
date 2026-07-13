# 测试指南

## 概述

本项目包含多个层级的全面测试：

- **单元测试** - 单个配置测试
- **集成测试** - 完整配置解析
- **E2E 测试** - 真实项目场景
- **Monorepo 测试** - 工作空间配置
- **性能测试** - Linting 基准测试

## 快速开始

```bash
# 运行所有测试
pnpm test

# 运行特定测试文件
pnpm test examples-validation

# 运行覆盖率测试
pnpm test:coverage

# 验证示例项目
pnpm validate:examples
```

## 测试结构

```
test/
├── utils/                      # 测试工具
│   ├── monorepo-helper.ts     # Monorepo 测试助手
│   └── utils.ts               # 通用测试工具
├── e2e/                        # E2E 测试
│   ├── framework.ts           # E2E 框架
│   └── scenarios/             # 测试场景
├── monorepo-basic.test.ts     # Monorepo 测试
├── examples-validation.test.ts # 示例验证
├── config-conflicts.test.ts   # 配置冲突检测
├── performance.test.ts        # 性能基准测试
└── language-options.test.ts   # languageOptions 测试
```

## Monorepo 测试

### 支持的工具

- **pnpm-workspace** - 完整支持 workspace 协议
- **Turborepo** - Pipeline 配置
- **NX** - 项目边界

### 示例

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

## E2E 测试

### 创建场景

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

### 运行 E2E 测试

```bash
pnpm test e2e
```

## 性能基准测试

### 阈值

| 项目规模 | 最大时间 | 最大内存 |
|---------|---------|---------|
| 小型（<50 文件） | 2s | 100MB |
| 中型（50-200 文件） | 5s | 200MB |
| 大型（>200 文件） | 10s | 500MB |
| Monorepo（多包） | 15s | 800MB |

### 运行基准测试

```bash
pnpm test performance
```

## 覆盖率目标

- **总体**: >90%
- **关键路径**: 100%
- **新功能**: 100%

## CI 集成

测试会在以下情况自动运行：
- 推送到 `master` 或 `dev` 分支
- 向 `master` 提交的 Pull Request
- `examples/` 或 `src/` 目录发生变化

配置详见 `.github/workflows/examples.yml`。

## 测试工具 (v6.5.0)

### 测试覆盖率报告

为所有框架生成全面的覆盖率分析：

```bash
# 生成覆盖率报告
pnpm tsx scripts/coverage-report.ts

# 输出: coverage-report.json 和 coverage-report.md
```

**功能特性**:
- 框架覆盖率矩阵
- 缺失场景检测
- 改进建议
- JSON 和 Markdown 格式

### 性能基准测试

内置性能测试确保最佳的 linting 速度：

```bash
# 运行性能测试
pnpm test test/performance.test.ts
```

**基准测试内容**:
- 配置生成性能
- TypeScript/Vue/React linting 性能
- 内存效率测试
- 大型代码文件处理

### 规则更新检测

自动检测已废弃的 ESLint 规则：

```bash
# 运行规则更新检测
pnpm test test/rule-updates.test.ts
```

**功能特性**:
- 已废弃规则检测
- 迁移路径建议
- 插件版本兼容性检查
- 规则配置验证