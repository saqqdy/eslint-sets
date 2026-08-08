# 选项参考

完整的配置选项参考，详细说明请查看 [英文版本](/api/options)。

## 常用选项

### 项目配置

- `type`: 'app' 或 'lib'（默认：'app'）
- `autoDetect`: 自动检测框架（默认：true）

### 框架选项

- `typescript`: TypeScript 支持（默认：true）
- `vue`: Vue 支持（默认：'auto'）
- `react`: React 支持（默认：`false`，需显式启用以避免与 Vue 在 hoisted monorepo 中冲突）
- `svelte`: Svelte 支持（默认：`false`）
- `solid`: SolidJS 支持（默认：`false`）
- `nextjs`, `nuxt`, `angular`, `astro`, `unocss`（默认：'auto'，自动检测）

### 格式化选项

- `stylistic`: Stylistic 格式化（默认：true）
- `prettier`: Prettier 集成（默认：false，需禁用 stylistic）

### 功能选项

- `gitignore`: 读取 .gitignore（默认：true）
- `ignores`: 自定义忽略模式
- `command`: 脚本规则放宽（默认：true）
- `disables`: 配置文件规则放宽（默认：true）
- `sortPackageJson`: 排序 package.json（默认：true）
- `sortTsconfig`: 排序 tsconfig.json（默认：true）

### .gitignore 行为

`gitignore` 选项（默认启用）使用 `eslint-config-flat-gitignore`，提供正确的 Git 语义（根锚定、嵌套 `.gitignore`）。仅读取 `.gitignore` 文件，不再读取 `.git/info/exclude`。

**弃用**：`src/utils/git.ts` 中的 `parseGitignore`、`findGitignore`、`getGitignorePatterns` 已弃用，但仍导出，计划在 v7.0.0 移除。请改用内置的 `gitignore` 选项。

更多详细选项和类型定义，请查看英文文档或 TypeScript 类型定义。
