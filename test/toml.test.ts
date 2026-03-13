import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('TOML Config', () => {
	it('should parse TOML files', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({
					toml: true,
				}),
			`[package]
name = "my-project"
version = "1.0.0"

[dependencies]
serde = "1.0"`,
			'Cargo.toml',
		)
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})
})
