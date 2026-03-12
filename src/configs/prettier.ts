import type { Linter } from 'eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import { GLOB_SRC } from '../constants'

/**
 * Prettier configuration
 */
export function prettier(): Linter.Config[] {
	return [
		{
			name: 'eslint-sets/prettier',
			files: [GLOB_SRC],
			plugins: {
				prettier: eslintPluginPrettier,
			},
			rules: {
				...eslintConfigPrettier.rules,
				'prettier/prettier': [
					'error',
					{
						singleQuote: true,
						trailingComma: 'all',
						tabWidth: 2,
						semi: false,
						printWidth: 100,
						bracketSpacing: true,
						arrowParens: 'always',
						endOfLine: 'lf',
					},
				],
			},
		},
	]
}
