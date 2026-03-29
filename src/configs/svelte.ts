import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_SVELTE } from '../constants'
import { loadPlugin } from '../plugins'

// Type definitions for Svelte plugins
type ESLintPluginSvelte = typeof import('eslint-plugin-svelte')
type SvelteEslintParser = typeof import('svelte-eslint-parser')

/**
 * Svelte configuration options
 */
export interface SvelteOptions extends OptionsOverrides {
	/**
	 * TypeScript is being used
	 * @default true
	 */
	typescript?: boolean
}

/**
 * Svelte configuration
 */
export async function svelte(options: SvelteOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {}, typescript = true } = options

	const [sveltePlugin, svelteParser] = await Promise.all([
		loadPlugin<ESLintPluginSvelte>('eslint-plugin-svelte'),
		loadPlugin<SvelteEslintParser>('svelte-eslint-parser'),
	])

	if (!sveltePlugin || !svelteParser) {
		return []
	}

	return [
		{
			name: 'eslint-sets/svelte',
			files: [GLOB_SVELTE],
			languageOptions: {
				globals: {
					// Svelte 5 Runes
					$state: 'readonly',
					$derived: 'readonly',
					$effect: 'readonly',
					$props: 'readonly',
					$bindable: 'readonly',
					$inspect: 'readonly',
					$host: 'readonly',
				},
				parser: svelteParser,
				parserOptions: {
					ecmaVersion: 'latest',
					extraFileExtensions: ['.svelte'],
					parser: typescript ? '@typescript-eslint/parser' : undefined,
					sourceType: 'module',
				},
			},
			plugins: {
				svelte: sveltePlugin as any,
			},
			processor: sveltePlugin.processors?.svelte,
			rules: {
				// Svelte recommended rules
				...(Array.isArray(sveltePlugin.configs.recommended) ? sveltePlugin.configs.recommended.find((c: any) => c.rules)?.rules || {} : {}),

				// Essential custom rules
				'svelte/block-lang': ['error', { script: typescript ? ['ts'] : ['js'] }],
				'svelte/button-has-type': 'error',
				'svelte/html-quotes': 'error',
				'svelte/html-self-closing': 'error',
				'svelte/no-at-html-tags': 'error',
				'svelte/no-inner-declarations': 'error',
				'svelte/no-reactive-literals': 'warn',
				'svelte/prefer-class-directive': 'error',
				'svelte/prefer-style-directive': 'error',
				'svelte/require-each-key': 'error',
				'svelte/shorthand-attribute': 'error',
				'svelte/shorthand-directive': 'error',
				'svelte/valid-compile': 'error',

				// User overrides
				...overrides,
			},
		},
	]
}
