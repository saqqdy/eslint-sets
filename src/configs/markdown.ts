import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_MD } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Markdown configuration options
 */
export type MarkdownOptions = OptionsOverrides

// Type definition for markdown plugin
type ESLintPluginMarkdown = typeof import('@eslint/markdown')

/**
 * Markdown configuration
 */
export async function markdown(options: MarkdownOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {} } = options

	// Try to use @eslint/markdown (newer) first, fallback to eslint-plugin-markdown
	const plugin = await loadPlugin<ESLintPluginMarkdown>('@eslint/markdown')

	if (plugin) {
		return [
			{
				files: [GLOB_MD],
				name: 'eslint-sets/markdown',
				plugins: {
					markdown: plugin as any,
				},
				rules: {
					'markdown/no-empty-definitions': 'error',
					// Markdown rules from @eslint/markdown
					'markdown/no-html': 'off',
					'markdown/no-missing-atx-heading-space': 'error',
					'markdown/no-multiple-h1': 'warn',
					'markdown/require-alt-text': 'warn',

					// User overrides
					...overrides,
				},
			},
		]
	}

	// Fallback: basic configuration without rules
	return [
		{
			files: [GLOB_MD],
			name: 'eslint-sets/markdown/setup',
			rules: {
				// No markdown-specific rules available
				...overrides,
			},
		},
	]
}
