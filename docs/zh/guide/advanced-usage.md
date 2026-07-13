# 进阶用法

详细的进阶配置请参考 [英文版本](/guide/advanced-usage)。

## 主要内容

### TypeScript 高级选项

- 类型感知规则（typeAware）
- 可擦除语法（erasableOnly）

### 外部格式化器

支持 CSS、HTML、Markdown 等文件的 Prettier 格式化。

### 独立配置导入

可单独导入各个配置模块组合使用。

### 默认规则行为

- 无行长度限制
- 使用全局 Buffer/process
- 灵活的未使用表达式
- 混合运算符分组

### 框架特定功能

- React Compiler 支持
- React Server Components
- Vue 版本控制
- Svelte 5 Runes

详细配置和示例请查看英文文档。

### 自定义语言选项

为特定框架场景添加自定义全局变量：

```typescript
export default eslintConfig({
  vue: true,
  typescript: true,
  languageOptions: {
    globals: {
      // Taro 框架全局变量
      defineAppConfig: 'readonly',
      definePageConfig: 'readonly',
      // 自定义全局变量
      myGlobal: 'writable',
    },
  },
})
```

**核心特性**：

- **智能合并**：自定义 `globals` 会智能合并到所有相关配置中（javascript、vue、react 等）
- **框架全局变量**：非常适合添加框架特定的全局变量，如 Taro 的 `definePageConfig`
- **保留默认值**：默认全局变量（console、process、window 等）会被保留

**常见使用场景**：

- **Taro**：`defineAppConfig`、`definePageConfig`
- **Uni-app**：`uni`、`plus`
- **微信小程序**：`wx`、`App`、`Page`
- **自定义环境变量**

**注意**：当前仅支持 `globals` 合并。其他 `languageOptions` 属性不会自动合并。

