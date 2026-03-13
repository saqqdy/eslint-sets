import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_SRC } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Next.js configuration options
 */
export type NextjsOptions = OptionsOverrides

// Type definitions for Next.js plugin
type ESLintPluginNext = typeof import('@next/eslint-plugin-next')

/**
 * Next.js configuration
 */
export async function nextjs(options: NextjsOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {} } = options

	const nextPlugin = await loadPlugin<ESLintPluginNext>('@next/eslint-plugin-next')

	if (!nextPlugin) {
		return []
	}

	return [
		{
			files: [GLOB_SRC],
			name: 'eslint-sets/nextjs',
			plugins: {
				'@next/next': nextPlugin as any,
			},
			rules: {
				// Next.js core rules
				'@next/next/google-font-display': 'warn',
				'@next/next/google-font-preconnect': 'warn',
				'@next/next/inline-script-id': 'error',
				'@next/next/next-script-for-ga': 'warn',
				'@next/next/no-assign-module-variable': 'error',
				'@next/next/no-async-client-component': 'error',
				'@next/next/no-before-interactive-script-outside-document': 'error',
				'@next/next/no-css-tags': 'error',
				'@next/next/no-document-import-in-page': 'error',
				'@next/next/no-duplicate-head': 'error',
				'@next/next/no-head-element': 'error',
				'@next/next/no-head-import-in-document': 'error',
				'@next/next/no-img-element': 'warn',
				'@next/next/no-page-custom-font': 'error',
				'@next/next/no-script-component-in-head': 'error',
				'@next/next/no-styled-jsx-in-document': 'error',
				'@next/next/no-sync-scripts': 'error',
				'@next/next/no-title-in-document-head': 'error',
				'@next/next/no-typos': 'error',
				'@next/next/no-unwanted-polyfillio': 'error',

				// User overrides
				...overrides,
			},
		},
	]
}
