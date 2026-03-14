import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
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
 * Check if UnoCSS config file exists
 */
function hasUnoCSSConfig(): boolean {
	const configFiles = [
		'uno.config.ts',
		'uno.config.js',
		'unocss.config.ts',
		'unocss.config.js',
	]

	return configFiles.some((file) => existsSync(resolve(process.cwd(), file)))
}

/**
 * UnoCSS configuration
 */
export async function unocss(options: UnoCssOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {}, strict = false } = options

	// Skip if no UnoCSS config file exists
	if (!hasUnoCSSConfig()) {
		return []
	}

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
