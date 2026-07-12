# 基础用法

## 配置选项

配置函数接受一个选项对象来自定义行为：

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  // 启用 TypeScript 支持
  typescript: true,

  // 启用 Vue 支持
  vue: true,

  // 启用 React 支持
  react: true,

  // 自定义规则
  rules: {
    'no-console': 'warn',
  },
})
```

## 项目类型

### 应用项目（默认）

适用于应用项目，规则相对宽松：

```typescript
export default eslintConfig({
  type: 'app',
})
```

### 库项目

适用于库项目，规则更严格：

```typescript
export default eslintConfig({
  type: 'lib',
})
```

库项目会启用额外的规则如 `ts/explicit-function-return-type` 以确保更好的 API 文档。

## Stylistic vs Prettier

此配置支持两种格式化方案：

### Stylistic（默认）

使用 `@stylistic/eslint-plugin` 进行纯 ESLint 格式化：

```typescript
// 使用 Stylistic（默认）
export default eslintConfig({
  stylistic: true,
})

// 使用 Stylistic 自定义选项
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
```

### Prettier

使用 `eslint-plugin-prettier` 将 Prettier 与 ESLint 集成：

```typescript
// 使用 Prettier 代替（必须禁用 stylistic）
export default eslintConfig({
  prettier: true,
  stylistic: false,
})

// 使用 Prettier 自定义选项
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

::: warning 互斥关系
Stylistic 和 Prettier 是互斥的。当 `stylistic` 启用时（默认），Prettier 会自动禁用。
:::

## 框架支持

### Vue

```typescript
export default eslintConfig({
  vue: true, // 自动检测 Vue 版本

  // 或带选项
  vue: {
    a11y: true, // 启用无障碍规则
    vueVersion: 3, // 明确设置 Vue 版本
  },
})
```

### React

```typescript
export default eslintConfig({
  react: true,

  // 或带选项
  react: {
    reactCompiler: true, // React Compiler 支持
    rsc: true, // React Server Components 规则（默认：true）
  },
})
```

### Svelte

```typescript
export default eslintConfig({
  svelte: true,
  typescript: true,
})
```

### Next.js

```typescript
export default eslintConfig({
  nextjs: true,
  react: true,
  typescript: true,
})
```

### Nuxt

```typescript
export default eslintConfig({
  nuxt: true,
  vue: true,
  typescript: true,
})
```

### Angular

```typescript
export default eslintConfig({
  angular: true,
  typescript: true,
})
```

### Astro

```typescript
export default eslintConfig({
  astro: true,
  typescript: true,
})
```

### UnoCSS

```typescript
export default eslintConfig({
  unocss: true,
})
```

## 无障碍访问

启用无障碍规则以获得更好的 a11y 合规性：

### Vue 无障碍

```typescript
export default eslintConfig({
  vue: {
    a11y: true,
  },
})
```

### JSX 无障碍

```typescript
export default eslintConfig({
  jsx: {
    a11y: true,
  },
})
```

## 忽略文件

### 使用 .gitignore

默认情况下，配置会自动读取 `.gitignore` 模式：

```typescript
export default eslintConfig({
  gitignore: true, // 启用 .gitignore 支持（默认：true）
})
```

### 自定义忽略

```typescript
export default eslintConfig({
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
    '**/.vscode/**',
  ],

  // 或修改默认值
  ignores: (defaults) => [...defaults, '**/custom/**'],
})
```

## 自定义规则

覆盖任何默认规则：

```typescript
export default eslintConfig({
  rules: {
    'no-console': 'off',
    '@stylistic/max-len': ['error', { code: 100 }],
    'ts/explicit-function-return-type': 'warn',
  },
})
```

## 按配置禁用样式规则

你可以为特定文件类型禁用样式规则：

```typescript
export default eslintConfig({
  jsonc: { stylistic: false },
  yaml: { stylistic: false },
  toml: { stylistic: false },
  vue: { stylistic: false },
})
```

## 自动排序

自动排序配置文件：

```typescript
export default eslintConfig({
  sortPackageJson: true, // 排序 package.json（默认：true）
  sortTsconfig: true, // 排序 tsconfig.json（默认：true）
})
```

## 命令脚本

为命令行脚本放宽规则：

```typescript
export default eslintConfig({
  command: true, // 为脚本放宽规则（默认：true）
})
```

这会对以下目录中的文件应用宽松规则：
- `scripts/**`
- `bin/**`
- `cli/**`
- `tasks/**`
- `tools/**`

允许：`console`、`process.exit`、`process.env`、shebang、`require` 等。

## 禁用规则

在配置文件中自动禁用严格规则：

```typescript
export default eslintConfig({
  disables: true, // 在配置文件中禁用规则（默认：true）
})
```

这会在以下位置禁用严格规则：
- 配置文件（`.eslintrc`、`eslint.config.*` 等）
- 脚本目录（`scripts/`、`tasks/`、`tools/`、`cli/`、`bin/`）