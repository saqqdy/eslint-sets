# CLI 工具

## 交互式设置

`@eslint-sets/eslint-config` 包含交互式 CLI 工具，方便项目设置：

```bash
# 使用 pnpm
pnpm dlx @eslint-sets/eslint-config

# 使用 npm
npx @eslint-sets/eslint-config

# 使用 bun
bunx @eslint-sets/eslint-config
```

## CLI 功能

CLI 会引导你完成以下步骤：

### 1. 项目类型选择

选择：
- **应用**: Web 应用、移动应用等（规则宽松）
- **库**: npm 包、共享库（规则严格）

### 2. TypeScript 支持

选择是否启用 TypeScript 支持：

```typescript
typescript: true, // 或 false
```

### 3. 框架选择

选择你使用的框架：

- Vue（2 或 3）
- React
- Svelte
- Solid
- Next.js
- Nuxt
- Astro
- Angular
- UnoCSS

支持多选。

### 4. 无障碍选项

选择是否启用无障碍规则：

- Vue a11y
- JSX a11y

### 5. 格式化工具选择

选择：

- **Stylistic**（默认）：纯 ESLint 格式化
- **Prettier**：将 Prettier 与 ESLint 集成

### 6. 其他选项

配置其他功能：

- **Git ignore**: 自动读取 `.gitignore` 模式
- **自动排序**: 排序 `package.json` 和 `tsconfig.json`
- **命令脚本**: 为 CLI 脚本放宽规则
- **禁用**: 在配置文件中放宽规则

## CLI 输出

CLI 会：

1. 在项目根目录创建 `eslint.config.ts`
2. 安装必要的依赖
3. 可选更新 `.vscode/settings.json`

### 生成的配置示例

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  type: 'app',
  typescript: true,
  vue: {
    a11y: true,
    vueVersion: 3,
  },
  stylistic: true,
  gitignore: true,
  sortPackageJson: true,
  sortTsconfig: true,
})
```

## 命令行选项

### 非交互模式

使用特定选项运行以跳过提示：

```bash
npx @eslint-sets/eslint-config --type lib --typescript --react --no-stylistic --prettier
```

### 可用标志

| 标志 | 描述 | 值 |
|------|-------------|--------|
| `--type` | 项目类型 | `app`, `lib` |
| `--typescript` | 启用 TypeScript | boolean |
| `--vue` | 启用 Vue | boolean |
| `--vue-version` | Vue 版本 | `2`, `3` |
| `--react` | 启用 React | boolean |
| `--svelte` | 启用 Svelte | boolean |
| `--solid` | 启用 Solid | boolean |
| `--nextjs` | 启用 Next.js | boolean |
| `--nuxt` | 启用 Nuxt | boolean |
| `--astro` | 启用 Astro | boolean |
| `--angular` | 启用 Angular | boolean |
| `--unocss` | 启用 UnoCSS | boolean |
| `--a11y` | 启用无障碍 | boolean |
| `--stylistic` | 使用 Stylistic | boolean |
| `--prettier` | 使用 Prettier | boolean |
| `--gitignore` | 读取 .gitignore | boolean |
| `--sort` | 自动排序文件 | boolean |
| `--command` | 放宽脚本规则 | boolean |
| `--disables` | 放宽配置规则 | boolean |

## 更新现有配置

CLI 可以更新现有的 `eslint.config.ts`：

```bash
npx @eslint-sets/eslint-config --update
```

这会保留你的自定义规则，同时更新框架配置。

## 故障排除

### CLI 未找到

如果收到 "command not found"，确保使用 `npx`、`pnpm dlx` 或 `bunx`：

```bash
# 错误
@eslint-sets/eslint-config

# 正确
npx @eslint-sets/eslint-config
```

### 依赖未安装

CLI 尝试自动安装依赖。如果失败，手动安装：

```bash
pnpm install -D @eslint-sets/eslint-config eslint
```

### TypeScript 配置错误

如果在 `eslint.config.ts` 中遇到 TypeScript 错误：

1. 确保安装了 `jiti`（pnpm 用户）
2. 检查 `tsconfig.json` 包含配置文件
3. 验证你使用的是 ESM 格式（`eslint.config.ts`，而不是 `.cjs`）