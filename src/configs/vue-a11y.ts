import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_VUE } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Vue Accessibility configuration options
 */
export type VueA11yOptions = OptionsOverrides

// Type definition for Vue accessibility plugin
interface VueA11yPlugin {
	rules: Linter.RulesRecord
}

/**
 * Vue Accessibility configuration
 * Requires eslint-plugin-vuejs-accessibility
 */
export async function vueA11y(options: VueA11yOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {} } = options

	const plugin = await loadPlugin<VueA11yPlugin>('eslint-plugin-vuejs-accessibility')

	if (!plugin) {
		return []
	}

	return [
		{
			files: [GLOB_VUE],
			name: 'eslint-sets/vue-a11y',
			plugins: {
				'vuejs-accessibility': plugin as any,
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

				// User overrides
				...overrides,
			},
		},
	]
}
