import type { Linter } from 'eslint'
import { loadPlugin } from '../plugins'

/**
 * Command configuration
 * Handles command comments in code (like // @ts-expect-error, etc.)
 */
export async function command(): Promise<Linter.Config[]> {
	const commandPlugin = await loadPlugin<Linter.Config>('eslint-plugin-command/config')

	if (!commandPlugin) {
		return []
	}

	return [
		{
			...(commandPlugin as any),
			name: 'eslint-sets/command',
		},
	]
}
