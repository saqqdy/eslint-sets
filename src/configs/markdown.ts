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
				name: 'eslint-sets/markdown',
				files: [GLOB_MD],
				plugins: {
					markdown: plugin as any,
				},
				rules: {
					// Markdown rules from @eslint/markdown
					'markdown/no-html': 'off',
					'markdown/require-alt-text': 'warn',
					'markdown/no-missing-atx-heading-space': 'error',
					'markdown/no-multiple-h1': 'warn',
					'markdown/no-empty-definitions': 'error',

					// User overrides
					...overrides,
				},
			},
		]
	}

	// Fallback: basic configuration without rules
	return [
		{
			name: 'eslint-sets/markdown/setup',
			files: [GLOB_MD],
			rules: {
				// No markdown-specific rules available
				...overrides,
			},
		},
	]
}
