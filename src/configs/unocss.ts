import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_SRC } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * UnoCSS configuration options
 */
export interface UnoCssOptions extends OptionsOverrides {
	/**
	 * Enable strict mode
	 */
	strict?: boolean
}

/**
 * UnoCSS configuration
 */
export async function unocss(options: UnoCssOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {}, strict = false } = options

	const plugin = await loadPlugin<any>('@unocss/eslint-plugin')

	if (!plugin) {
		return []
	}

	// Use the flat config from the plugin if available
	const flatConfig = plugin.configs?.flat
	const pluginRules = flatConfig?.plugins?.unocss?.rules || {}

	return [
		{
			files: [GLOB_SRC],
			name: 'eslint-sets/unocss',
			plugins: {
				unocss: {
					rules: pluginRules,
				},
			},
			rules: {
				// UnoCSS recommended rules
				'unocss/order': 'warn',
				'unocss/order-attributify': 'off',

				// Optional strict rules
				...(strict ? { 'unocss/blocklist': 'error' } : {}),

				// User overrides
				...overrides,
			},
		},
	]
}
