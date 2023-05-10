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
		'plugin:svelte/recommended',
		tsExits ? '@eslint-sets/eslint-config-ts' : '@eslint-sets/eslint-config-basic',
		'plugin:vitest-globals/recommended',
		'prettier'
	],
	rules: {
		//
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
				'no-console': 'off'
			}
		},
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					// globalReturn: false,
					// impliedStrict: false,
					experimentalObjectRestSpread: true,
					experimentalDecorators: true,
					jsx: true,
					tsx: true
				}
			},
			rules: {
				...(tsExits ? { '@typescript-eslint/no-unused-vars': 'off' } : null)
			}
		}
	]
}

export default config
