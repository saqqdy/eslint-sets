# 快速上手

## 安装

将包安装为开发依赖：

```bash
# 使用 pnpm
pnpm install -D @eslint-sets/eslint-config eslint

# 使用 npm
npm install -D @eslint-sets/eslint-config eslint

# 使用 bun
bun add -D @eslint-sets/eslint-config eslint
```

::: warning pnpm 用户注意
ESLint 9.x 需要 `jiti` 来加载 TypeScript 配置文件。如果你使用 `eslint.config.ts`，请确保安装了 peer 依赖：

```bash
# 方式 1: 添加到 .npmrc
echo "auto-install-peers=true" >> .npmrc

# 方式 2: 手动安装 jiti
pnpm add -D jiti
```
:::

## 使用 CLI（推荐）

设置项目的最快方式是使用交互式 CLI：

```bash
# 使用 pnpm
pnpm dlx @eslint-sets/eslint-config

# 使用 npm
npx @eslint-sets/eslint-config

# 使用 bun
bunx @eslint-sets/eslint-config
```

CLI 会引导你完成以下配置：

- 项目类型选择（应用/库）
- TypeScript 支持
- 框架选择（Vue、React、Svelte、Solid、Next.js、Nuxt、Astro、Angular、UnoCSS）
- 无障碍选项
- 格式化工具选择（Prettier/Stylistic）
- 其他选项（.gitignore、自动排序等）

## 手动设置

在项目根目录创建 `eslint.config.ts` 文件：

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig()
```

就这样！配置会自动检测已安装的框架并应用相应的规则。

## 工作原理

### 自动检测

默认情况下，配置会自动检测已安装的框架并启用相应的规则：

```typescript
export default eslintConfig({
  autoDetect: true, // 启用自动检测（默认：true）
})
```

当 `autoDetect` 启用时（默认），配置会：

1. 检查你的 `package.json` 依赖
2. 为检测到的框架启用规则
3. 应用适当的解析器配置
4. 设置框架特定的插件

### Flat Config 架构

此配置使用 ESLint 新的 flat config 格式，提供：

- **更好的性能**: 配置只加载一次并缓存
- **类型安全**: 完整的 TypeScript 配置支持
- **显式配置**: 清晰可预测的规则应用
- **现代工具**: 更好地集成现代构建工具

## 系统要求

- **Node.js**: `^18.18.0` 或 `^20.9.0` 或 `>=21.1.0`
- **ESLint**: `^9.10.0` 或 `^9.22.0`
- **配置文件**: 必须使用 ESM 格式（`eslint.config.ts` 或 `eslint.config.mjs`）

::: danger 重要提示
此包是 **纯 ESM**。不支持 CommonJS 配置文件（`eslint.config.cjs`、没有 `"type": "module"` 的 `eslint.config.js`）。这是因为核心依赖如 `@stylistic/eslint-plugin` 是纯 ESM 的。
:::

## 下一步

- [基础用法](/zh/guide/basic-usage) - 学习基础使用模式
- [进阶用法](/zh/guide/advanced-usage) - 探索高级功能
- [CLI 工具](/zh/guide/cli) - 掌握交互式 CLI
- [框架配置](/zh/configs/) - 框架特定配置
- [API 参考](/zh/api/) - 完整 API 文档

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

## 配置检查器

使用内置的配置检查器可视化和调试 ESLint 配置：

```bash
# 运行检查器
npx @eslint/config-inspector

# 或使用 pnpm
pnpm inspector
```

访问 `http://localhost:7777` 查看和交互你的 ESLint 配置。检查器显示：

- 所有配置的规则及其来源
- 文件模式和匹配的配置
- 插件信息
- 规则配置