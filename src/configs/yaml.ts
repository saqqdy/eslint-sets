import type { Linter } from 'eslint'
import ymlPlugin, { configs as ymlConfigs } from 'eslint-plugin-yml'
import yamlParser from 'yaml-eslint-parser'
import { GLOB_YAML } from '../constants'

// Get rules from the plugin configs
const ymlStandardRules = (ymlConfigs?.standard as any)?.rules || {}

/**
 * YAML configuration
 */
export function yaml(): Linter.Config[] {
	return [
		{
			name: 'eslint-sets/yaml/setup',
			files: [GLOB_YAML],
			languageOptions: {
				parser: yamlParser,
			},
			plugins: {
				yml: ymlPlugin as any,
			},
			rules: {
				...ymlStandardRules,

				// YAML rules
				'yml/block-mapping': 'error',
				'yml/block-sequence': 'error',
				'yml/file-extension': ['error', { extension: 'yml' }],
				'yml/key-name-casing': 'off',
				'yml/key-spacing': 'error',
				'yml/no-empty-document': 'error',
				'yml/no-empty-key': 'error',
				'yml/no-empty-mapping-value': 'error',
				'yml/no-empty-sequence-entry': 'error',
				'yml/no-irregular-whitespace': 'error',
				'yml/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
				'yml/no-tab-indent': 'error',
				'yml/plain-scalar': 'error',
				'yml/require-string-key': 'error',
				'yml/sort-keys': 'off',
				'yml/sort-sequence-values': 'off',
				'yml/spaced-comment': 'error',
			},
		},
	]
}
