# CLI Tool

## Interactive Setup

The `@eslint-sets/eslint-config` package includes an interactive CLI tool for easy project setup:

```bash
# use pnpm
pnpm dlx @eslint-sets/eslint-config

# use npm
npx @eslint-sets/eslint-config

# use bun
bunx @eslint-sets/eslint-config
```

## What the CLI Does

The CLI will guide you through the following steps:

### 1. Project Type Selection

Choose between:

- **Application**: Web apps, mobile apps, etc. (relaxed rules)
- **Library**: npm packages, shared libraries (stricter rules)

### 2. TypeScript Support

Choose whether to enable TypeScript support:

```typescript
typescript: true, // or false
```

### 3. Framework Selection

Select the frameworks you're using:

- Vue (2 or 3)
- React
- Svelte
- Solid
- Next.js
- Nuxt
- Astro
- Angular
- UnoCSS

Multiple selection is supported.

### 4. Accessibility Options

Choose whether to enable accessibility rules:

- Vue a11y
- JSX a11y

### 5. Formatter Choice

Choose between:

- **Stylistic** (default): Pure ESLint-based formatting
- **Prettier**: Integrate Prettier with ESLint

### 6. Additional Options

Configure additional features:

- **Git ignore**: Auto-read `.gitignore` patterns
- **Auto-sort**: Sort `package.json` and `tsconfig.json`
- **Command scripts**: Relax rules for CLI scripts
- **Disables**: Relax rules in config files

## CLI Output

The CLI will:

1. Create `eslint.config.ts` in your project root
2. Install necessary dependencies
3. Optionally update your `.vscode/settings.json`

### Example Generated Config

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

## Programmatic Usage

You can also use the CLI programmatically:

```typescript
import { runCLI } from '@eslint-sets/eslint-config/cli'

await runCLI({
  type: 'lib',
  typescript: true,
  react: true,
  prettier: true,
  stylistic: false,
})
```

## CLI Options

### Non-Interactive Mode

Run with specific options to skip prompts:

```bash
npx @eslint-sets/eslint-config --type lib --typescript --react --no-stylistic --prettier
```

### Available Flags

| Flag | Description | Values |
|------|-------------|--------|
| `--type` | Project type | `app`, `lib` |
| `--typescript` | Enable TypeScript | boolean |
| `--vue` | Enable Vue | boolean |
| `--vue-version` | Vue version | `2`, `3` |
| `--react` | Enable React | boolean |
| `--svelte` | Enable Svelte | boolean |
| `--solid` | Enable Solid | boolean |
| `--nextjs` | Enable Next.js | boolean |
| `--nuxt` | Enable Nuxt | boolean |
| `--astro` | Enable Astro | boolean |
| `--angular` | Enable Angular | boolean |
| `--unocss` | Enable UnoCSS | boolean |
| `--a11y` | Enable accessibility | boolean |
| `--stylistic` | Use Stylistic | boolean |
| `--prettier` | Use Prettier | boolean |
| `--gitignore` | Read .gitignore | boolean |
| `--sort` | Auto-sort files | boolean |
| `--command` | Relax script rules | boolean |
| `--disables` | Relax config rules | boolean |

### Example

```bash
# Create a Vue 3 library project with Prettier
npx @eslint-sets/eslint-config \
  --type lib \
  --typescript \
  --vue \
  --vue-version 3 \
  --prettier \
  --no-stylistic
```

## Updating Existing Config

The CLI can update an existing `eslint.config.ts`:

```bash
npx @eslint-sets/eslint-config --update
```

This preserves your custom rules while updating framework configurations.

## CI/CD Integration

Use the CLI in CI/CD pipelines for automated setup:

```yaml
# GitHub Actions example
- name: Setup ESLint
  run: npx @eslint-sets/eslint-config --type app --typescript --react --no-interaction
```

## Troubleshooting

### CLI Not Found

If you get "command not found", make sure you're using `npx`, `pnpm dlx`, or `bunx`:

```bash
# Wrong
@eslint-sets/eslint-config

# Correct
npx @eslint-sets/eslint-config
```

### Dependencies Not Installed

The CLI tries to install dependencies automatically. If it fails, install manually:

```bash
pnpm install -D @eslint-sets/eslint-config eslint
```

### TypeScript Config Errors

If you get TypeScript errors in `eslint.config.ts`:

1. Make sure `jiti` is installed (for pnpm users)
2. Check that your `tsconfig.json` includes the config file
3. Verify you're using ESM format (`eslint.config.ts`, not `.cjs`)