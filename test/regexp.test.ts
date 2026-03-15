import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('RegExp Config', () => {
	it('should accept valid regex', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`const re = /^[a-z]+$/`,
			'test.js',
		)

		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should accept regex literals', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`const re = /test/gi`,
			'test.js',
		)

		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should accept regex with character classes', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`const re = /[a-zA-Z0-9]/`,
			'test.js',
		)

		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should accept regex with quantifiers', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`const re = /a+b*c?/`,
			'test.js',
		)

		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})
})
