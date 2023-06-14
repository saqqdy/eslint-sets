import type ESLint from 'eslint'
import { isPackageExists } from 'local-pkg'

const tsExits = isPackageExists('typescript')

if (!tsExits)
	console.warn('[@eslint-sets/eslint-config] TypeScript is not installed, fallback to JS only.')

const config: ESLint.Linter.BaseConfig = {
	plugins: [
		'react',
		'react-hooks',
		'prettier'
		// 'eslint-plugin-tsdoc'
	],
	extends: [
		'plugin:react/recommended',
		tsExits ? '@eslint-sets/eslint-config-ts' : '@eslint-sets/eslint-config-basic',
		'plugin:vitest-globals/recommended',
		'prettier'
	],
	rules: {
		'jsx-quotes': ['error', 'prefer-double'],
		'react/react-in-jsx-scope': 'off'
	},
	globals: {
		__DEV__: false,
		h: true,
		window: true,
		define: true,
		history: true,
		location: true,
		$: true,
		process: true
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
	],
	settings: {
		react: {
			version: '17.0.0'
		}
	}
}

export default config
