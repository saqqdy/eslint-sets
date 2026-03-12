import type { Linter } from 'eslint'
import importPlugin from 'eslint-plugin-import-x'
import unusedImports from 'eslint-plugin-unused-imports'
import { GLOB_SRC } from '../constants'

/**
 * Import configuration
 */
export function imports(): Linter.Config {
	return {
		name: 'eslint-sets/imports',
		files: [GLOB_SRC],
		plugins: {
			'import-x': importPlugin,
			'unused-imports': unusedImports,
		},
		rules: {
			// Import rules
			'import-x/no-unresolved': 'off',
			'import-x/named': 'error',
			'import-x/default': 'error',
			'import-x/namespace': 'error',
			'import-x/no-absolute-path': 'error',
			'import-x/no-dynamic-require': 'error',
			'import-x/no-webpack-loader-syntax': 'error',
			'import-x/export': 'error',
			'import-x/no-mutable-exports': 'error',
			'import-x/no-amd': 'error',
			'import-x/first': 'error',
			'import-x/no-duplicates': 'error',
			'import-x/no-cycle': 'warn',
			'import-x/no-self-import': 'error',
			'import-x/no-useless-path-segments': 'error',
			'import-x/no-relative-packages': 'off',
			'import-x/no-nodejs-modules': 'off',
			'import-x/unambiguous': 'off',
			'import-x/no-commonjs': 'off',
			'import-x/no-import-module-exports': 'off',
			'import-x/no-restricted-paths': 'off',
			'import-x/no-internal-modules': 'off',
			'import-x/no-relative-parent-imports': 'off',
			'import-x/no-named-export': 'off',
			'import-x/no-default-export': 'off',
			'import-x/no-named-as-default': 'warn',
			'import-x/no-named-as-default-member': 'warn',
			'import-x/no-deprecated': 'warn',
			'import-x/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: [
						'**/test/**',
						'**/tests/**',
						'**/__tests__/**',
						'**/*.test.*',
						'**/*.spec.*',
					],
					optionalDependencies: false,
					peerDependencies: true,
					bundledDependencies: true,
				},
			],
			'import-x/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],
					pathGroups: [
						{
							pattern: '@/**',
							group: 'internal',
						},
						{
							pattern: '#/**',
							group: 'internal',
						},
					],
					pathGroupsExcludedImportTypes: ['builtin'],
					'newlines-between': 'never',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
					warnOnUnassignedImports: true,
				},
			],
			'import-x/newline-after-import': ['error', { count: 1 }],
			'import-x/group-exports': 'off',
			'import-x/no-unassigned-import': 'warn',
			'import-x/no-named-default': 'error',
			'import-x/exports-last': 'off',
			'import-x/prefer-default-export': 'off',
			'import-x/dynamic-import-priority': 'off',
			'import-x/max-dependencies': 'off',
			'import-x/no-namespace': 'off',
			'import-x/no-empty-named-blocks': 'error',

			// Unused imports
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
		},
	}
}
