import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_REACT, GLOB_TSX } from '../constants'
import { hasReactCompiler, loadPlugin } from '../plugins'

/**
 * React configuration options
 */
export interface ReactOptions extends OptionsOverrides {
	/**
	 * Enable React Compiler rules
	 * @default auto-detect
	 */
	reactCompiler?: boolean

	/**
	 * Enable JSX accessibility rules
	 * Requires eslint-plugin-jsx-a11y
	 * @default false
	 */
	a11y?: boolean
}

// Type definitions for React plugins
type ESLintPluginReact = typeof import('eslint-plugin-react')
type ESLintPluginReactHooks = typeof import('eslint-plugin-react-hooks')
type ESLintPluginReactRefresh = typeof import('eslint-plugin-react-refresh')
// eslint-plugin-jsx-a11y doesn't have types, use a minimal interface
interface ESLintPluginJsxA11y {
	configs: {
		recommended: { rules: Linter.RulesRecord }
		strict: { rules: Linter.RulesRecord }
	}
	rules: Linter.RulesRecord
}

/**
 * React configuration
 */
export async function react(options: ReactOptions = {}): Promise<Linter.Config[]> {
	const { reactCompiler = hasReactCompiler(), a11y = false, overrides = {} } = options

	const [reactPlugin, hooksPlugin, refreshPlugin, jsxA11yPlugin] = await Promise.all([
		loadPlugin<ESLintPluginReact>('eslint-plugin-react'),
		loadPlugin<ESLintPluginReactHooks>('eslint-plugin-react-hooks'),
		loadPlugin<ESLintPluginReactRefresh>('eslint-plugin-react-refresh'),
		a11y ? loadPlugin<ESLintPluginJsxA11y>('eslint-plugin-jsx-a11y') : null,
	])

	if (!reactPlugin || !hooksPlugin) {
		return []
	}

	const configs: Linter.Config[] = [
		{
			name: 'eslint-sets/react/setup',
			files: [GLOB_REACT],
			plugins: {
				react: reactPlugin,
				'react-hooks': hooksPlugin,
				...(refreshPlugin && { 'react-refresh': refreshPlugin }),
				...(jsxA11yPlugin && { 'jsx-a11y': jsxA11yPlugin as any }),
			},
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
			settings: {
				react: {
					version: 'detect',
				},
			},
			rules: {
				// React rules
				'react/boolean-prop-naming': 'off',
				'react/button-has-type': 'error',
				'react/default-props-match-prop-types': 'error',
				'react/destructuring-assignment': ['error', 'always'],
				'react/display-name': 'warn',
				'react/forbid-component-props': 'off',
				'react/forbid-dom-props': 'off',
				'react/forbid-elements': 'off',
				'react/forbid-foreign-prop-types': 'warn',
				'react/forbid-prop-types': 'off',
				'react/function-component-definition': [
					'error',
					{
						namedComponents: 'function-declaration',
						unnamedComponents: 'arrow-function',
					},
				],
				'react/hook-use-state': 'off',
				'react/iframe-missing-sandbox': 'error',
				'react/jsx-boolean-value': ['error', 'never'],
				'react/jsx-child-element-spacing': 'off',
				'react/jsx-closing-bracket-location': 'off',
				'react/jsx-closing-tag-location': 'error',
				'react/jsx-curly-brace-presence': [
					'error',
					{
						props: 'never',
						children: 'never',
					},
				],
				'react/jsx-curly-newline': 'off',
				'react/jsx-curly-spacing': ['error', 'never'],
				'react/jsx-equals-spacing': ['error', 'never'],
				'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
				'react/jsx-first-prop-new-line': ['error', 'never'],
				'react/jsx-fragments': ['error', 'syntax'],
				'react/jsx-handler-names': 'off',
				'react/jsx-indent': 'off', // Let Prettier/Stylistic handle
				'react/jsx-indent-props': 'off', // Let Prettier/Stylistic handle
				'react/jsx-key': [
					'error',
					{
						checkFragmentShorthand: true,
						checkKeyMustBeforeSpread: true,
					},
				],
				'react/jsx-max-depth': 'off',
				'react/jsx-max-props-per-line': 'off',
				'react/jsx-newline': 'off',
				'react/jsx-no-bind': 'off',
				'react/jsx-no-comment-textnodes': 'error',
				'react/jsx-no-constructed-context-values': 'warn',
				'react/jsx-no-duplicate-props': 'error',
				'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
				'react/jsx-no-literals': 'off',
				'react/jsx-no-script-url': 'error',
				'react/jsx-no-target-blank': 'error',
				'react/jsx-no-undef': 'error',
				'react/jsx-no-useless-fragment': [
					'error',
					{
						allowExpressions: true,
					},
				],
				'react/jsx-one-expression-per-line': 'off',
				'react/jsx-pascal-case': 'error',
				'react/jsx-props-no-spreading': 'off',
				'react/jsx-sort-props': 'off',
				'react/jsx-tag-spacing': [
					'error',
					{
						closingSlash: 'never',
						beforeSelfClosing: 'always',
						afterOpening: 'never',
						beforeClosing: 'never',
					},
				],
				'react/jsx-uses-react': 'off',
				'react/jsx-uses-vars': 'error',
				'react/jsx-wrap-multilines': 'off',
				'react/no-access-state-in-setstate': 'error',
				'react/no-adjacent-inline-elements': 'off',
				'react/no-array-index-key': 'warn',
				'react/no-arrow-function-lifecycle': 'error',
				'react/no-children-prop': 'error',
				'react/no-danger': 'warn',
				'react/no-danger-with-children': 'error',
				'react/no-deprecated': 'error',
				'react/no-did-mount-set-state': 'warn',
				'react/no-did-update-set-state': 'warn',
				'react/no-direct-mutation-state': 'error',
				'react/no-find-dom-node': 'error',
				'react/no-invalid-html-attribute': 'error',
				'react/no-is-mounted': 'error',
				'react/no-multi-comp': 'off',
				'react/no-namespace': 'error',
				'react/no-object-type-as-default-prop': 'error',
				'react/no-redundant-should-component-update': 'error',
				'react/no-render-return-value': 'error',
				'react/no-set-state': 'off',
				'react/no-string-refs': 'error',
				'react/no-this-in-sfc': 'error',
				'react/no-typos': 'error',
				'react/no-unescaped-entities': 'off',
				'react/no-unknown-property': 'error',
				'react/no-unsafe': 'off',
				'react/no-unstable-nested-components': 'error',
				'react/no-unused-class-component-methods': 'warn',
				'react/no-unused-prop-types': 'warn',
				'react/no-unused-state': 'warn',
				'react/no-will-update-set-state': 'error',
				'react/prefer-es6-class': ['error', 'always'],
				'react/prefer-read-only-props': 'off',
				'react/prefer-stateless-function': 'off',
				'react/prop-types': 'off',
				'react/react-in-jsx-scope': 'off',
				'react/require-default-props': 'off',
				'react/require-optimization': 'off',
				'react/require-render-return': 'error',
				'react/self-closing-comp': 'error',
				'react/sort-comp': 'off',
				'react/sort-default-props': 'off',
				'react/sort-prop-types': 'off',
				'react/state-in-constructor': 'off',
				'react/style-prop-object': 'error',
				'react/void-dom-elements-no-children': 'error',

				// React Hooks rules
				'react-hooks/rules-of-hooks': 'error',
				'react-hooks/exhaustive-deps': 'warn',

				// React Refresh rules
				...(refreshPlugin && {
					'react-refresh/only-export-components': [
						'warn',
						{
							allowConstantExport: true,
							allowExportNames: ['loader', 'meta', 'headers'],
						},
					],
				}),

				// React Compiler
				...(reactCompiler && {
					'react-compiler/react-compiler': 'error',
				}),

				// User overrides
				...overrides,
			},
		},
	]

	// Add JSX a11y rules if enabled
	if (a11y && jsxA11yPlugin) {
		configs.push({
			name: 'eslint-sets/react/a11y',
			files: [GLOB_TSX],
			plugins: {
				'jsx-a11y': jsxA11yPlugin as any,
			},
			rules: {
				...jsxA11yPlugin.configs.recommended.rules,
				'jsx-a11y/click-events-have-key-events': 'warn',
				'jsx-a11y/no-static-element-interactions': 'warn',
			},
		})
	}

	return configs
}
