# Migrating from v6 to v7

v7.0.0 is a major release with breaking changes to the public API. This guide walks through migrating from v6.x to v7.0.0.

## Quick Checklist

- [ ] `eslintConfig()` now returns a `FlatConfigComposer` — `await` it if you used the return value as a plain array
- [ ] Next.js rule keys changed: `@next/next/*` → `next/*`
- [ ] Removed exports: `parseGitignore`, `findGitignore`, `getGitignorePatterns`, `combine`
- [ ] `ensurePackages` export removed (dead code; remove any import)

---

## 1. `eslintConfig()` returns a `FlatConfigComposer`

### What changed

v7 changes the factory's return type from a hand-built `Promise<Linter.Config[]>` to [`FlatConfigComposer`](https://www.npmjs.com/package/eslint-flat-config-utils).

`FlatConfigComposer` extends `Promise<Linter.Config[]>`, so ESLint's config loader (which `await`s the `export default` value) still resolves it to a config array. **Most usages keep working unchanged.**

### What still works (no change needed)

```typescript
// ESLint awaits the composer to a config array at load time.
export default eslintConfig({ vue: true, typescript: true })

// The composer is Promise<T[]>-compatible, so awaiting still yields an array.
const config = await eslintConfig({ typescript: true })
console.log(config.length)
```

### New — chain composer methods directly

```typescript
export default eslintConfig({ vue: true })
  .append({ name: 'my-overrides', rules: { 'no-console': 'off' } })
  .renamePlugins({ 'import-lite': 'import' })
  .prepend({ rules: { 'no-debugger': 'error' } })
```

Available chainable methods: `.append()`, `.prepend()`, `.insert()`, `.replace()`, `.renamePlugins()`, and more.

### Migration needed

If you treated the return value as a plain array **synchronously** (without `await`):

```typescript
// Before (v6) — broken in v7:
const config = eslintConfig({ vue: true })
console.log(config.length)  // ❌ composer is lazy, not an array yet

// After (v7):
const config = await eslintConfig({ vue: true })
console.log(config.length)  // ✅
```

> [!WARNING]
> Reading `.length`, indexing (`config[0]`), or spreading (`...config`) on the return value without `await` no longer works. Either `await` it first, or use composer methods like `.append()`.

---

## 2. Next.js rule keys renamed

The `@next/next` plugin is now registered as `next`, and its rules are shortened from `@next/next/*` to `next/*` (e.g. `@next/next/no-img-element` → `next/no-img-element`).

```typescript
// Before (v6):
export default eslintConfig({
  nextjs: { overrides: { '@next/next/no-img-element': 'off' } },
})

// After (v7) — either form works inside `overrides` (auto-renamed):
export default eslintConfig({
  nextjs: { overrides: { 'next/no-img-element': 'off' } },
})
```

> [!NOTE]
> Rules referenced inside `eslintConfig()`'s `overrides` are **auto-renamed** — both `@next/next/*` and `next/*` work there. You only need to update keys in configs you append yourself **outside** `eslintConfig()`.

---

## 3. Removed exports

### Git utilities

`parseGitignore`, `findGitignore`, and `getGitignorePatterns` (from `src/utils/git.ts`, deprecated in v6.6.0) are removed. Use the built-in `gitignore` option (enabled by default, backed by `eslint-config-flat-gitignore` for correct git semantics):

```typescript
export default eslintConfig({ gitignore: true })
```

### `combine`

`combine()` is removed. Use `FlatConfigComposer` methods or array spread:

```typescript
// Before: const config = combine(base, extra)
// After:
export default eslintConfig({}).append(extra)
```

---

## 4. Removed: `ensurePackages`

The `ensurePackages()` export is removed from `src/plugins.ts` (along with the `@antfu/install-pkg` dependency). It was dead code with no internal callers, so no user-visible behavior changes. If you imported it, remove the import.

---

## 5. Centralized plugin renaming (internal)

Plugin-prefix shortening now happens once at resolve time via `composer.renamePlugins(defaultPluginRenaming)`:

| Plugin prefix | Renamed to |
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

**Rule keys are unchanged** (except Next.js — see §2). This is an internal refactor; no config changes needed.

The `defaultPluginRenaming` map is exported if you want to inspect or extend it:

```typescript
import { defaultPluginRenaming } from '@eslint-sets/eslint-config'
```

---

## Migration steps

1. **Bump the dependency** — update `@eslint-sets/eslint-config` to `^7.0.0` in `package.json`, then `pnpm install` (or `npm i` / `yarn`).
2. **Audit rule keys** — run `npx eslint .`. Fix any `@next/next/*` references in configs you append outside `eslintConfig()` → `next/*`.
3. **Remove removed imports** — if you imported `parseGitignore`/`findGitignore`/`getGitignorePatterns`/`combine`, switch to the `gitignore` option or `.append()`.
4. **Verify** — `export default eslintConfig({...})` should still work unchanged. If you used the return value synchronously as an array, `await` it.

---

## Need help?

- [GitHub Issues](https://github.com/saqqdy/eslint-sets/issues)
- [Changelog](https://github.com/saqqdy/eslint-sets/blob/master/CHANGELOG.md)
- [Full migration history](./migration)
