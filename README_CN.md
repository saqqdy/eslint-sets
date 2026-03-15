# @eslint-sets/eslint-config

[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]

[English](./README.md) | 简体中文

现代化的 ESLint 配置，支持 flat config 格式，适用于 Vue、React、Svelte、TypeScript、Next.js、Nuxt、Astro、Angular、UnoCSS 等框架。

## 快速体验

使用 StackBlitz 在线体验：

| 框架 | 链接 |
| ---- | ---- |
| Vue 3 | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/vue3) |
| Vue 2 | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/vue2) |
| React | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/react) |
| TypeScript | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/typescript) |
| Svelte | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/svelte) |
| Next.js | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/nextjs) |
| Nuxt | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/nuxt) |
| Astro | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/astro) |
| Angular | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/angular) |
| UnoCSS | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/saqqdy/eslint-sets/tree/master/examples/unocss) |

## 特性

- 🚀 **ESLint v9 Flat Config** - 使用现代化的 flat config 格式
- 🎨 **@stylistic 集成** - 默认使用 `@stylistic/eslint-plugin` 进行格式化（无需 Prettier）
- 📝 **TypeScript 类型生成** - 自动生成所有规则的类型，支持完整的 IntelliSense
- ✨ **Prettier 支持** - 可选的 Prettier 集成
- 📦 **自动检测** - 自动检测已安装的框架
- 🔧 **高度可配置** - 细粒度控制启用的功能
- 🙈 **Git Ignore 支持** - 自动读取 `.gitignore` 规则（默认开启）
- 🛠️ **禁用支持** - 自动在配置文件中禁用严格规则
- 🖥️ **命令行支持** - 放宽命令行脚本的规则
- 🏷️ **项目类型** - 支持 `app` 和 `lib` 项目类型
- ♿ **无障碍** - Vue 和 React 可选的 a11y 规则
- 📝 **自动排序** - 自动排序 package.json 和 tsconfig.json
- 🔍 **编辑器检测** - 自动检测编辑器环境
- 🔎 **配置检查器** - 可视化检查 ESLint 配置的工具
- 📊 **Perfectionist 排序** - 导入/导出排序，支持自然排序

## 支持的框架

| 框架       | 自动检测 | 说明                               |
| ---------- | :------: | ---------------------------------- |
| TypeScript |    ✅    | 默认启用                           |
| Vue        |    ✅    | 支持 Vue 2 和 3，可选 a11y         |
| React      |    ✅    | 支持 hooks、refresh 和 React Compiler |
| Svelte     |    ✅    |                                    |
| Solid      |    ✅    |                                    |
| Next.js    |    ✅    | 需要 `@next/eslint-plugin-next`    |
| Nuxt       |    ✅    |                                    |
| Astro      |    ✅    | 需要 `eslint-plugin-astro`         |
| Angular    |    ✅    | 需要 `@angular-eslint/eslint-plugin` |
| UnoCSS     |    ✅    | 需要 `@unocss/eslint-plugin`       |

## 安装

```shell
# 使用 pnpm
pnpm install -D @eslint-sets/eslint-config eslint

# 使用 npm
npm install -D @eslint-sets/eslint-config eslint

# 使用 bun
bun add -D @eslint-sets/eslint-config eslint
```

## 快速开始

### 使用 CLI（推荐）

运行交互式 CLI 来设置你的项目：

```shell
# 使用 pnpm
pnpm dlx @eslint-sets/eslint-config

# 使用 npm
npx @eslint-sets/eslint-config

# 使用 bun
bunx @eslint-sets/eslint-config
```

CLI 将引导你完成：

- 项目类型选择（应用/库）
- TypeScript 支持
- 框架选择（Vue、React、Svelte、Solid、Next.js、Nuxt、Astro、Angular、UnoCSS）
- 无障碍选项
- 格式化工具选择（Prettier/Stylistic）
- 其他选项（.gitignore、自动排序等）

### 手动设置

在项目根目录创建 `eslint.config.ts` 文件：

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

## 使用方法

### 配置选项

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	// Angular 支持（默认：'auto' - 自动检测）
	angular: true,

	// Astro 支持（默认：'auto' - 自动检测）
	astro: true,

	// 放宽脚本规则（默认：true）
	// 适用于：scripts/**, bin/**, cli/**, tasks/**, tools/**
	// 允许：console、process.exit、process.env、shebang、require 等
	command: true,
	// 在配置文件中禁用规则（默认：true）
	disables: true,

	// e18e 现代化规则（默认：false）
	e18e: true,
	// ESLint 注释规则（默认：true）
	eslintComments: true,

	// 外部格式化工具（默认：false）
	formatters: {
		css: 'prettier',
		graphql: 'prettier',
		html: 'prettier',
		markdown: 'prettier',
		svg: 'prettier',
		xml: 'prettier',
	},

	// 自动读取 .gitignore（默认：true）
	gitignore: true,

	// 忽略的文件
	ignores: ['**/dist/**', '**/node_modules/**'],

	// 或修改默认值：
	ignores: (defaults) => [...defaults, '**/custom/**'],

	// 导入规则（默认：true）
	imports: true,

	// JSON/JSONC 支持（默认：true）
	jsonc: true,

	// JSX 无障碍规则（默认：false）
	jsxA11y: true,

	// Markdown 支持（默认：true）
	markdown: true,

	// Next.js 支持（默认：'auto' - 自动检测）
	nextjs: true,
	// Node.js 规则（默认：true）
	node: true,

	// Nuxt 支持（默认：'auto' - 自动检测）
	nuxt: true,

	// Perfectionist 排序（默认：true）
	perfectionist: true,

	// pnpm 工作区支持（默认：false）
	pnpm: true,

	// Prettier 集成（默认：false）
	// 注意：必须设置 stylistic: false 才能使用 prettier
	prettier: false,

	// React 支持（默认：'auto' - 自动检测）
	react: true,

	// 或带选项：
	react: {
		reactCompiler: true, // React Compiler 支持
	},

	// 正则表达式规则（默认：true）
	regexp: true,

	// 自定义规则覆盖
	rules: {
		'no-console': 'off',
	},

	// Solid 支持（默认：'auto' - 自动检测）
	solid: true,

	// 自动排序 package.json（默认：true）
	sortPackageJson: true,

	// 自动排序 tsconfig.json（默认：true）
	sortTsconfig: true,

	// Stylistic 格式化（默认：true）
	// 使用 @stylistic/eslint-plugin 进行代码格式化
	stylistic: true,

	// 或带自定义选项：
	stylistic: {
		arrowParens: false, // true (always) | false (avoid) - 默认: false
		braceStyle: '1tbs', // '1tbs' | 'stroustrup' | 'allman' - 默认: '1tbs'
		bracketSpacing: true, // boolean - 默认: true
		indent: 2, // 'tab' | number - 默认: 2
		jsxQuotes: 'prefer-double', // 'prefer-double' | 'prefer-single' - 默认: 'prefer-double'
		quoteProps: 'as-needed', // 'always' | 'as-needed' | 'consistent' | 'consistent-as-needed' - 默认: 'as-needed'
		quotes: 'single', // 'single' | 'double' - 默认: 'single'
		semi: false, // boolean - 默认: false
		trailingComma: 'always-multiline', // 'none' | 'always' | 'never' | 'only-multiline' | 'always-multiline' - 默认: 'always-multiline'
	},

	// Svelte 支持（默认：'auto' - 自动检测）
	svelte: true,

	// 测试文件支持（默认：true）
	test: true,

	// 项目类型：'app'（默认）或 'lib'
	type: 'lib',

	// TypeScript 支持（默认：true）
	typescript: true,

	// Unicorn 规则（默认：true）
	unicorn: true,

	// UnoCSS 支持（默认：'auto' - 自动检测）
	unocss: true,

	// Vue 支持（默认：'auto' - 自动检测）
	vue: true,
	// 或带选项：
	vue: {
		a11y: true, // 启用无障碍规则
		vueVersion: 3,
	},

	// YAML 支持（默认：true）
	yaml: true,
})
```

### 项目类型

```typescript
// 应用项目（默认）
export default eslintConfig({
	type: 'app',
})

// 库项目 - 更严格的规则
export default eslintConfig({
	type: 'lib',
})
```

### Stylistic vs Prettier

此配置支持两种格式化方式：

1. **Stylistic**（默认）：使用 `@stylistic/eslint-plugin` 进行纯 ESLint 格式化 - 无需额外工具。
2. **Prettier**：使用 `eslint-plugin-prettier` 将 Prettier 与 ESLint 集成。

```typescript
// 使用 Stylistic（默认）
export default eslintConfig({
	stylistic: true, // 或直接使用默认值
})

// 使用 Stylistic 带自定义选项
export default eslintConfig({
	stylistic: {
		arrowParens: false, // true (always) | false (avoid)
		braceStyle: '1tbs', // '1tbs' | 'stroustrup' | 'allman'
		bracketSpacing: true, // boolean
		indent: 2, // 'tab' | number
		jsxQuotes: 'prefer-double', // 'prefer-double' | 'prefer-single'
		quoteProps: 'as-needed', // 'always' | 'as-needed' | 'consistent' | 'consistent-as-needed'
		quotes: 'single', // 'single' | 'double'
		semi: false, // boolean
		trailingComma: 'always-multiline', // 'none' | 'always' | 'never' | 'only-multiline' | 'always-multiline'
	},
})

// 使用 Prettier（必须禁用 stylistic）
export default eslintConfig({
	prettier: true,
	stylistic: false,
})

// 使用 Prettier 带自定义选项
export default eslintConfig({
	prettier: {
		printWidth: 100,
		semi: false,
		singleQuote: true,
		tabWidth: 2,
		trailingComma: 'all',
		useTabs: false,
	},
	stylistic: false,
})
```

**注意**：Stylistic 和 Prettier 互斥。当 `stylistic` 启用时（默认），Prettier 会自动禁用。

### 无障碍规则

```typescript
// Vue 无障碍
export default eslintConfig({
	vue: {
		a11y: true,
	},
})

// React/JSX 无障碍
export default eslintConfig({
	jsxA11y: true,
})

// 或独立的 JSX a11y
export default eslintConfig({
	jsxA11y: true,
})
```

### 自动检测

默认情况下，配置会自动检测已安装的框架并启用相应的规则：

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	autoDetect: true, // 启用自动检测（默认：true）
})
```

### TypeScript 高级选项

```typescript
// 类型感知规则（需要 tsconfig.json）
export default eslintConfig({
	typescript: {
		typeAware: true,
		tsconfigPath: './tsconfig.json',
		overridesTypeAware: {
			'ts/no-floating-promises': 'warn',
		},
	},
})

// 库项目启用显式返回类型
export default eslintConfig({
	type: 'lib', // 启用 ts/explicit-function-return-type
	typescript: true,
})

// 仅可擦除语法（用于需要纯类型构造的库）
export default eslintConfig({
	typescript: {
		erasableOnly: true, // 需要 eslint-plugin-erasable-syntax-only
	},
})
```

### 按配置禁用 Stylistic 规则

可以为特定配置禁用 stylistic 规则：

```typescript
// 为 JSON 文件禁用 stylistic 规则
export default eslintConfig({
	jsonc: { stylistic: false },
	yaml: { stylistic: false },
	toml: { stylistic: false },
	vue: { stylistic: false },
})
```

### 特定框架配置

#### Vue 项目

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	type: 'lib',
	typescript: true,
	vue: {
		a11y: true,
		vueVersion: 3,
	},
})
```

#### React 项目

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	react: {
		reactCompiler: true,
	},
	typescript: true,
})
```

#### Next.js 项目

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	nextjs: true,
	react: true,
	typescript: true,
})
```

#### Nuxt 项目

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	nuxt: true,
	typescript: true,
	vue: true,
})
```

#### Angular 项目

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	angular: true,
	typescript: true,
})
```

#### Svelte 项目

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	svelte: true,
	typescript: true,
})
```

#### Astro 项目

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	astro: true,
	typescript: true,
})
```

#### UnoCSS 项目

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	unocss: true,
})
```

### 扩展配置

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	extends: [
		// 额外的 flat configs
	],
	rules: {
		// 覆盖规则
	},
})
```

## TypeScript 支持

此包提供完整的 TypeScript 支持，自动生成类型：

```typescript
import type { TypedFlatConfigItem, Rules, RuleOptions, ConfigNames } from '@eslint-sets/eslint-config'

// TypedFlatConfigItem - 配置对象的完整类型检查
const myConfig: TypedFlatConfigItem = {
	name: 'my-config',
	rules: {
		'no-console': 'off',
		'@stylistic/semi': ['error', 'always'], // IDE 显示可用选项
	},
}

// Rules - 所有可用规则名称及类型检查
const myRules: Rules = {
	'no-console': 'off',
}

// ConfigNames - 所有可用的配置名称
type MyConfigs = ConfigNames // 'eslint-sets/javascript' | 'eslint-sets/vue' | ...
```

### 重新生成类型

如果你正在为此包做贡献，添加新插件后重新生成类型：

```shell
pnpm run gen
```

这将生成包含所有规则类型的 `src/typegen.d.ts`。

## 配置检查器

使用内置的配置检查器可视化和调试 ESLint 配置：

```shell
# 运行检查器
npx @eslint/config-inspector

# 或使用 pnpm
pnpm inspector
```

访问 http://localhost:7777/ 查看和交互你的 ESLint 配置。检查器显示：

- 所有配置的规则及其来源
- 文件模式及其匹配的配置
- 插件信息
- 规则配置

你也可以构建静态版本用于分享：

```shell
npx @eslint/config-inspector build
```

## 单独的配置

你也可以导入单独的配置：

```typescript
import {
	javascript,
	typescript,
	vue,
	react,
	svelte,
	solid,
	jsonc,
	yaml,
	markdown,
	toml,
	imports,
	unicorn,
	perfectionist,
	regexp,
	test,
	node,
	prettier,
	stylistic,
	disables,
	command,
	nextjs,
	nuxt,
	astro,
	angular,
	unocss,
	e18e,
	pnpm,
	formatters,
	eslintComments,
	jsxA11y,
	vueA11y,
	noOnlyTests,
	sortPackageJson,
	sortTsconfig,
} from '@eslint-sets/eslint-config'
```

## 对等依赖

| 包名       | 版本                                        |
| ---------- | ------------------------------------------- |
| eslint     | ^9.10.0 或 ^9.22.0                          |
| prettier   | ^3.5.3（可选，用于 Prettier 集成）          |
| typescript | >=5.0.0（可选，用于 TypeScript 支持）       |

## 可选依赖

以下包是可选的，如果安装则会使用：

### React

- `@eslint-react/eslint-plugin` - 现代化 React 检查（包含 core、dom、web-api、hooks-extra、naming-convention、debug）
- `eslint-plugin-react-refresh` - React Refresh 支持

### Vue

- `eslint-plugin-vuejs-accessibility` - Vue 无障碍规则

### Svelte

- `eslint-plugin-svelte` - Svelte 支持
- `svelte` - Svelte 解析器
- `svelte-eslint-parser` - Svelte ESLint 解析器

### Next.js

- `@next/eslint-plugin-next` - Next.js 特定规则

### Astro

- `eslint-plugin-astro` - Astro 支持
- `astro-eslint-parser` - Astro ESLint 解析器

### Angular

- `@angular-eslint/eslint-plugin` - Angular 支持
- `@angular-eslint/eslint-plugin-template` - Angular 模板规则
- `@angular-eslint/template-parser` - Angular 模板解析器

### UnoCSS

- `@unocss/eslint-plugin` - UnoCSS 规则

### 无障碍

- `eslint-plugin-jsx-a11y` - JSX 无障碍规则

### 现代化

- `@e18e/eslint-plugin` - 代码现代化规则

### 工作区

- `eslint-plugin-pnpm` - pnpm 工作区规则

### 格式化工具

- `eslint-plugin-format` - CSS、HTML 等的外部格式化工具

### Markdown

- `@eslint/markdown` - Markdown 检查

## 从 v5 迁移

如果你正在从旧的 `@eslint-sets/eslint-config-*` 包迁移，所有子包已合并为单个包 `@eslint-sets/eslint-config`。

### 迁移对照表

| 旧包名 (v5) | 新配置 (v6) |
| ---------------- | --------------- |
| `@eslint-sets/eslint-config-basic` | `eslintConfig()` (默认) |
| `@eslint-sets/eslint-config-ts` | `eslintConfig({ typescript: true })` |
| `@eslint-sets/eslint-config-vue` | `eslintConfig({ vue: true })` |
| `@eslint-sets/eslint-config-vue3` | `eslintConfig({ vue: { vueVersion: 3 } })` |
| `@eslint-sets/eslint-config-react` | `eslintConfig({ react: true })` |
| `@eslint-sets/eslint-config-svelte` | `eslintConfig({ svelte: true })` |
| `@eslint-sets/eslint-config-nuxt` | `eslintConfig({ nuxt: true, vue: true })` |
| `@eslint-sets/eslint-config-egg` | `eslintConfig({ node: true, typescript: true })` |

### Basic 基础配置

```javascript
// 之前 (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-basic',
}

// 之后 (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

### TypeScript

```javascript
// 之前 (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-ts',
}

// 之后 (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	typescript: true,
})
```

### Vue 2

```javascript
// 之前 (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-vue',
}

// 之后 (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	vue: {
		vueVersion: 2,
	},
})
```

### Vue 3

```javascript
// 之前 (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-vue3',
}

// 之后 (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	vue: {
		vueVersion: 3,
	},
})
```

### React

```javascript
// 之前 (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-react',
}

// 之后 (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	react: true,
})
```

### Svelte

```javascript
// 之前 (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-svelte',
}

// 之后 (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	svelte: true,
})
```

### Nuxt

```javascript
// 之前 (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-nuxt',
}

// 之后 (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	nuxt: true,
	vue: true,
})
```

### Egg (Node.js)

```javascript
// 之前 (v5)
// .eslintrc.js
module.exports = {
	extends: '@eslint-sets/eslint-config-egg',
}

// 之后 (v6)
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
	node: true,
	typescript: true,
})
```

### v6 主要变化

1. **Flat Config**: v6 使用 ESLint 新的 flat config 格式（`eslint.config.ts` 而非 `.eslintrc.js`）
2. **单一包**: 所有子包合并为一个包
3. **自动检测**: 框架默认自动检测
4. **Stylistic**: 默认使用 `@stylistic/eslint-plugin` 进行格式化，而非 Prettier
5. **TypeScript 类型**: 自动生成所有规则的类型

## VS Code 集成

添加到 `.vscode/settings.json`：

```json
{
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit"
	},
	"eslint.experimental.useFlatConfig": true,
	"eslint.validate": [
		"javascript",
		"javascriptreact",
		"typescript",
		"typescriptreact",
		"vue",
		"html",
		"markdown",
		"json",
		"jsonc",
		"yaml",
		"toml",
		"astro",
		"svelte"
	]
}
```

## 更新日志

发布历史请参见 [CHANGELOG.md](./CHANGELOG.md)。

## 许可证

[MIT](LICENSE)

## 问题与支持

请在[这里](https://github.com/saqqdy/eslint-sets/issues)提交 issue。

[npm-image]: https://img.shields.io/npm/v/@eslint-sets/eslint-config.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@eslint-sets/eslint-config
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
