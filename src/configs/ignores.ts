import type { Linter } from 'eslint'

/**
 * Ignores configuration
 */
export function ignores(userIgnores: string[] = []): Linter.Config {
	return {
		ignores: userIgnores,
		name: 'eslint-sets/ignores',
	}
}
