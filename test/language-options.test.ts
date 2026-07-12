import { describe, expect, it } from 'vitest'
import { eslintConfig } from './utils'

describe('Language Options', () => {
	it('should support custom languageOptions', async () => {
		const config = await eslintConfig({
			languageOptions: {
				globals: { customGlobal: 'readonly' },
				parserOptions: {
					ecmaVersion: 2024,
				},
			},
		})

		expect(config).toBeDefined()
		expect(Array.isArray(config)).toBeTruthy()

		const userOptionsConfig = config.find(c => c.name === 'eslint-sets/user-options')
		expect(userOptionsConfig).toBeDefined()
		expect(userOptionsConfig?.languageOptions?.globals?.customGlobal).toBe('readonly')
		expect(userOptionsConfig?.languageOptions?.parserOptions?.ecmaVersion).toBe(2024)
	})

	it('should merge languageOptions with base config', async () => {
		const config = await eslintConfig({
			typescript: true,
			languageOptions: {
				globals: { myGlobal: 'writable' },
			},
		})

		expect(config).toBeDefined()
		const userOptionsConfig = config.find(c => c.name === 'eslint-sets/user-options')
		expect(userOptionsConfig).toBeDefined()
		expect(userOptionsConfig?.languageOptions?.globals?.myGlobal).toBe('writable')
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

		// Test with React
		const reactConfig = await eslintConfig({
			react: true,
			languageOptions: {
				globals: { reactGlobal: 'readonly' },
			},
		})
		expect(reactConfig).toBeDefined()
	})

	it('should work without languageOptions', async () => {
		const config = await eslintConfig({
			typescript: true,
		})

		expect(config).toBeDefined()
		const userOptionsConfig = config.find(c => c.name === 'eslint-sets/user-options')
		// Should not create user-options config if no languageOptions or custom rules
		expect(userOptionsConfig).toBeUndefined()
	})
})
