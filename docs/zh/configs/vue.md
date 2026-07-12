# Vue 配置

Vue 项目的 ESLint 配置指南。

## 基础配置

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: {
    vueVersion: 3, // 或 2
  },
})
```

## Vue 选项

- `vueVersion`: Vue 版本（2 或 3）
- `a11y`: 启用无障碍规则
- `stylistic`: Vue 文件样式规则

详细配置和示例请查看 [英文版本](/configs/vue)。
