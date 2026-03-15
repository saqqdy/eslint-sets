import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('Unicorn Config', () => {
	it('should lint JavaScript with unicorn rules', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, isInEditor: false }),
			`const arr = [1, 2, 3]
const result = arr.filter(x => x > 1)`,
			'test.js',
		)

		// Should parse without fatal errors
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})
})
