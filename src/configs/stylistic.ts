import type { Linter } from 'eslint'
import stylisticPlugin from '@stylistic/eslint-plugin'
import { GLOB_SRC } from '../constants'

/**
 * Stylistic options
 */
export interface StylisticOptions {
	/**
	 * Indentation
	 * @default 'tab'
	 */
	indent?: 'tab' | number

	/**
	 * Quote style
	 * @default 'single'
	 */
	quotes?: 'single' | 'double'

	/**
	 * Semicolons
	 * @default false
	 */
	semi?: boolean

	/**
	 * JSX quote style
	 * @default 'prefer-double'
	 */
	jsxQuotes?: 'prefer-double' | 'prefer-single'

	/**
	 * Trailing commas
	 * @default 'all'
	 */
	trailingComma?: 'none' | 'es5' | 'all'

	/**
	 * Bracket spacing
	 * @default true
	 */
	bracketSpacing?: boolean

	/**
	 * Arrow parentheses
	 * @default 'always'
	 */
	arrowParens?: 'always' | 'avoid' | 'as-needed'
}

/**
 * Stylistic configuration
 */
export function stylistic(options: StylisticOptions = {}): Linter.Config[] {
	const {
		indent = 'tab',
		quotes = 'single',
		semi = false,
		jsxQuotes = 'prefer-double',
		trailingComma = 'all',
		bracketSpacing = true,
		arrowParens = 'always',
	} = options

	const indentStyle = indent === 'tab' ? 'tab' : indent
	const indentSize = indent === 'tab' ? 2 : indent

	return [
		{
			name: 'eslint-sets/stylistic',
			files: [GLOB_SRC],
			plugins: {
				'@stylistic': stylisticPlugin as any,
			},
			rules: {
				// Indentation
				'@stylistic/indent': ['error', indentStyle, { SwitchCase: 1 }],
				'@stylistic/indent-binary-ops': ['error', indentStyle],

				// Quotes
				'@stylistic/quotes': [
					'error',
					quotes,
					{
						avoidEscape: true,
						allowTemplateLiterals: true,
					},
				],
				'@stylistic/jsx-quotes': ['error', jsxQuotes],

				// Semicolons
				'@stylistic/semi': ['error', semi ? 'always' : 'never'],
				'@stylistic/no-extra-semi': 'error',

				// Trailing commas
				'@stylistic/comma-dangle': [
					'error',
					trailingComma === 'all' ? 'always-multiline' : trailingComma,
				],

				// Spacing
				'@stylistic/object-curly-spacing': ['error', bracketSpacing ? 'always' : 'never'],
				'@stylistic/array-bracket-spacing': ['error', 'never'],
				'@stylistic/comma-spacing': ['error', { before: false, after: true }],
				'@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],
				'@stylistic/space-before-blocks': 'error',
				'@stylistic/space-before-function-paren': [
					'error',
					{
						anonymous: 'always',
						named: 'never',
						asyncArrow: 'always',
					},
				],
				'@stylistic/space-infix-ops': 'error',
				'@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
				'@stylistic/space-in-parens': ['error', 'never'],
				'@stylistic/arrow-spacing': ['error', { before: true, after: true }],

				// Arrow function
				'@stylistic/arrow-parens': ['error', arrowParens as 'always' | 'avoid'],

				// Brackets
				'@stylistic/block-spacing': ['error', 'always'],
				'@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

				// Line breaks
				'@stylistic/linebreak-style': 'off', // Let git handle line breaks
				'@stylistic/max-len': [
					'error',
					{
						code: 120,
						tabWidth: indentSize,
						ignoreUrls: true,
						ignoreComments: false,
						ignoreRegExpLiterals: true,
						ignoreStrings: true,
						ignoreTemplateLiterals: true,
					},
				],

				// Padding lines
				'@stylistic/padding-line-between-statements': [
					'error',
					{ blankLine: 'always', prev: '*', next: 'return' },
					{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
					{ blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
				],

				// Other stylistic rules
				'@stylistic/curly-newline': 'off',
				'@stylistic/function-call-spacing': ['error', 'never'],
				'@stylistic/member-delimiter-style': [
					'error',
					{
						multiline: { delimiter: 'none', requireLast: false },
						singleline: { delimiter: 'semi', requireLast: false },
					},
				],
				'@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
				'@stylistic/no-mixed-operators': 'error',
				'@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
				'@stylistic/no-tabs': indent === 'tab' ? 'off' : 'error',
				'@stylistic/no-trailing-spaces': 'error',
				'@stylistic/operator-linebreak': ['error', 'before'],
				'@stylistic/quote-props': ['error', 'as-needed'],
				'@stylistic/type-annotation-spacing': 'error',

				// JSX
				'@stylistic/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
				'@stylistic/jsx-curly-newline': [
					'error',
					{ multiline: 'consistent', singleline: 'consistent' },
				],
				'@stylistic/jsx-curly-spacing': ['error', { attributes: true, children: true }],
				'@stylistic/jsx-equals-spacing': ['error', 'never'],
				'@stylistic/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
				'@stylistic/jsx-indent': ['error', indentSize, { indentLogicalExpressions: true }],
				'@stylistic/jsx-indent-props': ['error', indentSize],
				'@stylistic/jsx-newline': 'off',
				'@stylistic/jsx-one-expression-per-line': ['error', { allow: 'literal' }],
				'@stylistic/jsx-pascal-case': 'off',
				'@stylistic/jsx-props-no-multi-spaces': 'error',
				'@stylistic/jsx-self-closing-comp': 'error',
				'@stylistic/jsx-sort-props': 'off',
				'@stylistic/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
				'@stylistic/jsx-wrap-multilines': 'off',
			},
		},
	]
}
