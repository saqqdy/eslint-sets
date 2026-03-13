import type { Linter } from 'eslint'

/**
 * Files that are often configuration files
 */
const GLOB_CONFIG_FILES = [
	'**/*.config.{js,ts,mjs,mts,cjs,cts}',
	'**/.*rc.{js,ts,mjs,mts,cjs,cts,json}',
	'**/.eslint*.{js,ts,mjs,mts,cjs,cts,json}',
	'**/.prettier*.{js,ts,mjs,mts,cjs,cts,json}',
	'**/tsconfig*.json',
	'**/package.json',
	'**/Dockerfile*',
]

/**
 * Disables configuration
 * Disables certain rules in specific file types
 */
export function disables(): Linter.Config[] {
	return [
		{
			name: 'eslint-sets/disables/config-files',
			files: GLOB_CONFIG_FILES,
			rules: {
				'no-console': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/no-var-requires': 'off',
				'unicorn/prefer-module': 'off',
				'unicorn/prefer-node-protocol': 'off',
				'import-x/no-default-export': 'off',
				'import-x/no-named-as-default': 'off',
				'import-x/no-named-as-default-member': 'off',
				'perfectionist/sort-exports': 'off',
				'perfectionist/sort-imports': 'off',
				'perfectionist/sort-named-exports': 'off',
				'perfectionist/sort-named-imports': 'off',
			},
		},
		{
			name: 'eslint-sets/disables/json-files',
			files: ['**/*.json'],
			rules: {
				'jsonc/sort-keys': 'off',
			},
		},
		{
			name: 'eslint-sets/disables/cjs-files',
			files: ['**/*.cjs'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'unicorn/prefer-module': 'off',
				'import-x/no-default-export': 'off',
			},
		},
		{
			name: 'eslint-sets/disables/dts-files',
			files: ['**/*.d.ts'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/triple-slash-reference': 'off',
				'import-x/no-default-export': 'off',
				'import-x/no-unresolved': 'off',
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'unicorn/filename-case': 'off',
			},
		},
		{
			name: 'eslint-sets/disables/env-files',
			files: ['**/.env*'],
			rules: {
				'no-process-env': 'off',
			},
		},
	]
}
