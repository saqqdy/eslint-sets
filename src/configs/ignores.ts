import type { Linter } from 'eslint'
import { GLOB_EXCLUDES } from '../constants'

/**
 * Ignores configuration
 */
export function ignores(userIgnores: string[] = []): Linter.Config {
	return {
		name: 'eslint-sets/ignores',
		ignores: [...GLOB_EXCLUDES, ...userIgnores],
	}
}
