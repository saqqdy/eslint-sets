import type { Linter } from 'eslint'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import { GLOB_SRC } from '../constants'

/**
 * Perfectionist (sorting) configuration options
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
 * Perfectionist (sorting) configuration
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export function perfectionist(options: PerfectionistOptions = {}): Linter.Config {
	const {
		order = 'asc',
		overrides = {},
		type = 'natural',
	} = options

	return {
		files: [GLOB_SRC],
		name: 'eslint-sets/perfectionist',
		plugins: {
			perfectionist: perfectionistPlugin as any,
		},
		rules: {
			'perfectionist/sort-exports': [
				'error',
				{
					order,
					type,
				},
			],
			'perfectionist/sort-imports': [
				'error',
				{
					groups: [
						'type-import',
						['type-parent', 'type-sibling', 'type-index', 'type-internal'],
						'value-builtin',
						'value-external',
						'value-internal',
						['value-parent', 'value-sibling', 'value-index'],
						'side-effect',
						'ts-equals-import',
						'unknown',
					],
					newlinesBetween: 'ignore',
					order,
					type,
				},
			],
			'perfectionist/sort-interfaces': [
				'error',
				{
					order,
					type,
				},
			],
			'perfectionist/sort-named-exports': [
				'error',
				{
					order,
					type,
				},
			],
			'perfectionist/sort-named-imports': [
				'error',
				{
					order,
					type,
				},
			],
			'perfectionist/sort-objects': [
				'error',
				{
					order,
					type,
				},
			],

			// User overrides
			...overrides,
		},
	}
}
