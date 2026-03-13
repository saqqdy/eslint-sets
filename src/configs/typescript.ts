import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { GLOB_SRC, GLOB_TS } from '../constants'

/**
 * TypeScript configuration options
 */
export interface TypeScriptOptions extends OptionsOverrides {
	/**
	 * Enable rules that require type information
	 * @default false
	 */
	typeAware?: boolean

	/**
	 * Path to tsconfig.json
	 * @default './tsconfig.json'
	 */
	tsconfigPath?: string | string[]

	/**
	 * Glob patterns for files that should be type aware
	 * @default ['**\/*.{ts,tsx}']
	 */
	filesTypeAware?: string[]

	/**
	 * Glob patterns for files that should not be type aware
	 */
	ignoresTypeAware?: string[]
}

/**
 * TypeScript configuration
 * Based on antfu/eslint-config
 */
export function typescript(options: TypeScriptOptions = {}): Linter.Config[] {
	const {
		typeAware = false,
		tsconfigPath = './tsconfig.json',
		filesTypeAware = [GLOB_TS],
		ignoresTypeAware = ['**/*.md/**', '**/*.astro/*.ts'],
		overrides = {},
	} = options

	const isTypeAware = typeAware && tsconfigPath
	const tsconfigPaths = Array.isArray(tsconfigPath) ? tsconfigPath : [tsconfigPath]

	const typeAwareRules: Linter.RulesRecord = {
		'dot-notation': 'off',
		'no-implied-eval': 'off',
		'no-throw-literal': 'off',
		'@typescript-eslint/await-thenable': 'error',
		'@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
		'@typescript-eslint/no-floating-promises': 'error',
		'@typescript-eslint/no-for-in-array': 'error',
		'@typescript-eslint/no-implied-eval': 'error',
		'@typescript-eslint/no-misused-promises': 'error',
		'@typescript-eslint/no-throw-literal': 'error',
		'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		'@typescript-eslint/no-unsafe-argument': 'error',
		'@typescript-eslint/no-unsafe-assignment': 'error',
		'@typescript-eslint/no-unsafe-call': 'error',
		'@typescript-eslint/no-unsafe-member-access': 'error',
		'@typescript-eslint/no-unsafe-return': 'error',
		'@typescript-eslint/restrict-plus-operands': 'error',
		'@typescript-eslint/restrict-template-expressions': 'error',
		'@typescript-eslint/unbound-method': 'error',
	}

	const configs: Linter.Config[] = [
		{
			name: 'eslint-sets/typescript/setup',
			files: [GLOB_TS, GLOB_SRC],
			languageOptions: {
				parser: tsParser,
				parserOptions: {
					ecmaVersion: 'latest',
					sourceType: 'module',
					...(isTypeAware
						? {
								project: tsconfigPaths,
							}
						: {}),
				},
			},
			plugins: {
				'@typescript-eslint': tseslint as any,
			},
			rules: {
				...tseslint.configs.recommended.rules,
				...(tseslint.configs.strict?.rules || {}),

				// Override JavaScript rules
				'no-dupe-class-members': 'off',
				'no-loss-of-precision': 'off',
				'no-redeclare': 'off',
				'no-use-before-define': 'off',
				'no-useless-constructor': 'off',

				// TypeScript specific rules
				'@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
				'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						disallowTypeAnnotations: false,
						prefer: 'type-imports',
					},
				],
				'@typescript-eslint/method-signature-style': ['error', 'property'],
				'@typescript-eslint/no-dupe-class-members': 'error',
				'@typescript-eslint/no-dynamic-delete': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-extraneous-class': 'off',
				'@typescript-eslint/no-import-type-side-effects': 'error',
				'@typescript-eslint/no-invalid-void-type': 'off',
				'@typescript-eslint/no-loss-of-precision': 'error',
				'@typescript-eslint/no-non-null-assertion': 'off',
				'@typescript-eslint/no-redeclare': 'error',
				'@typescript-eslint/no-require-imports': 'error',
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/no-use-before-define': [
					'error',
					{
						classes: false,
						functions: false,
						variables: true,
					},
				],
				'@typescript-eslint/no-useless-constructor': 'off',
				'@typescript-eslint/prefer-ts-expect-error': 'error',
				'@typescript-eslint/triple-slash-reference': 'off',
				'@typescript-eslint/unified-signatures': 'off',

				// User overrides
				...overrides,
			},
		},
	]

	// Add type-aware rules if enabled
	if (isTypeAware) {
		configs.push({
			name: 'eslint-sets/typescript/type-aware',
			files: filesTypeAware,
			ignores: ignoresTypeAware,
			rules: {
				...typeAwareRules,
				...overrides,
			},
		})
	}

	// Add disables for .d.ts files
	configs.push({
		files: ['**/*.d.ts'],
		name: 'eslint-sets/typescript/disables/dts',
		rules: {
			'eslint-comments/no-unlimited-disable': 'off',
			'import-x/no-duplicates': 'off',
			'no-restricted-syntax': 'off',
			'unused-imports/no-unused-vars': 'off',
		},
	})

	// Add disables for test files
	configs.push({
		files: ['**/*.{test,spec}.ts?(x)'],
		name: 'eslint-sets/typescript/disables/test',
		rules: {
			'no-unused-expressions': 'off',
		},
	})

	// Add disables for .js/.cjs files
	configs.push({
		files: ['**/*.js', '**/*.cjs'],
		name: 'eslint-sets/typescript/disables/cjs',
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-var-requires': 'off',
		},
	})

	return configs
}
