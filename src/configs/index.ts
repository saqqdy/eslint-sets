import type { Linter } from 'eslint'
import type { Options, OptionsOverrides } from '../types'
import type { TypeScriptOptions } from './typescript'
import type { VueOptions } from './vue'
import type { ReactOptions } from './react'
import { ignores } from './ignores'
import { javascript } from './javascript'
import { typescript } from './typescript'
import { vue } from './vue'
import { react } from './react'
import { svelte } from './svelte'
import { solid } from './solid'
import { jsonc } from './jsonc'
import { sortPackageJson, sortTsconfig } from './sort'
import { yaml } from './yaml'
import { markdown } from './markdown'
import { toml } from './toml'
import { imports } from './imports'
import { unicorn } from './unicorn'
import { perfectionist } from './perfectionist'
import { regexp } from './regexp'
import { test } from './test'
import { node } from './node'
import { prettier } from './prettier'
import { stylistic } from './stylistic'
import { disables } from './disables'
import { command } from './command'
import { nextjs } from './nextjs'
import { nuxt } from './nuxt'
import { astro } from './astro'
import { angular } from './angular'
import { unocss } from './unocss'
import { e18e } from './e18e'
import { pnpm } from './pnpm'
import { formatters } from './formatters'
import { vueA11y } from './vue-a11y'
import { eslintComments } from './eslint-comments'
import { jsxA11y } from './jsx-a11y'
import { noOnlyTests } from './no-only-tests'
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
		type: _type = 'app',
		autoDetect = true,
		typescript: tsOption = true,
		vue: vueOption = 'auto',
		react: reactOption = 'auto',
		svelte: svelteOption = 'auto',
		solid: solidOption = 'auto',
		nextjs: nextjsOption = 'auto',
		nuxt: nuxtOption = 'auto',
		astro: astroOption = 'auto',
		angular: angularOption = 'auto',
		jsonc: jsoncOption = true,
		yaml: yamlOption = true,
		markdown: markdownOption = true,
		toml: tomlOption = true,
		imports: importsOption = true,
		unicorn: unicornOption = true,
		perfectionist: perfectionistOption = true,
		regexp: regexpOption = true,
		test: testOption = true,
		node: nodeOption = true,
		eslintComments: eslintCommentsOption = true,
		prettier: prettierOption = true,
		stylistic: stylisticOption = false,
		unocss: unocssOption = 'auto',
		e18e: e18eOption = false,
		pnpm: pnpmOption = false,
		formatters: formattersOption = false,
		gitignore: gitignoreOption = true,
		disables: disablesOption = true,
		command: commandOption = true,
		sortPackageJson: sortPackageJsonOption = true,
		sortTsconfig: sortTsconfigOption = true,
		jsxA11y: jsxA11yOption = false,
		isInEditor,
		ignores: ignorePatterns,
		rules: customRules = {},
		extends: extendConfigs = [],
	} = options

	// Detect editor environment
	const inEditor = isInEditor ?? isInEditorEnv()

	if (inEditor) {
		console.log('[@eslint-sets/eslint-config] Detected running in editor, some rules are disabled.')
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
		configs.push(...typescript(tsOpts))
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
		reactOpts.a11y = reactOpts.a11y ?? jsxA11yOption
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
		configs.push(perfectionist())
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
		jsxA11yOption &&
		!(isEnabled(reactOption) || (isAutoDetect(reactOption) && autoDetect && hasReact()))
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
		const stylisticOpts = typeof stylisticOption === 'object' ? stylisticOption : {}
		configs.push(...stylistic(stylisticOpts))
	}

	// Prettier (should be last, before custom rules)
	// Note: When stylistic is enabled, prettier is typically disabled
	if (prettierOption !== false && !stylisticOption) {
		configs.push(...prettier())
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

// Export utilities
export * from '../utils'

// Export all config modules
export {
	vue,
	yaml,
	test,
	node,
	toml,
	nuxt,
	e18e,
	pnpm,
	react,
	jsonc,
	solid,
	astro,
	svelte,
	regexp,
	nextjs,
	unocss,
	angular,
	ignores,
	imports,
	unicorn,
	command,
	jsxA11y,
	vueA11y,
	markdown,
	prettier,
	disables,
	stylistic,
	formatters,
	javascript,
	typescript,
	noOnlyTests,
	sortTsconfig,
	perfectionist,
	eslintComments,
	sortPackageJson,
}

// Export plugin helpers
export * from '../plugins'

// Export constants
export * from '../constants'

// Export types
export type { Linter, Options, ProjectType, FrameworkOptions, OptionsOverrides } from '../types'
export type { VueOptions } from './vue'
export type { ReactOptions } from './react'
export type { TypeScriptOptions } from './typescript'
