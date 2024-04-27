import type ESLint from 'eslint'
import { isPackageExists } from 'local-pkg'

const tsExits = isPackageExists('typescript')

if (!tsExits)
	console.warn('[@eslint-sets/eslint-config] TypeScript is not installed, fallback to JS only.')

const config: ESLint.Linter.BaseConfig = {
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
		'vue/multi-word-component-names': 'off',
		'vue/component-tags-order': [
			'error',
			{
				order: ['template', 'script', 'style']
			}
		],
		'vue-scoped-css/enforce-style-type': ['error', { allows: ['scoped', 'module'] }]
	},
	globals: {
		h: true,
		jest: 'readonly',
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly',
		$ref: 'readonly',
		$computed: 'readonly',
		$shallowRef: 'readonly',
		$customRef: 'readonly',
		$toRef: 'readonly'
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

if (config.rules && !tsExits) {
	config.rules['jsdoc/tag-lines'] = [1, 'any', { startLines: 1 }]
}

export default config
