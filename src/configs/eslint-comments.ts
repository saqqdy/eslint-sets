import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_SRC } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * ESLint comments configuration options
 */
export type EslintCommentsOptions = OptionsOverrides

// Type definition for ESLint comments plugin
type ESLintPluginEslintComments = typeof import('@eslint-community/eslint-plugin-eslint-comments')

/**
 * ESLint comments configuration
 * Rules for ESLint directive comments (eslint-disable, etc.)
 */
export async function eslintComments(
	options: EslintCommentsOptions = {},
): Promise<Linter.Config[]> {
	const { overrides = {} } = options

	const plugin = await loadPlugin<ESLintPluginEslintComments>(
		'@eslint-community/eslint-plugin-eslint-comments',
	)

	if (!plugin) {
		return []
	}

	return [
		{
			files: [GLOB_SRC],
			name: 'eslint-sets/eslint-comments',
			plugins: {
				'@eslint-community/eslint-comments': plugin as any,
			},
			rules: {
				// Require ESLint directive comments to be meaningful
				'@eslint-community/eslint-comments/disable-enable-pair': 'error',
				'@eslint-community/eslint-comments/no-aggregating-enable': 'error',
				'@eslint-community/eslint-comments/no-duplicate-disable': 'error',
				'@eslint-community/eslint-comments/no-unlimited-disable': 'error',
				'@eslint-community/eslint-comments/no-unused-disable': 'error',
				'@eslint-community/eslint-comments/no-unused-enable': 'error',
				'@eslint-community/eslint-comments/require-description': 'off',

				// User overrides
				...overrides,
			},
		},
	]
}
