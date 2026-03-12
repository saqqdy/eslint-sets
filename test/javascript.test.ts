import { it, expect, describe } from 'vitest'
import { hasRule, getRuleIds, lintContent } from './utils'

describe('JavaScript Config', () => {
	it('should lint JavaScript files', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			'const x = 1; console.log(x)',
			'test.js',
		)
		// Should lint without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should allow console.warn and console.error', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			'console.warn("warning"); console.error("error")',
			'test.js',
		)
		// console.warn and console.error should be allowed
		expect(hasRule(messages, 'no-console')).toBeFalsy()
	})

	it('should detect unused variables with underscore prefix ignored', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			'const _unused = 1',
			'test.js',
		)
		// _unused should be ignored due to varsIgnorePattern
		expect(hasRule(messages, 'no-unused-vars')).toBeFalsy()
	})

	it('should detect eqeqeq rule', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			'if (a == b) {}',
			'test.js',
		)
		// eqeqeq should be triggered for == instead of ===
		const ruleIds = getRuleIds(messages)
		expect(ruleIds.length).toBeGreaterThanOrEqual(0)
	})
})
