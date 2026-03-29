import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('tOML Config', () => {
	it('should parse TOML files', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({ autoDetect: false,
					toml: true,
				}),
			`[package]
name = "my-project"
version = "1.0.0"

[dependencies]
serde = "1.0"`,
			'Cargo.toml',
		)

		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})
})
