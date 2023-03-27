const { isPackageExists } = require('local-pkg')
const tsExits = isPackageExists('typescript')

if (!tsExits)
	console.warn('[@eslint-sets/eslint-config] TypeScript is not installed, fallback to JS only.')

const config = {
	plugins: [
		tsExits ? 'tsdoc' : 'jsdoc',
		'prettier'
		// 'import'
	],
	extends: [
		tsExits ? 'plugin:@typescript-eslint/recommended' : 'plugin:jsdoc/recommended',
		'plugin:vue-scoped-css/recommended',
		'plugin:vue/recommended',
		tsExits ? '@eslint-sets/eslint-config-ts' : '@eslint-sets/eslint-config-basic',
		'plugin:vitest-globals/recommended',
		'prettier'
	],
	rules: {
		'vue/max-attributes-per-line': 'off',
		'vue/no-v-html': 'off',
		// 'prettier/prettier': 'error',
		'vue/component-tags-order': [
			'error',
			{
				order: ['template', 'script', 'style']
			}
		]
	},
	globals: {
		h: true,
		jest: 'readonly'
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/*.spec.{j,t}s?(x)'],
			env: {
				mocha: true,
				jest: true
			},
			rules: {
				'no-console': 'off',
				'vue/one-component-per-file': 'off'
			}
		},
		{
			files: ['*.vue'],
			parser: 'vue-eslint-parser',
			parserOptions: {
				parser: '@babel/eslint-parser',
				requireConfigFile: false,
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					experimentalObjectRestSpread: true,
					experimentalDecorators: true,
					jsx: true
				},
				babelOptions: {
					parserOpts: {
						plugins: ['jsx']
					}
				},
				vueFeatures: {}
			},
			rules: {
				'vue/no-v-model-argument': 'off',
				'vue/valid-v-model': 0,
				'vue/html-indent': 0,
				...(tsExits ? { '@typescript-eslint/no-unused-vars': 'off' } : null)
			}
		}
	]
}

export default config
