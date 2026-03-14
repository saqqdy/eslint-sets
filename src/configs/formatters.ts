import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { loadPlugin } from '../plugins'

/**
 * External formatters configuration options
 */
export interface FormattersOptions extends OptionsOverrides {
	/**
	 * Enable CSS formatting
	 * @default 'prettier'
	 */
	css?: 'prettier' | 'none'

	/**
	 * Enable GraphQL formatting
	 */
	graphql?: 'prettier' | 'none'

	/**
	 * Enable HTML formatting
	 * @default 'prettier'
	 */
	html?: 'prettier' | 'none'

	/**
	 * Enable Markdown formatting (beyond standard markdown config)
	 */
	markdown?: 'prettier' | 'none'

	/**
	 * Enable SVG formatting
	 */
	svg?: 'prettier' | 'none'

	/**
	 * Enable XML formatting
	 */
	xml?: 'prettier' | 'none'
}

// Type definition for format plugin
interface FormatPlugin {
	rules: Linter.RulesRecord
}

/**
 * External formatters configuration
 * Provides formatting for CSS, HTML, XML, SVG, GraphQL, and more
 */
export async function formatters(options: FormattersOptions = {}): Promise<Linter.Config[]> {
	const {
		css = 'prettier',
		graphql,
		html = 'prettier',
		markdown,
		overrides = {},
		svg,
		xml,
	} = options

	const configs: Linter.Config[] = []

	// Load eslint-plugin-format if any formatter is enabled
	const hasFormatters = css !== 'none' || html !== 'none' || xml || svg || graphql || markdown

	if (hasFormatters) {
		const formatPlugin = await loadPlugin<FormatPlugin>('eslint-plugin-format')

		if (formatPlugin) {
			// CSS formatting
			if (css === 'prettier') {
				configs.push({
					files: ['**/*.css', '**/*.scss', '**/*.less', '**/*.sass'],
					name: 'eslint-sets/formatters/css',
					plugins: {
						format: formatPlugin as any,
					},
					rules: {
						'format/prettier': ['error', { parser: 'css' }],
					},
				})
			}

			// HTML formatting
			if (html === 'prettier') {
				configs.push({
					files: ['**/*.html'],
					name: 'eslint-sets/formatters/html',
					plugins: {
						format: formatPlugin as any,
					},
					rules: {
						'format/prettier': ['error', { parser: 'html' }],
					},
				})
			}

			// XML formatting
			if (xml === 'prettier') {
				configs.push({
					files: ['**/*.xml'],
					name: 'eslint-sets/formatters/xml',
					plugins: {
						format: formatPlugin as any,
					},
					rules: {
						'format/prettier': ['error', { parser: 'xml' }],
					},
				})
			}

			// SVG formatting
			if (svg === 'prettier') {
				configs.push({
					files: ['**/*.svg'],
					name: 'eslint-sets/formatters/svg',
					plugins: {
						format: formatPlugin as any,
					},
					rules: {
						'format/prettier': ['error', { parser: 'html' }],
					},
				})
			}

			// GraphQL formatting
			if (graphql === 'prettier') {
				configs.push({
					files: ['**/*.graphql', '**/*.gql'],
					name: 'eslint-sets/formatters/graphql',
					plugins: {
						format: formatPlugin as any,
					},
					rules: {
						'format/prettier': ['error', { parser: 'graphql' }],
					},
				})
			}

			// Markdown formatting (additional)
			if (markdown === 'prettier') {
				configs.push({
					files: ['**/*.md'],
					name: 'eslint-sets/formatters/markdown',
					plugins: {
						format: formatPlugin as any,
					},
					rules: {
						'format/prettier': ['error', { parser: 'markdown' }],
					},
				})
			}
		}
	}

	// Add custom rules config if provided
	if (Object.keys(overrides).length > 0) {
		configs.push({
			name: 'eslint-sets/formatters/custom',
			rules: overrides,
		})
	}

	return configs
}
