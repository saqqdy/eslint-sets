import type { Linter } from 'eslint'
import type { OptionsOverrides, OptionsStylistic } from '../types'
import jsoncPlugin from 'eslint-plugin-jsonc'
import jsoncParser from 'jsonc-eslint-parser'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../constants'

/**
 * JSON/JSONC configuration options
 */
export type JsoncOptions = OptionsOverrides & OptionsStylistic

/**
 * JSON/JSONC/JSON5 configuration
 */
export function jsonc(options: JsoncOptions = {}): Linter.Config[] {
	const {
		overrides = {},
		stylistic = true,
	} = options

	const {
		indent = 2,
	} = typeof stylistic === 'boolean' ? {} : stylistic

	return [
		{
			name: 'eslint-sets/jsonc',
			files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
			languageOptions: {
				parser: jsoncParser,
			},
			plugins: {
				jsonc: jsoncPlugin as any,
			},
			rules: {
				// JSON core rules (always enabled)
				'jsonc/no-bigint-literals': 'error',
				'jsonc/no-binary-expression': 'error',
				'jsonc/no-binary-numeric-literals': 'error',
				'jsonc/no-dupe-keys': 'error',
				'jsonc/no-escape-sequence-in-identifier': 'error',
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
				'jsonc/no-sparse-arrays': 'error',
				'jsonc/no-template-literals': 'error',
				'jsonc/no-undefined-value': 'error',
				'jsonc/no-unicode-codepoint-escapes': 'error',
				'jsonc/no-useless-escape': 'error',
				'jsonc/space-unary-ops': 'error',
				'jsonc/valid-json-number': 'error',

				// Vue custom block
				'jsonc/vue-custom-block/no-parsing-error': 'error',

				// Stylistic rules (conditional)
				...(stylistic ? {
					'jsonc/array-bracket-spacing': ['error', 'never'],
					'jsonc/comma-dangle': ['error', 'never'],
					'jsonc/comma-style': ['error', 'last'],
					'jsonc/indent': ['error', indent === 'tab' ? 'tab' : indent],
					'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
					'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],
					'jsonc/object-curly-spacing': ['error', 'always'],
					'jsonc/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
					'jsonc/quote-props': 'error',
					'jsonc/quotes': 'error',
				} : {}),

				// User overrides
				...overrides,
			},
		},
	]
}
