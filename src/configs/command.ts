import type { Linter } from 'eslint'

/**
 * Glob patterns for command-line script files
 */
const GLOB_COMMAND_FILES = [
	'**/scripts/**/*.{js,ts,mjs,mts,cjs,cts}',
	'**/bin/**/*.{js,ts,mjs,mts,cjs,cts}',
	'**/cli/**/*.{js,ts,mjs,mts,cjs,cts}',
	'**/tasks/**/*.{js,ts,mjs,mts,cjs,cts}',
	'**/tools/**/*.{js,ts,mjs,mts,cjs,cts}',
]

/**
 * Command configuration
 * Rules for command-line scripts and tools
 */
export function command(): Linter.Config[] {
	return [
		{
			name: 'eslint-sets/command',
			files: GLOB_COMMAND_FILES,
			rules: {
				// Allow console in scripts
				'no-console': 'off',

				// Allow process.exit in scripts
				'no-process-exit': 'off',

				// Allow shebang
				'unicorn/no-hash': 'off',

				// Allow process.env in scripts
				'no-process-env': 'off',

				// Allow synchronous methods in scripts
				'@typescript-eslint/no-misused-promises': 'off',
				'unicorn/no-useless-await': 'off',

				// Allow require in scripts
				'@typescript-eslint/no-var-requires': 'off',
				'unicorn/prefer-module': 'off',

				// Allow top-level await in ESM scripts
				'@typescript-eslint/no-floating-promises': 'off',

				// Disable import checks for scripts
				'import-x/no-unresolved': 'off',
				'import-x/no-default-export': 'off',

				// Disable type checks for scripts
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',

				// Allow unused expressions (for side-effect scripts)
				'@typescript-eslint/no-unused-expressions': 'off',

				// Relax perfectionist for scripts
				'perfectionist/sort-imports': 'off',
				'perfectionist/sort-exports': 'off',
			},
		},
		{
			name: 'eslint-sets/command/shebang',
			files: GLOB_COMMAND_FILES,
			rules: {
				// Ensure proper shebang for executable scripts
				'unicorn/prefer-top-level-await': 'off',
			},
		},
	]
}
