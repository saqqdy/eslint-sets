import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('TypeScript Config', () => {
	it('should parse TypeScript files', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			'const x: string = "test"',
			'test.ts',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should support type imports', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
      `import type { Foo } from 'foo'`,
      'test.ts',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should support interfaces', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
      `interface User {
  name: string
  age: number
}`,
      'test.ts',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should support generics', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
      `function identity<T>(arg: T): T {
  return arg
}`,
      'test.ts',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should return valid configs with typeAware option', async () => {
		const { typescript } = await import('../src/configs')
		const configs = await typescript({ typeAware: true, tsconfigPath: './tsconfig.json' })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
		expect(configs.length).toBeGreaterThan(1)
		// Should have type-aware config
		expect(configs.find((c) => c.name === 'eslint-sets/typescript/type-aware')).toBeDefined()
	})

	it('should return valid configs with custom tsconfigPath', async () => {
		const { typescript } = await import('../src/configs')
		const configs = await typescript({ tsconfigPath: './custom-tsconfig.json' })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should return valid configs with custom filesTypeAware', async () => {
		const { typescript } = await import('../src/configs')
		const configs = await typescript({
			filesTypeAware: ['**/*.ts'],
			typeAware: true,
			tsconfigPath: './tsconfig.json',
		})

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should apply custom overrides', async () => {
		const { typescript } = await import('../src/configs')
		const configs = await typescript({ overrides: { 'ts/no-explicit-any': 'off' } })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['ts/no-explicit-any']).toBe('off')
	})

	it('should use ts/* prefix for rules', async () => {
		const { typescript } = await import('../src/configs')
		const configs = await typescript()

		const mainConfig = configs.find((c) => c.name === 'eslint-sets/typescript')

		expect(mainConfig).toBeDefined()

		// Check that rules use ts/* prefix
		const rules = mainConfig?.rules || {}
		const tsRules = Object.keys(rules).filter((r) => r.startsWith('ts/'))

		expect(tsRules.length).toBeGreaterThan(0)
	})

	it('should enable ts/no-redeclare', async () => {
		const { typescript } = await import('../src/configs')
		const configs = await typescript()

		const mainConfig = configs.find((c) => c.name === 'eslint-sets/typescript')

		expect(mainConfig).toBeDefined()
		expect(mainConfig?.rules?.['no-redeclare']).toBe('off')
		expect(mainConfig?.rules?.['ts/no-redeclare']).toEqual(['error', { builtinGlobals: false }])
	})

	it('should configure ts/no-unused-expressions with flexible options', async () => {
		const { typescript } = await import('../src/configs')
		const configs = await typescript()

		const mainConfig = configs.find((c) => c.name === 'eslint-sets/typescript')

		expect(mainConfig).toBeDefined()
		expect(mainConfig?.rules?.['ts/no-unused-expressions']).toEqual([
			'error',
			{
				allowShortCircuit: true,
				allowTaggedTemplates: true,
				allowTernary: true,
			},
		])
	})

	it('should enable ts/explicit-function-return-type for lib type', async () => {
		const { typescript } = await import('../src/configs')
		const configs = await typescript({ type: 'lib' })

		const mainConfig = configs.find((c) => c.name === 'eslint-sets/typescript')

		expect(mainConfig).toBeDefined()
		expect(mainConfig?.rules?.['ts/explicit-function-return-type']).toEqual([
			'error',
			{
				allowExpressions: true,
				allowHigherOrderFunctions: true,
				allowIIFEs: true,
			},
		])
	})

	it('should not enable ts/explicit-function-return-type for app type', async () => {
		const { typescript } = await import('../src/configs')
		const configs = await typescript({ type: 'app' })

		const mainConfig = configs.find((c) => c.name === 'eslint-sets/typescript')

		expect(mainConfig).toBeDefined()
		expect(mainConfig?.rules?.['ts/explicit-function-return-type']).toBeUndefined()
	})

	it('should support overridesTypeAware option', async () => {
		const { typescript } = await import('../src/configs')
		const configs = await typescript({
			typeAware: true,
			tsconfigPath: './tsconfig.json',
			overridesTypeAware: { 'ts/no-floating-promises': 'warn' },
		})

		const typeAwareConfig = configs.find((c) => c.name === 'eslint-sets/typescript/type-aware')

		expect(typeAwareConfig).toBeDefined()
		expect(typeAwareConfig?.rules?.['ts/no-floating-promises']).toBe('warn')
	})
})
