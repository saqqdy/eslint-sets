import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from '@typescript-eslint/eslint-plugin'
import { GLOB_VUE } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Vue configuration options
 */
export interface VueOptions extends OptionsOverrides {
	/**
	 * Vue version. Apply different rules set from eslint-plugin-vue.
	 * @default 3
	 */
	vueVersion?: 2 | 3

	/**
	 * Enable Vue accessibility rules
	 * Requires eslint-plugin-vuejs-accessibility
	 * @default false
	 */
	a11y?: boolean
}

// Type definition for Vue accessibility plugin
interface VueA11yPlugin {
	rules: Linter.RulesRecord
}

/**
 * Vue configuration
 */
export async function vue(options: VueOptions = {}): Promise<Linter.Config[]> {
	const { vueVersion = 3, a11y = false, overrides = {} } = options

	// Get recommended rules based on Vue version
	const vueRecommendedRules =
		vueVersion === 2
			? {
					...(vuePlugin.configs['vue2-essential'].rules as any),
					...(vuePlugin.configs['vue2-strongly-recommended'].rules as any),
					...(vuePlugin.configs['vue2-recommended'].rules as any),
				}
			: {
					...(vuePlugin.configs.essential.rules as any),
					...(vuePlugin.configs['strongly-recommended'].rules as any),
					...(vuePlugin.configs.recommended.rules as any),
				}

	const configs: Linter.Config[] = [
		{
			name: 'eslint-sets/vue/setup',
			files: [GLOB_VUE],
			languageOptions: {
				parser: vueParser,
				parserOptions: {
					ecmaVersion: 'latest',
					sourceType: 'module',
					extraFileExtensions: ['.vue'],
					ecmaFeatures: {
						jsx: vueVersion === 3,
					},
				},
				globals: {
					// Vue 3 Composition API globals
					computed: 'readonly',
					defineEmits: 'readonly',
					defineExpose: 'readonly',
					defineProps: 'readonly',
					defineModel: 'readonly',
					defineSlots: 'readonly',
					defineOptions: 'readonly',
					onMounted: 'readonly',
					onUnmounted: 'readonly',
					onBeforeMount: 'readonly',
					onBeforeUnmount: 'readonly',
					reactive: 'readonly',
					ref: 'readonly',
					shallowReactive: 'readonly',
					shallowRef: 'readonly',
					toRef: 'readonly',
					toRefs: 'readonly',
					watch: 'readonly',
					watchEffect: 'readonly',
					watchPostEffect: 'readonly',
					watchSyncEffect: 'readonly',
					useSlots: 'readonly',
					useAttrs: 'readonly',
				},
			},
			plugins: {
				vue: vuePlugin,
				'@typescript-eslint': tseslint as any,
			},
			rules: {
				...vueRecommendedRules,

				// Vue-specific rules
				'node/prefer-global/process': 'off',
				'vue/block-order': [
					'error',
					{
						order: ['script', 'template', 'style'],
					},
				],
				'vue/component-name-in-template-casing': ['error', 'PascalCase'],
				'vue/component-options-name-casing': ['error', 'PascalCase'],
				'vue/component-tags-order': 'off', // deprecated
				'vue/custom-event-name-casing': ['error', 'camelCase'],
				'vue/define-macros-order': [
					'error',
					{
						order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
					},
				],
				'vue/dot-location': ['error', 'property'],
				'vue/dot-notation': ['error', { allowKeywords: true }],
				'vue/eqeqeq': ['error', 'smart'],
				'vue/html-quotes': ['error', 'double'],
				'vue/max-attributes-per-line': 'off',
				'vue/multi-word-component-names': 'off',
				'vue/no-dupe-keys': 'off',
				'vue/no-empty-pattern': 'error',
				'vue/no-irregular-whitespace': 'error',
				'vue/no-loss-of-precision': 'error',
				'vue/no-restricted-syntax': [
					'error',
					'DebuggerStatement',
					'LabeledStatement',
					'WithStatement',
				],
				'vue/no-restricted-v-bind': ['error', '/^v-/'],
				'vue/no-setup-props-reactivity-loss': 'off',
				'vue/no-sparse-arrays': 'error',
				'vue/no-unused-refs': 'error',
				'vue/no-useless-v-bind': 'error',
				'vue/no-v-html': 'off',
				'vue/object-shorthand': [
					'error',
					'always',
					{
						avoidQuotes: true,
						ignoreConstructors: false,
					},
				],
				'vue/prefer-separate-static-class': 'error',
				'vue/prefer-template': 'error',
				'vue/prop-name-casing': ['error', 'camelCase'],
				'vue/require-default-prop': 'off',
				'vue/require-prop-types': 'off',
				'vue/space-infix-ops': 'error',
				'vue/space-unary-ops': ['error', { nonwords: false, words: true }],

				// Stylistic rules
				'vue/array-bracket-spacing': ['error', 'never'],
				'vue/arrow-spacing': ['error', { after: true, before: true }],
				'vue/block-spacing': ['error', 'always'],
				'vue/block-tag-newline': [
					'error',
					{
						multiline: 'always',
						singleline: 'always',
					},
				],
				'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
				'vue/comma-dangle': ['error', 'always-multiline'],
				'vue/comma-spacing': ['error', { after: true, before: false }],
				'vue/comma-style': ['error', 'last'],
				'vue/html-comment-content-spacing': [
					'error',
					'always',
					{
						exceptions: ['-'],
					},
				],
				'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
				'vue/keyword-spacing': ['error', { after: true, before: true }],
				'vue/object-curly-newline': 'off',
				'vue/object-curly-spacing': ['error', 'always'],
				'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
				'vue/operator-linebreak': ['error', 'before'],
				'vue/padding-line-between-blocks': ['error', 'always'],
				'vue/quote-props': ['error', 'consistent-as-needed'],
				'vue/space-in-parens': ['error', 'never'],
				'vue/template-curly-spacing': 'error',

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
				name: 'eslint-sets/vue/a11y',
				files: [GLOB_VUE],
				plugins: {
					'vuejs-accessibility': vueA11yPlugin as any,
				},
				rules: {
					// Vue accessibility rules
					'vuejs-accessibility/alt-text': 'error',
					'vuejs-accessibility/anchor-has-content': 'error',
					'vuejs-accessibility/aria-activedescendant-has-tabindex': 'error',
					'vuejs-accessibility/aria-hidden': 'warn',
					'vuejs-accessibility/aria-label': 'error',
					'vuejs-accessibility/aria-props': 'error',
					'vuejs-accessibility/aria-role': 'error',
					'vuejs-accessibility/aria-unsupported-elements': 'error',
					'vuejs-accessibility/click-events-have-key-events': 'warn',
					'vuejs-accessibility/form-control-has-label': 'error',
					'vuejs-accessibility/heading-has-content': 'error',
					'vuejs-accessibility/html-has-lang': 'error',
					'vuejs-accessibility/iframe-has-title': 'error',
					'vuejs-accessibility/interactive-supports-focus': 'error',
					'vuejs-accessibility/label-has-for': 'error',
					'vuejs-accessibility/lang': 'error',
					'vuejs-accessibility/media-has-caption': 'warn',
					'vuejs-accessibility/mouse-events-have-key-events': 'error',
					'vuejs-accessibility/no-access-key': 'error',
					'vuejs-accessibility/no-autofocus': 'warn',
					'vuejs-accessibility/no-distracting-elements': 'warn',
					'vuejs-accessibility/no-onchange': 'off',
					'vuejs-accessibility/no-redundant-roles': 'error',
					'vuejs-accessibility/no-static-element-interactions': 'warn',
					'vuejs-accessibility/role-has-required-aria-props': 'error',
					'vuejs-accessibility/role-supports-aria-props': 'error',
					'vuejs-accessibility/scope': 'error',
					'vuejs-accessibility/tabindex-no-positive': 'error',
					'vuejs-accessibility/video-has-caption': 'warn',
				},
			})
		}
	}

	return configs
}
