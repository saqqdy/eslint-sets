import { it, expect, describe } from 'vitest'
import { combine, isObject, deepMerge, filterNil, renameRules, ensureArray } from '../src/utils'

describe('Utils', () => {
	describe('combine', () => {
		it('should flatten configs', () => {
			const configs = [{ name: 'a' }, [{ name: 'b' }, { name: 'c' }]]
			const result = combine(...configs)
			expect(result).toHaveLength(3)
			expect(result.map((c) => c.name)).toEqual(['a', 'b', 'c'])
		})
	})

	describe('renameRules', () => {
		it('should add prefix to rules', () => {
			const rules = {
				'no-console': 'error',
				'no-debugger': 'warn',
			}
			const result = renameRules(rules, 'custom')
			expect(result).toEqual({
				'custom/no-console': 'error',
				'custom/no-debugger': 'warn',
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
