import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_TS, GLOB_VUE } from '../constants'

/**
 * Nuxt configuration options
 */
export interface NuxtOptions extends OptionsOverrides {
	/**
	 * Enable Nuxt-specific rules
	 * @default true
	 */
	rules?: boolean
}

/**
 * Nuxt configuration
 * Note: Nuxt projects use Vue configuration as base
 * This adds Nuxt-specific rules
 */
export function nuxt(options: NuxtOptions = {}): Linter.Config[] {
	const { overrides = {} } = options

	return [
		{
			files: [GLOB_VUE, GLOB_TS],
			name: 'eslint-sets/nuxt',
			rules: {
				// Nuxt-specific rules
				// Note: Most Nuxt-specific linting is handled by @nuxt/eslint
				// These are general best practices for Nuxt projects

				// Nuxt 3 best practices
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						argsIgnorePattern: '^_',
						caughtErrorsIgnorePattern: '^_',
						varsIgnorePattern: '^_|^use',
					},
				],

				// Allow auto-imports
				'no-undef': 'off',

				// User overrides
				...overrides,
			},
		},
	]
}
