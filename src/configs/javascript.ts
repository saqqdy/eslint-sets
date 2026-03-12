import type { Linter } from 'eslint'
import js from '@eslint/js'
import globals from 'globals'
import { GLOB_SRC } from '../constants'

/**
 * JavaScript base configuration
 */
export function javascript(): Linter.Config {
	return {
		name: 'eslint-sets/javascript',
		files: [GLOB_SRC],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2021,
				...globals.node,
			},
		},
		rules: {
			...js.configs.recommended.rules,
			// Additional rules
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',
			'no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'prefer-const': 'error',
			'no-var': 'error',
			eqeqeq: ['error', 'always'],
			curly: ['error', 'multi-line', 'consistent'],
		},
	}
}
