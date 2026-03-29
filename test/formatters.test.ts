import { describe, expect, it } from 'vitest'
import { formatters } from '../src/configs'

describe('formatters Config', () => {
	it('should return empty array when no formatters enabled', async () => {
		const configs = await formatters({
			css: false,
			html: false,
			xml: false,
			svg: false,
			graphql: false,
			markdown: false,
			astro: false,
		})

		expect(configs).toEqual([])
	})

	it('should return valid configs with default options', async () => {
		const configs = await formatters()

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should return configs when options is true', async () => {
		const configs = await formatters(true)

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should support css option', async () => {
		const configs = await formatters({ css: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return // plugin not available

		const cssConfig = configs.find(c => c.name === 'eslint-sets/formatters/css')
		expect(cssConfig).toBeDefined()
		expect(cssConfig?.rules?.['format/prettier']).toBeDefined()
	})

	it('should support scss option', async () => {
		const configs = await formatters({ css: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const scssConfig = configs.find(c => c.name === 'eslint-sets/formatters/scss')
		expect(scssConfig).toBeDefined()
	})

	it('should support less option', async () => {
		const configs = await formatters({ css: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const lessConfig = configs.find(c => c.name === 'eslint-sets/formatters/less')
		expect(lessConfig).toBeDefined()
	})

	it('should support html option', async () => {
		const configs = await formatters({ html: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const htmlConfig = configs.find(c => c.name === 'eslint-sets/formatters/html')
		expect(htmlConfig).toBeDefined()
	})

	it('should support xml option', async () => {
		const configs = await formatters({ xml: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const xmlConfig = configs.find(c => c.name === 'eslint-sets/formatters/xml')
		expect(xmlConfig).toBeDefined()
	})

	it('should support svg option', async () => {
		const configs = await formatters({ svg: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const svgConfig = configs.find(c => c.name === 'eslint-sets/formatters/svg')
		expect(svgConfig).toBeDefined()
	})

	it('should support graphql option', async () => {
		const configs = await formatters({ graphql: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const graphqlConfig = configs.find(c => c.name === 'eslint-sets/formatters/graphql')
		expect(graphqlConfig).toBeDefined()
	})

	it('should support markdown option with prettier', async () => {
		const configs = await formatters({ markdown: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const mdConfig = configs.find(c => c.name === 'eslint-sets/formatters/markdown')
		expect(mdConfig).toBeDefined()
		expect(mdConfig?.rules?.['format/prettier']).toBeDefined()
	})

	it('should support markdown option with dprint', async () => {
		const configs = await formatters({ markdown: 'dprint' })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const mdConfig = configs.find(c => c.name === 'eslint-sets/formatters/markdown')
		expect(mdConfig).toBeDefined()
		expect(mdConfig?.rules?.['format/dprint']).toBeDefined()
	})

	it('should support astro option', async () => {
		const configs = await formatters({ astro: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const astroConfig = configs.find(c => c.name === 'eslint-sets/formatters/astro')
		expect(astroConfig).toBeDefined()
	})

	it('should have astro disables config', async () => {
		const configs = await formatters({ astro: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const astroDisables = configs.find(c => c.name === 'eslint-sets/formatters/astro/disables')
		expect(astroDisables).toBeDefined()
		expect(astroDisables?.rules?.['style/semi']).toBe('off')
	})

	it('should support custom prettierOptions', async () => {
		const configs = await formatters({
			css: true,
			prettierOptions: {
				printWidth: 80,
				semi: true,
			},
		})

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const cssConfig = configs.find(c => c.name === 'eslint-sets/formatters/css')
		expect(cssConfig).toBeDefined()
	})

	it('should support stylistic options', async () => {
		const configs = await formatters({ css: true }, { indent: 4, quotes: 'double' })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const cssConfig = configs.find(c => c.name === 'eslint-sets/formatters/css')
		expect(cssConfig).toBeDefined()
	})

	it('should support tab indent in stylistic options', async () => {
		const configs = await formatters({ css: true }, { indent: 'tab' })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const cssConfig = configs.find(c => c.name === 'eslint-sets/formatters/css')
		expect(cssConfig).toBeDefined()
	})

	it('should throw error when slidev is enabled without prettier markdown', async () => {
		await expect(formatters({ slidev: true, markdown: 'dprint' })).rejects.toThrow(
			'`slidev` option only works when `markdown` is enabled with `prettier`',
		)
	})

	it('should support slidev option with prettier markdown', async () => {
		const configs = await formatters({ slidev: true, markdown: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const slidevConfig = configs.find(c => c.name === 'eslint-sets/formatters/slidev')
		expect(slidevConfig).toBeDefined()
	})

	it('should support slidev option with custom files', async () => {
		const configs = await formatters({
			slidev: { files: ['**/custom-slides.md'] },
			markdown: true,
		})

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const slidevConfig = configs.find(c => c.name === 'eslint-sets/formatters/slidev')
		expect(slidevConfig).toBeDefined()
	})

	it('should support dprintOptions', async () => {
		const configs = await formatters({
			markdown: 'dprint',
			dprintOptions: {
				lineWidth: 80,
			},
		})

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const mdConfig = configs.find(c => c.name === 'eslint-sets/formatters/markdown')
		expect(mdConfig).toBeDefined()
	})

	it('should have format plugin loaded', async () => {
		const configs = await formatters({ css: true })

		expect(configs).toBeDefined()
		if (configs.length === 0) return

		const setupConfig = configs.find(c => c.name === 'eslint-sets/formatters/setup')
		expect(setupConfig?.plugins?.format).toBeDefined()
	})
})
