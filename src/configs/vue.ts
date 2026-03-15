import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import { GLOB_VUE } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Vue configuration options
 */
export interface VueOptions extends OptionsOverrides {
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
	const { a11y = false, overrides = {}, vueVersion = 3 } = options

	// Get recommended rules based on Vue version
	const vueRecommendedRules
		= vueVersion === 2
			? {
				...((vuePlugin.configs as any)['flat/vue2-essential']?.rules || {}),
				...((vuePlugin.configs as any)['flat/vue2-strongly-recommended']?.rules || {}),
				...((vuePlugin.configs as any)['flat/vue2-recommended']?.rules || {}),
			}
			: {
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
				'vue/define-macros-order': ['error', { order: ['defineOptions', 'defineProps', 'defineEmits'] }],
				'vue/multi-word-component-names': 'off',
				'vue/no-restricted-v-bind': ['error', '/^v-/'],
				'vue/no-v-html': 'off',
				'vue/prefer-separate-static-class': 'error',
				'vue/require-default-prop': 'off',
				'vue/require-prop-types': 'off',

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

					// User overrides
					...overrides,
				},
			})
		}
	}

	return configs
}
