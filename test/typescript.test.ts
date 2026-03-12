import { it, expect, describe } from 'vitest'
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
})
