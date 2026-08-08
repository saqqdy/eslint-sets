# 从 v5 迁移

如果你正在从旧的 `@eslint-sets/eslint-config-*` 包迁移，本指南将帮助你过渡到 v6。

## 概述

所有子包已合并为单个包 `@eslint-sets/eslint-config`。这简化了安装和维护，同时提供更好的框架检测。

## 迁移映射

| 旧包 (v5) | 新配置 (v6) |
| ---------------- | --------------- |
| `@eslint-sets/eslint-config-basic` | `eslintConfig()` (默认) |
| `@eslint-sets/eslint-config-ts` | `eslintConfig({ typescript: true })` |
| `@eslint-sets/eslint-config-vue` | `eslintConfig({ vue: { vueVersion: 2 } })` |
| `@eslint-sets/eslint-config-vue3` | `eslintConfig({ vue: { vueVersion: 3 } })` |
| `@eslint-sets/eslint-config-react` | `eslintConfig({ react: true })` |
| `@eslint-sets/eslint-config-svelte` | `eslintConfig({ svelte: true })` |
| `@eslint-sets/eslint-config-nuxt` | `eslintConfig({ nuxt: true, vue: true })` |
| `@eslint-sets/eslint-config-egg` | `eslintConfig({ node: true, typescript: true })` |

## v6 的关键变化

### 1. Flat Config 格式

v6 使用 ESLint 新的 flat config 格式：

**之前 (v5):**
```javascript
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets/eslint-config-vue3',
}
```

**之后 (v6):**
```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  vue: {
    vueVersion: 3,
  },
})
```

### 2. 纯 ESM 包

v6 是纯 ESM。你**必须**使用 ESM 配置文件：

**支持：**
- `eslint.config.ts`
- `eslint.config.mjs`
- `eslint.config.js`（package.json 中有 `"type": "module"`）

**不支持：**
- `eslint.config.cjs`
- `eslint.config.js`（没有 `"type": "module"`）
- `.eslintrc.js`
- `.eslintrc.json`

### 3. 单一包

所有子包合并为一个：

**之前 (v5):**
```bash
pnpm add -D @eslint-sets/eslint-config-vue3
```

**之后 (v6):**
```bash
pnpm add -D @eslint-sets/eslint-config
```

### 4. 自动检测

默认情况下框架会被自动检测：

**之前 (v5):**
```javascript
// 不同框架需要不同包
extends: '@eslint-sets/eslint-config-react'
```

**之后 (v6):**
```typescript
// vue/nuxt/vitepress 在依赖中时自动检测 Vue。
// react/svelte/solid 需显式启用（v6.6.0+，对齐 @antfu/eslint-config）：
export default eslintConfig({
  react: true, // 使用 React 时
})
```

> [!NOTE]
> 自 v6.6.0 起，仅 `vue` 自动检测。`react`/`svelte`/`solid` 默认为 `false`，
> 以防止在 hoisted monorepo 中 Vue 和 React 配置同时激活。设 `react: true`
> / `svelte: true` / `solid: true` 启用，或传 `'auto'` 恢复自动检测。

### 5. 默认使用 Stylistic

默认格式化使用 `@stylistic/eslint-plugin` 而不是 Prettier：

**之前 (v5):**
- 需要 Prettier 集成

**之后 (v6):**
- 默认 Stylistic 格式化（可选 Prettier）

### 6. TypeScript 类型

为所有规则自动生成类型：

**之前 (v5):**
- 手动类型定义
- 有限的 IDE 支持

**之后 (v6):**
- 所有规则的完整智能提示
- 类型安全的配置

## v6.6.0

### React/Svelte/Solid 改为显式启用

`react`、`svelte`、`solid` 的默认值从 `'auto'` 改为 `false`，对齐 `@antfu/eslint-config`。仅 `vue` 仍自动检测。这能防止在 hoisted monorepo（`isPackageExists` 从根 `node_modules` 同时解析到两者）中 Vue 和 React 配置同时激活，从而避免误报，例如 `react-refresh/only-export-components` 对 Vue 项目的 `.ts` 文件误报。

**迁移**：若依赖了自动检测，请显式启用 `react: true` / `svelte: true` / `solid: true`：

```typescript
export default eslintConfig({
  react: true, // 或 svelte: true / solid: true
})
```

恢复旧的自动检测行为，传 `'auto'`：

```typescript
export default eslintConfig({
  react: 'auto',
})
```

当 `react` 已安装但被禁用时，现在会打印警告，引导你启用它。

v6.6.0 是一个向后兼容的次要版本，包含以下行为修复与弃用：

### 1. CI 与 Git 钩子中的规则严格度

`isInEditorEnv()` 现在在 CI、Git 钩子（`GIT_PARAMS` / `VSCODE_GIT_COMMAND`）以及 lint-staged 上下文中返回 `false`。为编辑器降级的规则（`prefer-const`、`unused-imports` 等）现在在这些关键场景下保持严格（`error`）。

此前 `TERM_PROGRAM` 会导致 CI 中出现误报（规则被错误地降级为 `warn`）。`TERM_PROGRAM` 已从 `EDITOR_ENV_KEYS` 中移除；新增了 `VIM` 和 `NVIM`；并支持 Zed（`ZED_ENVIRONMENT`，不依赖 `ZED_TERM`）。同时新增导出辅助函数 `isInGitHooksOrLintStaged()`。

### 2. .gitignore 处理

`.gitignore` 处理改用 `eslint-config-flat-gitignore`，提供正确的 Git 语义（根锚定、嵌套 `.gitignore`）。不再读取 `.git/info/exclude`（仅读取 `.gitignore` 文件）。

### 3. git.ts 弃用

`src/utils/git.ts` 中的 `parseGitignore`、`findGitignore`、`getGitignorePatterns` 已**弃用**，但仍导出，计划在 v7.0.0 移除。请改用内置的 `gitignore` 选项（默认启用）。

### 4. ESLint Peer 依赖

peer 依赖 `eslint` 提升至 `^9.10.0`。

### 5. loadPlugin required 标志

`loadPlugin(name, { required: true })` 现在加载失败时会输出包含插件名与错误信息的警告。可选加载（不带该标志）保持静默不变。核心依赖（`@typescript-eslint/eslint-plugin`、`eslint-plugin-jsdoc`、`eslint-plugin-no-only-tests`）现在使用 `required: true`。

## 迁移步骤

1. **删除旧包：**
   ```bash
   pnpm remove @eslint-sets/eslint-config-vue3 # 或其他版本
   ```

2. **安装新包：**
   ```bash
   pnpm add -D @eslint-sets/eslint-config eslint
   ```

3. **删除旧配置：**
   ```bash
   rm .eslintrc.js .eslintrc.json # 或其他旧配置文件
   ```

4. **创建新配置：**
   ```bash
   npx @eslint-sets/eslint-config
   ```

5. **更新 package.json：**
   确保设置了 `"type": "module"`（用于 ESM 支持）

6. **测试：**
   ```bash
   pnpm eslint .
   ```

## 常见问题

### CommonJS 配置文件

**问题：** 使用 `.eslintrc.js` 或 `eslint.config.cjs`

**解决方案：** 重命名为 `eslint.config.ts` 并使用 ESM 语法

### 缺少 Peer 依赖

**问题：** TypeScript 无法加载配置

**解决方案：** 安装 `jiti`（pnpm 用户）或确保已安装 peer 依赖

### 规则冲突

**问题：** v6 中规则行为不同

**解决方案：** 检查默认规则行为部分并按需覆盖

### Prettier 集成

**问题：** 想使用 Prettier 而不是 Stylistic

**解决方案：**
```typescript
export default eslintConfig({
  prettier: true,
  stylistic: false,
})
```

## 需要帮助？

如果在迁移过程中遇到问题：

1. 查看 [GitHub Issues](https://github.com/saqqdy/eslint-sets/issues)
2. 阅读 [文档](/zh/)
3. 开一个新 issue 并附上你的配置和错误信息