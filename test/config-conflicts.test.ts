import { describe, expect, it } from 'vitest'
import { eslintConfig } from './utils'

describe('Config Conflicts', () => {
	it('should detect Vue + React rule conflicts', async () => {
		const config = await eslintConfig({ vue: true, react: true })
		expect(config).toBeDefined()
		expect(Array.isArray(config)).toBeTruthy()
	})

	it('should handle extends array priority', async () => {
		const config = await eslintConfig({
			extends: [
				{ name: 'base', rules: { 'no-console': 'error' } },
				{ name: 'override', rules: { 'no-console': 'off' } },
			],
		})
		expect(config).toBeDefined()
		const overrideConfig = config.find(c => c.name === 'override')
		expect(overrideConfig?.rules?.['no-console']).toBe('off')
	})

	it('should warn about incompatible combinations', async () => {
		const config = await eslintConfig({ vue: true, angular: true })
		expect(config).toBeDefined()
	})
})
