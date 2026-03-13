import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import js from '@eslint/js'
import globals from 'globals'
import { GLOB_SRC } from '../constants'

/**
 * JavaScript configuration options
 */
export interface JavaScriptOptions extends OptionsOverrides {
	/**
	 * Whether running in editor environment
	 */
	isInEditor?: boolean
}

/**
 * JavaScript base configuration
 */
export function javascript(options: JavaScriptOptions = {}): Linter.Config {
	const { isInEditor = false, overrides = {} } = options

	return {
		files: [GLOB_SRC],
		languageOptions: {
			ecmaVersion: 2022,
			globals: {
				...globals.browser,
				...globals.es2021,
				...globals.node,
				document: 'readonly',
				navigator: 'readonly',
				window: 'readonly',
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			sourceType: 'module',
		},
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		name: 'eslint-sets/javascript',
		rules: {
			...js.configs.recommended.rules,

			// Basic rules
			'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],
			'array-callback-return': 'error',
			'block-scoped-var': 'error',
			'constructor-super': 'error',
			'default-case-last': 'error',
			'dot-notation': ['error', { allowKeywords: true }],
			eqeqeq: ['error', 'smart'],
			indent: 'off', // Let Prettier handle
			'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],
			'no-alert': 'warn',
			'no-array-constructor': 'error',
			'no-async-promise-executor': 'error',
			'no-caller': 'error',
			'no-case-declarations': 'error',
			'no-class-assign': 'error',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': ['error', 'always'],
			'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
			'no-const-assign': 'error',
			'no-control-regex': 'error',
			'no-debugger': 'warn',
			'no-delete-var': 'error',
			'no-dupe-args': 'error',
			'no-dupe-class-members': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-empty': ['error', { allowEmptyCatch: true }],
			'no-empty-character-class': 'error',
			'no-empty-pattern': 'error',
			'no-eval': 'error',
			'no-ex-assign': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-boolean-cast': 'error',
			'no-extra-semi': 'off',
			'no-fallthrough': 'error',
			'no-func-assign': 'error',
			'no-global-assign': 'error',
			'no-implied-eval': 'error',
			'no-import-assign': 'error',
			'no-invalid-regexp': 'error',
			'no-irregular-whitespace': 'warn',
			'no-iterator': 'error',
			'no-labels': 'off',
			'no-lone-blocks': 'error',
			'no-loss-of-precision': 'error',
			'no-misleading-character-class': 'error',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'no-multi-str': 'error',
			'no-new': 'error',
			'no-new-func': 'error',
			'no-new-native-nonconstructor': 'error',
			'no-new-wrappers': 'error',
			'no-obj-calls': 'error',
			'no-octal': 'error',
			'no-octal-escape': 'error',
			'no-proto': 'error',
			'no-prototype-builtins': 'off',
			'no-redeclare': ['error', { builtinGlobals: false }],
			'no-regex-spaces': 'error',
			'no-restricted-globals': [
				'error',
				{ message: 'Use `globalThis` instead.', name: 'global' },
				{ message: 'Use `globalThis` instead.', name: 'self' },
			],
			'no-restricted-properties': [
				'error',
				{
					message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
					property: '__proto__',
				},
				{ message: 'Use `Object.defineProperty` instead.', property: '__defineGetter__' },
				{ message: 'Use `Object.defineProperty` instead.', property: '__defineSetter__' },
				{ message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupGetter__' },
				{ message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupSetter__' },
			],
			'no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
			'no-self-assign': ['error', { props: true }],
			'no-self-compare': 'error',
			'no-sequences': 'error',
			'no-shadow': 'off',
			'no-shadow-restricted-names': 'error',
			'no-sparse-arrays': 'error',
			'no-tabs': 'off',
			'no-template-curly-in-string': 'off',
			'no-this-before-super': 'error',
			'no-throw-literal': 'off',
			'no-undef': 'error',
			'no-undef-init': 'error',
			'no-unexpected-multiline': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unneeded-ternary': ['error', { defaultAssignment: false }],
			'no-unreachable': 'error',
			'no-unreachable-loop': 'error',
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': 'error',
			'no-unused-expressions': [
				'error',
				{
					allowShortCircuit: true,
					allowTaggedTemplates: true,
					allowTernary: true,
				},
			],
			'no-unused-vars': [
				'error',
				{
					args: 'none',
					caughtErrors: 'none',
					ignoreRestSiblings: true,
					vars: 'all',
				},
			],
			'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
			'no-useless-backreference': 'error',
			'no-useless-call': 'error',
			'no-useless-catch': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-constructor': 'error',
			'no-useless-rename': 'error',
			'no-useless-return': 'error',
			'no-var': 'error',
			'no-void': 'error',
			'no-with': 'error',
			'object-shorthand': 'error',
			'one-var': [
				'warn',
				{
					const: 'never',
					let: 'always',
					var: 'always',
				},
			],
			'operator-linebreak': 'off',
			'prefer-arrow-callback': [
				'error',
				{
					allowNamedFunctions: false,
					allowUnboundThis: true,
				},
			],
			'prefer-const': [
				'error',
				{
					destructuring: 'all',
					ignoreReadBeforeAssign: true,
				},
			],
			'prefer-exponentiation-operator': 'error',
			'prefer-promise-reject-errors': 'error',
			'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			// Note: sort-imports is disabled - sorting is handled by perfectionist/sort-imports
			'sort-imports': 'off',
			'space-before-function-paren': 'off',
			'symbol-description': 'error',
			'unicode-bom': ['error', 'never'],
			'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],
			'valid-typeof': 'error',
			'vars-on-top': 'error',
			yoda: ['error', 'never'],

			// Disable in editor for performance
			...(isInEditor
				? {
					'no-unused-vars': 'off',
				}
				: {}),

			// User overrides
			...overrides,
		},
	}
}
