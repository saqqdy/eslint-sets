---
layout: home

hero:
  name: '@eslint-sets/eslint-config'
  text: 现代化 ESLint Flat Config
  tagline: 支持 Vue、React、Svelte、TypeScript、Next.js、Nuxt、Astro、Angular、UnoCSS 等框架的现代 ESLint 配置
  image:
    src: /logo.svg
    alt: '@eslint-sets/eslint-config'
  actions:
    - theme: brand
      text: 快速上手
      link: /zh/guide/getting-started
    - theme: alt
      text: GitHub 仓库
      link: https://github.com/saqqdy/eslint-sets

features:
  - icon: 🚀
    title: ESLint v9 Flat Config
    details: 使用现代化的 flat config 格式，完整支持 TypeScript
  - icon: 🎨
    title: '@stylistic 集成'
    details: 默认使用 @stylistic/eslint-plugin 格式化 - 无需 Prettier
  - icon: 📦
    title: 自动检测
    details: 自动检测已安装的框架并启用相应规则
  - icon: 🔧
    title: 高度可配置
    details: 细粒度控制启用的功能和规则配置
  - icon: ♿
    title: 无障碍支持
    details: 可选的 Vue 和 React a11y 规则
  - icon: 📝
    title: 自动排序
    details: 自动排序 package.json 和 tsconfig.json 文件
  - icon: 🔍
    title: 配置检查器
    details: 可视化工具检查和调试 ESLint 配置
  - icon: 🖥️
    title: CLI 工具
    details: 交互式 CLI 快速设置项目配置
  - icon: 📚
    title: TypeScript 优先
    details: 完整的 TypeScript 支持，为所有规则自动生成类型
---

## 快速开始

### 使用 CLI（推荐）

```bash
# 使用 pnpm
pnpm dlx @eslint-sets/eslint-config

# 使用 npm
npx @eslint-sets/eslint-config

# 使用 bun
bunx @eslint-sets/eslint-config
```

### 手动设置

```bash
# 安装
pnpm install -D @eslint-sets/eslint-config eslint

# 创建配置文件
```

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

## 支持的框架

| 框架        | 自动检测 | 说明                           |
| ----------- | :------: | ------------------------------ |
| TypeScript  |    ✅    | 默认启用                       |
| Vue         |    ✅    | 支持 Vue 2 和 3，可选 a11y     |
| React       |    ✅    | 支持 hooks、refresh 和 Compiler |
| Svelte      |    ✅    | 支持 Svelte 5 runes            |
| Solid       |    ✅    | SolidJS 支持                   |
| Next.js     |    ✅    | 需要 @next/eslint-plugin-next  |
| Nuxt        |    ✅    | Nuxt 3 支持                    |
| Astro       |    ✅    | 需要 eslint-plugin-astro       |
| Angular     |    ✅    | 需要 @angular-eslint/eslint-plugin |
| UnoCSS      |    ✅    | 需要 @unocss/eslint-plugin     |

## 为什么选择 @eslint-sets/eslint-config？

- **现代架构**: 基于 ESLint v9 flat config，纯 ESM 设计
- **零配置开箱**: 合理的默认配置，开箱即用
- **框架检测**: 根据依赖自动启用相应规则
- **灵活可配**: 可覆盖任何默认配置或禁用不需要的功能
- **完整类型**: 完整的 TypeScript 支持，自动生成规则类型
- **持续维护**: 定期更新和新功能添加

## 系统要求

- **Node.js**: `^18.18.0` 或 `^20.9.0` 或 `>=21.1.0`
- **ESLint**: `^9.10.0` 或 `^9.22.0`
- **配置文件**: 必须使用 ESM 格式（`eslint.config.ts` 或 `eslint.config.mjs`）