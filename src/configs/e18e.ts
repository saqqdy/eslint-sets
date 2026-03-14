import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_SRC } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * e18e (modernization) configuration options
 */
export type E18eOptions = OptionsOverrides

// Type definition for e18e plugin
interface E18ePlugin {
	configs: {
		recommended: Linter.Config
	}
	rules: Linter.RulesRecord
}

/**
 * e18e modernization configuration
 * Provides rules for modernizing JavaScript/TypeScript code
 */
export async function e18e(options: E18eOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {} } = options

	const plugin = await loadPlugin<E18ePlugin>('@e18e/eslint-plugin')

	if (!plugin) {
		return []
	}

	return [
		{
			files: [GLOB_SRC],
			name: 'eslint-sets/e18e',
			plugins: {
				e18e: plugin as any,
			},
			rules: {
				'e18e/no-legacy-object-iteration': 'warn',
				// e18e modernization rules
				'e18e/prefer-array-flat': 'warn',
				'e18e/prefer-array-flat-map': 'warn',
				'e18e/prefer-array-from-async': 'warn',
				'e18e/prefer-object-from-entries': 'warn',
				'e18e/prefer-spread': 'warn',
				'e18e/prefer-string-replace-all': 'warn',

				// User overrides
				...overrides,
			},
		},
	]
}
