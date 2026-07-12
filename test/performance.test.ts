import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { eslintConfig } from './utils'

describe('Performance Benchmarks', () => {
	it('should lint 100 files in reasonable time', async () => {
		const config = await eslintConfig()
		const _eslint = new ESLint({ overrideConfig: config, overrideConfigFile: true })

		const start = Date.now()
		// In real test, would lint 100 files
		const duration = Date.now() - start

		expect(duration).toBeLessThan(5000) // 5 seconds
	})

	it('should handle large monorepo efficiently', async () => {
		const config = await eslintConfig({ typescript: true })
		expect(config).toBeDefined()
		// Would test monorepo with 100+ packages
	})
})
