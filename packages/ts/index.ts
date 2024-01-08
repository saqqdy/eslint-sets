const { existsSync } = require('fs')
const { join } = require('path')
const basic = require('@eslint-sets/eslint-config-basic')
const tsconfig = process.env.ESLINT_TSCONFIG || 'tsconfig.eslint.json'

const config = {
	plugins: [
		'@typescript-eslint',
		'prettier'
		// 'eslint-plugin-tsdoc'
	],
	extends: [
		'@eslint-sets/eslint-config-basic',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	settings: {
		'import/resolver': {
			node: {
				extensions: [
					'.js',
					'.jsx',
					'.mjs',
					'.cjs',
					'.ts',
					'.tsx',
					'.mts',
					'.cts',
					'.es6',
					'.es',
					'.json'
				]
			}
		}
	},
	rules: {
		'import/named': 'off',
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/no-extra-semi': 0,
		// TS
		'@typescript-eslint/semi': ['error', 'never'],
		'@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{ multiline: { delimiter: 'none' } }
		],
		'@typescript-eslint/type-annotation-spacing': ['error', {}],
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports', disallowTypeAnnotations: false }
		],
		'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
		'@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
		'@typescript-eslint/prefer-ts-expect-error': 'error',

		// Override JS
		'no-useless-constructor': 'off',
		'@typescript-eslint/indent': 0,
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			2,
			{
				args: 'none',
				caughtErrors: 'none',
				ignoreRestSiblings: true,
				vars: 'all',
				argsIgnorePattern: '^h$',
				varsIgnorePattern: '^h$'
			}
		],
		'no-redeclare': 'off',
		'@typescript-eslint/no-redeclare': 'error',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': [
			'error',
			{ functions: false, classes: false, variables: true }
		],
		'brace-style': 'off',
		'@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
		'comma-dangle': 'off',
		'@typescript-eslint/comma-dangle': 'off',
		'object-curly-spacing': 'off',
		'@typescript-eslint/object-curly-spacing': ['error', 'always'],

		// off
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-namespace': 'off'
	},
	overrides: basic.overrides.concat(
		!existsSync(join(process.cwd(), tsconfig))
			? []
			: [
					{
						parserOptions: {
							tsconfigRootDir: process.cwd(),
							project: [tsconfig]
						},
						parser: '@typescript-eslint/parser',
						excludedFiles: ['**/*.md/*.*'],
						files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
						// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
						rules: {
							'no-throw-literal': 'off',
							'@typescript-eslint/no-throw-literal': 'error',
							'no-implied-eval': 'off',
							'@typescript-eslint/no-implied-eval': 'error',
							'dot-notation': 'off',
							'@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
							'@typescript-eslint/no-floating-promises': 'error',
							'@typescript-eslint/no-misused-promises': 'error',
							'@typescript-eslint/await-thenable': 'error',
							'@typescript-eslint/no-for-in-array': 'error',
							'@typescript-eslint/no-unnecessary-type-assertion': 'error',
							'@typescript-eslint/no-unsafe-argument': 'error',
							'@typescript-eslint/no-unsafe-assignment': 'error',
							'@typescript-eslint/no-unsafe-call': 'error',
							'@typescript-eslint/no-unsafe-member-access': 'error',
							'@typescript-eslint/no-unsafe-return': 'error',
							'require-await': 'off',
							'@typescript-eslint/require-await': 'error',
							'@typescript-eslint/restrict-plus-operands': 'error',
							'@typescript-eslint/restrict-template-expressions': 'error',
							'@typescript-eslint/unbound-method': 'error'
						}
					},
					{
						// https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
						files: ['**/__tests__/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
						plugins: ['jest'],
						rules: {
							// you should turn the original rule off *only* for test files
							'@typescript-eslint/unbound-method': 'off',
							'jest/unbound-method': 'error'
						}
					}
				]
	)
}

export default config
