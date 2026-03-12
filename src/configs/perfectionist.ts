import type { Linter } from 'eslint'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import { GLOB_SRC } from '../constants'

/**
 * Perfectionist (sorting) configuration
 */
export function perfectionist(): Linter.Config {
	return {
		name: 'eslint-sets/perfectionist',
		files: [GLOB_SRC],
		plugins: {
			perfectionist: perfectionistPlugin as any,
		},
		rules: {
			'perfectionist/sort-exports': [
				'error',
				{
					order: 'asc',
					type: 'line-length',
				},
			],
			'perfectionist/sort-imports': [
				'error',
				{
					order: 'asc',
					type: 'line-length',
					newlinesBetween: 'never',
				},
			],
			'perfectionist/sort-named-exports': [
				'error',
				{
					order: 'asc',
					type: 'line-length',
				},
			],
			'perfectionist/sort-named-imports': [
				'error',
				{
					order: 'asc',
					type: 'line-length',
				},
			],
			'perfectionist/sort-objects': [
				'error',
				{
					order: 'asc',
					type: 'line-length',
				},
			],
			'perfectionist/sort-interfaces': [
				'error',
				{
					order: 'asc',
					type: 'line-length',
				},
			],
		},
	}
}
