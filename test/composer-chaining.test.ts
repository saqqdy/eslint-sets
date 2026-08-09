import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { describe, expect, it } from 'vitest'
import { eslintConfig } from './utils'

describe('composer chaining (v7)', () => {
	it('returns a FlatConfigComposer (sync, not a Promise of array)', () => {
		const result = eslintConfig({ vue: true, typescript: true })
		expect(result).toBeInstanceOf(FlatConfigComposer)
	})

	it('awaits to a non-empty config array', async () => {
		const configs = await eslintConfig({ vue: false, typescript: false })
		expect(Array.isArray(configs)).toBe(true)
		expect(configs.length).toBeGreaterThan(0)
	})

	it('supports chained .renamePlugins() returning a composer', async () => {
		const chained = eslintConfig({ vue: true }).renamePlugins({ 'import-lite': 'import' })
		expect(chained).toBeInstanceOf(FlatConfigComposer)
		const configs = await chained
		expect(configs.length).toBeGreaterThan(0)
	})

	it('supports chained .append() after construction', async () => {
		const chained = eslintConfig({ typescript: true }).append({
			name: 'test/extra',
			rules: { 'no-console': 'off' },
		})
		expect(chained).toBeInstanceOf(FlatConfigComposer)
		const configs = await chained
		expect(configs.some(c => c.name === 'test/extra')).toBe(true)
	})
})
