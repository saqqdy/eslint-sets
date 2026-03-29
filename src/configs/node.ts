import type { Linter } from 'eslint'
import nodePlugin from 'eslint-plugin-n'
import { GLOB_SRC } from '../constants'
import { renameRules } from '../utils'

// Get rules from the plugin configs and rename n/ to node/
const nodeRecommendedRules = renameRules(
	(nodePlugin.configs?.['flat/recommended'] as any)?.rules || {},
	'node',
	'n',
)

/**
 * Node.js configuration
 */
export function node(): Linter.Config[] {
	return [
		{
			name: 'eslint-sets/node',
			files: [GLOB_SRC],
			plugins: {
				node: nodePlugin as any,
			},
			rules: {
				...nodeRecommendedRules,

				// Node.js specific rules
				'node/callback-return': 'off',
				'node/exports-style': 'off',
				'node/file-extension-in-import': 'off',

				'node/global-require': 'off',
				'node/handle-callback-err': 'error',
				'node/hashbang': 'off',
				'node/no-callback-literal': 'off',
				'node/no-deprecated-api': 'error',
				'node/no-exports-assign': 'error',
				'node/no-extraneous-import': 'off',
				'node/no-extraneous-require': 'off',
				'node/no-missing-import': 'off',
				'node/no-missing-require': 'off',
				'node/no-mixed-requires': 'off',
				'node/no-new-require': 'error',
				'node/no-path-concat': 'error',
				'node/no-process-env': 'off',
				// Override recommended rules
				'node/no-process-exit': 'off',
				'node/no-restricted-import': 'off',
				'node/no-restricted-require': 'off',
				'node/no-sync': 'off',
				'node/no-unpublished-import': 'off',
				'node/no-unpublished-require': 'off',
				'node/no-unsupported-features/es-syntax': 'off',
				'node/no-unsupported-features/node-builtins': 'off',
				'node/no-unsupported-features/es-builtins': 'off',
				'node/prefer-global/buffer': ['error', 'always'],
				'node/prefer-global/console': ['error', 'always'],
				'node/prefer-global/process': ['error', 'always'],
				'node/prefer-global/text-decoder': ['error', 'always'],
				'node/prefer-global/text-encoder': ['error', 'always'],
				'node/prefer-global/url': ['error', 'always'],
				'node/prefer-global/url-search-params': ['error', 'always'],
				// Use unicorn/prefer-node-protocol instead (configured in unicorn.ts)
				'node/prefer-node-protocol': 'off',
				'node/prefer-promises/dns': 'error',
				'node/prefer-promises/fs': 'error',
				'node/process-exit-as-throw': 'error',
			},
		},
	]
}
