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
			files: GLOB_COMMAND_FILES,
			name: 'eslint-sets/command',
			rules: {
				'import-x/no-default-export': 'off',

				// Disable import checks for scripts
				'import-x/no-unresolved': 'off',

				// Allow shebang in scripts (n/hashbang handles this)
				'n/hashbang': 'off',

				// Allow console in scripts
				'no-console': 'off',

				// Allow process.env in scripts
				'no-process-env': 'off',
				// Allow process.exit in scripts
				'no-process-exit': 'off',

				'perfectionist/sort-exports': 'off',
				// Relax perfectionist for scripts
				'perfectionist/sort-imports': 'off',

				// Disable type checks for scripts
				'ts/no-explicit-any': 'off',

				// Allow top-level await in ESM scripts
				'ts/no-floating-promises': 'off',
				// Allow synchronous methods in scripts
				'ts/no-misused-promises': 'off',

				'ts/no-unsafe-assignment': 'off',
				'ts/no-unsafe-call': 'off',
				'ts/no-unsafe-member-access': 'off',
				'ts/no-unsafe-return': 'off',
				// Allow unused expressions (for side-effect scripts)
				'ts/no-unused-expressions': 'off',

				// Allow require in scripts
				'ts/no-var-requires': 'off',

				'unicorn/no-useless-await': 'off',
				'unicorn/prefer-module': 'off',
				'unicorn/prefer-top-level-await': 'off',
			},
		},
	]
}
