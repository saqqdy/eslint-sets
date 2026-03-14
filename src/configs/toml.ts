import type { Linter } from 'eslint'
import tomlPlugin from 'eslint-plugin-toml'
import * as tomlParser from 'toml-eslint-parser'

/**
 * Glob patterns for TOML files
 */
const GLOB_TOML = '**/*.toml'

/**
 * TOML configuration
 */
export function toml(): Linter.Config[] {
	return [
		{
			files: [GLOB_TOML],
			languageOptions: {
				parser: tomlParser as any,
			},
			name: 'eslint-sets/toml',
			plugins: {
				toml: tomlPlugin as any,
			},
			rules: {
				// TOML specific rules
				'toml/comma-style': ['error', 'last'],
				'toml/indent': ['error', 'tab'],
				'toml/keys-order': 'off',
				'toml/no-space-dots': 'error',
				'toml/no-unreadable-number-separator': 'error',
				'toml/precision-of-fractional-seconds': 'off',
				'toml/tables-order': 'off',
			},
		},
	]
}
