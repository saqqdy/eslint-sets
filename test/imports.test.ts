import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('Imports Config', () => {
	it('should parse import statements', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`import { used } from 'module'
console.warn(used)`,
			'test.js',
		)

		// Should parse without fatal errors
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should support default imports', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`import used from 'module'
console.warn(used)`,
			'test.js',
		)

		// Should parse without fatal errors
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should support namespace imports', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`import * as used from 'module'
console.warn(used)`,
			'test.js',
		)

		// Should parse without fatal errors
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})
})
