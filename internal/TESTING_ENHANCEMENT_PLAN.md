# ESLint Sets 测试增强详细开发计划

> 文档创建时间：2026-07-12
> 项目版本：v6.3.1
> 目标版本：v6.4.0, v6.5.0

## 📋 项目当前状态

### 基本信息
- **版本**: 6.3.1
- **测试覆盖**: 单元测试 + 集成测试 + 示例项目
- **缺失场景**: Monorepo、多框架混合、配置冲突、真实项目验证
- **发布流程**: bumpp → GitHub Release → npm publish

### 已有测试
- ✅ 单元测试：测试每个独立配置的正确性
- ✅ 集成测试：测试完整的配置文件解析能力
- ✅ 配置选项测试：测试各种配置组合
- ✅ 示例项目：10个框架的真实项目示例

### 缺失测试场景
- ❌ Monorepo 场景
- ❌ 多项目类型混合场景
- ❌ 配置继承和覆盖测试
- ❌ 真实项目端到端测试

---

## 🎯 三阶段开发计划

### 第一阶段：基础测试增强（预计 2 周）

#### Week 1：示例项目自动化验证

**目标**: 确保所有示例项目能正常运行 ESLint

**任务清单**:

```typescript
// 1. 创建示例项目验证脚本
// scripts/validate-examples.ts
- 为每个 examples/* 项目添加自动化验证
- 检查依赖安装、构建、lint 运行
- 生成验证报告
- 添加到 CI workflow

// 2. 创建示例项目测试用例
// test/examples-validation.test.ts
- 自动遍历所有示例项目
- 验证 ESLint 配置正确加载
- 检查无致命错误
- 报告 warnings/errors 数量

// 3. 添加示例项目 README 验证
- 检查每个示例项目的 README 是否正确
- 验证 StackBlitz 链接是否有效
- 确保安装步骤可执行
```

**产出物**:
- `scripts/validate-examples.ts`
- `test/examples-validation.test.ts`
- `.github/workflows/examples.yml`

---

#### Week 2：基础 Monorepo 测试 + 新功能测试

**目标**: 添加基本 monorepo 场景测试 + 测试新增的 `languageOptions` 功能

**任务清单**:

```typescript
// 1. 创建 monorepo 测试工具
// test/utils/monorepo-helper.ts
export interface MonorepoConfig {
  tool: 'pnpm-workspace' | 'turborepo' | 'nx'
  packages: Array<{
    name: string
    type: 'app' | 'lib'
    framework?: string
  }>
  dependencies: Record<string, string[]>
}

export async function createTempMonorepo(config: MonorepoConfig) {
  // 创建临时 monorepo 项目
  // 配置 workspace 文件
  // 创建子项目
  // 安装依赖
}

// 2. 添加基础 monorepo 测试
// test/monorepo-basic.test.ts
describe('Monorepo Basic Tests', () => {
  it('should handle pnpm-workspace with Vue apps', async () => {
    // apps/web-app + packages/shared
  })
  
  it('should handle turborepo config', async () => {
    // turbo.json lint task
  })
  
  it('should handle package dependencies', async () => {
    // workspace:* 引用
  })
})

// 3. 添加路径别名测试
// test/path-aliases.test.ts
describe('Path Aliases', () => {
  it('should resolve @company/ui-lib imports', async () => {
    // monorepo 内部包引用
  })
  
  it('should handle TypeScript path mappings', async () => {
    // tsconfig.json paths 配置
  })
})

// 4. 新增：languageOptions 功能测试
// test/language-options.test.ts
describe('Language Options', () => {
  it('should support custom languageOptions', async () => {
    // 测试自定义语言选项
    const config = await eslintConfig({
      languageOptions: {
        globals: { customGlobal: 'readonly' },
        parserOptions: {
          ecmaVersion: 2024,
        },
      },
    })
    
    // 验证配置正确合并
  })
  
  it('should merge languageOptions with base config', async () => {
    // 测试与基础配置的合并
    // 用户选项应覆盖基础配置
  })
  
  it('should work with different frameworks', async () => {
    // 测试在 Vue/React/TypeScript 项目中的兼容性
    const vueConfig = await eslintConfig({
      vue: true,
      languageOptions: {
        globals: { vueGlobal: 'readonly' },
      },
    })
    
    const reactConfig = await eslintConfig({
      react: true,
      languageOptions: {
        globals: { reactGlobal: 'readonly' },
      },
    })
  })
})
```

**产出物**:
- `test/utils/monorepo-helper.ts`
- `test/monorepo-basic.test.ts`
- `test/path-aliases.test.ts`

---

### 第二阶段：深度测试框架（预计 3 周）

#### Week 3-4：E2E 测试框架开发

**目标**: 创建完整的端到端测试框架

**任务清单**:

```typescript
// 1. 核心 E2E 测试框架
// test/e2e/framework.ts
export interface E2EProjectConfig {
  name: string
  framework: FrameworkType
  projectType: 'app' | 'lib'
  files: Record<string, string>
  configOptions?: ConfigOptions
  expectations: {
    errors: number
    warnings: number
    rules?: Record<string, RuleExpectation>
  }
}

export class E2ETestRunner {
  async createProject(config: E2EProjectConfig) { }
  async installDependencies() { }
  async runEslint() { }
  async verifyResults() { }
  async cleanup() { }
}

// 2. 预定义测试场景
// test/e2e/scenarios/index.ts
export const scenarios = {
  vue3Basic: {
    name: 'vue3-basic',
    files: {
      'src/App.vue': `<template>...</template>`,
      'src/main.ts': `import App from './App.vue'`,
    },
    expectations: { errors: 0, warnings: 0 }
  },
  
  vue3WithUnoCSS: {
    name: 'vue3-unocss',
    configOptions: { unocss: true },
    files: {
      'src/App.vue': `<div class="text-red">...</div>`,
    },
    expectations: { errors: 0 }
  },
  
  mixedVueReact: {
    name: 'mixed-frameworks',
    configOptions: { vue: true, react: true },
    // 测试配置兼容性
  }
}

// 3. 自动化场景运行器
// test/e2e/scenarios.test.ts
describe('E2E Scenarios', () => {
  for (const [key, scenario] of Object.entries(scenarios)) {
    it(`should pass ${key} scenario`, async () => {
      const runner = new E2ETestRunner(scenario)
      await runner.runFullTest()
    })
  }
})
```

**产出物**:
- `test/e2e/framework.ts`
- `test/e2e/scenarios/index.ts`
- `test/e2e/scenarios.test.ts`

---

#### Week 5：配置冲突和覆盖测试

**目标**: 检测和处理配置冲突场景

**任务清单**:

```typescript
// 1. 配置冲突检测
// test/config-conflicts.test.ts
describe('Config Conflicts', () => {
  it('should detect Vue + React rule conflicts', async () => {
    // vue/html-indent vs react/jsx-indent
  })
  
  it('should handle extends array priority', async () => {
    // 后面的配置覆盖前面的
  })
  
  it('should warn about incompatible combinations', async () => {
    // Vue + Angular 混用(不推荐)
  })
})

// 2. 文件类型覆盖测试
// test/file-overrides.test.ts
describe('File Type Overrides', () => {
  it('should apply Vue rules to .vue files only', async () => {
    // .vue 文件应用 vue 规则
    // .ts 文件不应应用 vue 规则
  })
  
  it('should handle mixed file types', async () => {
    // 项目包含 Vue + React + TypeScript
  })
})

// 3. 规则优先级测试
// test/rule-priority.test.ts
describe('Rule Priority', () => {
  it('should respect user overrides over defaults', async () => {
    // 用户自定义规则优先
  })
  
  it('should handle rule severity changes', async () => {
    // error → warn → off
  })
})
```

**产出物**:
- `test/config-conflicts.test.ts`
- `test/file-overrides.test.ts`
- `test/rule-priority.test.ts`

---

### 第三阶段：持续监控和优化（预计 2 周）

#### Week 6：测试覆盖率报告和性能基准

**目标**: 建立测试质量监控体系

**任务清单**:

```typescript
// 1. 测试覆盖率报告
// scripts/coverage-report.ts
- 分析每个配置的测试覆盖情况
- 生成覆盖率报告
- 识别缺失的测试场景

// 2. 性能基准测试
// test/performance.test.ts
describe('Performance Benchmarks', () => {
  it('should lint 100 files in reasonable time', async () => {
    // 性能基准测试
  })
  
  it('should handle large monorepo efficiently', async () => {
    // 100+ 包的 monorepo 性能
  })
})

// 3. 自动化规则更新检测
// test/rule-updates.test.ts
describe('Rule Updates', () => {
  it('should detect deprecated rules', async () => {
    // 检测插件规则变更
  })
  
  it('should suggest rule migrations', async () => {
    // 提供迁移建议
  })
})
```

**产出物**:
- `scripts/coverage-report.ts`
- `test/performance.test.ts`
- `test/rule-updates.test.ts`

---

#### Week 7：文档和示例完善

**目标**: 完善测试文档和使用示例

**任务清单**:

```markdown
// 1. 测试文档
// docs/TESTING.md
- 测试策略说明
- 如何运行各种测试
- 如何添加新测试场景
- 测试覆盖率解读

// 2. Monorepo 使用指南
// docs/MONOREPO.md
- 各种 monorepo 工具配置示例
- 常见问题和解决方案
- 最佳实践建议

// 3. 创建 monorepo 示例项目
// examples/monorepo-pnpm/
// examples/monorepo-turbo/
- 完整的真实 monorepo 示例
- 包含多框架混合场景
```

**产出物**:
- `docs/TESTING.md`
- `docs/MONOREPO.md`
- `examples/monorepo-pnpm/`
- `examples/monorepo-turbo/`

---

## 🚀 发版计划

### 版本发布策略

#### 6.4.0 - 测试增强版（预计 4 周后）

**发布内容**:

```markdown
### Added
- ✨ **Monorepo Testing Framework**: Comprehensive monorepo test scenarios
  - pnpm-workspace support
  - Turborepo integration
  - NX workspace support
  - Path alias resolution tests
  
- ✨ **E2E Testing Framework**: End-to-end project testing
  - Real project scenario runner
  - Automated validation for all examples
  - Performance benchmarks
  
- 📚 **Testing Documentation**: Complete testing guide
  - How to test your configurations
  - Monorepo best practices
  - Testing coverage reports

### Changed
- 🔧 **Example Projects**: Enhanced with automated validation
- 📖 **Documentation**: Added testing and monorepo guides
```

**发布时间**: 完成第一阶段和第二阶段后

---

#### 6.5.0 - 持续监控版（预计 7 周后）

**发布内容**:

```markdown
### Added
- 📊 **Test Coverage Reports**: Automated coverage analysis
  - Config coverage metrics
  - Framework coverage matrix
  - Missing scenario detection
  
- ⚡ **Performance Monitoring**: Lint performance benchmarks
  - Large monorepo benchmarks
  - Memory usage tracking
  - Optimization suggestions
  
- 🔍 **Rule Update Detection**: Automatic rule migration helper
  - Deprecated rule detection
  - Migration path suggestions
  - Plugin version compatibility

### Changed
- 🎯 **Testing Framework**: Enhanced with conflict detection
- 📚 **Documentation**: Performance tuning guide
```

**发布时间**: 完成第三阶段后

---

### 发布流程优化

#### 1. 自动化发布检查

```yaml
# .github/workflows/pre-release.yml
name: Pre-Release Checks
on:
  push:
    branches: [release/*]

jobs:
  comprehensive-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Full Test Suite
        run: |
          pnpm test:coverage
          pnpm test:e2e
          pnpm test:monorepo
          
      - name: Example Validation
        run: pnpm validate:examples
        
      - name: Performance Benchmark
        run: pnpm test:performance
        
      - name: Generate Reports
        run: |
          pnpm coverage:report
          pnpm benchmark:report
```

#### 2. 版本发布自动化

```typescript
// scripts/release.ts
interface ReleasePlan {
  version: string
  type: 'major' | 'minor' | 'patch'
  changes: {
    added?: string[]
    changed?: string[]
    fixed?: string[]
    breaking?: string[]
  }
  testingRequired: string[]
  releaseDate: Date
}

export async function executeRelease(plan: ReleasePlan) {
  // 1. 运行完整测试套件
  // 2. 更新版本号
  // 3. 更新 CHANGELOG
  // 4. 创建 Git tag
  // 5. 推送到 GitHub
  // 6. 创建 GitHub Release
  // 7. 自动发布到 npm
}
```

---

## 📊 里程碑和时间线

| 阶段 | 版本 | 时间 | 主要内容 | 状态 |
|------|------|------|----------|------|
| 阶段1-W1 | - | 1周 | 示例项目自动化验证 | 🟡 待开始 |
| 阶段1-W2 | - | 1周 | 基础 Monorepo 测试 | 🟡 待开始 |
| **里程碑1** | **6.4.0-alpha.1** | **2周** | **基础测试增强完成** | ⏳ |
| 阶段2-W3-4 | - | 2周 | E2E 测试框架 | 🟡 待开始 |
| 阶段2-W5 | - | 1周 | 配置冲突测试 | 🟡 待开始 |
| **里程碑2** | **6.4.0-beta.1** | **5周** | **深度测试框架完成** | ⏳ |
| 阶段3-W6 | - | 1周 | 覆盖率报告和性能 | 🟡 待开始 |
| 阶段3-W7 | - | 1周 | 文档和示例完善 | 🟡 待开始 |
| **里程碑3** | **6.4.0** | **7周** | **正式发布** | ⏳ |
| 持续优化 | 6.5.0 | 后续 | 持续监控和优化 | 🔄 |

---

## 📈 成功指标

### 测试质量指标
- ✅ **测试覆盖率**: 从当前 ~70% 提升到 >90%
- ✅ **Monorepo 场景覆盖**: 覆盖主流 monorepo 工具
- ✅ **示例项目验证**: 所有示例项目 100% 通过
- ✅ **性能基准**: 大型项目 lint 时间 <5s

### 发布质量指标
- ✅ **自动化程度**: 发布过程 100% 自动化
- ✅ **回归检测**: 发布前完整测试覆盖
- ✅ **文档完整性**: 测试文档覆盖率 100%
- ✅ **社区反馈**: Issue 解决时间 <48h

---

## 📝 技术细节补充

### Monorepo 测试架构

#### 临时项目创建工具

```typescript
// test/utils/temp-project.ts
import { mkdtemp, writeFile, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export class TempProject {
  private root: string
  
  async create(structure: Record<string, string>) {
    this.root = await mkdtemp(join(tmpdir(), 'eslint-test-'))
    
    for (const [filePath, content] of Object.entries(structure)) {
      const fullPath = join(this.root, filePath)
      await mkdir(join(fullPath, '..'), { recursive: true })
      await writeFile(fullPath, content, 'utf-8')
    }
    
    return this.root
  }
  
  async cleanup() {
    // 清理临时目录
  }
}
```

#### ESLint 执行器

```typescript
// test/utils/eslint-runner.ts
import { ESLint } from 'eslint'

export async function runEslintOnContent(
  config: any,
  content: string,
  filePath: string
): Promise<ESLint.LintResult[]> {
  const eslint = new ESLint({
    useEslintrc: false,
    overrideConfigFile: true,
    overrideConfig: config,
  })
  
  return await eslint.lintText(content, { filePath })
}
```

### 测试场景定义规范

```typescript
// test/types.ts
interface TestScenario {
  name: string
  description: string
  config: ConfigOptions
  files: FileStructure
  assertions: Assertion[]
}

interface FileStructure {
  [path: string]: {
    content: string
    language: 'typescript' | 'javascript' | 'vue' | 'react'
  }
}

interface Assertion {
  type: 'no-errors' | 'has-error' | 'has-warning' | 'rule-count'
  rule?: string
  expected?: any
}
```

### 性能测试基准

```typescript
// test/performance/benchmarks.ts
export const PERFORMANCE_THRESHOLDS = {
  // 小型项目 (< 50 文件)
  small: {
    maxTime: 2000, // 2秒
    maxMemory: 100, // 100MB
  },
  
  // 中型项目 (50-200 文件)
  medium: {
    maxTime: 5000, // 5秒
    maxMemory: 200, // 200MB
  },
  
  // 大型项目 (> 200 文件)
  large: {
    maxTime: 10000, // 10秒
    maxMemory: 500, // 500MB
  },
  
  // Monorepo (多包)
  monorepo: {
    maxTime: 15000, // 15秒
    maxMemory: 800, // 800MB
  }
}
```

---

## 🔗 相关资源

### 内部文档
- [项目 README](../README.md)
- [变更日志](../CHANGELOG.md)
- [贡献指南](../CONTRIBUTING.md)

### 外部参考
- [ESLint Testing Guide](https://eslint.org/docs/latest/extend/testers)
- [Vitest Documentation](https://vitest.dev/)
- [Monorepo Tools Comparison](https://monorepo.tools/)

---

## 📞 联系方式

- **项目维护者**: @saqqdy
- **GitHub Issues**: https://github.com/saqqdy/eslint-sets/issues
- **Pull Requests**: https://github.com/saqqdy/eslint-sets/pulls

---

**最后更新**: 2026-07-12