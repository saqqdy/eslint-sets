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

// Export all config modules
export * from './configs'

// Export config function
export { config } from './configs'

export type { PrettierOptions } from './configs/prettier'

export type { ReactOptions } from './configs/react'

export type { StylisticOptions } from './configs/stylistic'

export type { TypeScriptOptions } from './configs/typescript'

export type { VueOptions } from './configs/vue'
// Export constants
export * from './constants'
// Export plugin helpers
export * from './plugins'
// Export types
export type { ConfigNames, FrameworkOptions, Linter, Options, OptionsOverrides, PerfectionistOptions, ProjectType, Rules, TypedFlatConfigItem } from './types'
// Export utilities
export * from './utils'
