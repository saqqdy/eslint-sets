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
		type = 'natural',
		order = 'asc',
		overrides = {},
	} = options

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
					type,
					order,
				},
			],
			'perfectionist/sort-imports': [
				'error',
				{
					type,
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
				},
			],
			'perfectionist/sort-named-exports': [
				'error',
				{
					type,
					customGroups: [
						{
							groupName: 'default',
							elementNamePattern: 'default',
						},
						{
							groupName: 'values',
							modifiers: ['value'],
						},
						{
							groupName: 'types',
							modifiers: ['type'],
						},
					],
					groups: ['default', 'values', 'types'],
					order,
				},
			],
			'perfectionist/sort-named-imports': [
				'error',
				{
					type,
					order,
				},
			],
			'perfectionist/sort-objects': [
				'error',
				{
					type: 'unsorted',
					customGroups: [
						{
							groupName: 'id',
							elementNamePattern: '^(id|key|name)$',
						},
						{
							groupName: 'required',
							elementNamePattern: '^(type|value)$',
						},
					],
					groups: ['id', 'required', 'unknown'],
				},
			],

			// User overrides
			...overrides,
		},
	}
}
