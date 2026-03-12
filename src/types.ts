import type { Linter } from 'eslint'
import type { StylisticOptions } from './configs/stylistic'
import type { TypeScriptOptions } from './configs/typescript'

export type FrameworkOptions = boolean | 'auto' | Linter.Config

export interface Options {
	/**
	 * Auto-detect installed frameworks and enable corresponding configs
	 * @default true
	 */
	autoDetect?: boolean

	/**
	 * Enable TypeScript support
	 * Can also pass TypeScriptOptions for type-aware rules
	 * @default true
	 */
	typescript?: FrameworkOptions | TypeScriptOptions

	/**
	 * Enable Vue support
	 * @default 'auto'
	 */
	vue?: FrameworkOptions

	/**
	 * Enable React support
	 * @default 'auto'
	 */
	react?: FrameworkOptions

	/**
	 * Enable Svelte support
	 * @default 'auto'
	 */
	svelte?: FrameworkOptions

	/**
	 * Enable Solid.js support
	 * @default 'auto'
	 */
	solid?: FrameworkOptions

	/**
	 * Enable JSON/YAML support
	 * @default true
	 */
	jsonc?: boolean

	/**
	 * Enable YAML support
	 * @default true
	 */
	yaml?: boolean

	/**
	 * Enable Markdown support
	 * @default true
	 */
	markdown?: boolean

	/**
	 * Enable TOML support
	 * @default true
	 */
	toml?: boolean

	/**
	 * Enable import rules
	 * @default true
	 */
	imports?: boolean

	/**
	 * Enable unicorn rules
	 * @default true
	 */
	unicorn?: boolean

	/**
	 * Enable perfectionist sorting rules
	 * @default true
	 */
	perfectionist?: boolean

	/**
	 * Enable regexp rules
	 * @default true
	 */
	regexp?: boolean

	/**
	 * Enable test file rules
	 * @default true
	 */
	test?: boolean

	/**
	 * Enable Node.js rules
	 * @default true
	 */
	node?: boolean

	/**
	 * Enable Prettier integration
	 * @default true
	 */
	prettier?: boolean

	/**
	 * Enable stylistic formatting rules
	 * When set to true, it uses default options
	 * When set to an object, it uses custom options
	 * @default false
	 */
	stylistic?: boolean | StylisticOptions

	/**
	 * Auto-read .gitignore and add patterns to ignores
	 * @default false
	 */
	gitignore?: boolean

	/**
	 * Enable disables for specific file types
	 * @default true
	 */
	disables?: boolean

	/**
	 * Enable command-line script rules
	 * @default true
	 */
	command?: boolean

	/**
	 * Files to ignore
	 */
	ignores?: string[]

	/**
	 * Custom rule overrides
	 */
	rules?: Linter.RulesRecord

	/**
	 * Additional flat configs to merge
	 */
	extends?: Linter.Config[]
}

export type { Linter }
