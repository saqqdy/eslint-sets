import { describe, expect, it } from 'vitest'
import { angular } from '../src/configs'

describe('angular Config', () => {
	it('should return valid configs', async () => {
		const configs = await angular()

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should support custom templateFiles option', async () => {
		const configs = await angular({ templateFiles: ['**/*.html'] })

		expect(configs).toBeDefined()
		const templateConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/template')
		expect(templateConfig?.files).toContain('**/*.html')
	})

	it('should support overrides for TS rules', async () => {
		const configs = await angular({ overrides: { 'angular/no-empty-lifecycle-method': 'warn' } })

		expect(configs).toBeDefined()
		const tsConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/ts')
		expect(tsConfig?.rules?.['angular/no-empty-lifecycle-method']).toBe('warn')
	})

	it('should support overrides for template rules', async () => {
		const configs = await angular({ overrides: { 'angular-template/banana-in-box': 'warn' } })

		expect(configs).toBeDefined()
		const templateConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/template')
		expect(templateConfig?.rules?.['angular-template/banana-in-box']).toBe('warn')
	})

	it('should have correct setup config', async () => {
		const configs = await angular()

		const setupConfig = configs.find(c => c.name === 'eslint-sets/angular/setup')
		expect(setupConfig?.plugins?.angular).toBeDefined()
		expect(setupConfig?.plugins?.['angular-template']).toBeDefined()
	})

	it('should have core angular rules enabled', async () => {
		const configs = await angular()

		const tsConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/ts')
		expect(tsConfig?.rules?.['angular/contextual-lifecycle']).toBe('error')
		expect(tsConfig?.rules?.['angular/no-empty-lifecycle-method']).toBe('error')
		expect(tsConfig?.rules?.['angular/prefer-standalone']).toBe('error')
	})

	it('should have core template rules enabled', async () => {
		const configs = await angular()

		const templateConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/template')
		expect(templateConfig?.rules?.['angular-template/banana-in-box']).toBe('error')
		expect(templateConfig?.rules?.['angular-template/eqeqeq']).toBe('error')
	})

	it('should have processor configured', async () => {
		const configs = await angular()

		const tsConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/ts')
		expect(tsConfig?.processor).toBeDefined()
	})

	it('should have correct files for TS rules', async () => {
		const configs = await angular()

		const tsConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/ts')
		expect(tsConfig?.files).toBeDefined()
	})

	it('should have angular/no-input-rename enabled', async () => {
		const configs = await angular()

		const tsConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/ts')
		expect(tsConfig?.rules?.['angular/no-input-rename']).toBe('error')
	})

	it('should have angular/prefer-inject enabled', async () => {
		const configs = await angular()

		const tsConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/ts')
		expect(tsConfig?.rules?.['angular/prefer-inject']).toBe('error')
	})

	it('should have angular-template/prefer-control-flow enabled', async () => {
		const configs = await angular()

		const templateConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/template')
		expect(templateConfig?.rules?.['angular-template/prefer-control-flow']).toBe('error')
	})

	it('should have angular-template/no-negated-async enabled', async () => {
		const configs = await angular()

		const templateConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/template')
		expect(templateConfig?.rules?.['angular-template/no-negated-async']).toBe('error')
	})

	it('should support @angular-eslint prefixed overrides', async () => {
		const configs = await angular({ overrides: { '@angular-eslint/no-empty-lifecycle-method': 'off' } })

		expect(configs).toBeDefined()
		const tsConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/ts')
		expect(tsConfig?.rules?.['@angular-eslint/no-empty-lifecycle-method']).toBe('off')
	})

	it('should support @angular-eslint/template prefixed overrides', async () => {
		const configs = await angular({ overrides: { '@angular-eslint/template/banana-in-box': 'warn' } })

		expect(configs).toBeDefined()
		const templateConfig = configs.find(c => c.name === 'eslint-sets/angular/rules/template')
		expect(templateConfig?.rules?.['@angular-eslint/template/banana-in-box']).toBe('warn')
	})
})
