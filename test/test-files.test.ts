import { describe, expect, it } from 'vitest'
import { hasRule, lintContent } from './utils'

describe('test Config', () => {
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
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should disable no-unused-expressions in test files', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`expect(1).toBe(1)`,
			'test.spec.ts',
		)

		expect(hasRule(messages, 'no-unused-expressions')).toBeFalsy()
	})

	it('should disable ts/explicit-function-return-type in test files', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`function setup() { return {} }`,
			'test.spec.ts',
		)

		expect(hasRule(messages, 'ts/explicit-function-return-type')).toBeFalsy()
	})
})
