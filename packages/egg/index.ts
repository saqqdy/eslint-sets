const config = {
	env: {
		node: true,
		es6: true,
		shelljs: true,
		commonjs: true
	},
	plugins: [
		'jsdoc',
		'prettier'
		// 'import'
	],
	extends: [
		'eslint-config-egg',
		'plugin:jsdoc/recommended',
		'@eslint-sets/eslint-config-basic',
		'prettier'
	],
	rules: {
		'jsdoc/tag-lines': [1, 'any', { startLines: 1 }]
	},
	globals: {
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
				'no-console': 'off'
			}
		}
	]
}

export default config
