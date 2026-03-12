import type { Linter } from 'eslint'
import type { Options, FrameworkOptions } from '../types'
import type { TypeScriptOptions } from './typescript'
import { ignores } from './ignores'
import { javascript } from './javascript'
import { typescript } from './typescript'
import { vue } from './vue'
import { react } from './react'
import { svelte } from './svelte'
import { solid } from './solid'
import { jsonc } from './jsonc'
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
import { hasVue, hasReact, hasSvelte, hasTypeScript, hasSolid } from '../plugins'
import { combine, getGitignorePatterns } from '../utils'

/**
 * Check if a framework option is enabled
 */
function isEnabled(option: FrameworkOptions | undefined): boolean {
	if (option === undefined) return false
	if (option === 'auto') return false
	return option === true || typeof option === 'object'
}

/**
 * Check if a framework should be auto-detected
 */
function isAutoDetect(option: FrameworkOptions | undefined): boolean {
	return option === 'auto' || option === undefined
}

/**
 * Create the ESLint configuration
 */
export async function config(options: Options = {}): Promise<Linter.Config[]> {
	const {
		autoDetect = true,
		typescript: tsOption = true,
		vue: vueOption = 'auto',
		react: reactOption = 'auto',
		svelte: svelteOption = 'auto',
		solid: solidOption = 'auto',
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
		prettier: prettierOption = true,
		stylistic: stylisticOption = false,
		gitignore: gitignoreOption = false,
		disables: disablesOption = true,
		command: commandOption = true,
		ignores: ignorePatterns = [],
		rules: customRules = {},
		extends: extendConfigs = [],
	} = options

	const configs: Linter.Config[] = []

	// Collect all ignore patterns
	const allIgnores = [...ignorePatterns]

	// Add gitignore patterns if enabled
	if (gitignoreOption) {
		const gitignorePatterns = await getGitignorePatterns()
		allIgnores.push(...gitignorePatterns)
	}

	// Ignores
	configs.push(ignores(allIgnores))

	// Base JavaScript
	configs.push(javascript())

	// TypeScript
	if (isEnabled(tsOption) || (isAutoDetect(tsOption) && autoDetect && hasTypeScript())) {
		const tsOpts: TypeScriptOptions =
			typeof tsOption === 'object' ? tsOption : {}
		configs.push(...typescript(tsOpts))
	}

	// Vue
	if (isEnabled(vueOption) || (isAutoDetect(vueOption) && autoDetect && hasVue())) {
		configs.push(...vue())
	}

	// React
	if (isEnabled(reactOption) || (isAutoDetect(reactOption) && autoDetect && hasReact())) {
		configs.push(...(await react()))
	}

	// Svelte
	if (isEnabled(svelteOption) || (isAutoDetect(svelteOption) && autoDetect && hasSvelte())) {
		configs.push(...(await svelte()))
	}

	// Solid
	if (isEnabled(solidOption) || (isAutoDetect(solidOption) && autoDetect && hasSolid())) {
		configs.push(...(await solid()))
	}

	// JSON/JSONC
	if (jsoncOption !== false) {
		configs.push(...jsonc())
	}

	// YAML
	if (yamlOption !== false) {
		configs.push(...yaml())
	}

	// Markdown
	if (markdownOption !== false) {
		configs.push(...markdown())
	}

	// TOML
	if (tomlOption !== false) {
		configs.push(...toml())
	}

	// Imports
	if (importsOption !== false) {
		configs.push(imports())
	}

	// Unicorn
	if (unicornOption !== false) {
		configs.push(unicorn())
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
		configs.push(test())
	}

	// Node
	if (nodeOption !== false) {
		configs.push(...node())
	}

	// Disables (for specific file types)
	if (disablesOption !== false) {
		configs.push(...disables())
	}

	// Command (for scripts/bin files)
	if (commandOption !== false) {
		configs.push(...command())
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

export {
	vue,
	yaml,
	test,
	node,
	react,
	jsonc,
	svelte,
	solid,
	toml,
	regexp,
	ignores,
	imports,
	unicorn,
	command,
	markdown,
	prettier,
	disables,
	stylistic,
	javascript,
	typescript,
	perfectionist,
}
