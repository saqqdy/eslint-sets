import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { loadPlugin } from '../plugins'

/**
 * pnpm workspace configuration options
 */
export interface PnpmOptions extends OptionsOverrides {
	/**
	 * Enable catalogs support
	 */
	catalogs?: boolean
}

// Type definition for pnpm plugin
interface PnpmPlugin {
	configs: {
		recommended: Linter.Config
	}
	rules: Linter.RulesRecord
}

/**
 * pnpm workspace configuration
 * Supports pnpm catalogs and workspace configuration
 */
export async function pnpm(options: PnpmOptions = {}): Promise<Linter.Config[]> {
	const { catalogs = true, overrides = {} } = options

	const plugin = await loadPlugin<PnpmPlugin>('eslint-plugin-pnpm')

	if (!plugin) {
		return []
	}

	return [
		{
			files: ['**/package.json'],
			name: 'eslint-sets/pnpm',
			plugins: {
				pnpm: plugin as any,
			},
			rules: {
				// pnpm recommended rules
				'pnpm/json-catalog': catalogs ? 'warn' : 'off',
				'pnpm/json-dependency-version': 'off',

				// User overrides
				...overrides,
			},
		},
	]
}
