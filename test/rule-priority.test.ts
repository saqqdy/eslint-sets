import { describe, expect, it } from 'vitest'
import { eslintConfig } from './utils'

describe('Rule Priority', () => {
	it('should respect user overrides over defaults', async () => {
		const config = await eslintConfig({
			rules: { 'no-console': 'off' },
		})
		const customConfig = config.find(c => c.name === 'eslint-sets/user-options')
		expect(customConfig?.rules?.['no-console']).toBe('off')
	})

	it('should handle rule severity changes', async () => {
		const config = await eslintConfig({
			rules: { 'no-unused-vars': 'warn' },
		})
		expect(config).toBeDefined()
	})
})
