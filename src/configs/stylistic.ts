import type { Linter } from 'eslint'
import stylisticPlugin from '@stylistic/eslint-plugin'
import { GLOB_SRC } from '../constants'

/**
 * Stylistic configuration options
 */
export interface StylisticOptions {
	/**
	 * Arrow function parentheses
	 * @default true
	 */
	arrowParens?: boolean

	/**
	 * Brace style
	 * @default '1tbs'
	 */
	braceStyle?: '1tbs' | 'stroustrup' | 'allman'

	/**
	 * Bracket spacing
	 * @default true
	 */
	bracketSpacing?: boolean

	/**
	 * Indentation style
	 * @default 2
	 */
	indent?: number | 'tab'

	/**
	 * JSX support
	 * @default true
	 */
	jsx?: boolean

	/**
	 * JSX quote style
	 * @default 'prefer-double'
	 */
	jsxQuotes?: 'prefer-double' | 'prefer-single'

	/**
	 * Override rules
	 */
	overrides?: Linter.RulesRecord

	/**
	 * Quote props
	 * @default 'as-needed'
	 */
	quoteProps?: 'always' | 'as-needed' | 'consistent' | 'consistent-as-needed'

	/**
	 * Quote style
	 * @default 'single'
	 */
	quotes?: 'single' | 'double'

	/**
	 * Use semicolons
	 * @default false
	 */
	semi?: boolean

	/**
	 * Trailing commas
	 * @default 'always-multiline'
	 */
	trailingComma?: 'always-multiline' | 'always' | 'never' | 'only-multiline'
}

/**
 * Stylistic configuration defaults
 */
export const StylisticConfigDefaults: StylisticOptions = {
	arrowParens: true,
	braceStyle: '1tbs',
	bracketSpacing: true,
	indent: 2,
	jsx: true,
	jsxQuotes: 'prefer-double',
	quoteProps: 'as-needed',
	quotes: 'single',
	semi: false,
	trailingComma: 'always-multiline',
}

/**
 * Stylistic configuration
 */
export function stylistic(options: StylisticOptions = {}): Linter.Config[] {
	const {
		arrowParens,
		braceStyle,
		bracketSpacing,
		indent,
		jsx,
		jsxQuotes,
		overrides = {},
		quoteProps,
		quotes,
		semi,
		trailingComma,
	} = {
		...StylisticConfigDefaults,
		...options,
	}

	// Use @stylistic/eslint-plugin's customize function for base rules
	const config = stylisticPlugin.configs.customize({
		arrowParens,
		blockSpacing: true,
		braceStyle,
		commaDangle: trailingComma,
		indent: indent === 'tab' ? 2 : indent,
		jsx,
		pluginName: '@stylistic',
		quoteProps,
		quotes,
		semi,
	}) as Linter.Config

	const indentStyle = indent === 'tab' ? 'tab' : indent
	const indentSize = indent === 'tab' ? 2 : indent

	return [
		{
			files: [GLOB_SRC],
			name: 'eslint-sets/stylistic',
			plugins: {
				'@stylistic': stylisticPlugin as any,
			},
			rules: {
				// Base rules from customize
				...config.rules,

				// Override with custom settings
				'@stylistic/brace-style': ['error', braceStyle, { allowSingleLine: true }],
				// Additional rules not covered by customize
				'@stylistic/curly-newline': 'off',
				'@stylistic/function-call-spacing': ['error', 'never'],
				'@stylistic/indent': [
					'error',
					indentStyle,
					{
						ignoredNodes: ['TemplateLiteral'],
						SwitchCase: 1,
					},
				],
				'@stylistic/jsx-curly-brace-presence': ['error', { children: 'never', props: 'never' }],

				'@stylistic/jsx-curly-newline': [
					'error',
					{ multiline: 'consistent', singleline: 'consistent' },
				],
				'@stylistic/jsx-curly-spacing': ['error', { attributes: true, children: true }],
				// Note: jsx-indent and jsx-indent-props are deprecated in v5, use indent instead
				'@stylistic/jsx-newline': 'off',
				'@stylistic/jsx-one-expression-per-line': ['error', { allow: 'literal' }],
				'@stylistic/jsx-pascal-case': 'off',
				'@stylistic/jsx-quotes': ['error', jsxQuotes],
				'@stylistic/jsx-self-closing-comp': 'error',
				'@stylistic/jsx-sort-props': 'off',
				'@stylistic/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
				'@stylistic/jsx-wrap-multilines': 'off',
				'@stylistic/linebreak-style': 'off',
				'@stylistic/max-len': [
					'error',
					{
						code: 120,
						ignoreComments: false,
						ignoreRegExpLiterals: true,
						ignoreStrings: true,
						ignoreTemplateLiterals: true,
						ignoreUrls: true,
						tabWidth: typeof indentSize === 'number' ? indentSize : 2,
					},
				],
				'@stylistic/member-delimiter-style': [
					'error',
					{
						multiline: { delimiter: 'none', requireLast: false },
						singleline: { delimiter: 'semi', requireLast: false },
					},
				],
				'@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
				'@stylistic/no-mixed-operators': 'error',
				'@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
				'@stylistic/no-tabs': indent === 'tab' ? 'off' : 'error',
				'@stylistic/no-trailing-spaces': 'error',
				'@stylistic/object-curly-spacing': ['error', bracketSpacing ? 'always' : 'never'],
				'@stylistic/operator-linebreak': ['error', 'before'],
				'@stylistic/padding-line-between-statements': [
					'error',
					{ blankLine: 'always', next: 'return', prev: '*' },
					{ blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
					{ blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] },
				],
				'@stylistic/space-before-function-paren': [
					'error',
					{
						anonymous: 'always',
						asyncArrow: 'always',
						named: 'never',
					},
				],
				'@stylistic/type-annotation-spacing': 'error',

				// User overrides
				...overrides,
			},
		},
	]
}
