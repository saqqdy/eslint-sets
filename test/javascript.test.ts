import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('javaScript Config', () => {
	it('should lint JavaScript files', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			'const x = 1; console.warn(x)',
			'test.js',
		)

		// Should lint without fatal errors
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should allow console.warn and console.error', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			'console.warn("warning"); console.error("error")',
			'test.js',
		)
		// console.warn and console.error should be allowed - no-console should not trigger
		const consoleErrors = messages.filter(m => m.ruleId === 'no-console')

		expect(consoleErrors).toHaveLength(0)
	})
})
