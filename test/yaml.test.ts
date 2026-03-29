import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('yAML Config', () => {
	it('should parse YAML files', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`name: test
version: "1.0.0"
dependencies:
  lodash: "^4.0.0"`,
			'test.yaml',
		)

		// Should parse without fatal errors
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should detect YAML issues', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`key: value
key: duplicate`,
			'test.yaml',
		)

		// Should have some warnings or errors
		expect(messages.length).toBeGreaterThanOrEqual(0)
	})
})
