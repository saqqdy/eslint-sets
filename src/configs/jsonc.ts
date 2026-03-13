import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import jsoncPlugin from 'eslint-plugin-jsonc'
import jsoncParser from 'jsonc-eslint-parser'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../constants'

/**
 * JSON/JSONC configuration options
 */
export type JsoncOptions = OptionsOverrides

/**
 * JSON/JSONC/JSON5 configuration
 */
export function jsonc(options: JsoncOptions = {}): Linter.Config[] {
	const { overrides = {} } = options

	return [
		{
			files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
			languageOptions: {
				parser: jsoncParser,
			},
			name: 'eslint-sets/jsonc/setup',
			plugins: {
				jsonc: jsoncPlugin as any,
			},
			rules: {
				// Use only valid rules from the plugin
				'jsonc/no-bigint-literals': 'error',
				'jsonc/no-binary-expression': 'error',
				'jsonc/no-binary-numeric-literals': 'error',
				'jsonc/no-floating-decimal': 'error',
				'jsonc/no-hexadecimal-numeric-literals': 'error',
				'jsonc/no-infinity': 'error',
				'jsonc/no-multi-str': 'error',
				'jsonc/no-nan': 'error',
				'jsonc/no-number-props': 'error',
				'jsonc/no-numeric-separators': 'error',
				'jsonc/no-octal': 'error',
				'jsonc/no-octal-escape': 'error',
				'jsonc/no-octal-numeric-literals': 'error',
				'jsonc/no-parenthesized': 'error',
				'jsonc/no-plus-sign': 'error',
				'jsonc/no-regexp-literals': 'error',
				'jsonc/no-template-literals': 'error',
				'jsonc/no-undefined-value': 'error',
				'jsonc/no-unicode-codepoint-escapes': 'error',
				'jsonc/no-useless-escape': 'error',
				'jsonc/sort-array-values': 'off',
				'jsonc/sort-keys': 'off',
				'jsonc/space-unary-ops': 'error',
				'jsonc/valid-json-number': 'error',

				// User overrides
				...overrides,
			},
		},
	]
}
