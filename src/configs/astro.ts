import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_ASTRO } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Astro configuration options
 */
export type AstroOptions = OptionsOverrides

// Type definitions for Astro plugin
type ESLintPluginAstro = typeof import('eslint-plugin-astro')
type AstroEslintParser = typeof import('astro-eslint-parser')

/**
 * Astro configuration
 */
export async function astro(options: AstroOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {} } = options

	const [astroPlugin, astroParser] = await Promise.all([
		loadPlugin<ESLintPluginAstro>('eslint-plugin-astro'),
		loadPlugin<AstroEslintParser>('astro-eslint-parser'),
	])

	if (!astroPlugin || !astroParser) {
		return []
	}

	return [
		{
			name: 'eslint-sets/astro',
			files: [GLOB_ASTRO],
			languageOptions: {
				parser: astroParser,
				parserOptions: {
					ecmaVersion: 'latest',
					sourceType: 'module',
				},
			},
			plugins: {
				astro: astroPlugin as any,
			},
			rules: {
				// Astro recommended rules - extract from flat config array
				...(Array.isArray(astroPlugin.configs.recommended)
					? astroPlugin.configs.recommended.find((c: any) => c.rules)?.rules || {}
					: {}),

				// Additional Astro rules
				'astro/semi': 'off',
				'astro/missing-client-only-directive-value': 'error',
				'astro/no-set-html-directive': 'off',
				'astro/no-unused-css-selector': 'warn',
				'astro/prefer-class-list-directive': 'warn',
				'astro/prefer-object-class-list': 'warn',
				'astro/prefer-split-class-list': 'warn',
				'astro/valid-astro': 'error',

				// User overrides
				...overrides,
			},
		},
	]
}
