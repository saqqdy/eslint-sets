import type { Linter } from 'eslint'
import nPlugin from 'eslint-plugin-n'
import { GLOB_SRC } from '../constants'

// Get rules from the plugin configs
const nRecommendedRules = (nPlugin.configs?.['flat/recommended'] as any)?.rules || {}

/**
 * Node.js configuration
 */
export function node(): Linter.Config[] {
	return [
		{
			files: [GLOB_SRC],
			name: 'eslint-sets/node',
			plugins: {
				n: nPlugin as any,
			},
			rules: {
				...nRecommendedRules,

				// Node.js specific rules
				'n/callback-return': 'off',
				'n/exports-style': 'off',
				'n/file-extension-in-import': 'off',

				'n/global-require': 'off',
				'n/handle-callback-err': 'error',
				'n/hashbang': 'error',
				'n/no-callback-literal': 'off',
				'n/no-deprecated-api': 'error',
				'n/no-exports-assign': 'error',
				'n/no-extraneous-import': 'off',
				'n/no-extraneous-require': 'off',
				'n/no-missing-import': 'off',
				'n/no-missing-require': 'off',
				'n/no-mixed-requires': 'off',
				'n/no-new-require': 'error',
				'n/no-path-concat': 'error',
				'n/no-process-env': 'off',
				// Override recommended rules
				'n/no-process-exit': 'off',
				'n/no-restricted-import': 'off',
				'n/no-restricted-require': 'off',
				'n/no-sync': 'off',
				'n/no-unpublished-import': 'off',
				'n/no-unpublished-require': 'off',
				'n/prefer-global/buffer': ['error', 'always'],
				'n/prefer-global/console': ['error', 'always'],
				'n/prefer-global/process': ['error', 'always'],
				'n/prefer-global/text-decoder': ['error', 'always'],
				'n/prefer-global/text-encoder': ['error', 'always'],
				'n/prefer-global/url': ['error', 'always'],
				'n/prefer-global/url-search-params': ['error', 'always'],
				// Use unicorn/prefer-node-protocol instead (configured in unicorn.ts)
				'n/prefer-node-protocol': 'off',
				'n/prefer-promises/dns': 'error',
				'n/prefer-promises/fs': 'error',
			},
		},
	]
}
