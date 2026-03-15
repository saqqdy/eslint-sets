import type { Linter } from 'eslint'
import type { OptionsOverrides, OptionsStylistic } from '../types'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import { GLOB_VUE } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Vue configuration options
 */
export interface VueOptions extends OptionsOverrides, OptionsStylistic {
	/**
	 * Enable Vue accessibility rules
	 * Requires eslint-plugin-vuejs-accessibility
	 * @default false
	 */
	a11y?: boolean

	/**
	 * Vue version. Apply different rules set from eslint-plugin-vue.
	 * @default 3
	 */
	vueVersion?: 2 | 3
}

// Type definition for Vue accessibility plugin
interface VueA11yPlugin {
	rules: Linter.RulesRecord
}

/**
 * Vue configuration
 */
export async function vue(options: VueOptions = {}): Promise<Linter.Config[]> {
	const {
		a11y = false,
		overrides = {},
		stylistic = true,
		vueVersion = 3,
	} = options

	const {
		indent = 2,
	} = typeof stylistic === 'boolean' ? {} : stylistic

	// Get recommended rules based on Vue version
	const vueRecommendedRules =
		vueVersion === 2 ? {
			...((vuePlugin.configs as any)['flat/vue2-essential']?.rules || {}),
			...((vuePlugin.configs as any)['flat/vue2-strongly-recommended']?.rules || {}),
			...((vuePlugin.configs as any)['flat/vue2-recommended']?.rules || {}),
		} : {
			...((vuePlugin.configs as any)['flat/essential']?.rules || {}),
			...((vuePlugin.configs as any)['flat/strongly-recommended']?.rules || {}),
			...((vuePlugin.configs as any)['flat/recommended']?.rules || {}),
		}

	const configs: Linter.Config[] = [
		{
			files: [GLOB_VUE],
			languageOptions: {
				parser: vueParser,
				parserOptions: {
					ecmaFeatures: {
						jsx: vueVersion === 3,
					},
					ecmaVersion: 'latest',
					extraFileExtensions: ['.vue'],
					parser: '@typescript-eslint/parser',
					sourceType: 'module',
				},
			},
			name: 'eslint-sets/vue',
			plugins: {
				vue: vuePlugin,
			},
			rules: {
				// Vue recommended rules
				...vueRecommendedRules,

				// Essential custom rules
				'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
				'vue/component-name-in-template-casing': ['error', 'PascalCase'],
				'vue/component-options-name-casing': ['error', 'PascalCase'],
				'vue/custom-event-name-casing': ['error', 'camelCase'],
				'vue/define-macros-order': ['error', { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] }],
				'vue/dot-location': ['error', 'property'],
				'vue/dot-notation': ['error', { allowKeywords: true }],
				'vue/eqeqeq': ['error', 'smart'],
				'vue/multi-word-component-names': 'off',
				'vue/no-dupe-keys': 'off',
				'vue/no-empty-pattern': 'error',
				'vue/no-irregular-whitespace': 'error',
				'vue/no-loss-of-precision': 'error',
				'vue/no-restricted-v-bind': ['error', '/^v-/'],
				'vue/no-setup-props-reactivity-loss': 'off',
				'vue/no-sparse-arrays': 'error',
				'vue/no-unused-refs': 'error',
				'vue/no-useless-v-bind': 'error',
				'vue/no-v-html': 'off',
				'vue/prefer-separate-static-class': 'error',
				'vue/prefer-template': 'error',
				'vue/prop-name-casing': ['error', 'camelCase'],
				'vue/require-default-prop': 'off',
				'vue/require-prop-types': 'off',
				'vue/space-infix-ops': 'error',
				'vue/space-unary-ops': ['error', { nonwords: false, words: true }],

				// Stylistic rules (conditional)
				...(stylistic ? {
					'vue/array-bracket-spacing': ['error', 'never'],
					'vue/arrow-spacing': ['error', { after: true, before: true }],
					'vue/block-spacing': ['error', 'always'],
					'vue/block-tag-newline': ['error', { multiline: 'always', singleline: 'always' }],
					'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
					'vue/comma-dangle': ['error', 'always-multiline'],
					'vue/comma-spacing': ['error', { after: true, before: false }],
					'vue/comma-style': ['error', 'last'],
					'vue/html-indent': ['error', indent === 'tab' ? 'tab' : indent],
					'vue/html-quotes': ['error', 'double'],
					'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
					'vue/keyword-spacing': ['error', { after: true, before: true }],
					'vue/max-attributes-per-line': 'off',
					'vue/object-curly-newline': 'off',
					'vue/object-curly-spacing': ['error', 'always'],
					'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
					'vue/operator-linebreak': ['error', 'after', {
						overrides: {
							'&': 'before',
							// ':': 'before', // Ternary operator: colon at beginning of line
							// '?': 'before', // Ternary operator: question mark at beginning of line
							'|': 'before',
						},
					}],
					'vue/padding-line-between-blocks': ['error', 'always'],
					'vue/quote-props': ['error', 'consistent-as-needed'],
					'vue/space-in-parens': ['error', 'never'],
					'vue/template-curly-spacing': 'error',
				} : {}),

				// User overrides
				...overrides,
			},
		},
	]

	// Add Vue accessibility rules if enabled
	if (a11y) {
		const vueA11yPlugin = await loadPlugin<VueA11yPlugin>('eslint-plugin-vuejs-accessibility')

		if (vueA11yPlugin) {
			configs.push({
				files: [GLOB_VUE],
				name: 'eslint-sets/vue/a11y',
				plugins: {
					'vuejs-accessibility': vueA11yPlugin as any,
				},
				rules: {
					// Core accessibility rules
					'vuejs-accessibility/alt-text': 'error',
					'vuejs-accessibility/aria-label': 'error',
					'vuejs-accessibility/aria-props': 'error',
					'vuejs-accessibility/aria-role': 'error',
					'vuejs-accessibility/form-control-has-label': 'error',
					'vuejs-accessibility/html-has-lang': 'error',
					'vuejs-accessibility/label-has-for': 'error',
					'vuejs-accessibility/no-autofocus': 'warn',
					'vuejs-accessibility/no-redundant-roles': 'error',
					'vuejs-accessibility/tabindex-no-positive': 'error',
				},
			})
		}
	}

	return configs
}
