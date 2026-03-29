import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import importPlugin from 'eslint-plugin-import-lite'
import { GLOB_SRC } from '../constants'

/**
 * Import configuration options
 */
export interface ImportsOptions extends OptionsOverrides {
	/**
	 * Enable stylistic rules
	 * @default true
	 */
	stylistic?: boolean
}

/**
 * Import configuration
 *
 * Note: Import sorting is handled by perfectionist/sort-imports
 */
export function imports(options: ImportsOptions = {}): Linter.Config {
	const { overrides = {}, stylistic = true } = options

	return {
		name: 'eslint-sets/imports',
		files: [GLOB_SRC],
		plugins: {
			import: importPlugin,
		},
		rules: {
			// Essential import rules
			'import/first': 'error',
			'import/no-duplicates': 'error',
			'import/no-mutable-exports': 'error',
			'import/no-named-default': 'error',
			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

			// Stylistic rules
			...(stylistic ? {
				'import/newline-after-import': ['error', { count: 1 }],
			} : {}),

			// User overrides
			...overrides,
		},
	}
}
