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
	 * Enable HTML formatting
	 * @default 'prettier'
	 */
	html?: 'prettier' | 'none'

	/**
	 * Enable XML formatting
	 */
	xml?: 'prettier' | 'none'

	/**
	 * Enable SVG formatting
	 */
	svg?: 'prettier' | 'none'

	/**
	 * Enable GraphQL formatting
	 */
	graphql?: 'prettier' | 'none'

	/**
	 * Enable Markdown formatting (beyond standard markdown config)
	 */
	markdown?: 'prettier' | 'none'
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
		html = 'prettier',
		xml,
		svg,
		graphql,
		markdown,
		overrides = {},
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
					name: 'eslint-sets/formatters/css',
					files: ['**/*.css', '**/*.scss', '**/*.less', '**/*.sass'],
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
					name: 'eslint-sets/formatters/html',
					files: ['**/*.html'],
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
					name: 'eslint-sets/formatters/xml',
					files: ['**/*.xml'],
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
					name: 'eslint-sets/formatters/svg',
					files: ['**/*.svg'],
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
					name: 'eslint-sets/formatters/graphql',
					files: ['**/*.graphql', '**/*.gql'],
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
					name: 'eslint-sets/formatters/markdown',
					files: ['**/*.md'],
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
