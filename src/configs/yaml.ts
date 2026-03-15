import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import ymlPlugin, { configs as ymlConfigs } from 'eslint-plugin-yml'
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
	 * @default 'double'
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

// Get rules from the plugin configs
const ymlStandardRules = (ymlConfigs?.standard as any)?.rules || {}

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
		quotes = 'double',
	} = typeof stylistic === 'boolean' ? {} : stylistic

	return [
		{
			files: [GLOB_YAML],
			languageOptions: {
				parser: yamlParser,
			},
			name: 'eslint-sets/yaml',
			plugins: {
				yml: ymlPlugin as any,
			},
			rules: {
				...ymlStandardRules,

				// YAML core rules (always enabled)
				'yml/block-mapping': 'error',
				'yml/block-sequence': 'error',
				'yml/file-extension': ['error', { extension: 'yml' }],
				'yml/key-name-casing': 'off',
				'yml/no-empty-document': 'error',
				'yml/no-empty-key': 'error',
				'yml/no-empty-mapping-value': 'error',
				'yml/no-empty-sequence-entry': 'error',
				'yml/no-irregular-whitespace': 'error',
				'yml/plain-scalar': 'error',
				'yml/require-string-key': 'error',
				'yml/sort-keys': 'off',
				'yml/sort-sequence-values': 'off',

				// Stylistic rules (conditional)
				...(stylistic
					? {
							// yml/indent only accepts integer values, not "tab"
							// When using tabs, disable indent rule and no-tab-indent
							...(indent === 'tab'
								? {
										'yml/indent': 'off',
										'yml/no-tab-indent': 'off',
									}
								: {
										'yml/indent': ['error', indent],
										'yml/no-tab-indent': 'error',
									}),
							'yml/key-spacing': 'error',
							'yml/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
							'yml/quotes': ['error', { avoidEscape: true, prefer: quotes }],
							'yml/spaced-comment': 'error',
						}
					: {}),

				// User overrides
				...overrides,
			},
		},
	]
}
