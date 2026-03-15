import type { Linter } from 'eslint'
import type { FormattersOptions } from './configs/formatters'
import type { PrettierOptions } from './configs/prettier'
import type { ReactOptions } from './configs/react'
import type { StylisticOptions } from './configs/stylistic'
import type { TypeScriptOptions } from './configs/typescript'
import type { VueOptions } from './configs/vue'
import type { ConfigNames, RuleOptions } from './typegen'

export type { ConfigNames, RuleOptions }

/**
 * Rules type with autocomplete support for rule names
 */
export type Rules = Record<string, Linter.RuleEntry<any> | undefined> & RuleOptions

/**
 * An updated version of ESLint's `Linter.Config`, which provides autocompletion
 * for `rules` and relaxes type limitations for `plugins` and `rules`, because
 * many plugins still lack proper type definitions.
 */
export type TypedFlatConfigItem = Omit<Linter.Config, 'plugins' | 'rules'> & {
	/**
	 * An object containing a name-value mapping of plugin names to plugin objects.
	 * When `files` is specified, these plugins are only available to the matching files.
	 */
	plugins?: Record<string, any>

	/**
	 * An object containing the configured rules. When `files` or `ignores` are
	 * specified, these rule configurations are only available to the matching files.
	 */
	rules?: Rules
}

export type FrameworkOptions = boolean | 'auto' | OptionsOverrides

/**
 * Project type
 */
export type ProjectType = 'app' | 'lib'

/**
 * Project type options
 */
export interface OptionsProjectType {
	/**
	 * Type of the project. `lib` will enable more strict rules for libraries.
	 * @default 'app'
	 */
	type?: ProjectType
}

/**
 * Override rules for a specific configuration
 */
export interface OptionsOverrides {
	overrides?: TypedFlatConfigItem['rules']
}

/**
 * Editor environment detection options
 */
export interface OptionsIsInEditor {
	/**
	 * Control to disable some rules in editors.
	 * @default auto-detect based on process.env
	 */
	isInEditor?: boolean
}

/**
 * Base stylistic options shared across configs
 */
export interface StylisticConfigBase {
	/**
	 * Indentation style
	 * @default 2
	 */
	indent?: number | 'tab'

	/**
	 * Quote style
	 * @default 'single'
	 */
	quotes?: 'single' | 'double'
}

/**
 * Stylistic options for configs that support it
 */
export interface OptionsStylistic {
	stylistic?: boolean | StylisticConfigBase
}

/**
 * TypeScript type-aware options
 */
export interface OptionsTypeScriptWithTypes {
	/**
	 * When this options is provided, type aware rules will be enabled.
	 * @see https://typescript-eslint.io/linting/typed-linting/
	 */
	tsconfigPath?: string

	/**
	 * Override type aware rules.
	 */
	overridesTypeAware?: TypedFlatConfigItem['rules']
}

/**
 * TypeScript erasable syntax only options
 */
export interface OptionsTypeScriptErasableOnly {
	/**
	 * Enable erasable syntax only rules.
	 * Useful for libraries that want to ensure type-only constructs.
	 * @default false
	 */
	erasableOnly?: boolean
}

/**
 * TypeScript parser options
 */
export interface OptionsTypeScriptParserOptions {
	/**
	 * Additional parser options for TypeScript.
	 */
	parserOptions?: Record<string, unknown>

	/**
	 * Glob patterns for files that should be type aware.
	 * @default ['**\/*.{ts,tsx}']
	 */
	filesTypeAware?: string[]

	/**
	 * Glob patterns for files that should not be type aware.
	 * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
	 */
	ignoresTypeAware?: string[]
}

/**
 * Perfectionist sorting options
 */
export interface PerfectionistOptions {
	/**
	 * Sorting order
	 * @default 'asc'
	 */
	order?: 'asc' | 'desc'

	/**
	 * Override rules
	 */
	overrides?: Linter.RulesRecord

	/**
	 * Sorting type
	 * @default 'natural'
	 */
	type?: 'natural' | 'line-length' | 'alphabetical'
}

/**
 * Main configuration options
 */
export interface Options extends OptionsIsInEditor {
	/**
	 * Enable Angular support
	 * Requires @angular-eslint/eslint-plugin
	 * @default 'auto'
	 */
	angular?: FrameworkOptions

	/**
	 * Enable Astro support
	 * Requires eslint-plugin-astro
	 * @default 'auto'
	 */
	astro?: FrameworkOptions

	/**
	 * Auto-detect installed frameworks and enable corresponding configs
	 * @default true
	 */
	autoDetect?: boolean

	/**
	 * Enable command-line script rules
	 * @default true
	 */
	command?: boolean

	/**
	 * Enable disables for specific file types
	 * @default true
	 */
	disables?: boolean

	/**
	 * Enable e18e modernization rules
	 * Requires @e18e/eslint-plugin
	 * @default false
	 */
	e18e?: boolean

	/**
	 * Enable ESLint comments rules
	 * @default true
	 */
	eslintComments?: boolean

	/**
	 * Additional flat configs to merge
	 */
	extends?: Linter.Config[]

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
	 * Files to ignore
	 * Can be an array to extend defaults, or a function to modify defaults
	 */
	ignores?: string[] | ((defaults: string[]) => string[])

	/**
	 * Enable import rules
	 * @default true
	 */
	imports?: boolean | OptionsOverrides

	/**
	 * Enable JSON/YAML support
	 * @default true
	 */
	jsonc?: boolean | OptionsOverrides

	/**
	 * Enable JSX accessibility rules
	 * Requires eslint-plugin-jsx-a11y
	 * @default false
	 */
	jsxA11y?: boolean

	/**
	 * Enable Markdown support
	 * @default true
	 */
	markdown?: boolean | OptionsOverrides

	/**
	 * Enable Next.js support
	 * Requires @next/eslint-plugin-next
	 * @default 'auto'
	 */
	nextjs?: FrameworkOptions

	/**
	 * Enable Node.js rules
	 * @default true
	 */
	node?: boolean

	/**
	 * Enable Nuxt support
	 * @default 'auto'
	 */
	nuxt?: FrameworkOptions

	/**
	 * Enable perfectionist sorting rules
	 * @default true
	 */
	perfectionist?: boolean | PerfectionistOptions

	/**
	 * Enable pnpm workspace support
	 * Requires eslint-plugin-pnpm
	 * @default false
	 */
	pnpm?: boolean

	/**
	 * Enable Prettier integration
	 * Note: When stylistic is enabled (default), prettier is disabled by default
	 * Set stylistic: false to use prettier instead
	 * @default false
	 */
	prettier?: boolean | PrettierOptions

	/**
	 * Enable React support
	 * @default 'auto'
	 */
	react?: FrameworkOptions | ReactOptions

	/**
	 * Enable regexp rules
	 * @default true
	 */
	regexp?: boolean

	/**
	 * Custom rule overrides
	 */
	rules?: TypedFlatConfigItem['rules']

	/**
	 * Enable Solid.js support
	 * @default 'auto'
	 */
	solid?: FrameworkOptions

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
	 * Enable stylistic formatting rules
	 * When set to true, it uses default options
	 * When set to an object, it uses custom options
	 * @default true
	 */
	stylistic?: boolean | StylisticOptions

	/**
	 * Enable Svelte support
	 * @default 'auto'
	 */
	svelte?: FrameworkOptions

	/**
	 * Enable test file rules
	 * @default true
	 */
	test?: boolean | OptionsOverrides

	/**
	 * Enable TOML support
	 * @default true
	 */
	toml?: boolean | OptionsOverrides

	/**
	 * Project type
	 * - 'app': Application project (default)
	 * - 'lib': Library project with stricter rules
	 * @default 'app'
	 */
	type?: ProjectType

	/**
	 * Enable TypeScript support
	 * Can also pass TypeScriptOptions for type-aware rules
	 * @default true
	 */
	typescript?: FrameworkOptions | TypeScriptOptions

	/**
	 * Enable unicorn rules
	 * @default true
	 */
	unicorn?: boolean | OptionsOverrides

	/**
	 * Enable UnoCSS support
	 * Requires @unocss/eslint-plugin
	 * @default 'auto'
	 */
	unocss?: FrameworkOptions

	/**
	 * Enable Vue support
	 * @default 'auto'
	 */
	vue?: FrameworkOptions | VueOptions

	/**
	 * Enable YAML support
	 * @default true
	 */
	yaml?: boolean | OptionsOverrides
}

export type { Linter }
