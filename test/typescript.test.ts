import { describe, expect, it } from 'vitest'
import { typescript } from '../src/configs'
import { lintContent } from './utils'

describe('TypeScript Config', () => {
	it('should parse TypeScript files', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			'const x: string = "test"',
			'test.ts',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should support type imports', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`import type { Foo } from 'foo'`,
			'test.ts',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should support interfaces', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`interface User {
  name: string
  age: number
}`,
			'test.ts',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should support generics', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`function identity<T>(arg: T): T {
  return arg
}`,
			'test.ts',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should return valid configs with typeAware option', () => {
		const configs = typescript({ typeAware: true })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
		expect(configs.length).toBeGreaterThan(1)
		// Should have type-aware config
		expect(configs.find((c) => c.name === 'eslint-sets/typescript/type-aware')).toBeDefined()
	})

	it('should return valid configs with custom tsconfigPath', () => {
		const configs = typescript({ tsconfigPath: './custom-tsconfig.json' })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should return valid configs with custom filesTypeAware', () => {
		const configs = typescript({
			filesTypeAware: ['**/*.ts'],
			typeAware: true,
		})

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should apply custom overrides', () => {
		const configs = typescript({ overrides: { '@typescript-eslint/no-explicit-any': 'off' } })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['@typescript-eslint/no-explicit-any']).toBe('off')
	})
})
