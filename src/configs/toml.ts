import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import tomlPlugin from 'eslint-plugin-toml'
import * as tomlParser from 'toml-eslint-parser'

/**
 * Glob patterns for TOML files
 */
const GLOB_TOML = '**/*.toml'

/**
 * Stylistic options for TOML config
 */
export interface TomlStylisticOptions {
	/**
	 * Indentation style
	 * @default 2
	 */
	indent?: number | 'tab'
}

/**
 * TOML configuration options
 */
export interface TomlOptions extends OptionsOverrides {
	/**
	 * Enable stylistic rules
	 * @default true
	 */
	stylistic?: boolean | TomlStylisticOptions
}

/**
 * TOML configuration
 */
export function toml(options: TomlOptions = {}): Linter.Config[] {
	const {
		overrides = {},
		stylistic = true,
	} = options

	const {
		indent = 2,
	} = typeof stylistic === 'boolean' ? {} : stylistic

	return [
		{
			name: 'eslint-sets/toml',
			files: [GLOB_TOML],
			languageOptions: {
				parser: tomlParser as any,
			},
			plugins: {
				toml: tomlPlugin as any,
			},
			rules: {
				// Disable style/spaced-comment for TOML files
				'style/spaced-comment': 'off',

				// TOML core rules (always enabled)
				'toml/comma-style': 'error',
				'toml/keys-order': 'error',
				'toml/no-space-dots': 'error',
				'toml/no-unreadable-number-separator': 'error',
				'toml/precision-of-fractional-seconds': 'error',
				'toml/precision-of-integer': 'error',
				'toml/tables-order': 'error',

				// Vue custom block
				'toml/vue-custom-block/no-parsing-error': 'error',

				// Stylistic rules (conditional)
				...(stylistic ? {
					'toml/array-bracket-newline': 'error',
					'toml/array-bracket-spacing': 'error',
					'toml/array-element-newline': 'error',
					'toml/indent': ['error', indent === 'tab' ? 'tab' : indent],
					'toml/inline-table-curly-spacing': 'error',
					'toml/key-spacing': 'error',
					'toml/padding-line-between-pairs': 'error',
					'toml/padding-line-between-tables': 'error',
					'toml/quoted-keys': 'error',
					'toml/spaced-comment': 'error',
					'toml/table-bracket-spacing': 'error',
				} : {}),

				// User overrides
				...overrides,
			},
		},
	]
}
