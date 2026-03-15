import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import unicornPlugin from 'eslint-plugin-unicorn'
import { GLOB_SRC } from '../constants'

/**
 * Unicorn configuration options
 */
export interface UnicornOptions extends OptionsOverrides {
	/**
	 * Include all recommended rules
	 * @default false
	 */
	allRecommended?: boolean
}

/**
 * Unicorn configuration
 */
export function unicorn(options: UnicornOptions = {}): Linter.Config {
	const { allRecommended = false, overrides = {} } = options

	return {
		files: [GLOB_SRC],
		name: 'eslint-sets/unicorn',
		plugins: {
			unicorn: unicornPlugin as any,
		},
		rules: {
			// Use all recommended rules if requested
			...(allRecommended ? unicornPlugin.configs.recommended.rules : {
				// Curated essential rules
				'unicorn/consistent-empty-array-spread': 'error',
				'unicorn/error-message': 'error',
				'unicorn/escape-case': 'error',
				'unicorn/new-for-builtins': 'error',
				'unicorn/no-instanceof-array': 'error',
				'unicorn/no-new-array': 'error',
				'unicorn/no-new-buffer': 'error',
				'unicorn/number-literal-case': 'error',
				'unicorn/prefer-array-find': 'error',
				'unicorn/prefer-dom-node-text-content': 'error',
				'unicorn/prefer-includes': 'error',
				'unicorn/prefer-node-protocol': 'error',
				'unicorn/prefer-number-properties': 'error',
				'unicorn/prefer-string-starts-ends-with': 'error',
				'unicorn/prefer-type-error': 'error',
				'unicorn/throw-new-error': 'error',
			}),

			// User overrides
			...overrides,
		},
	}
}
