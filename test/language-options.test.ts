import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { eslintConfig } from './utils'

describe('Language Options', () => {
	it('should support custom languageOptions with globals', async () => {
		const config = await eslintConfig({
			languageOptions: {
				globals: { customGlobal: 'readonly' },
			},
		})

		expect(config).toBeDefined()
		expect(Array.isArray(config)).toBeTruthy()

		// Custom globals should be merged into javascript config
		const javascriptConfig = config.find(c => c.name?.includes('javascript'))
		expect(javascriptConfig).toBeDefined()
		expect(javascriptConfig?.languageOptions?.globals?.customGlobal).toBe('readonly')
	})

	it('should merge globals into base config', async () => {
		const config = await eslintConfig({
			typescript: true,
			languageOptions: {
				globals: { myGlobal: 'writable' },
			},
		})

		expect(config).toBeDefined()
		// Globals should be merged into javascript config
		const javascriptConfig = config.find(c => c.name?.includes('javascript'))
		expect(javascriptConfig?.languageOptions?.globals?.myGlobal).toBe('writable')
	})

	it('should work with different frameworks', async () => {
		// Test with Vue
		const vueConfig = await eslintConfig({
			vue: true,
			languageOptions: {
				globals: { vueGlobal: 'readonly' },
			},
		})
		expect(vueConfig).toBeDefined()
		const vueJsConfig = vueConfig.find(c => c.name?.includes('javascript'))
		expect(vueJsConfig?.languageOptions?.globals?.vueGlobal).toBe('readonly')

		// Test with React
		const reactConfig = await eslintConfig({
			react: true,
			languageOptions: {
				globals: { reactGlobal: 'readonly' },
			},
		})
		expect(reactConfig).toBeDefined()
		const reactJsConfig = reactConfig.find(c => c.name?.includes('javascript'))
		expect(reactJsConfig?.languageOptions?.globals?.reactGlobal).toBe('readonly')
	})

	it('should work without languageOptions', async () => {
		const config = await eslintConfig({
			typescript: true,
		})

		expect(config).toBeDefined()
		// Should work normally without languageOptions
		const javascriptConfig = config.find(c => c.name?.includes('javascript'))
		expect(javascriptConfig).toBeDefined()
	})

	it('should apply custom globals in actual linting', async () => {
		const config = await eslintConfig({
			languageOptions: {
				globals: {
					myCustomGlobal: 'readonly',
				},
			},
		})

		const eslint = new ESLint({
			overrideConfig: config,
			overrideConfigFile: true,
		})

		// Code using the custom global should not trigger no-undef rule
		const code = `
        const value = myCustomGlobal;
      `
		const results = await eslint.lintText(code, { filePath: 'test.js' })
		const noUndefErrors = results[0].messages.filter(
			msg => msg.ruleId === 'no-undef' && msg.message.includes('myCustomGlobal'),
		)

		expect(noUndefErrors.length).toBe(0)
	})

	it('should intelligently merge globals into javascript config', async () => {
		const config = await eslintConfig({
			typescript: true,
			languageOptions: {
				globals: {
					defineAppConfig: 'readonly',
					definePageConfig: 'readonly',
				},
			},
		})

		expect(config).toBeDefined()

		// Find the javascript config
		const javascriptConfig = config.find(c => c.name?.includes('javascript'))
		expect(javascriptConfig).toBeDefined()
		expect(javascriptConfig?.languageOptions?.globals?.defineAppConfig).toBe('readonly')
		expect(javascriptConfig?.languageOptions?.globals?.definePageConfig).toBe('readonly')

		// Verify default globals are still present
		expect(javascriptConfig?.languageOptions?.globals?.console).toBeDefined()
		expect(javascriptConfig?.languageOptions?.globals?.process).toBeDefined()
	})

	it('should preserve default globals when merging', async () => {
		const config = await eslintConfig({
			languageOptions: {
				globals: {
					defineAppConfig: 'readonly',
				},
			},
		})

		expect(config).toBeDefined()

		// Find the javascript config
		const javascriptConfig = config.find(c => c.name?.includes('javascript'))
		expect(javascriptConfig).toBeDefined()

		// Custom global should be added
		expect(javascriptConfig?.languageOptions?.globals?.defineAppConfig).toBe('readonly')

		// Default globals should still be present
		expect(javascriptConfig?.languageOptions?.globals?.console).toBeDefined()
		expect(javascriptConfig?.languageOptions?.globals?.process).toBeDefined()
		expect(javascriptConfig?.languageOptions?.globals?.window).toBeDefined()
	})
})
