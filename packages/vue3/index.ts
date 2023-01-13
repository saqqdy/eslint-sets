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
		'plugin:vue-scoped-css/vue3-recommended',
		'plugin:vue/vue3-recommended',
		tsExits ? '@eslint-sets/eslint-config-ts' : '@eslint-sets/eslint-config-basic',
		'plugin:vitest-globals/recommended',
		'prettier'
	],
	rules: {
		'vue/max-attributes-per-line': 'off',
		'vue/no-v-html': 'off',
		'vue/require-default-prop': 'off',
		'vue/require-explicit-emits': 'off',
		'vue/multi-word-component-names': 'off',
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
		jest: 'readonly',
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly'
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/*.spec.{j,t}s?(x)'],
			env: {
				mocha: true,
				jest: true,
				'vitest-globals/env': true
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
				parser: '@typescript-eslint/parser',
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					experimentalObjectRestSpread: true,
					experimentalDecorators: true,
					jsx: true,
					tsx: true
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
