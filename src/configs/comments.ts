import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments'
import { GLOB_SRC } from '../constants'

/**
 * ESLint comments configuration options
 */
export type CommentsOptions = OptionsOverrides

/**
 * ESLint comments configuration
 * Rules for ESLint directive comments (eslint-disable, etc.)
 */
export function comments(
	options: CommentsOptions = {},
): Linter.Config[] {
	const { overrides = {} } = options

	return [
		{
			name: 'eslint-sets/comments',
			files: [GLOB_SRC],
			plugins: {
				'eslint-comments': eslintCommentsPlugin as any,
			},
			rules: {
				// Require ESLint directive comments to be meaningful
				'eslint-comments/no-aggregating-enable': 'error',
				'eslint-comments/no-duplicate-disable': 'error',
				'eslint-comments/no-unlimited-disable': 'error',
				'eslint-comments/no-unused-enable': 'error',

				// User overrides
				...overrides,
			},
		},
	]
}
