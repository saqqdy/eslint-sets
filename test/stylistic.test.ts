import { it, expect, describe } from 'vitest'
import { lintContent } from './utils'

describe('Stylistic Config', () => {
	it('should apply stylistic rules when enabled', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({
					stylistic: true,
					prettier: false,
				}),
			`const x = 1
const y = 2`,
			'test.ts',
		)
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should use custom indent when specified', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({
					stylistic: { indent: 2 },
					prettier: false,
				}),
			`function test() {
  const x = 1
}`,
			'test.ts',
		)
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should use single quotes by default', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({
					stylistic: true,
					prettier: false,
				}),
			`const x = 'hello'`,
			'test.ts',
		)
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should not use semicolons by default', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({
					stylistic: true,
					prettier: false,
				}),
			`const x = 1`,
			'test.ts',
		)
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})
})
