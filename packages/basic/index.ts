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
	plugins: ['html', 'unicorn', 'prettier'],
	extends: [
		'./standard',
		'plugin:import/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:jsonc/recommended-with-jsonc',
		'plugin:yml/standard',
		'plugin:markdown/recommended',
		'prettier'
	],
	settings: {
		'import/resolver': {
			node: { extensions: ['.js', '.mjs', '.cjs'] }
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
		'no-redeclare': 2,
		'no-tabs': 'off',
		indent: 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'space-before-function-paren': [0, 'always'],
		'object-shorthand': 2,
		'no-unused-vars': [
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
		'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
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
		'unicorn/throw-new-error': 'error'
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
				'jsonc/array-bracket-spacing': ['error', 'never'],
				'jsonc/comma-dangle': ['error', 'never'],
				'jsonc/comma-style': ['error', 'last'],
				'jsonc/indent': 0,
				'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true }],
				'jsonc/no-octal-escape': 'error',
				'jsonc/object-curly-newline': ['error', { multiline: true, consistent: true }],
				'jsonc/object-curly-spacing': ['error', 'always'],
				'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }]
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
							'publisher',
							'name',
							'displayName',
							'icon',
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
							'typesVersions',
							'exports',
							'files',
							'categories',
							'scripts',
							'activationEvents',
							'dependencies',
							'devDependencies',
							'peerDependencies',
							'peerDependenciesMeta',
							'optionalDependencies',
							'engines',
							'resolutions',
							'overrides',
							'sideEffects',
							'pnpm',
							'keywords',
							'license',
							'author',
							'homepage',
							'bugs',
							'repository',
							'simple-git-hooks',
							'funding',
							'husky',
							'lint-staged',
							'eslintConfig',
							'contributes'
						]
					},
					{
						pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
						order: { type: 'asc' }
					},
					{
						pathPattern: '^exports.*$',
						order: ['types', 'require', 'import']
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
				'@typescript-eslint/no-var-requires': 'off'
			}
		},
		{
			files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
			rules: {
				'no-void': ['error', { allowAsStatement: true }]
			}
		},
		{
			files: ['script/**/*.*', 'scripts/**/*.*', 'cli.*'],
			rules: {
				'no-console': 'off'
			}
		},
		{
			files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
			rules: {
				'no-unused-expressions': 'off',
				'no-only-tests/no-only-tests': 'warn'
			}
		},
		{
			files: ['**/*.md/*.*'],
			rules: {
				'@typescript-eslint/no-redeclare': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/no-use-before-define': 'off',
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/comma-dangle': 'off',
				'@typescript-eslint/consistent-type-imports': 'off',
				'import/no-unresolved': 'off',
				'no-alert': 'off',
				'no-console': 'off',
				'no-restricted-imports': 'off',
				'no-undef': 'off',
				'no-unused-expressions': 'off',
				'no-unused-vars': 'off'
			}
		}
	]
}

export default config
