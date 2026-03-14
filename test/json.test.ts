import { describe, expect, it } from 'vitest'
import { hasRule, lintContent } from './utils'

describe('JSON Config', () => {
	it('should parse JSON files', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`{
  "name": "test",
  "version": "1.0.0"
}`,
			'package.json',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should detect JSON issues', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`{
  "name": Infinity
}`,
			'test.json',
		)

		expect(hasRule(messages, 'jsonc/no-infinity')).toBeTruthy()
	})

	it('should detect bigint in JSON', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`{
  "big": 123456789012345678901234567890n
}`,
			'test.json',
		)

		expect(hasRule(messages, 'jsonc/no-bigint-literals')).toBeTruthy()
	})
})
