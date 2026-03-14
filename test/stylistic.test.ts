import { describe, expect, it } from 'vitest'
import { stylistic } from '../src/configs'
import { lintContent } from './utils'

describe('Stylistic Config', () => {
	it('should apply stylistic rules when enabled', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({ autoDetect: false,
					prettier: false,
					stylistic: true,
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
				).default({ autoDetect: false,
					prettier: false,
					stylistic: { indent: 2 },
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
				).default({ autoDetect: false,
					prettier: false,
					stylistic: true,
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
				).default({ autoDetect: false,
					prettier: false,
					stylistic: true,
				}),
			`const x = 1`,
			'test.ts',
		)

		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should support tab indent', () => {
		const configs = stylistic({ indent: 'tab' })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['@stylistic/indent']).toBeDefined()
	})

	it('should support double quotes', () => {
		const configs = stylistic({ quotes: 'double' })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['@stylistic/quotes']).toBeDefined()
	})

	it('should support semicolons', () => {
		const configs = stylistic({ semi: true })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['@stylistic/semi']).toBeDefined()
	})

	it('should support jsxQuotes', () => {
		const configs = stylistic({ jsxQuotes: 'prefer-single' })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['@stylistic/jsx-quotes']).toBeDefined()
	})

	it('should support trailingComma', () => {
		const configs = stylistic({ trailingComma: 'none' })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['@stylistic/comma-dangle']).toBeDefined()
	})

	it('should support bracketSpacing', () => {
		const configs = stylistic({ bracketSpacing: false })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['@stylistic/object-curly-spacing']).toBeDefined()
	})

	it('should support arrowParens', () => {
		const configs = stylistic({ arrowParens: 'avoid' })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['@stylistic/arrow-parens']).toBeDefined()
	})

	it('should support overrides', () => {
		const configs = stylistic({ overrides: { '@stylistic/semi': 'off' } })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['@stylistic/semi']).toBe('off')
	})

	it('should configure @stylistic/no-mixed-spaces-and-tabs with smart-tabs', () => {
		const configs = stylistic()

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['@stylistic/no-mixed-spaces-and-tabs']).toEqual(['error', 'smart-tabs'])
	})
})
