import type { Linter } from 'eslint'
import stylisticPlugin from '@stylistic/eslint-plugin'
import { GLOB_SRC } from '../constants'

/**
 * Stylistic configuration options
 */
export interface StylisticOptions {
	/**
	 * Enable experimental rules
	 * @default false
	 */
	experimental?: boolean

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
	 * Use less opinionated rules
	 * @default false
	 */
	lessOpinionated?: boolean

	/**
	 * Override rules
	 */
	overrides?: Linter.RulesRecord

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
}

/**
 * Stylistic configuration defaults
 */
export const StylisticConfigDefaults: StylisticOptions = {
	experimental: false,
	indent: 2,
	jsx: true,
	lessOpinionated: false,
	quotes: 'single',
	semi: false,
}

/**
 * Stylistic configuration
 */
export function stylistic(options: StylisticOptions = {}): Linter.Config[] {
	const {
		experimental,
		indent,
		jsx,
		lessOpinionated = false,
		overrides = {},
		quotes,
		semi,
	} = {
		...StylisticConfigDefaults,
		...options,
	}

	// Use @stylistic/eslint-plugin's customize function for base rules
	const config = stylisticPlugin.configs.customize({
		experimental,
		indent,
		jsx,
		pluginName: 'style',
		quotes,
		semi,
	}) as Linter.Config

	return [
		{
			name: 'eslint-sets/stylistic',
			files: [GLOB_SRC],
			plugins: {
				style: stylisticPlugin as any,
			},
			rules: {
				// Base rules from customize
				...config.rules,

				// arrow-parens: omit parens for single argument
				'style/arrow-parens': ['error', 'as-needed'],

				// brace-style: use 1tbs (else on same line)
				'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],

				// Generator and yield star spacing
				'style/generator-star-spacing': ['error', { after: true, before: false }],
				'style/multiline-ternary': ['error', 'never'],
				'style/yield-star-spacing': ['error', { after: true, before: false }],

				// quote-props: only quote when needed (not consistent-as-needed)
				'style/quote-props': ['error', 'as-needed'],

				// Less opinionated mode uses basic curly rule
				...(lessOpinionated ? {
					curly: ['error', 'all'],
				} : {}),

				// User overrides
				...overrides,
			},
		},
	]
}
