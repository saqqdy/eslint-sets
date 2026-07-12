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
// 如果依赖中有 react 则自动检测
export default eslintConfig()
```

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