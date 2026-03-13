import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_TESTS } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * No only tests configuration options
 */
export type NoOnlyTestsOptions = OptionsOverrides

// Type definition for no-only-tests plugin (no types available)
interface ESLintPluginNoOnlyTests {
	rules: Linter.RulesRecord
}

/**
 * No only tests configuration
 * Prevents committing .only() tests
 */
export async function noOnlyTests(options: NoOnlyTestsOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {} } = options

	const plugin = await loadPlugin<ESLintPluginNoOnlyTests>('eslint-plugin-no-only-tests')

	if (!plugin) {
		return []
	}

	return [
		{
			name: 'eslint-sets/no-only-tests',
			files: [GLOB_TESTS],
			plugins: {
				'no-only-tests': plugin as any,
			},
			rules: {
				'no-only-tests/no-only-tests': [
					'error',
					{
						block: [
							'describe',
							'it',
							'context',
							'suite',
							'test',
							'spec',
							'beforeEach',
							'afterEach',
							'before',
							'after',
						],
						focus: ['only', 'skip'],
					},
				],

				// User overrides
				...overrides,
			},
		},
	]
}
