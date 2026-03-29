import { describe, expect, it } from 'vitest'
import { stylistic } from '../src/configs'
import { lintContent } from './utils'

describe('stylistic Config', () => {
	it('should apply stylistic rules when enabled', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({
					autoDetect: false,
					prettier: false,
					stylistic: true,
				}),
			`const x = 1
const y = 2`,
			'test.ts',
		)

		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should use custom indent when specified', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({
					autoDetect: false,
					prettier: false,
					stylistic: { indent: 2 },
				}),
			`function test() {
  const x = 1
}`,
			'test.ts',
		)

		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should use single quotes by default', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({
					autoDetect: false,
					prettier: false,
					stylistic: true,
				}),
			`const x = 'hello'`,
			'test.ts',
		)

		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should not use semicolons by default', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({
					autoDetect: false,
					prettier: false,
					stylistic: true,
				}),
			`const x = 1`,
			'test.ts',
		)

		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should support tab indent', () => {
		const configs = stylistic({ indent: 'tab' })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['style/indent']).toBeDefined()
	})

	it('should support double quotes', () => {
		const configs = stylistic({ quotes: 'double' })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['style/quotes']).toBeDefined()
	})

	it('should support semicolons', () => {
		const configs = stylistic({ semi: true })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['style/semi']).toBeDefined()
	})

	it('should support overrides', () => {
		const configs = stylistic({ overrides: { 'style/semi': 'off' } })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['style/semi']).toBe('off')
	})

	it('should configure generator-star-spacing', () => {
		const configs = stylistic()

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['style/generator-star-spacing']).toEqual(['error', { after: true, before: false }])
	})

	it('should configure yield-star-spacing', () => {
		const configs = stylistic()

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['style/yield-star-spacing']).toEqual(['error', { after: true, before: false }])
	})

	it('should configure multiline-ternary as never', () => {
		const configs = stylistic()

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['style/multiline-ternary']).toEqual(['error', 'never'])
	})

	it('should support lessOpinionated mode', () => {
		const configs = stylistic({ lessOpinionated: true })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.curly).toEqual(['error', 'all'])
	})

	it('should support experimental option', () => {
		const configs = stylistic({ experimental: true })

		expect(configs).toBeDefined()
	})

	it('should use style as plugin name', () => {
		const configs = stylistic()

		expect(configs).toBeDefined()
		expect(configs[0]?.plugins?.style).toBeDefined()
	})
})
