import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import ymlPlugin from 'eslint-plugin-yml'
import yamlParser from 'yaml-eslint-parser'
import { GLOB_YAML } from '../constants'

/**
 * Stylistic options for YAML config
 */
export interface YamlStylisticOptions {
	/**
	 * Indentation style
	 * @default 2
	 */
	indent?: number | 'tab'

	/**
	 * Quote style
	 * @default 'single'
	 */
	quotes?: 'single' | 'double'
}

/**
 * YAML configuration options
 */
export interface YamlOptions extends OptionsOverrides {
	/**
	 * Enable stylistic rules
	 * @default true
	 */
	stylistic?: boolean | YamlStylisticOptions
}

/**
 * YAML configuration
 */
export function yaml(options: YamlOptions = {}): Linter.Config[] {
	const {
		overrides = {},
		stylistic = true,
	} = options

	const {
		indent = 2,
		quotes = 'single',
	} = typeof stylistic === 'boolean' ? {} : stylistic

	return [
		{
			name: 'eslint-sets/yaml',
			files: [GLOB_YAML],
			languageOptions: {
				parser: yamlParser,
			},
			plugins: {
				yaml: ymlPlugin as any,
			},
			rules: {
				'style/spaced-comment': 'off',

				// Disable file-extension rule
				'yml/file-extension': 'off',

				// YAML core rules (always enabled)
				'yaml/block-mapping': 'error',
				'yaml/block-sequence': 'error',
				'yaml/no-empty-key': 'error',
				'yaml/no-empty-sequence-entry': 'error',
				'yaml/no-irregular-whitespace': 'error',
				'yaml/plain-scalar': 'error',

				// Vue custom block
				'yaml/vue-custom-block/no-parsing-error': 'error',

				// Stylistic rules (conditional)
				...(stylistic ? {
					'yaml/block-mapping-question-indicator-newline': 'error',
					'yaml/block-sequence-hyphen-indicator-newline': 'error',
					'yaml/flow-mapping-curly-newline': 'error',
					'yaml/flow-mapping-curly-spacing': 'error',
					'yaml/flow-sequence-bracket-newline': 'error',
					'yaml/flow-sequence-bracket-spacing': 'error',
					// yaml/indent only accepts integer values, not "tab"
					...(indent === 'tab' ? {
						'yaml/indent': 'off',
						'yaml/no-tab-indent': 'off',
					} : {
						'yaml/indent': ['error', indent],
						'yaml/no-tab-indent': 'error',
					}),
					'yaml/key-spacing': 'error',
					'yaml/quotes': ['error', { avoidEscape: true, prefer: quotes }],
					'yaml/spaced-comment': 'error',
				} : {}),

				// User overrides
				...overrides,
			},
		},
	]
}
