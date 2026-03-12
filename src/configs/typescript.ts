import type { Linter } from 'eslint'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { GLOB_TS, GLOB_SRC } from '../constants'

/**
 * TypeScript configuration options
 */
export interface TypeScriptOptions {
	/**
	 * Enable rules that require type information
	 * @default false
	 */
	typeAware?: boolean

	/**
	 * Path to tsconfig.json
	 * @default './tsconfig.json'
	 */
	tsconfigPath?: string
}

/**
 * TypeScript configuration
 */
export function typescript(options: TypeScriptOptions = {}): Linter.Config[] {
	const { typeAware = false, tsconfigPath = './tsconfig.json' } = options

	const configs: Linter.Config[] = [
		{
			name: 'eslint-sets/typescript/setup',
			files: [GLOB_TS, GLOB_SRC],
			languageOptions: {
				parser: tsParser,
				parserOptions: {
					ecmaVersion: 'latest',
					sourceType: 'module',
					jsxPragma: 'React',
					...(typeAware && {
						project: tsconfigPath,
					}),
				},
			},
			plugins: {
				'@typescript-eslint': tseslint as any,
			},
			rules: {
				...tseslint.configs.recommended.rules,

				// Override JavaScript rules
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						argsIgnorePattern: '^_',
						varsIgnorePattern: '^_',
						caughtErrorsIgnorePattern: '^_',
					},
				],
				'no-use-before-define': 'off',
				'@typescript-eslint/no-use-before-define': [
					'error',
					{
						functions: false,
						classes: false,
						variables: true,
						enums: true,
						typedefs: true,
					},
				],
				'no-shadow': 'off',
				'@typescript-eslint/no-shadow': 'error',
				'no-redeclare': 'off',
				'@typescript-eslint/no-redeclare': 'error',

				// TypeScript specific rules (no type info required)
				'@typescript-eslint/ban-ts-comment': [
					'error',
					{
						'ts-expect-error': 'allow-with-description',
						'ts-ignore': true,
						'ts-nocheck': true,
						'ts-check': false,
						minimumDescriptionLength: 3,
					},
				],
				'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						prefer: 'type-imports',
						fixStyle: 'inline-type-imports',
					},
				],
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-explicit-any': 'warn',
				'@typescript-eslint/no-non-null-assertion': 'warn',
				'@typescript-eslint/prefer-as-const': 'error',
				'@typescript-eslint/prefer-for-of': 'error',
				'@typescript-eslint/prefer-ts-expect-error': 'error',
				'@typescript-eslint/no-import-type-side-effects': 'error',
				'@typescript-eslint/prefer-literal-enum-member': 'error',
			},
		},
	]

	// Add type-aware rules if enabled
	if (typeAware) {
		configs.push({
			name: 'eslint-sets/typescript/type-aware',
			files: [GLOB_TS, GLOB_SRC],
			rules: {
				// Type-aware rules
				'@typescript-eslint/await-thenable': 'error',
				'@typescript-eslint/dot-notation': [
					'error',
					{
						allowPrivateClassPropertyAccess: false,
						allowProtectedClassPropertyAccess: false,
						allowIndexSignaturePropertyAccess: true,
					},
				],
				'@typescript-eslint/no-base-to-string': 'error',
				'@typescript-eslint/no-confusing-void-expression': [
					'error',
					{
						ignoreArrowShorthand: false,
						ignoreVoidOperator: false,
					},
				],
				'@typescript-eslint/no-duplicate-type-constituents': 'error',
				'@typescript-eslint/no-floating-promises': 'error',
				'@typescript-eslint/no-for-in-array': 'error',
				'@typescript-eslint/no-implied-eval': 'error',
				'@typescript-eslint/no-meaningless-void-operator': 'error',
				'@typescript-eslint/no-misused-new': 'error',
				'@typescript-eslint/no-misused-promises': [
					'error',
					{
						checksVoidReturn: {
							arguments: false,
							attributes: false,
						},
					},
				],
				'@typescript-eslint/no-mixed-enums': 'error',
				'@typescript-eslint/no-redundant-type-constituents': 'error',
				'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
				'@typescript-eslint/no-unnecessary-condition': 'warn',
				'@typescript-eslint/no-unnecessary-qualifier': 'error',
				'@typescript-eslint/no-unnecessary-type-arguments': 'error',
				'@typescript-eslint/no-unnecessary-type-assertion': 'error',
				'@typescript-eslint/no-unnecessary-type-constraint': 'error',
				'@typescript-eslint/no-unsafe-argument': 'error',
				'@typescript-eslint/no-unsafe-assignment': 'warn',
				'@typescript-eslint/no-unsafe-call': 'warn',
				'@typescript-eslint/no-unsafe-member-access': 'warn',
				'@typescript-eslint/no-unsafe-return': 'warn',
				'@typescript-eslint/no-unsafe-unary-minus': 'error',
				'@typescript-eslint/non-nullable-type-assertion-style': 'error',
				'@typescript-eslint/prefer-includes': 'error',
				'@typescript-eslint/prefer-nullish-coalescing': [
					'error',
					{
						ignoreConditionalTests: false,
						ignoreMixedLogicalExpressions: false,
					},
				],
				'@typescript-eslint/prefer-optional-chain': 'error',
				'@typescript-eslint/prefer-readonly': 'error',
				'@typescript-eslint/prefer-readonly-parameter-types': 'off',
				'@typescript-eslint/prefer-reduce-type-parameter': 'error',
				'@typescript-eslint/prefer-regexp-exec': 'error',
				'@typescript-eslint/prefer-return-this-type': 'error',
				'@typescript-eslint/prefer-string-starts-ends-with': 'error',
				'@typescript-eslint/promise-function-async': 'off',
				'@typescript-eslint/require-array-sort-compare': [
					'error',
					{
						ignoreStringArrays: true,
					},
				],
				'@typescript-eslint/restrict-plus-operands': [
					'error',
					{
						allowAny: false,
						allowBoolean: false,
						allowNullish: false,
						allowNumberAndString: false,
						allowRegExp: false,
					},
				],
				'@typescript-eslint/restrict-template-expressions': [
					'error',
					{
						allowAny: false,
						allowBoolean: false,
						allowNullish: false,
						allowNumber: true,
						allowRegExp: false,
					},
				],
				'@typescript-eslint/strict-boolean-expressions': [
					'error',
					{
						allowString: false,
						allowNumber: false,
						allowNullableObject: false,
						allowNullableBoolean: false,
						allowNullableString: false,
						allowNullableNumber: false,
						allowAny: false,
						allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
					},
				],
				'@typescript-eslint/switch-exhaustiveness-check': 'error',
				'@typescript-eslint/unbound-method': [
					'error',
					{
						ignoreStatic: false,
					},
				],
				'@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
			},
		})
	}

	return configs
}
