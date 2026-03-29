import { beforeAll, describe, expect, it } from 'vitest'
import { hasRule, lintContent } from './utils'

describe('svelte Config', () => {
	beforeAll(async () => {
		try {
			await import('eslint-plugin-svelte')
		} catch {
			console.warn('eslint-plugin-svelte not installed, skipping Svelte tests')
		}
	})

	it('should parse Svelte SFC', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, svelte: true }),
			`<script>
  let name = 'world'
</script>

<h1>Hello {name}!</h1>`,
			'test.svelte',
		)

		// Should parse without fatal errors
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should detect svelte/button-has-type', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, svelte: true }),
			`<script>
  let name = 'world'
</script>

<button>Click me</button>`,
			'test.svelte',
		)

		expect(hasRule(messages, 'svelte/button-has-type')).toBeTruthy()
	})
})
