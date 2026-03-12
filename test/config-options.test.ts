import { it, expect, describe } from 'vitest'
import { eslintConfig } from './utils'

describe('Config Options', () => {
	it('should work with default options', async () => {
		const config = await eslintConfig()
		expect(config).toBeDefined()
		expect(Array.isArray(config)).toBeTruthy()
		expect(config.length).toBeGreaterThan(0)
	})

	it('should respect ignores option', async () => {
		const config = await eslintConfig({
			ignores: ['**/dist/**', '**/custom-ignore/**'],
		})
		expect(config).toBeDefined()

		// Check that ignores config exists
		const ignoresConfig = config.find((c) => c.name === 'eslint-sets/ignores')
		expect(ignoresConfig).toBeDefined()
		expect(ignoresConfig?.ignores).toContain('**/dist/**')
		expect(ignoresConfig?.ignores).toContain('**/custom-ignore/**')
	})

	it('should respect rules option', async () => {
		const config = await eslintConfig({
			rules: {
				'no-console': 'off',
			},
		})

		const customConfig = config.find((c) => c.name === 'eslint-sets/custom-rules')
		expect(customConfig).toBeDefined()
		expect(customConfig?.rules?.['no-console']).toBe('off')
	})

	it('should disable typescript when set to false', async () => {
		const config = await eslintConfig({
			typescript: false,
		})

		const tsConfig = config.find((c) => c.name === 'eslint-sets/typescript/setup')
		expect(tsConfig).toBeUndefined()
	})

	it('should disable unicorn when set to false', async () => {
		const config = await eslintConfig({
			unicorn: false,
		})

		const unicornConfig = config.find((c) => c.name === 'eslint-sets/unicorn')
		expect(unicornConfig).toBeUndefined()
	})

	it('should disable prettier when set to false', async () => {
		const config = await eslintConfig({
			prettier: false,
		})

		const prettierConfig = config.find((c) => c.name === 'eslint-sets/prettier')
		expect(prettierConfig).toBeUndefined()
	})

	it('should work with all features disabled', async () => {
		const config = await eslintConfig({
			typescript: false,
			vue: false,
			react: false,
			svelte: false,
			jsonc: false,
			yaml: false,
			markdown: false,
			imports: false,
			unicorn: false,
			perfectionist: false,
			regexp: false,
			test: false,
			prettier: false,
			node: false,
		})

		expect(config.length).toBeGreaterThan(0)

		// Should only have basic configs
		expect(config.find((c) => c.name === 'eslint-sets/javascript')).toBeDefined()
		expect(config.find((c) => c.name === 'eslint-sets/ignores')).toBeDefined()
	})
})
