const config = {
	plugins: [
		// 'eslint-plugin-jsdoc',
		'prettier'
		// 'import'
	],
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended',
		'@eslint-sets/eslint-config-basic',
		'prettier'
		// 'plugin:jsdoc/recommended'
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
				'vue/valid-v-model': 0
			}
		}
	]
}

export default config
