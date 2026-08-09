import type { Linter } from 'eslint'
import type { Options, PerfectionistOptions } from '../types'
import type { PrettierOptions } from './prettier'
import type { ReactOptions } from './react'
import type { StylisticOptions } from './stylistic'
import type { TypeScriptOptions } from './typescript'
import type { VueOptions } from './vue'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import {
	hasAngular,
	hasAstro,
	hasJsxFiles,
	hasNextjs,
	hasNuxt,
	hasReact,
	hasSolid,
	hasSvelte,
	hasTypeScript,
	hasUnoCSS,
	hasVue,
} from '../plugins'
import {
	getOverrides,
	isInEditorEnv,
	processIgnores,
} from '../utils'
import { angular } from './angular'
import { astro } from './astro'
import { command } from './command'
import { comments } from './comments'
import { disables } from './disables'
import { formatters } from './formatters'
import { ignores } from './ignores'
import { imports } from './imports'
import { javascript } from './javascript'
import { jsdoc } from './jsdoc'
import { jsonc } from './jsonc'
import { jsx } from './jsx'
import { markdown } from './markdown'
import { nextjs } from './nextjs'
import { node } from './node'
import { nuxt } from './nuxt'
import { perfectionist } from './perfectionist'
import { pnpm } from './pnpm'
import { prettier } from './prettier'
import { react } from './react'
import { regexp } from './regexp'
import { solid } from './solid'
import { sortPackageJson, sortTsconfig } from './sort'
import { stylistic } from './stylistic'
import { svelte } from './svelte'
import { test } from './test'
import { toml } from './toml'
import { typescript } from './typescript'
import { unicorn } from './unicorn'
import { unocss } from './unocss'
import { vue } from './vue'
import { yaml } from './yaml'

/**
 * Central plugin-prefix renaming map. Applied once via
 * `composer.renamePlugins(...)` so individual configs use raw plugin rule
 * keys and stay free of per-config rename helpers.
 */
export const defaultPluginRenaming: Record<string, string> = {
	'@typescript-eslint': 'ts',
	'@eslint-react/dom': 'react-dom',
	'@eslint-react/web-api': 'react-web-api',
	'@eslint-react/naming-convention': 'react-naming-convention',
	'@eslint-react/hooks-extra': 'react-hooks-extra',
	'@eslint-react/rsc': 'react-rsc',
	'@eslint-react': 'react',
	'@next/next': 'next',
	n: 'node',
	'import-lite': 'import',
	'@stylistic': 'style',
	vitest: 'test',
	yml: 'yaml',
}

/**
 * Check if a framework option is enabled
 */
function isEnabled(option: unknown): boolean {
	if (option === undefined) return false
	if (option === 'auto') return false

	return option === true || typeof option === 'object'
}

/**
 * Check if a framework should be auto-detected
 */
function isAutoDetect(option: unknown): boolean {
	return option === 'auto' || option === undefined
}

/**
 * Check if an option is an options object (not boolean or 'auto')
 */
function isOptionsObject(option: unknown): option is Record<string, unknown> {
	return typeof option === 'object' && option !== null && !Array.isArray(option)
}

/**
 * Create the ESLint configuration.
 *
 * Returns a `FlatConfigComposer` (which extends `Promise<Linter.Config[]>`),
 * so the common `export default eslintConfig({...})` pattern is unchanged —
 * ESLint awaits it to a config array. The composer also exposes chainable
 * `.renamePlugins()` / `.override()` / `.append()` / `.prepend()`.
 */
export function config(options: Options = {}): FlatConfigComposer {
	const {
		type: _type = 'app',
		angular: angularOption = 'auto',
		astro: astroOption = 'auto',
		autoDetect = true,
		command: commandOption = true,
		comments: commentsOption = true,
		disables: disablesOption = true,
		extends: extendConfigs = [],
		formatters: formattersOption = false,
		gitignore: gitignoreOption = true,
		ignores: ignorePatterns,
		imports: importsOption = true,
		isInEditor,
		jsdoc: jsdocOption = true,
		jsonc: jsoncOption = true,
		jsx: jsxOption = false,
		languageOptions: customLanguageOptions,
		markdown: markdownOption = true,
		nextjs: nextjsOption = 'auto',
		node: nodeOption = true,
		nuxt: nuxtOption = 'auto',
		perfectionist: perfectionistOption = true,
		pnpm: pnpmOption = false,
		prettier: prettierOption = false,
		react: reactOption = false,
		regexp: regexpOption = true,
		rules: customRules = {},
		solid: solidOption = false,
		sortPackageJson: sortPackageJsonOption = true,
		sortTsconfig: sortTsconfigOption = true,
		stylistic: stylisticOption = true,
		svelte: svelteOption = false,
		test: testOption = true,
		toml: tomlOption = true,
		typescript: tsOption = true,
		unicorn: unicornOption = true,
		unocss: unocssOption = 'auto',
		vue: vueOption = 'auto',
		yaml: yamlOption = true,
	} = options

	// Detect editor environment
	const inEditor = isInEditor ?? isInEditorEnv()

	// Resolve stylistic options once — shared by vue/jsonc/yaml/toml/formatters/stylistic
	const stylisticOptions: false | StylisticOptions = stylisticOption === false ? false : typeof stylisticOption === 'object' ? { ...stylisticOption } : {}

	// Per-config items are pushed as resolvables (sync config, config array,
	// or a Promise of either) so `config()` can stay synchronous and return a
	// chainable composer. The composer resolves them lazily on await.
	type ResolvableConfig = Linter.Config | Linter.Config[] | Promise<Linter.Config[]> | false | undefined | null
	const configs: ResolvableConfig[] = []

	// Collect user-specified ignore patterns (defaults handled by ignores())
	const allIgnores = processIgnores(ignorePatterns)

	// Ignores
	configs.push(ignores(allIgnores))

	// Auto-read .gitignore with correct git semantics (root anchoring, nested
	// .gitignore) via eslint-config-flat-gitignore. Note: this no longer reads
	// .git/info/exclude (the hand-rolled impl did) — only .gitignore files.
	if (gitignoreOption) {
		configs.push(
			import('eslint-config-flat-gitignore').then(m => [m.default({ name: 'eslint-sets/gitignore', strict: false })]),
		)
	}

	// Base JavaScript
	configs.push(
		javascript({
			isInEditor: inEditor,
			overrides: getOverrides(options as Record<string, unknown>, 'javascript'),
		}),
	)

	// TypeScript
	if (isEnabled(tsOption) || (isAutoDetect(tsOption) && autoDetect && hasTypeScript())) {
		const tsOpts: TypeScriptOptions = isOptionsObject(tsOption) ? { ...tsOption } : {}

		tsOpts.overrides = getOverrides(options as Record<string, unknown>, 'typescript')
		tsOpts.type = _type // Pass project type for lib-specific rules
		configs.push(typescript(tsOpts))
	}

	// Vue
	if (isEnabled(vueOption) || (isAutoDetect(vueOption) && autoDetect && hasVue())) {
		const vueOpts: VueOptions = isOptionsObject(vueOption) ? { ...vueOption } : {}

		vueOpts.overrides = getOverrides(options as Record<string, unknown>, 'vue')

		configs.push(vue({ ...vueOpts, stylistic: stylisticOptions }))
	}

	// Configuration conflict detection
	// Warn if React is installed but explicitly disabled (and no Vue/Solid present)
	if (reactOption === false && hasReact() && !hasVue() && !hasSolid()) {
		console.warn(
			'\n[eslint-sets] ⚠️  Warning: "react" package detected but react: false.\n'
			+ '  This disables React-specific rules like react-dom/no-unknown-property.\n'
			+ '  JSX may incorrectly use "class" instead of "className".\n'
			+ '  Recommendation: Set react: "auto" or react: true\n',
		)
	}

	// Warn if JSX files exist but no JSX framework is enabled
	const hasJsxFramework = isEnabled(reactOption) || isEnabled(solidOption) || isEnabled(vueOption)
		|| (autoDetect && (hasReact() || hasSolid() || hasVue()))

	if (!hasJsxFramework && hasJsxFiles()) {
		console.warn(
			'\n[eslint-sets] ⚠️  Warning: JSX/TSX files detected but no JSX framework enabled.\n'
			+ '  This may cause incorrect linting of JSX attributes (e.g., "class" vs "className").\n'
			+ '  Recommendation: Set react/solid/vue to "auto" or true based on your framework.\n',
		)
	}

	// React
	if (isEnabled(reactOption) || (isAutoDetect(reactOption) && autoDetect && hasReact())) {
		const reactOpts: ReactOptions = isOptionsObject(reactOption) ? { ...reactOption } : {}

		reactOpts.overrides = getOverrides(options as Record<string, unknown>, 'react')
		configs.push(react(reactOpts))
	}

	// JSX (base JSX support with optional a11y)
	if (jsxOption !== false) {
		const jsxOpts = typeof jsxOption === 'object' ? jsxOption : {}
		configs.push(jsx(jsxOpts))
	}

	// Svelte
	if (isEnabled(svelteOption) || (isAutoDetect(svelteOption) && autoDetect && hasSvelte())) {
		configs.push(svelte())
	}

	// Solid
	if (isEnabled(solidOption) || (isAutoDetect(solidOption) && autoDetect && hasSolid())) {
		configs.push(solid())
	}

	// Next.js
	if (isEnabled(nextjsOption) || (isAutoDetect(nextjsOption) && autoDetect && hasNextjs())) {
		configs.push(nextjs({ overrides: getOverrides(options as Record<string, unknown>, 'nextjs') }))
	}

	// Nuxt
	if (isEnabled(nuxtOption) || (isAutoDetect(nuxtOption) && autoDetect && hasNuxt())) {
		configs.push(nuxt({ overrides: getOverrides(options as Record<string, unknown>, 'nuxt') }))
	}

	// Astro
	if (isEnabled(astroOption) || (isAutoDetect(astroOption) && autoDetect && hasAstro())) {
		configs.push(astro({ overrides: getOverrides(options as Record<string, unknown>, 'astro') }))
	}

	// Angular
	if (isEnabled(angularOption) || (isAutoDetect(angularOption) && autoDetect && hasAngular())) {
		configs.push(angular({ overrides: getOverrides(options as Record<string, unknown>, 'angular') }))
	}

	// JSON/JSONC
	if (jsoncOption !== false) {
		const jsoncOpts = typeof jsoncOption === 'object' ? jsoncOption : {}

		configs.push(jsonc({ ...jsoncOpts, stylistic: stylisticOptions }))
	}

	// YAML
	if (yamlOption !== false) {
		const yamlOpts = typeof yamlOption === 'object' ? yamlOption : {}

		// YAML uses double quotes by default (supports escape sequences)
		const yamlStylistic = stylisticOptions === false ? false : { ...stylisticOptions, quotes: 'double' as const }

		configs.push(yaml({ ...yamlOpts, stylistic: yamlStylistic }))
	}

	// Markdown
	if (markdownOption !== false) {
		const markdownOpts = typeof markdownOption === 'object' ? markdownOption : {}

		configs.push(markdown(markdownOpts))
	}

	// TOML
	if (tomlOption !== false) {
		const tomlOpts = typeof tomlOption === 'object' ? tomlOption : {}

		configs.push(toml({ ...tomlOpts, stylistic: stylisticOptions }))
	}

	// Imports
	if (importsOption !== false) {
		const importsOpts = typeof importsOption === 'object' ? importsOption : {}

		configs.push(imports(importsOpts))
	}

	// Unicorn
	if (unicornOption !== false) {
		const unicornOpts = typeof unicornOption === 'object' ? unicornOption : {}

		configs.push(unicorn(unicornOpts))
	}

	// Perfectionist
	if (perfectionistOption !== false) {
		const perfectionistOpts: PerfectionistOptions = typeof perfectionistOption === 'object' ? perfectionistOption : {}

		configs.push(perfectionist(perfectionistOpts))
	}

	// Regexp
	if (regexpOption !== false) {
		configs.push(regexp())
	}

	// Test
	if (testOption !== false) {
		const testOpts = typeof testOption === 'object' ? testOption : {}

		configs.push(test({ ...testOpts, isInEditor: inEditor }))
	}

	// Node
	if (nodeOption !== false) {
		configs.push(node())
	}

	// Comments (ESLint directive comments)
	if (commentsOption !== false) {
		configs.push(comments())
	}

	// JSDoc
	if (jsdocOption !== false) {
		configs.push(jsdoc(typeof jsdocOption === 'object' ? jsdocOption : {}))
	}

	// Disables (for specific file types)
	if (disablesOption !== false) {
		configs.push(disables())
	}

	// Command (for scripts/bin files)
	if (commandOption !== false) {
		configs.push(command())
	}

	// Sort package.json
	if (sortPackageJsonOption !== false) {
		configs.push(sortPackageJson())
	}

	// Sort tsconfig.json
	if (sortTsconfigOption !== false) {
		configs.push(sortTsconfig())
	}

	// UnoCSS
	if (isEnabled(unocssOption) || (isAutoDetect(unocssOption) && autoDetect && hasUnoCSS())) {
		configs.push(unocss({ overrides: getOverrides(options as Record<string, unknown>, 'unocss') }))
	}

	// pnpm workspace
	if (pnpmOption !== false && pnpmOption !== undefined) {
		configs.push(pnpm(typeof pnpmOption === 'object' ? pnpmOption : {}))
	}

	// External formatters (CSS, HTML, XML, SVG, GraphQL)
	if (formattersOption !== false && formattersOption !== undefined) {
		configs.push(
			formatters(
				typeof formattersOption === 'object' ? formattersOption : {},
				stylisticOptions === false ? {} : stylisticOptions,
			),
		)
	}

	// Stylistic (code formatting with ESLint)
	if (stylisticOption !== false && stylisticOption !== undefined) {
		configs.push(stylistic(stylisticOptions === false ? {} : stylisticOptions))
	}

	// Prettier (should be last, before custom rules)
	// Note: When stylistic is enabled (default), prettier is disabled to avoid conflicts
	if (prettierOption !== false && stylisticOption === false) {
		const prettierOpts: PrettierOptions = typeof prettierOption === 'object' ? prettierOption : {}

		configs.push(prettier(prettierOpts))
	}

	// Extended configs
	if (extendConfigs.length > 0) {
		configs.push(extendConfigs)
	}

	// Custom language options: append as a no-files config so ESLint merges
	// globals/parserOptions natively across all matching files.
	if (customLanguageOptions) {
		configs.push({
			name: 'eslint-sets/language-options',
			languageOptions: customLanguageOptions,
		})
	}

	// Build the composer from the resolvable configs. The composer extends
	// Promise<Linter.Config[]>, resolving the lazy items — including the
	// queued `.renamePlugins()` — when awaited.
	const composer = new FlatConfigComposer(...configs)

	// Append custom rules
	if (Object.keys(customRules).length > 0) {
		composer.append({
			name: 'eslint-sets/user-options',
			rules: customRules,
		})
	}

	// Centralize plugin-prefix renaming (replaces per-config renameRules calls)
	composer.renamePlugins(defaultPluginRenaming)

	return composer
}
// Export constants
export * from '../constants'

// Export all config modules
export {
	angular,
	astro,
	command,
	comments,
	disables,
	formatters,
	ignores,
	imports,
	javascript,
	jsdoc,
	jsonc,
	jsx,
	markdown,
	nextjs,
	node,
	nuxt,
	perfectionist,
	pnpm,
	prettier,
	react,
	regexp,
	solid,
	sortPackageJson,
	sortTsconfig,
	stylistic,
	svelte,
	test,
	toml,
	typescript,
	unicorn,
	unocss,
	vue,
	yaml,
}

// Export plugin helpers
export * from '../plugins'

// Export types
export type { FrameworkOptions, Linter, Options, OptionsOverrides, ProjectType } from '../types'

// Export utilities
export * from '../utils'
export type { ReactOptions } from './react'
export type { TomlOptions } from './toml'
export type { TypeScriptOptions } from './typescript'
export type { VueOptions } from './vue'
export type { YamlOptions } from './yaml'
