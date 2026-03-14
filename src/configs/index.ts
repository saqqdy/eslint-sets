import type { Linter } from 'eslint'
import type { Options, OptionsOverrides, PerfectionistOptions } from '../types'
import type { PrettierOptions } from './prettier'
import type { ReactOptions } from './react'
import type { StylisticOptions } from './stylistic'
import type { TypeScriptOptions } from './typescript'
import type { VueOptions } from './vue'
import {
	hasAngular,
	hasAstro,
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
	combine,
	getGitignorePatterns,
	getOverrides,
	isInEditorEnv,
	processIgnores,
	resolveSubOptions,
} from '../utils'
import { angular } from './angular'
import { astro } from './astro'
import { command } from './command'
import { disables } from './disables'
import { e18e } from './e18e'
import { eslintComments } from './eslint-comments'
import { formatters } from './formatters'
import { ignores } from './ignores'
import { imports } from './imports'
import { javascript } from './javascript'
import { jsonc } from './jsonc'
import { jsxA11y } from './jsx-a11y'
import { markdown } from './markdown'
import { nextjs } from './nextjs'
import { noOnlyTests } from './no-only-tests'
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
import { vueA11y } from './vue-a11y'
import { yaml } from './yaml'

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
 * Resolve sub-options with overrides
 */
function resolveOptionsOverrides<K extends string>(
	options: Record<string, unknown>,
	key: K,
): OptionsOverrides {
	const subOptions = resolveSubOptions(options, key)

	return {
		overrides: (subOptions.overrides as Linter.RulesRecord) || {},
	}
}

/**
 * Create the ESLint configuration
 */
export async function config(options: Options = {}): Promise<Linter.Config[]> {
	const {
		angular: angularOption = 'auto',
		astro: astroOption = 'auto',
		autoDetect = true,
		command: commandOption = true,
		disables: disablesOption = true,
		e18e: e18eOption = false,
		eslintComments: eslintCommentsOption = true,
		extends: extendConfigs = [],
		formatters: formattersOption = false,
		gitignore: gitignoreOption = true,
		ignores: ignorePatterns,
		imports: importsOption = true,
		isInEditor,
		jsonc: jsoncOption = true,
		jsxA11y: jsxA11yOption = false,
		markdown: markdownOption = true,
		nextjs: nextjsOption = 'auto',
		node: nodeOption = true,
		nuxt: nuxtOption = 'auto',
		perfectionist: perfectionistOption = true,
		pnpm: pnpmOption = false,
		prettier: prettierOption = false,
		react: reactOption = 'auto',
		regexp: regexpOption = true,
		rules: customRules = {},
		solid: solidOption = 'auto',
		sortPackageJson: sortPackageJsonOption = true,
		sortTsconfig: sortTsconfigOption = true,
		stylistic: stylisticOption = true,
		svelte: svelteOption = 'auto',
		test: testOption = true,
		toml: tomlOption = true,
		type: _type = 'app',
		typescript: tsOption = true,
		unicorn: unicornOption = true,
		unocss: unocssOption = 'auto',
		vue: vueOption = 'auto',
		yaml: yamlOption = true,
	} = options

	// Detect editor environment
	const inEditor = isInEditor ?? isInEditorEnv()

	if (inEditor) {
		console.info('[@eslint-sets/eslint-config] Detected running in editor, some rules are disabled.')
	}

	const configs: Linter.Config[] = []

	// Collect all ignore patterns
	const allIgnores = processIgnores(ignorePatterns)

	// Add gitignore patterns if enabled
	if (gitignoreOption) {
		const gitignorePatterns = await getGitignorePatterns()

		allIgnores.push(...gitignorePatterns)
	}

	// Ignores
	configs.push(ignores(allIgnores))

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
		configs.push(...(await typescript(tsOpts)))
	}

	// Vue
	if (isEnabled(vueOption) || (isAutoDetect(vueOption) && autoDetect && hasVue())) {
		const vueOpts: VueOptions = isOptionsObject(vueOption) ? { ...vueOption } : {}

		vueOpts.overrides = getOverrides(options as Record<string, unknown>, 'vue')
		configs.push(...(await vue(vueOpts)))
	}

	// React
	if (isEnabled(reactOption) || (isAutoDetect(reactOption) && autoDetect && hasReact())) {
		const reactOpts: ReactOptions = isOptionsObject(reactOption) ? { ...reactOption } : {}

		reactOpts.overrides = getOverrides(options as Record<string, unknown>, 'react')
		configs.push(...(await react(reactOpts)))
	}

	// Svelte
	if (isEnabled(svelteOption) || (isAutoDetect(svelteOption) && autoDetect && hasSvelte())) {
		configs.push(...(await svelte()))
	}

	// Solid
	if (isEnabled(solidOption) || (isAutoDetect(solidOption) && autoDetect && hasSolid())) {
		configs.push(...(await solid()))
	}

	// Next.js
	if (isEnabled(nextjsOption) || (isAutoDetect(nextjsOption) && autoDetect && hasNextjs())) {
		configs.push(
			...(await nextjs(resolveOptionsOverrides(options as Record<string, unknown>, 'nextjs'))),
		)
	}

	// Nuxt
	if (isEnabled(nuxtOption) || (isAutoDetect(nuxtOption) && autoDetect && hasNuxt())) {
		configs.push(...nuxt(resolveOptionsOverrides(options as Record<string, unknown>, 'nuxt')))
	}

	// Astro
	if (isEnabled(astroOption) || (isAutoDetect(astroOption) && autoDetect && hasAstro())) {
		configs.push(
			...(await astro(resolveOptionsOverrides(options as Record<string, unknown>, 'astro'))),
		)
	}

	// Angular
	if (isEnabled(angularOption) || (isAutoDetect(angularOption) && autoDetect && hasAngular())) {
		configs.push(
			...(await angular(resolveOptionsOverrides(options as Record<string, unknown>, 'angular'))),
		)
	}

	// JSON/JSONC
	if (jsoncOption !== false) {
		const jsoncOpts = typeof jsoncOption === 'object' ? jsoncOption : {}

		configs.push(...jsonc(jsoncOpts))
	}

	// YAML
	if (yamlOption !== false) {
		const yamlOpts = typeof yamlOption === 'object' ? yamlOption : {}

		configs.push(...yaml(yamlOpts))
	}

	// Markdown
	if (markdownOption !== false) {
		const markdownOpts = typeof markdownOption === 'object' ? markdownOption : {}

		configs.push(...(await markdown(markdownOpts)))
	}

	// TOML
	if (tomlOption !== false) {
		configs.push(...toml())
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

		configs.push(test(testOpts))
		configs.push(...(await noOnlyTests()))
	}

	// Node
	if (nodeOption !== false) {
		configs.push(...node())
	}

	// ESLint Comments
	if (eslintCommentsOption !== false) {
		configs.push(...(await eslintComments()))
	}

	// Disables (for specific file types)
	if (disablesOption !== false) {
		configs.push(...disables())
	}

	// Command (for scripts/bin files)
	if (commandOption !== false) {
		configs.push(...command())
	}

	// Sort package.json
	if (sortPackageJsonOption !== false) {
		configs.push(...(await sortPackageJson()))
	}

	// Sort tsconfig.json
	if (sortTsconfigOption !== false) {
		configs.push(...(await sortTsconfig()))
	}

	// JSX A11y (if not already included in React)
	if (
		jsxA11yOption
		&& !(isEnabled(reactOption) || (isAutoDetect(reactOption) && autoDetect && hasReact()))
	) {
		configs.push(...(await jsxA11y()))
	}

	// UnoCSS
	if (isEnabled(unocssOption) || (isAutoDetect(unocssOption) && autoDetect && hasUnoCSS())) {
		configs.push(
			...(await unocss(resolveOptionsOverrides(options as Record<string, unknown>, 'unocss'))),
		)
	}

	// e18e (modernization rules)
	if (e18eOption !== false && e18eOption !== undefined) {
		configs.push(...(await e18e(typeof e18eOption === 'object' ? e18eOption : {})))
	}

	// pnpm workspace
	if (pnpmOption !== false && pnpmOption !== undefined) {
		configs.push(...(await pnpm(typeof pnpmOption === 'object' ? pnpmOption : {})))
	}

	// External formatters (CSS, HTML, XML, SVG, GraphQL)
	if (formattersOption !== false && formattersOption !== undefined) {
		configs.push(
			...(await formatters(typeof formattersOption === 'object' ? formattersOption : {})),
		)
	}

	// Stylistic (code formatting with ESLint)
	if (stylisticOption !== false && stylisticOption !== undefined) {
		const stylisticOpts: StylisticOptions = typeof stylisticOption === 'object' ? stylisticOption : {}

		configs.push(...stylistic(stylisticOpts))
	}

	// Prettier (should be last, before custom rules)
	// Note: When stylistic is enabled (default), prettier is disabled to avoid conflicts
	if (prettierOption !== false && stylisticOption === false) {
		const prettierOpts: PrettierOptions = typeof prettierOption === 'object' ? prettierOption : {}

		configs.push(...prettier(prettierOpts))
	}

	// Custom rules
	if (Object.keys(customRules).length > 0) {
		configs.push({
			name: 'eslint-sets/custom-rules',
			rules: customRules,
		})
	}

	// Extended configs
	if (extendConfigs.length > 0) {
		configs.push(...extendConfigs)
	}

	return combine(...configs)
}

// Export constants
export * from '../constants'

// Export all config modules
export {
	angular,
	astro,
	command,
	disables,
	e18e,
	eslintComments,
	formatters,
	ignores,
	imports,
	javascript,
	jsonc,
	jsxA11y,
	markdown,
	nextjs,
	node,
	noOnlyTests,
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
	vueA11y,
	yaml,
}

// Export plugin helpers
export * from '../plugins'

// Export types
export type { FrameworkOptions, Linter, Options, OptionsOverrides, ProjectType } from '../types'

// Export utilities
export * from '../utils'
export type { ReactOptions } from './react'
export type { TypeScriptOptions } from './typescript'
export type { VueOptions } from './vue'
