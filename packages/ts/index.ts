const { existsSync } = require('fs')
const { join } = require('path')
const tsconfig = process.env.ESLINT_TSCONFIG || 'tsconfig.eslint.json'

const config = {
	root: true,
	env: {
		node: true,
		browser: true,
		// shelljs: true,
		commonjs: true,
		es6: true
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			experimentalDecorators: true,
			jsx: true
		}
	},
	ignorePatterns: [
		'*.min.*',
		'dist',
		'LICENSE*',
		'output',
		'coverage',
		'public',
		'temp',
		'packages-lock.json',
		'pnpm-lock.yaml',
		'yarn.lock',
		'__snapshots__',
		'!.github',
		'!.vitepress',
		'!.vuepress'
	],
	plugins: [
		'@typescript-eslint',
		'html',
		'unicorn',
		'prettier'
		// 'eslint-plugin-tsdoc'
	],
	extends: [
		'./standard',
		'plugin:import/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:jsonc/recommended-with-jsonc',
		'plugin:yml/standard',
		'plugin:markdown/recommended',
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
		// basic
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
		'no-debugger': 1,
		semi: [2, 'never'],
		quotes: ['error', 'single'],
		'comma-dangle': 'off',
		camelcase: ['error', { properties: 'never' }],
		'no-var': 'error',
		'no-empty': ['error', { allowEmptyCatch: true }],
		'no-void': 'error',
		'one-var': [
			'warn',
			{
				var: 'always',
				let: 'always',
				const: 'never'
			}
		],
		'no-throw-literal': 'off',
		'no-new-wrappers': 2,
		'no-useless-escape': 'off',
		'no-redeclare': 'off',
		'no-tabs': 'off',
		indent: 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'space-before-function-paren': [0, 'always'],
		'object-shorthand': 2,
		'no-unused-vars': 'off',
		'no-dupe-keys': 2,
		'no-func-assign': 2,
		'valid-typeof': 2,
		'no-shadow': 'off',
		'no-prototype-builtins': 'off',
		'no-undef': 2,
		'no-irregular-whitespace': 1,
		'array-callback-return': 'error',
		'block-scoped-var': 'error',
		'consistent-return': 'off',
		complexity: ['off', 11],
		eqeqeq: ['error', 'smart'],
		'no-alert': 'warn',
		'no-case-declarations': 'error',
		'no-multi-spaces': 'error',
		'no-multi-str': 'error',
		'no-with': 'error',
		'vars-on-top': 'error',
		'require-await': 'off',
		'no-return-assign': 'off',
		'operator-linebreak': 'off',
		'no-use-before-define': 'off',
		'no-template-curly-in-string': 'off',
		'no-extra-semi': 'off',
		'no-labels': 0,

		// eslint-comments
		'eslint-comments/disable-enable-pair': 'off',

		// import
		'import/order': 'error',
		'import/first': 'off',
		'import/no-duplicates': 'error',
		'import/no-mutable-exports': 'error',
		'import/no-unresolved': 'off',
		'import/no-absolute-path': 'off',
		'import/no-named-as-default': 'off',
		'import/no-named-as-default-member': 'off',

		// n
		'n/no-callback-literal': 'off',

		// prettier
		'prettier/prettier': 'error',

		'sort-imports': [
			'error',
			{
				ignoreCase: false,
				ignoreDeclarationSort: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
				allowSeparatedGroups: false
			}
		],

		// yml
		'yml/quotes': ['error', { prefer: 'single', avoidEscape: false }],
		'yml/no-empty-document': 'off',

		// unicorns
		// Pass error message when throwing errors
		'unicorn/error-message': 'error',
		// Uppercase regex escapes
		'unicorn/escape-case': 'error',
		// Array.isArray instead of instanceof
		'unicorn/no-array-instanceof': 'error',
		// Prevent deprecated `new Buffer()`
		'unicorn/no-new-buffer': 'error',
		// Keep regex literals safe!
		'unicorn/no-unsafe-regex': 'off',
		// Lowercase number formatting for octal, hex, binary (0x1'error' instead of 0X1'error')
		'unicorn/number-literal-case': 'error',
		// ** instead of Math.pow()
		'unicorn/prefer-exponentiation-operator': 'error',
		// includes over indexOf when checking for existence
		'unicorn/prefer-includes': 'error',
		// String methods startsWith/endsWith instead of more complicated stuff
		'unicorn/prefer-starts-ends-with': 'error',
		// textContent instead of innerText
		'unicorn/prefer-text-content': 'error',
		// Enforce throwing type error when throwing error while checking typeof
		'unicorn/prefer-type-error': 'error',
		// Use new when throwing error
		'unicorn/throw-new-error': 'error',

		// for typescript
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
		'@typescript-eslint/no-redeclare': 'error',
		'@typescript-eslint/no-use-before-define': [
			'error',
			{ functions: false, classes: false, variables: true }
		],
		'brace-style': 'off',
		'@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
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
	globals: {
		document: 'readonly',
		navigator: 'readonly',
		window: 'readonly'
	},
	overrides: [
		{
			files: ['*.json', '*.json5'],
			parser: 'jsonc-eslint-parser',
			rules: {
				quotes: ['error', 'double'],
				'quote-props': ['error', 'always'],
				'comma-dangle': ['error', 'never']
			}
		},
		{
			files: ['*.yaml', '*.yml'],
			parser: 'yaml-eslint-parser',
			rules: {
				'spaced-comment': 'off'
			}
		},
		{
			files: ['package.json'],
			parser: 'jsonc-eslint-parser',
			rules: {
				'jsonc/sort-keys': [
					'error',
					{
						pathPattern: '^$',
						order: [
							'name',
							'description',
							'type',
							'version',
							'private',
							'packageManager',
							'bin',
							'main',
							'module',
							'unpkg',
							'jsdelivr',
							'types',
							'exports',
							'files',
							'scripts',
							'dependencies',
							'devDependencies',
							'peerDependencies',
							'peerDependenciesMeta',
							'optionalDependencies',
							'sideEffects',
							'keywords',
							'license',
							'author',
							'repository',
							'funding',
							'husky',
							'lint-staged',
							'eslintConfig'
						]
					},
					{
						pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
						order: { type: 'asc' }
					}
				]
			}
		},
		{
			files: ['*.d.ts'],
			rules: {
				'import/no-duplicates': 'off'
			}
		},
		{
			files: ['*.js'],
			rules: {
				// '@typescript-eslint/no-var-requires': 'off'
			}
		},
		{
			files: ['scripts/**/*.*', 'cli.*'],
			rules: {
				'no-console': 'off'
			}
		},
		{
			files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
			rules: {
				'no-unused-expressions': 'off'
			}
		},
		{
			files: ['**/*.md/*.*'],
			rules: {
				'import/no-unresolved': 'off',
				'no-alert': 'off',
				'no-console': 'off',
				'no-restricted-imports': 'off',
				'no-undef': 'off',
				'no-unused-expressions': 'off',
				'no-unused-vars': 'off'
			}
		}
	].concat(
		!existsSync(join(process.cwd(), tsconfig))
			? []
			: [
					{
						files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
						parserOptions: {
							tsconfigRootDir: process.cwd(),
							project: [tsconfig]
						},
						parser: '@typescript-eslint/parser',
						excludedFiles: ['**/*.md/*.*'],
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
