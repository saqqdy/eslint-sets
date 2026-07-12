# React 配置

React 项目的 ESLint 配置指南。

## 基础配置

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  react: true,
})
```

## React 选项

- `reactCompiler`: React Compiler 支持
- `rsc`: React Server Components 规则
- `stylistic`: React 文件样式规则

详细配置和示例请查看 [英文版本](/configs/react)。
