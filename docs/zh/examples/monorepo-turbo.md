# Turborepo 示例

Turborepo monorepo 的示例配置。

## ESLint 配置

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
})
```