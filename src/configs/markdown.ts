import type { Linter } from 'eslint'
// @ts-expect-error - no types available
import markdownPlugin from 'eslint-plugin-markdown'
import { GLOB_MD } from '../constants'

/**
 * Markdown configuration
 *
 * Note: eslint-plugin-markdown is deprecated. Consider using @eslint/markdown instead.
 * This configuration provides basic markdown linting.
 */
export function markdown(): Linter.Config[] {
	return [
		{
			name: 'eslint-sets/markdown/setup',
			files: [GLOB_MD],
			plugins: {
				markdown: markdownPlugin as any,
			},
			rules: {
				// Disable markdown rules as the plugin is deprecated
			},
		},
	]
}
