import type { Linter } from 'eslint'
import type { StylisticOptions } from './configs/stylistic'
import type { TypeScriptOptions } from './configs/typescript'
import type { VueOptions } from './configs/vue'
import type { ReactOptions } from './configs/react'
import type { FormattersOptions } from './configs/formatters'

export type FrameworkOptions = boolean | 'auto' | OptionsOverrides

/**
 * Project type
 */
export type ProjectType = 'app' | 'lib'

/**
 * Override rules for a specific configuration
 */
export interface OptionsOverrides {
	overrides?: Linter.RulesRecord
}

/**
 * Main configuration options
 */
export interface Options {
	/**
	 * Project type
	 * - 'app': Application project (default)
	 * - 'lib': Library project with stricter rules
	 * @default 'app'
	 */
	type?: ProjectType

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
	vue?: FrameworkOptions | VueOptions

	/**
	 * Enable React support
	 * @default 'auto'
	 */
	react?: FrameworkOptions | ReactOptions

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
	 * Enable Next.js support
	 * Requires @next/eslint-plugin-next
	 * @default 'auto'
	 */
	nextjs?: FrameworkOptions

	/**
	 * Enable Nuxt support
	 * @default 'auto'
	 */
	nuxt?: FrameworkOptions

	/**
	 * Enable Astro support
	 * Requires eslint-plugin-astro
	 * @default 'auto'
	 */
	astro?: FrameworkOptions

	/**
	 * Enable Angular support
	 * Requires @angular-eslint/eslint-plugin
	 * @default 'auto'
	 */
	angular?: FrameworkOptions

	/**
	 * Enable JSON/YAML support
	 * @default true
	 */
	jsonc?: boolean | OptionsOverrides

	/**
	 * Enable YAML support
	 * @default true
	 */
	yaml?: boolean | OptionsOverrides

	/**
	 * Enable Markdown support
	 * @default true
	 */
	markdown?: boolean | OptionsOverrides

	/**
	 * Enable TOML support
	 * @default true
	 */
	toml?: boolean

	/**
	 * Enable import rules
	 * @default true
	 */
	imports?: boolean | OptionsOverrides

	/**
	 * Enable unicorn rules
	 * @default true
	 */
	unicorn?: boolean | OptionsOverrides

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
	test?: boolean | OptionsOverrides

	/**
	 * Enable Node.js rules
	 * @default true
	 */
	node?: boolean

	/**
	 * Enable ESLint comments rules
	 * @default true
	 */
	eslintComments?: boolean

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
	 * Enable UnoCSS support
	 * Requires @unocss/eslint-plugin
	 * @default 'auto'
	 */
	unocss?: FrameworkOptions

	/**
	 * Enable e18e modernization rules
	 * Requires @e18e/eslint-plugin
	 * @default false
	 */
	e18e?: boolean

	/**
	 * Enable pnpm workspace support
	 * Requires eslint-plugin-pnpm
	 * @default false
	 */
	pnpm?: boolean

	/**
	 * Enable external formatters for CSS, HTML, XML, SVG, GraphQL
	 * Requires eslint-plugin-format
	 * @default false
	 */
	formatters?: boolean | FormattersOptions

	/**
	 * Auto-read .gitignore and add patterns to ignores
	 * @default true
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
	 * Auto-sort package.json
	 * @default true
	 */
	sortPackageJson?: boolean

	/**
	 * Auto-sort tsconfig.json
	 * @default true
	 */
	sortTsconfig?: boolean

	/**
	 * Enable JSX accessibility rules
	 * Requires eslint-plugin-jsx-a11y
	 * @default false
	 */
	jsxA11y?: boolean

	/**
	 * Control to disable some rules in editors
	 * @default auto-detect based on process.env
	 */
	isInEditor?: boolean

	/**
	 * Files to ignore
	 * Can be an array to extend defaults, or a function to modify defaults
	 */
	ignores?: string[] | ((defaults: string[]) => string[])

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
