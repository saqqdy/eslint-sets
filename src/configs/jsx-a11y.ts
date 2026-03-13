import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_TSX } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * JSX Accessibility configuration options
 */
export type JsxA11yOptions = OptionsOverrides

// Type definition for jsx-a11y plugin (no types available)
interface ESLintPluginJsxA11y {
	configs: {
		recommended: { rules: Linter.RulesRecord }
		strict: { rules: Linter.RulesRecord }
	}
	rules: Linter.RulesRecord
}

/**
 * JSX Accessibility configuration
 */
export async function jsxA11y(options: JsxA11yOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {} } = options

	const plugin = await loadPlugin<ESLintPluginJsxA11y>('eslint-plugin-jsx-a11y')

	if (!plugin) {
		return []
	}

	return [
		{
			files: [GLOB_TSX],
			name: 'eslint-sets/jsx-a11y',
			plugins: {
				'jsx-a11y': plugin as any,
			},
			rules: {
				// Recommended rules
				...plugin.configs.recommended.rules,

				// Accessibility rules
				'jsx-a11y/accessible-emoji': 'off', // Deprecated
				'jsx-a11y/alt-text': 'error',
				'jsx-a11y/anchor-ambiguous-text': 'off',
				'jsx-a11y/anchor-has-content': 'error',
				'jsx-a11y/anchor-is-valid': 'error',
				'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
				'jsx-a11y/aria-props': 'error',
				'jsx-a11y/aria-proptypes': 'error',
				'jsx-a11y/aria-role': 'error',
				'jsx-a11y/aria-unsupported-elements': 'error',
				'jsx-a11y/autocomplete-valid': 'error',
				'jsx-a11y/click-events-have-key-events': 'warn',
				'jsx-a11y/control-has-associated-label': 'warn',
				'jsx-a11y/heading-has-content': 'error',
				'jsx-a11y/html-has-lang': 'error',
				'jsx-a11y/iframe-has-title': 'error',
				'jsx-a11y/img-redundant-alt': 'warn',
				'jsx-a11y/interactive-supports-focus': 'error',
				'jsx-a11y/label-has-associated-control': 'error',
				'jsx-a11y/lang': 'error',
				'jsx-a11y/media-has-caption': 'warn',
				'jsx-a11y/mouse-events-have-key-events': 'error',
				'jsx-a11y/no-access-key': 'error',
				'jsx-a11y/no-aria-hidden-on-focusable': 'error',
				'jsx-a11y/no-autofocus': 'warn',
				'jsx-a11y/no-distracting-elements': 'warn',
				'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
				'jsx-a11y/no-noninteractive-element-interactions': 'warn',
				'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
				'jsx-a11y/no-noninteractive-tabindex': 'error',
				'jsx-a11y/no-onchange': 'off', // Deprecated
				'jsx-a11y/no-redundant-roles': 'error',
				'jsx-a11y/no-static-element-interactions': 'warn',
				'jsx-a11y/prefer-tag-over-role': 'warn',
				'jsx-a11y/role-has-required-aria-props': 'error',
				'jsx-a11y/role-supports-aria-props': 'error',
				'jsx-a11y/scope': 'error',
				'jsx-a11y/tabindex-no-positive': 'error',

				// User overrides
				...overrides,
			},
		},
	]
}
