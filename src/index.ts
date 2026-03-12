import type { Linter } from 'eslint'
import type { Options } from './types'
import { config } from './configs'

/**
 * Create ESLint flat config
 *
 * @example
 * ```ts
 * // eslint.config.ts
 * import eslintConfig from '@eslint-sets/eslint-config'
 *
 * export default eslintConfig({
 *   vue: true,
 *   react: true,
 *   typescript: true,
 * })
 * ```
 */
export default function eslintConfig(options?: Options): Promise<Linter.Config[]> {
	return config(options)
}

// Export utilities
export * from './utils'

// Export all config modules
export * from './configs'

// Export plugin helpers
export * from './plugins'

// Export constants
export * from './constants'

// Export config function
export { config } from './configs'

// Export types
export type { Linter, Options, FrameworkOptions } from './types'
