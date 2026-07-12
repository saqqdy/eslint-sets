# API 参考

详细的 API 文档请参考 [英文版本](/api/)。

## 快速参考

### 主函数

```typescript
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  typescript: true,
  vue: true,
  react: true,
})
```

### 可用选项

- 项目类型: `type: 'app' | 'lib'`
- 框架: `typescript`, `vue`, `react`, `svelte`, `nextjs`, `nuxt`, `angular`, `astro`, `unocss`
- 格式化: `stylistic`, `prettier`
- 其他: `gitignore`, `ignores`, `rules`, `command`, `disables`

详细类型定义和选项说明请查看 [选项参考](/zh/api/options)。
