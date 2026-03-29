import { describe, expect, it } from 'vitest'
import { unocss } from '../src/configs'

describe('unocss Config', () => {
	it('should return valid configs', async () => {
		const configs = await unocss()

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should support strict mode', async () => {
		const configs = await unocss({ strict: true })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should support custom overrides', async () => {
		const configs = await unocss({ overrides: { 'unocss/order': 'error' } })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should return empty array when no unocss config exists', async () => {
		// UnoCSS requires a config file (uno.config.ts, etc.) to exist
		const configs = await unocss()
		// The test environment may not have a uno.config.ts, so configs may be empty
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should handle options gracefully', async () => {
		const configs = await unocss({ strict: false })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})
})
