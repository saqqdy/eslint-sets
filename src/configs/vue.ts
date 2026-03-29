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
	 * Enable SFC blocks processing
	 * Creates virtual files for each Vue SFC block (styles, custom blocks)
	 * Requires eslint-processor-vue-blocks and @vue/compiler-sfc
	 * @default false
	 */
	sfcBlocks?: boolean | {
		/**
		 * Process style blocks
		 * @default true
		 */
		styles?: boolean
		/**
		 * Process custom blocks
		 * @default false
		 */
		customBlocks?: boolean | string[]
	}

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

// Type definition for Vue blocks processor
interface VueBlocksProcessor {
	default: (options?: {
		blocks?: {
			styles?: boolean
			customBlocks?: boolean | string[]
			template?: boolean
			script?: boolean
			scriptSetup?: boolean
		}
		defaultLanguage?: Record<string, string>
	}) => Linter.Processor
}

/**
 * Vue configuration
 */
export async function vue(options: VueOptions = {}): Promise<Linter.Config[]> {
	const {
		a11y = false,
		overrides = {},
		sfcBlocks = false,
		stylistic = true,
		vueVersion = 3,
	} = options

	const {
		indent = 2,
	} = typeof stylistic === 'boolean' ? {} : stylistic

	// Load Vue a11y plugin if enabled
	const vueA11yPlugin = a11y ? await loadPlugin<VueA11yPlugin>('eslint-plugin-vuejs-accessibility') : null

	// Load Vue blocks processor if enabled
	const vueBlocksProcessor = sfcBlocks ? await loadPlugin<VueBlocksProcessor>('eslint-processor-vue-blocks') : null

	// Get recommended rules based on Vue version
	const vueRecommendedRules
		= vueVersion === 2 ? {
			...((vuePlugin.configs as any)['flat/vue2-essential']?.rules || {}),
			...((vuePlugin.configs as any)['flat/vue2-strongly-recommended']?.rules || {}),
			...((vuePlugin.configs as any)['flat/vue2-recommended']?.rules || {}),
		} : {
			...((vuePlugin.configs as any)['flat/essential']?.rules || {}),
			...((vuePlugin.configs as any)['flat/strongly-recommended']?.rules || {}),
			...((vuePlugin.configs as any)['flat/recommended']?.rules || {}),
		}

	const configs: Linter.Config[] = []

	// Add SFC blocks processor if enabled
	if (vueBlocksProcessor && typeof sfcBlocks !== 'boolean') {
		const processorOptions = typeof sfcBlocks === 'object' ? sfcBlocks : {}
		configs.push({
			name: 'eslint-sets/vue/sfc-blocks',
			files: [GLOB_VUE],
			processor: vueBlocksProcessor.default({
				blocks: {
					styles: processorOptions.styles ?? true,
					customBlocks: processorOptions.customBlocks ?? false,
				},
			}),
		})
	} else if (vueBlocksProcessor) {
		configs.push({
			name: 'eslint-sets/vue/sfc-blocks',
			files: [GLOB_VUE],
			processor: vueBlocksProcessor.default({
				blocks: {
					styles: true,
					customBlocks: false,
				},
			}),
		})
	}

	configs.push({
		name: 'eslint-sets/vue',
		files: [GLOB_VUE],
		languageOptions: {
			globals: vueVersion === 3 ? {
				// Vue 3 global APIs
				computed: 'readonly',
				defineComponent: 'readonly',
				effectScope: 'readonly',
				getCurrentInstance: 'readonly',
				inject: 'readonly',
				isProxy: 'readonly',
				isReactive: 'readonly',
				isReadonly: 'readonly',
				isRef: 'readonly',
				markRaw: 'readonly',
				onActivated: 'readonly',
				onBeforeMount: 'readonly',
				onBeforeUnmount: 'readonly',
				onBeforeUpdate: 'readonly',
				onDeactivated: 'readonly',
				onErrorCaptured: 'readonly',
				onMounted: 'readonly',
				onRenderTracked: 'readonly',
				onRenderTriggered: 'readonly',
				onScopeDispose: 'readonly',
				onServerPrefetch: 'readonly',
				onUnmounted: 'readonly',
				onUpdated: 'readonly',
				provide: 'readonly',
				reactive: 'readonly',
				readonly: 'readonly',
				ref: 'readonly',
				resolveComponent: 'readonly',
				resolveDirective: 'readonly',
				shallowReactive: 'readonly',
				shallowReadonly: 'readonly',
				shallowRef: 'readonly',
				toRaw: 'readonly',
				toRef: 'readonly',
				toRefs: 'readonly',
				triggerRef: 'readonly',
				unref: 'readonly',
				useAttrs: 'readonly',
				useCssModule: 'readonly',
				useCssVars: 'readonly',
				useRoute: 'readonly',
				useRouter: 'readonly',
				useSlots: 'readonly',
				watch: 'readonly',
				watchEffect: 'readonly',
				watchPostEffect: 'readonly',
				watchSyncEffect: 'readonly',
			} : {},
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
		plugins: {
			vue: vuePlugin,
			...(vueA11yPlugin ? { 'vue-a11y': vueA11yPlugin as any } : {}),
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
			'vue/object-shorthand': ['error', 'always', { avoidQuotes: true, ignoreConstructors: false }],
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
				'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
				'vue/comma-dangle': ['error', 'always-multiline'],
				'vue/comma-spacing': ['error', { after: true, before: false }],
				'vue/comma-style': ['error', 'last'],
				'vue/html-comment-content-spacing': ['error', 'always', { exceptions: ['-'] }],
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
						'|': 'before',
					},
				}],
				'vue/padding-line-between-blocks': ['error', 'always'],
				'vue/quote-props': ['error', 'consistent-as-needed'],
				'vue/space-in-parens': ['error', 'never'],
				'vue/template-curly-spacing': 'error',
			} : {}),

			// Vue a11y rules (conditional)
			...(vueA11yPlugin ? {
				'vue-a11y/alt-text': 'error',
				'vue-a11y/anchor-has-content': 'error',
				'vue-a11y/aria-props': 'error',
				'vue-a11y/aria-role': 'error',
				'vue-a11y/aria-unsupported-elements': 'error',
				'vue-a11y/click-events-have-key-events': 'error',
				'vue-a11y/form-control-has-label': 'error',
				'vue-a11y/heading-has-content': 'error',
				'vue-a11y/iframe-has-title': 'error',
				'vue-a11y/interactive-supports-focus': 'error',
				'vue-a11y/label-has-for': 'error',
				'vue-a11y/media-has-caption': 'warn',
				'vue-a11y/mouse-events-have-key-events': 'error',
				'vue-a11y/no-access-key': 'error',
				'vue-a11y/no-aria-hidden-on-focusable': 'error',
				'vue-a11y/no-autofocus': 'warn',
				'vue-a11y/no-distracting-elements': 'error',
				'vue-a11y/no-redundant-roles': 'error',
				'vue-a11y/no-role-presentation-on-focusable': 'error',
				'vue-a11y/no-static-element-interactions': 'error',
				'vue-a11y/role-has-required-aria-props': 'error',
				'vue-a11y/tabindex-no-positive': 'warn',
			} : {}),

			// User overrides
			...overrides,

			// Disable rules that are handled elsewhere
			'node/prefer-global/process': 'off',
			'ts/explicit-function-return-type': 'off',
		},
	},
	)

	return configs
}
