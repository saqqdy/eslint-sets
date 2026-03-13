# ESLint-Sets 与 antfu/eslint-config 对比

## 功能差异

| 功能 | eslint-sets | antfu/eslint-config |
|------|-------------|---------------------|
| **自动检测框架** | ✅ 支持 Vue/React/Svelte/Solid/TypeScript 自动检测 | ✅ 支持 |
| **TypeScript 类型感知规则** | ✅ 通过 `typeAware` 选项启用 | ✅ 支持 |
| **Git Ignore 支持** | ✅ 通过 `gitignore` 选项启用 | ✅ 支持 |
| **@stylistic 集成** | ✅ **默认启用** | ✅ 默认启用 |
| **Prettier 集成** | ✅ 可选（需显式启用） | ✅ 支持 (可选替代 stylistic) |
| **Solid.js 支持** | ✅ 支持 | ✅ 支持 |
| **TOML 支持** | ✅ 支持 | ✅ 支持 |
| **Command 配置** | ✅ 脚本文件特殊处理 | ✅ 支持 |
| **Disables 配置** | ✅ 配置文件规则放宽 | ✅ 支持 |
| **eslint-plugin-n** | ✅ Node.js 规则 | ✅ 支持 |
| **CLI 工具** | ❌ 未实现 | ✅ 有 CLI |
| **TypeGen** | ❌ 未实现 | ✅ 类型生成 |
| **单项规则导出** | ❌ 未实现 | ✅ 支持导出单个规则 |

## 默认配置对比

### 格式化方案

| 配置项 | eslint-sets | antfu/eslint-config |
|--------|-------------|---------------------|
| 默认格式化 | `@stylistic` | `@stylistic` |
| Prettier | 可选（需 `prettier: true`） | 可选 |

### Perfectionist 排序

| 配置项 | eslint-sets | antfu/eslint-config |
|--------|-------------|---------------------|
| 排序类型 | `natural` | `natural` |
| 排序顺序 | `asc` | `asc` |
| 导入分组 | ✅ 支持 | ✅ 支持 |
| newlinesBetween | `ignore` | `ignore` |

## 配置输出差异

### 1. JavaScript 配置

| 规则 | eslint-sets | antfu/eslint-config |
|------|-------------|---------------------|
| `no-console` | `['warn', { allow: ['warn', 'error'] }]` | `'warn'` |
| `no-debugger` | `'warn'` | `'error'` |
| `eqeqeq` | `['error', 'always']` | `'error'` |
| `curly` | `['error', 'all']` | `['error', 'all']` |

### 2. TypeScript 配置

| 规则 | eslint-sets | antfu/eslint-config |
|------|-------------|---------------------|
| 类型感知规则 | 通过 `typeAware` 启用约30条规则 | 默认启用 |
| `@typescript-eslint/consistent-type-imports` | `'error'` | `'error'` |
| `@typescript-eslint/no-explicit-any` | `'warn'` | `'warn'` |

### 3. Stylistic 配置

| 规则 | eslint-sets | antfu/eslint-config |
|------|-------------|---------------------|
| `indent` | `2` (空格) | `2` (空格) |
| `quotes` | `'single'` | `'single'` |
| `semi` | `false` | `false` |
| `comma-dangle` | `'always-multiline'` | `'all'` |

### 4. Vue 配置

| 规则 | eslint-sets | antfu/eslint-config |
|------|-------------|---------------------|
| 使用 flat/recommended | ✅ | ✅ |
| `vue/multi-word-component-names` | `'off'` | `'off'` |
| `vue/no-v-html` | `'off'` | `'off'` |

### 5. React 配置

| 规则 | eslint-sets | antfu/eslint-config |
|------|-------------|---------------------|
| `react/react-in-jsx-scope` | `'off'` | `'off'` |
| `react-hooks/rules-of-hooks` | `'error'` | `'error'` |
| `react-refresh/only-export-components` | `'warn'` | `'warn'` |

## 总结

### 已实现功能

eslint-sets 已经实现了与 antfu/eslint-config 大部分核心功能对齐：

- ✅ ESLint v9 Flat Config 架构
- ✅ 多框架支持 (Vue, React, Svelte, Solid)
- ✅ TypeScript 类型感知规则
- ✅ Git Ignore 集成
- ✅ **@stylistic 默认启用**（参考 antfu）
- ✅ **Perfectionist natural 排序**（参考 antfu）
- ✅ Prettier 可选集成
- ✅ Solid.js 和 TOML 支持
- ✅ Command/Disables 配置

### 待实现功能

- CLI 工具
- TypeGen 类型生成
- 单项规则导出功能

## 使用示例

### 基本使用（使用默认 @stylistic 格式化）

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	// Git ignore 支持
	gitignore: true,
	// 忽略文件
	ignores: ['**/dist/**', '**/node_modules/**'],
	// 自定义 perfectionist 选项
	perfectionist: {
		order: 'asc',
		type: 'natural', // 或 'line-length', 'alphabetical'
	},
	react: true,

	// 自定义规则覆盖
	rules: {
		'no-console': 'off',
	},

	solid: true,

	// 自定义 stylistic 选项
	stylistic: {
		indent: 2, // 或 'tab'
		quotes: 'single',
		semi: false,
	},

	svelte: true,

	// 测试文件支持
	test: true,

	// TypeScript 支持 (自动检测)
	typescript: {
		typeAware: true, // 启用类型感知规则
	},

	// 框架支持 (自动检测)
	vue: true,
})
```

### 使用 Prettier 替代 @stylistic

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	prettier: true,
	// 禁用 stylistic，启用 prettier
	stylistic: false,

	// 其他配置...
})
```

### 使用 Tab 缩进

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	stylistic: {
		indent: 'tab',
	},
})
```
