import type { Linter } from 'eslint'

/**
 * Ignores configuration
 */
export function ignores(userIgnores: string[] = []): Linter.Config {
	return {
		name: 'eslint-sets/ignores',
		ignores: userIgnores,
	}
}
