import { describe, expect, it } from 'vitest'
import { eslintConfig } from './utils'

describe('config Options', () => {
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
		const ignoresConfig = config.find(c => c.name === 'eslint-sets/ignores')

		expect(ignoresConfig).toBeDefined()
		expect(ignoresConfig?.ignores).toContain('**/dist/**')
		expect(ignoresConfig?.ignores).toContain('**/custom-ignore/**')
	})

	it('should respect ignores function option', async () => {
		const config = await eslintConfig({
			ignores: defaults => [...defaults, '**/custom-ignore/**'],
		})

		expect(config).toBeDefined()

		const ignoresConfig = config.find(c => c.name === 'eslint-sets/ignores')

		expect(ignoresConfig).toBeDefined()
		expect(ignoresConfig?.ignores).toContain('**/custom-ignore/**')
	})

	it('should respect rules option', async () => {
		const config = await eslintConfig({
			rules: {
				'no-console': 'off',
			},
		})

		const customConfig = config.find(c => c.name === 'eslint-sets/custom-rules')

		expect(customConfig).toBeDefined()
		expect(customConfig?.rules?.['no-console']).toBe('off')
	})

	it('should disable typescript when set to false', async () => {
		const config = await eslintConfig({
			typescript: false,
		})

		const tsConfig = config.find(c => c.name === 'eslint-sets/typescript')

		expect(tsConfig).toBeUndefined()
	})

	it('should disable unicorn when set to false', async () => {
		const config = await eslintConfig({
			unicorn: false,
		})

		const unicornConfig = config.find(c => c.name === 'eslint-sets/unicorn')

		expect(unicornConfig).toBeUndefined()
	})

	it('should disable prettier when set to false', async () => {
		const config = await eslintConfig({
			prettier: false,
		})

		const prettierConfig = config.find(c => c.name === 'eslint-sets/prettier')

		expect(prettierConfig).toBeUndefined()
	})

	it('should work with all features disabled', async () => {
		const config = await eslintConfig({
			imports: false,
			jsonc: false,
			markdown: false,
			node: false,
			perfectionist: false,
			prettier: false,
			react: false,
			regexp: false,
			svelte: false,
			test: false,
			typescript: false,
			unicorn: false,
			vue: false,
			yaml: false,
		})

		expect(config.length).toBeGreaterThan(0)

		// Should only have basic configs
		expect(config.find(c => c.name === 'eslint-sets/javascript')).toBeDefined()
		expect(config.find(c => c.name === 'eslint-sets/ignores')).toBeDefined()
	})

	it('should support extends option', async () => {
		const config = await eslintConfig({
			extends: [
				{
					name: 'test/custom',
					rules: {
						'no-console': 'off',
					},
				},
			],
		})

		expect(config.find(c => c.name === 'test/custom')).toBeDefined()
	})

	it('should support isInEditor option', async () => {
		const config = await eslintConfig({
			isInEditor: false,
		})

		expect(config).toBeDefined()
	})

	it('should support gitignore option disabled', async () => {
		const config = await eslintConfig({
			gitignore: false,
		})

		expect(config).toBeDefined()
	})

	it('should support disables option disabled', async () => {
		const config = await eslintConfig({
			disables: false,
		})

		expect(config).toBeDefined()
	})

	it('should support command option disabled', async () => {
		const config = await eslintConfig({
			command: false,
		})

		expect(config).toBeDefined()
	})

	it('should support sortPackageJson option disabled', async () => {
		const config = await eslintConfig({
			sortPackageJson: false,
		})

		expect(config).toBeDefined()
	})

	it('should support sortTsconfig option disabled', async () => {
		const config = await eslintConfig({
			sortTsconfig: false,
		})

		expect(config).toBeDefined()
	})

	it('should support comments option disabled', async () => {
		const config = await eslintConfig({
			comments: false,
		})

		expect(config).toBeDefined()
	})

	it('should support autoDetect disabled', async () => {
		const config = await eslintConfig({
			autoDetect: false,
		})

		expect(config).toBeDefined()
	})

	it('should support vue with options object', async () => {
		const config = await eslintConfig({
			vue: { vueVersion: 3 },
		})

		expect(config.find(c => c.name === 'eslint-sets/vue')).toBeDefined()
	})

	it('should support react with options object', async () => {
		const config = await eslintConfig({
			react: { reactCompiler: false },
		})

		// React config may not exist if react package is not installed
		// Just verify the config is valid
		expect(config).toBeDefined()
		expect(Array.isArray(config)).toBeTruthy()
	})

	it('should support typescript with options object', async () => {
		const config = await eslintConfig({
			typescript: { typeAware: false },
		})

		expect(config.find(c => c.name === 'eslint-sets/typescript')).toBeDefined()
	})

	it('should have ts plugin for typescript config', async () => {
		const config = await eslintConfig({
			typescript: true,
		})

		const tsConfig = config.find(c => c.name === 'eslint-sets/typescript')

		expect(tsConfig).toBeDefined()
		expect(tsConfig?.plugins?.ts).toBeDefined()
	})

	it('should use ts/* rule prefix for typescript rules', async () => {
		const config = await eslintConfig({
			typescript: true,
		})

		const tsConfig = config.find(c => c.name === 'eslint-sets/typescript')

		expect(tsConfig).toBeDefined()

		// Check that rules use ts/* prefix instead of @typescript-eslint/*
		const rules = tsConfig?.rules || {}
		const tsRules = Object.keys(rules).filter(r => r.startsWith('ts/'))

		expect(tsRules.length).toBeGreaterThan(0)
	})
})
