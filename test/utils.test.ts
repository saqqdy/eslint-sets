import { describe, expect, it } from 'vitest'
import { combine, deepMerge, ensureArray, filterNil, isObject, renameRules } from '../src/utils'

describe('utils', () => {
	describe('combine', () => {
		it('should flatten configs', () => {
			const configs = [{ name: 'a' }, [{ name: 'b' }, { name: 'c' }]]
			const result = combine(...configs)

			expect(result).toHaveLength(3)
			expect(result.map(c => c.name)).toEqual(['a', 'b', 'c'])
		})
	})

	describe('renameRules', () => {
		it('should rename @typescript-eslint/* rules to ts/*', () => {
			const rules = {
				'@typescript-eslint/no-explicit-any': 'error',
				'@typescript-eslint/no-unused-vars': 'warn',
				'no-console': 'off',
			}
			const result = renameRules(rules, 'ts', '@typescript-eslint')

			expect(result).toEqual({
				'no-console': 'off',
				'ts/no-explicit-any': 'error',
				'ts/no-unused-vars': 'warn',
			})
		})

		it('should only rename rules that match the from prefix', () => {
			const rules = {
				'@typescript-eslint/no-explicit-any': 'error',
				'no-console': 'off',
			}
			const result = renameRules(rules, 'ts', '@typescript-eslint')

			expect(result).toEqual({
				'no-console': 'off',
				'ts/no-explicit-any': 'error',
			})
		})

		it('should use @typescript-eslint as default from prefix', () => {
			const rules = {
				'@typescript-eslint/no-explicit-any': 'error',
			}
			const result = renameRules(rules, 'ts')

			expect(result).toEqual({
				'ts/no-explicit-any': 'error',
			})
		})
	})

	describe('isObject', () => {
		it('should return true for objects', () => {
			expect(isObject({})).toBeTruthy()
			expect(isObject({ a: 1 })).toBeTruthy()
		})

		it('should return false for non-objects', () => {
			expect(isObject(null)).toBeFalsy()
			expect(isObject(undefined)).toBeFalsy()
			expect(isObject([])).toBeFalsy()
			expect(isObject('string')).toBeFalsy()
			expect(isObject(123)).toBeFalsy()
		})
	})

	describe('deepMerge', () => {
		it('should merge objects deeply', () => {
			const target = { a: 1, b: { c: 2 } }
			const source = { b: { d: 3 } }
			const result = deepMerge(target, source)

			expect(result).toEqual({ a: 1, b: { c: 2, d: 3 } })
		})

		it('should override primitive values', () => {
			const target = { a: 1 }
			const source = { a: 2 }
			const result = deepMerge(target, source)

			expect(result).toEqual({ a: 2 })
		})
	})

	describe('ensureArray', () => {
		it('should wrap single value in array', () => {
			expect(ensureArray(1)).toEqual([1])
			expect(ensureArray('test')).toEqual(['test'])
		})

		it('should return array as is', () => {
			expect(ensureArray([1, 2, 3])).toEqual([1, 2, 3])
		})
	})

	describe('filterNil', () => {
		it('should filter out null and undefined', () => {
			const arr = [1, null, 2, undefined, 3]

			expect(filterNil(arr)).toEqual([1, 2, 3])
		})

		it('should return empty array for all nil values', () => {
			expect(filterNil([null, undefined])).toEqual([])
		})
	})
})
