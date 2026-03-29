import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import vitest from '@vitest/eslint-plugin'
import { GLOB_TESTS } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Test configuration options
 */
export interface TestOptions extends OptionsOverrides {
	/**
	 * Whether running in editor environment
	 */
	isInEditor?: boolean
}

// Type definition for no-only-tests plugin
interface NoOnlyTestsPlugin {
	rules: Linter.RulesRecord
}

/**
 * Rename rules from vitest/* to test/*
 */
function renameVitestRules(rules: Linter.RulesRecord): Linter.RulesRecord {
	const result: Linter.RulesRecord = {}

	for (const [key, value] of Object.entries(rules)) {
		const newKey = key.replace(/^vitest\//, 'test/')
		result[newKey] = value
	}

	return result
}

/**
 * Create a merged test plugin combining vitest and no-only-tests
 */
function createTestPlugin(vitestPlugin: typeof vitest, noOnlyTestsPlugin: NoOnlyTestsPlugin | null) {
	const rules: Record<string, unknown> = {}

	// Add vitest rules (without prefix - ESLint adds the plugin prefix automatically)
	for (const [name, rule] of Object.entries(vitestPlugin.rules || {})) {
		rules[name] = rule
	}

	// Add no-only-tests rules (without prefix)
	if (noOnlyTestsPlugin?.rules) {
		for (const [name, rule] of Object.entries(noOnlyTestsPlugin.rules)) {
			rules[name] = rule
		}
	}

	return {
		meta: {
			name: 'eslint-sets/test-plugin',
			version: '1.0.0',
		},
		rules,
	}
}

/**
 * Test configuration
 */
export async function test(options: TestOptions = {}): Promise<Linter.Config[]> {
	const { isInEditor = false, overrides = {} } = options

	// Load no-only-tests plugin
	const noOnlyTestsPlugin = await loadPlugin<NoOnlyTestsPlugin>('eslint-plugin-no-only-tests')

	// Create merged test plugin
	const testPlugin = createTestPlugin(vitest, noOnlyTestsPlugin)

	// Get recommended rules and rename them
	const recommendedRules = renameVitestRules(vitest.configs.recommended.rules)

	return [
		{
			name: 'eslint-sets/test',
			files: [GLOB_TESTS],
			plugins: {
				test: testPlugin as any,
			},
			rules: {
				// Vitest core rules (renamed)
				...recommendedRules,

				// Additional vitest rules
				'test/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
				'test/no-identical-title': 'error',
				'test/no-import-node-test': 'error',
				'test/prefer-hooks-in-order': 'error',
				'test/prefer-lowercase-title': 'off',

				// no-only-tests rule (renamed)
				'test/no-only-tests': isInEditor ? 'warn' : 'error',

				// Disables for test files
				'node/prefer-global/process': 'off',
				'no-unused-expressions': 'off',
				'ts/explicit-function-return-type': 'off',

				// User overrides
				...overrides,
			},
		},
	]
}
