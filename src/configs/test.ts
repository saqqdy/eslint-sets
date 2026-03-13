import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import vitest from '@vitest/eslint-plugin'
import { GLOB_TESTS } from '../constants'

/**
 * Test configuration options
 */
export interface TestOptions extends OptionsOverrides {
	/**
	 * Enable no-only-tests rule
	 * @default true
	 */
	noOnlyTests?: boolean
}

/**
 * Test configuration
 */
export function test(options: TestOptions = {}): Linter.Config {
	const { overrides = {} } = options

	return {
		files: [GLOB_TESTS],
		name: 'eslint-sets/test',
		plugins: {
			vitest,
		},
		rules: {
			...vitest.configs.recommended.rules,

			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			// Relax rules for test files
			'no-console': 'off',
			// Vitest rules
			'vitest/consistent-test-it': [
				'error',
				{
					fn: 'it',
				},
			],
			'vitest/expect-expect': 'off',
			'vitest/max-expects': 'off',
			'vitest/max-nested-describe': 'off',
			'vitest/no-alias-methods': 'error',
			'vitest/no-commented-out-tests': 'warn',
			'vitest/no-conditional-expect': 'warn',
			'vitest/no-conditional-in-test': 'error',
			'vitest/no-conditional-tests': 'warn',
			'vitest/no-disabled-tests': 'warn',
			'vitest/no-done-callback': 'error',
			'vitest/no-duplicate-hooks': 'error',
			'vitest/no-focused-tests': 'error',
			'vitest/no-hooks': 'off',
			'vitest/no-identical-title': 'error',
			'vitest/no-import-node-test': 'error',
			'vitest/no-interpolation-in-snapshots': 'error',
			'vitest/no-large-snapshots': 'off',
			'vitest/no-mocks-import': 'error',
			'vitest/no-restricted-matchers': 'off',
			'vitest/no-restricted-vi-methods': 'off',
			'vitest/no-standalone-expect': 'error',
			'vitest/no-test-prefixes': 'error',
			'vitest/no-test-return-statement': 'error',
			'vitest/padding-around-after-all-blocks': 'off',
			'vitest/padding-around-after-each-blocks': 'off',
			'vitest/padding-around-before-all-blocks': 'off',
			'vitest/padding-around-before-each-blocks': 'off',
			'vitest/padding-around-describe-blocks': 'off',
			'vitest/padding-around-test-blocks': 'off',
			'vitest/prefer-called-with': 'off',
			'vitest/prefer-comparison-matcher': 'error',
			'vitest/prefer-each': 'error',
			'vitest/prefer-equality-matcher': 'error',
			'vitest/prefer-expect-assertions': 'off',
			'vitest/prefer-expect-resolves': 'error',
			'vitest/prefer-hooks-in-order': 'error',
			'vitest/prefer-hooks-on-top': 'error',
			'vitest/prefer-lowercase-title': 'off',
			'vitest/prefer-mock-promise-shorthand': 'error',
			'vitest/prefer-snapshot-hint': 'off',
			'vitest/prefer-spy-on': 'off',
			'vitest/prefer-strict-boolean-matchers': 'off',
			'vitest/prefer-strict-equal': 'off',
			'vitest/prefer-to-be': 'error',
			'vitest/prefer-to-be-falsy': 'error',
			'vitest/prefer-to-be-object': 'error',
			'vitest/prefer-to-be-truthy': 'error',
			'vitest/prefer-to-contain': 'error',
			'vitest/prefer-to-have-length': 'error',
			'vitest/prefer-todo': 'warn',

			'vitest/require-hook': 'off',
			'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
			'vitest/require-to-throw-message': 'off',
			'vitest/require-top-level-describe': 'off',
			'vitest/valid-describe-callback': 'error',
			'vitest/valid-expect': 'error',
			'vitest/valid-title': 'error',

			// User overrides
			...overrides,
		},
	}
}
