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
 */
export function imports(options: ImportsOptions = {}): Linter.Config {
	const { stylistic = true, overrides = {} } = options

	return {
		name: 'eslint-sets/imports',
		files: [GLOB_SRC],
		plugins: {
			'import-x': importPlugin,
			'unused-imports': unusedImports,
		},
		rules: {
			// Import rules
			'import-x/first': 'error',
			'import-x/no-duplicates': 'error',
			'import-x/no-mutable-exports': 'error',
			'import-x/no-named-default': 'error',
			'import-x/no-self-import': 'error',
			'import-x/no-webpack-loader-syntax': 'error',
			'import-x/order': 'error',

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
