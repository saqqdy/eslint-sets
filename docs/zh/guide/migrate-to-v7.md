# 从 v6 升级到 v7

v7.0.0 是一个包含破坏性变更的主版本。本指南介绍如何从 v6.x 升级到 v7.0.0。

## 快速检查清单

- [ ] `eslintConfig()` 现在返回 `FlatConfigComposer` —— 如果之前把返回值当普通数组用，现在需要 `await`
- [ ] Next.js 规则键变更：`@next/next/*` → `next/*`
- [ ] 移除的导出：`parseGitignore`、`findGitignore`、`getGitignorePatterns`、`combine`
- [ ] `ensurePackages` 导出已移除（死代码；移除相关导入）

---

## 1. `eslintConfig()` 返回 `FlatConfigComposer`

### 变更内容

v7 将工厂函数的返回类型从手写的 `Promise<Linter.Config[]>` 改为 [`FlatConfigComposer`](https://www.npmjs.com/package/eslint-flat-config-utils)。

`FlatConfigComposer` 继承自 `Promise<Linter.Config[]>`，ESLint 的配置加载器（对 `export default` 值做 `await`）仍会将其解析为配置数组。**大多数用法无需改动。**

### 无需改动（继续生效）

```typescript
// ESLint 在加载时自动 await composer 为配置数组。
export default eslintConfig({ vue: true, typescript: true })

// composer 兼容 Promise<T[]>，await 仍得到数组。
const config = await eslintConfig({ typescript: true })
console.log(config.length)
```

### 新增 —— 直接链式调用 composer 方法

```typescript
export default eslintConfig({ vue: true })
  .append({ name: 'my-overrides', rules: { 'no-console': 'off' } })
  .renamePlugins({ 'import-lite': 'import' })
  .prepend({ rules: { 'no-debugger': 'error' } })
```

可用链式方法：`.append()`、`.prepend()`、`.insert()`、`.replace()`、`.renamePlugins()` 等。

### 需要迁移

如果你**同步地**（未 `await`）把返回值当普通数组使用：

```typescript
// 之前 (v6) —— 在 v7 中失效：
const config = eslintConfig({ vue: true })
console.log(config.length)  // ❌ composer 是惰性的，还不是数组

// 之后 (v7)：
const config = await eslintConfig({ vue: true })
console.log(config.length)  // ✅
```

> [!WARNING]
> 在未 `await` 的情况下读取 `.length`、索引（`config[0]`）或展开（`...config`）不再生效。请先 `await`，或使用 `.append()` 等 composer 方法。

---

## 2. Next.js 规则键重命名

`@next/next` 插件现在注册为 `next`，规则键从 `@next/next/*` 缩短为 `next/*`（如 `@next/next/no-img-element` → `next/no-img-element`）。

```typescript
// 之前 (v6)：
export default eslintConfig({
  nextjs: { overrides: { '@next/next/no-img-element': 'off' } },
})

// 之后 (v7) —— `overrides` 内两种写法都可用（自动重命名）：
export default eslintConfig({
  nextjs: { overrides: { 'next/no-img-element': 'off' } },
})
```

> [!NOTE]
> `eslintConfig()` 的 `overrides` 内引用的规则会被**自动重命名** —— `@next/next/*` 和 `next/*` 都可用。只有在 `eslintConfig()` **之外**自行追加的配置中才需要更新键。

---

## 3. 移除的导出

### Git 工具函数

`parseGitignore`、`findGitignore`、`getGitignorePatterns`（来自 `src/utils/git.ts`，v6.6.0 弃用）已移除。改用内置 `gitignore` 选项（默认启用，由 `eslint-config-flat-gitignore` 提供正确的 Git 语义）：

```typescript
export default eslintConfig({ gitignore: true })
```

### `combine`

`combine()` 已移除。使用 `FlatConfigComposer` 方法或数组展开：

```typescript
// 之前：const config = combine(base, extra)
// 之后：
export default eslintConfig({}).append(extra)
```

---

## 4. 移除 `ensurePackages`

`ensurePackages()` 已从 `src/plugins.ts` 移除（`@antfu/install-pkg` 依赖一并移除）。它是无内部调用者的死代码，无用户可见行为变化。若曾导入它，请移除该导入。

---

## 5. 集中化插件重命名（内部）

插件前缀缩短现在在解析时由 `composer.renamePlugins(defaultPluginRenaming)` 统一处理：

| 插件前缀 | 重命名为 |
|---|---|
| `@typescript-eslint` | `ts` |
| `@eslint-react` | `react` |
| `@eslint-react/dom` | `react-dom` |
| `n` | `node` |
| `import-lite` | `import` |
| `@stylistic` | `style` |
| `yml` | `yaml` |
| `@next/next` | `next` |
| `vitest` | `test` |

**规则键不变**（Next.js 除外 —— 见 §2）。这是内部重构，无需改动配置。

`defaultPluginRenaming` 映射表已导出，如需查看或扩展：

```typescript
import { defaultPluginRenaming } from '@eslint-sets/eslint-config'
```

---

## 迁移步骤

1. **升级依赖** —— 在 `package.json` 中将 `@eslint-sets/eslint-config` 升至 `^7.0.0`，然后 `pnpm install`（或 `npm i` / `yarn`）。
2. **检查规则键** —— 运行 `npx eslint .`。将在 `eslintConfig()` 之外追加的配置中的 `@next/next/*` 改为 `next/*`。
3. **移除已删导入** —— 如果导入了 `parseGitignore`/`findGitignore`/`getGitignorePatterns`/`combine`，改用 `gitignore` 选项或 `.append()`。
4. **验证** —— `export default eslintConfig({...})` 应仍可正常工作。若曾同步地把返回值当数组用，请改为 `await`。

---

## 需要帮助？

- [GitHub Issues](https://github.com/saqqdy/eslint-sets/issues)
- [Changelog](https://github.com/saqqdy/eslint-sets/blob/master/CHANGELOG.md)
- [完整迁移历史](./migration)
