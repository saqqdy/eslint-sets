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

// Type definition for UnoCSS plugin
interface UnoCssPlugin {
	configs: {
		recommended: Linter.Config
	}
	rules: Linter.RulesRecord
}

/**
 * UnoCSS configuration
 */
export async function unocss(options: UnoCssOptions = {}): Promise<Linter.Config[]> {
	const { strict = false, overrides = {} } = options

	const plugin = await loadPlugin<UnoCssPlugin>('@unocss/eslint-plugin')

	if (!plugin) {
		return []
	}

	return [
		{
			name: 'eslint-sets/unocss',
			files: [GLOB_SRC],
			plugins: {
				unocss: plugin as any,
			},
			rules: {
				// UnoCSS recommended rules
				'unocss/order': 'warn',
				'unocss/order-attributify': 'off',
				'unocss/blocklist': strict ? 'error' : 'warn',

				// User overrides
				...overrides,
			},
		},
	]
}
