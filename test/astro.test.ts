import { describe, expect, it } from 'vitest'
import { astro } from '../src/configs'

describe('astro Config', () => {
	it('should return valid configs', async () => {
		const configs = await astro()

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should support custom overrides', async () => {
		const configs = await astro({ overrides: { 'astro/semi': 'error' } })

		expect(configs).toBeDefined()
		const astroConfig = configs.find(c => c.name === 'eslint-sets/astro')
		expect(astroConfig?.rules?.['astro/semi']).toBe('error')
	})

	it('should have astro plugin loaded', async () => {
		const configs = await astro()

		const astroConfig = configs.find(c => c.name === 'eslint-sets/astro')
		expect(astroConfig?.plugins?.astro).toBeDefined()
	})

	it('should have processor configured', async () => {
		const configs = await astro()

		const astroConfig = configs.find(c => c.name === 'eslint-sets/astro')
		expect(astroConfig?.processor).toBeDefined()
	})

	it('should have core astro rules enabled', async () => {
		const configs = await astro()

		const astroConfig = configs.find(c => c.name === 'eslint-sets/astro')
		expect(astroConfig?.rules?.['astro/missing-client-only-directive-value']).toBe('error')
		expect(astroConfig?.rules?.['astro/valid-compile']).toBe('error')
	})

	it('should have astro/no-set-html-directive disabled', async () => {
		const configs = await astro()

		const astroConfig = configs.find(c => c.name === 'eslint-sets/astro')
		expect(astroConfig?.rules?.['astro/no-set-html-directive']).toBe('off')
	})

	it('should have astro/semi disabled', async () => {
		const configs = await astro()

		const astroConfig = configs.find(c => c.name === 'eslint-sets/astro')
		expect(astroConfig?.rules?.['astro/semi']).toBe('off')
	})
})
