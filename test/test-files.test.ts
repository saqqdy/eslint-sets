import { describe, expect, it } from 'vitest'
import { hasRule, lintContent } from './utils'

describe('Test Config', () => {
	it('should parse test files', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`import { describe, it, expect } from 'vitest'

describe('test', () => {
  it('should work', () => {
    expect(1).toBe(1)
  })
})`,
			'test.spec.ts',
		)
		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should allow console in test files', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`console.log('test')`,
			'test.spec.ts',
		)
		expect(hasRule(messages, 'no-console')).toBeFalsy()
	})
})
