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

		// Custom globals live in a dedicated no-files language-options config
		// so ESLint merges them natively across all matching files.
		const langConfig = config.find(c => c.name === 'eslint-sets/language-options')
		expect(langConfig).toBeDefined()
		expect(langConfig?.languageOptions?.globals?.customGlobal).toBe('readonly')
	})

	it('should expose custom globals via a language-options config', async () => {
		const config = await eslintConfig({
			typescript: true,
			languageOptions: {
				globals: { myGlobal: 'writable' },
			},
		})

		expect(config).toBeDefined()
		const langConfig = config.find(c => c.name === 'eslint-sets/language-options')
		expect(langConfig?.languageOptions?.globals?.myGlobal).toBe('writable')
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
		expect(vueConfig.find(c => c.name === 'eslint-sets/language-options')?.languageOptions?.globals?.vueGlobal).toBe('readonly')

		// Test with React
		const reactConfig = await eslintConfig({
			react: true,
			languageOptions: {
				globals: { reactGlobal: 'readonly' },
			},
		})
		expect(reactConfig).toBeDefined()
		expect(reactConfig.find(c => c.name === 'eslint-sets/language-options')?.languageOptions?.globals?.reactGlobal).toBe('readonly')
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

	it('should expose custom globals alongside default globals', async () => {
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

		// Custom globals are in the dedicated language-options config
		const langConfig = config.find(c => c.name === 'eslint-sets/language-options')
		expect(langConfig).toBeDefined()
		expect(langConfig?.languageOptions?.globals?.defineAppConfig).toBe('readonly')
		expect(langConfig?.languageOptions?.globals?.definePageConfig).toBe('readonly')

		// Default globals remain in the javascript config (unaffected)
		const javascriptConfig = config.find(c => c.name?.includes('javascript'))
		expect(javascriptConfig).toBeDefined()
		expect(javascriptConfig?.languageOptions?.globals?.console).toBeDefined()
		expect(javascriptConfig?.languageOptions?.globals?.process).toBeDefined()
	})

	it('should preserve default globals when applying custom globals', async () => {
		const config = await eslintConfig({
			languageOptions: {
				globals: {
					defineAppConfig: 'readonly',
				},
			},
		})

		expect(config).toBeDefined()

		// Custom global in the language-options config
		expect(config.find(c => c.name === 'eslint-sets/language-options')?.languageOptions?.globals?.defineAppConfig).toBe('readonly')

		// Default globals remain in the javascript config
		const javascriptConfig = config.find(c => c.name?.includes('javascript'))
		expect(javascriptConfig).toBeDefined()
		expect(javascriptConfig?.languageOptions?.globals?.console).toBeDefined()
		expect(javascriptConfig?.languageOptions?.globals?.process).toBeDefined()
		expect(javascriptConfig?.languageOptions?.globals?.window).toBeDefined()
	})
})
