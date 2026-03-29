import type { Linter } from 'eslint'
import type { StylisticConfigBase } from '../types'
import { isPackageExists } from 'local-pkg'
import { GLOB_ASTRO, GLOB_ASTRO_TS, GLOB_HTML, GLOB_MD } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Prettier options for formatters
 */
export interface PrettierOptions {
	endOfLine?: 'auto' | 'lf' | 'crlf' | 'cr'
	plugins?: string[]
	printWidth?: number
	semi?: boolean
	singleQuote?: boolean
	tabWidth?: number
	trailingComma?: 'all' | 'none' | 'es5'
	useTabs?: boolean
	[key: string]: unknown
}

/**
 * External formatters configuration options
 */
export interface FormattersOptions {
	/**
	 * Enable Astro formatting
	 * Requires prettier-plugin-astro
	 */
	astro?: boolean

	/**
	 * Enable CSS formatting
	 * @default true
	 */
	css?: boolean

	/**
	 * dprint options for markdown formatting
	 */
	dprintOptions?: Record<string, unknown>

	/**
	 * Enable GraphQL formatting
	 * @default true
	 */
	graphql?: boolean

	/**
	 * Enable HTML formatting
	 * @default true
	 */
	html?: boolean

	/**
	 * Enable Markdown formatting
	 * - true: use prettier
	 * - 'prettier': use prettier
	 * - 'dprint': use dprint
	 */
	markdown?: boolean | 'prettier' | 'dprint'

	/**
	 * Custom Prettier options to override defaults
	 */
	prettierOptions?: PrettierOptions

	/**
	 * Enable Slidev formatting
	 * Requires prettier-plugin-slidev
	 */
	slidev?: boolean | { files?: string[] }

	/**
	 * Enable SVG formatting
	 * Requires @prettier/plugin-xml
	 */
	svg?: boolean

	/**
	 * Enable XML formatting
	 * Requires @prettier/plugin-xml
	 */
	xml?: boolean
}

// Type definition for format plugin
interface FormatPlugin {
	rules: Linter.RulesRecord
}

/**
 * Merge Prettier options with plugins
 */
function mergePrettierOptions(
	options: PrettierOptions,
	overrides: PrettierOptions,
): PrettierOptions {
	return {
		...options,
		...overrides,
		plugins: [
			...(overrides.plugins || []),
			...(options.plugins || []),
		],
	}
}

/**
 * External formatters configuration
 * Provides formatting for CSS, HTML, XML, SVG, GraphQL, Markdown, Astro and more
 */
export async function formatters(
	options: FormattersOptions | true = {},
	stylistic: StylisticConfigBase = {},
): Promise<Linter.Config[]> {
	// Handle shorthand: formatters: true
	if (options === true) {
		const hasXmlPlugin = isPackageExists('@prettier/plugin-xml')
		options = {
			astro: isPackageExists('prettier-plugin-astro'),
			css: true,
			graphql: true,
			html: true,
			markdown: true,
			slidev: isPackageExists('@slidev/cli'),
			svg: hasXmlPlugin,
			xml: hasXmlPlugin,
		}
	}

	const {
		astro: astroOption,
		css: cssOption = true,
		dprintOptions = {},
		graphql: graphqlOption = true,
		html: htmlOption = true,
		markdown: markdownOption,
		prettierOptions: customPrettierOptions = {},
		slidev: slidevOption,
		svg: svgOption,
		xml: xmlOption,
	} = options

	// Check if slidev is used with markdown
	if (slidevOption && markdownOption !== true && markdownOption !== 'prettier') {
		throw new Error('`slidev` option only works when `markdown` is enabled with `prettier`')
	}

	// Check if any formatter is enabled
	const hasFormatters = cssOption
		|| htmlOption
		|| xmlOption
		|| svgOption
		|| graphqlOption
		|| markdownOption
		|| astroOption

	if (!hasFormatters) {
		return []
	}

	// Load eslint-plugin-format
	const formatPlugin = await loadPlugin<FormatPlugin>('eslint-plugin-format')

	if (!formatPlugin) {
		return []
	}

	// Extract stylistic options
	const { indent = 2, quotes = 'single' } = stylistic

	// Default Prettier options
	const prettierOptions: PrettierOptions = {
		endOfLine: 'auto',
		printWidth: 100,
		semi: false,
		singleQuote: quotes === 'single',
		tabWidth: typeof indent === 'number' ? indent : 2,
		trailingComma: 'all',
		useTabs: indent === 'tab',
		...customPrettierOptions,
	}

	// XML Prettier options
	const prettierXmlOptions: PrettierOptions = {
		xmlQuoteAttributes: 'double',
		xmlSelfClosingSpace: true,
		xmlSortAttributesByKey: false,
		xmlWhitespaceSensitivity: 'ignore',
	}

	// dprint options for markdown
	const dprintConfig = {
		indentWidth: typeof indent === 'number' ? indent : 2,
		quoteStyle: quotes === 'single' ? 'preferSingle' : 'preferDouble',
		useTabs: indent === 'tab',
		...dprintOptions,
	}

	const configs: Linter.Config[] = [
		{
			name: 'eslint-sets/formatters/setup',
			plugins: {
				format: formatPlugin as any,
			},
		},
	]

	// CSS formatting (CSS, SCSS, LESS)
	if (cssOption) {
		configs.push(
			{
				name: 'eslint-sets/formatters/css',
				files: ['**/*.css', '**/*.postcss'],
				languageOptions: {
					parser: null as any, // plain parser
				},
				rules: {
					'format/prettier': [
						'error',
						mergePrettierOptions(prettierOptions, { parser: 'css' }),
					],
				},
			},
			{
				name: 'eslint-sets/formatters/scss',
				files: ['**/*.scss'],
				languageOptions: {
					parser: null as any,
				},
				rules: {
					'format/prettier': [
						'error',
						mergePrettierOptions(prettierOptions, { parser: 'scss' }),
					],
				},
			},
			{
				name: 'eslint-sets/formatters/less',
				files: ['**/*.less'],
				languageOptions: {
					parser: null as any,
				},
				rules: {
					'format/prettier': [
						'error',
						mergePrettierOptions(prettierOptions, { parser: 'less' }),
					],
				},
			},
		)
	}

	// HTML formatting
	if (htmlOption) {
		configs.push({
			name: 'eslint-sets/formatters/html',
			files: [GLOB_HTML],
			languageOptions: {
				parser: null as any,
			},
			rules: {
				'format/prettier': [
					'error',
					mergePrettierOptions(prettierOptions, { parser: 'html' }),
				],
			},
		})
	}

	// XML formatting
	if (xmlOption) {
		configs.push({
			name: 'eslint-sets/formatters/xml',
			files: ['**/*.xml'],
			languageOptions: {
				parser: null as any,
			},
			rules: {
				'format/prettier': [
					'error',
					mergePrettierOptions({ ...prettierXmlOptions, ...prettierOptions }, {
						parser: 'xml',
						plugins: ['@prettier/plugin-xml'],
					}),
				],
			},
		})
	}

	// SVG formatting
	if (svgOption) {
		configs.push({
			name: 'eslint-sets/formatters/svg',
			files: ['**/*.svg'],
			languageOptions: {
				parser: null as any,
			},
			rules: {
				'format/prettier': [
					'error',
					mergePrettierOptions({ ...prettierXmlOptions, ...prettierOptions }, {
						parser: 'xml',
						plugins: ['@prettier/plugin-xml'],
					}),
				],
			},
		})
	}

	// Markdown formatting
	if (markdownOption) {
		const formatter = markdownOption === true ? 'prettier' : markdownOption

		// Slidev files to exclude from regular markdown
		const slidevFiles = !slidevOption ? [] : slidevOption === true ? ['**/slides.md'] : slidevOption.files || []

		configs.push({
			name: 'eslint-sets/formatters/markdown',
			files: [GLOB_MD],
			ignores: slidevFiles,
			languageOptions: {
				parser: null as any,
			},
			rules: {
				[`format/${formatter}`]: [
					'error',
					formatter === 'prettier' ? mergePrettierOptions(prettierOptions, {
						embeddedLanguageFormatting: 'off',
						parser: 'markdown',
					}) : {
						...dprintConfig,
						language: 'markdown',
					},
				],
			},
		})

		// Slidev formatting
		if (slidevOption) {
			configs.push({
				name: 'eslint-sets/formatters/slidev',
				files: slidevFiles.length > 0 ? slidevFiles : ['**/slides.md'],
				languageOptions: {
					parser: null as any,
				},
				rules: {
					'format/prettier': [
						'error',
						mergePrettierOptions(prettierOptions, {
							embeddedLanguageFormatting: 'off',
							parser: 'slidev',
							plugins: ['prettier-plugin-slidev'],
						}),
					],
				},
			})
		}
	}

	// Astro formatting
	if (astroOption) {
		configs.push({
			name: 'eslint-sets/formatters/astro',
			files: [GLOB_ASTRO],
			languageOptions: {
				parser: null as any,
			},
			rules: {
				'format/prettier': [
					'error',
					mergePrettierOptions(prettierOptions, {
						parser: 'astro',
						plugins: ['prettier-plugin-astro'],
					}),
				],
			},
		})

		// Disable conflicting style rules for Astro
		configs.push({
			name: 'eslint-sets/formatters/astro/disables',
			files: [GLOB_ASTRO, GLOB_ASTRO_TS],
			rules: {
				'style/arrow-parens': 'off',
				'style/block-spacing': 'off',
				'style/comma-dangle': 'off',
				'style/indent': 'off',
				'style/no-multi-spaces': 'off',
				'style/quotes': 'off',
				'style/semi': 'off',
			},
		})
	}

	// GraphQL formatting
	if (graphqlOption) {
		configs.push({
			name: 'eslint-sets/formatters/graphql',
			files: ['**/*.graphql', '**/*.gql'],
			languageOptions: {
				parser: null as any,
			},
			rules: {
				'format/prettier': [
					'error',
					mergePrettierOptions(prettierOptions, { parser: 'graphql' }),
				],
			},
		})
	}

	return configs
}
