import { it, expect, describe } from 'vitest'
import { hasRule, lintContent } from './utils'

describe('Unicorn Config', () => {
	it('should lint JavaScript with unicorn rules', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`const arr = [1, 2, 3]
const result = arr.filter(x => x > 1)`,
			'test.js',
		)
		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should not trigger prevent-abbreviations (disabled)', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`const props = { err: 'test' }`,
			'test.js',
		)
		expect(hasRule(messages, 'unicorn/prevent-abbreviations')).toBeFalsy()
	})

	it('should not trigger filename-case (disabled)', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`const MyComponent = {}`,
			'MyComponent.js',
		)
		expect(hasRule(messages, 'unicorn/filename-case')).toBeFalsy()
	})
})
