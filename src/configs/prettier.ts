import type { Linter } from 'eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import { GLOB_SRC } from '../constants'

/**
 * Prettier configuration options
 *
 * Default values are aligned with stylistic defaults for consistency
 */
export interface PrettierOptions {
	/**
	 * Arrow function parentheses
	 * @default 'avoid'
	 */
	arrowParens?: 'always' | 'avoid'

	/**
	 * Bracket spacing
	 * @default true
	 */
	bracketSpacing?: boolean

	/**
	 * End of line
	 * @default 'auto'
	 */
	endOfLine?: 'auto' | 'lf' | 'crlf' | 'cr'

	/**
	 * JSX single quote
	 * @default false
	 */
	jsxSingleQuote?: boolean

	/**
	 * Override rules
	 */
	overrides?: Linter.RulesRecord

	/**
	 * Print width
	 * @default 100
	 */
	printWidth?: number

	/**
	 * Quote props
	 * @default 'as-needed'
	 */
	quoteProps?: 'as-needed' | 'consistent' | 'preserve'

	/**
	 * Use semicolons
	 * @default false
	 */
	semi?: boolean

	/**
	 * Single quote
	 * @default true
	 */
	singleQuote?: boolean

	/**
	 * Tab width
	 * @default 2
	 */
	tabWidth?: number

	/**
	 * Trailing commas
	 * @default 'es5'
	 */
	trailingComma?: 'all' | 'es5' | 'none'

	/**
	 * Use tabs
	 * @default false
	 */
	useTabs?: boolean
}

/**
 * Prettier configuration
 *
 * Default values are aligned with stylistic defaults for consistency.
 * When switching between stylistic and prettier, the code style will remain the same.
 *
 * Note: This config is only loaded when stylistic is disabled (stylistic: false).
 */
export function prettier(options: PrettierOptions = {}): Linter.Config[] {
	const {
		arrowParens = 'avoid',
		bracketSpacing = true,
		endOfLine = 'auto',
		jsxSingleQuote = false,
		overrides = {},
		printWidth = 100,
		quoteProps = 'as-needed',
		semi = false,
		singleQuote = true,
		tabWidth = 2,
		trailingComma = 'es5',
		useTabs = false,
	} = options

	return [
		{
			files: [GLOB_SRC],
			name: 'eslint-sets/prettier',
			plugins: {
				prettier: eslintPluginPrettier,
			},
			rules: {
				// Disable ESLint rules that conflict with Prettier
				...eslintConfigPrettier.rules,
				'prettier/prettier': [
					'error',
					{
						// Prettier options (aligned with stylistic defaults)
						arrowParens,
						bracketSpacing,
						endOfLine,
						jsxSingleQuote,
						printWidth,
						quoteProps,
						semi,
						singleQuote,
						tabWidth,
						trailingComma,
						useTabs,
					},
				],

				// User overrides
				...overrides,
			},
		},
	]
}
