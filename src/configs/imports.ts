import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import importPlugin from 'eslint-plugin-import-x'
import unusedImports from 'eslint-plugin-unused-imports'
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
 * Based on antfu/eslint-config
 *
 * Note: Import sorting is handled by perfectionist/sort-imports, not import-x/order
 */
export function imports(options: ImportsOptions = {}): Linter.Config {
	const { overrides = {}, stylistic = true } = options

	return {
		files: [GLOB_SRC],
		name: 'eslint-sets/imports',
		plugins: {
			'import-x': importPlugin,
			'unused-imports': unusedImports,
		},
		rules: {
			// Import rules
			'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import-x/first': 'error',
			'import-x/no-duplicates': 'error',
			'import-x/no-mutable-exports': 'error',
			'import-x/no-named-default': 'error',
			'import-x/no-self-import': 'error',
			'import-x/no-webpack-loader-syntax': 'error',
			// Note: import-x/order is disabled - sorting is handled by perfectionist/sort-imports
			'import-x/order': 'off',

			...(stylistic
				? {
					'import-x/newline-after-import': ['error', { count: 1 }],
				}
				: {}),

			// Unused imports
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'error',
				{
					args: 'after-used',
					argsIgnorePattern: '^_',
					ignoreRestSiblings: true,
					vars: 'all',
					varsIgnorePattern: '^_',
				},
			],

			// User overrides
			...overrides,
		},
	}
}
