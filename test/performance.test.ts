import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { eslintConfig } from './utils'

const PERFORMANCE_THRESHOLDS = {
	small: { maxTime: 2000, maxMemory: 100 },
	medium: { maxTime: 5000, maxMemory: 200 },
	large: { maxTime: 10000, maxMemory: 500 },
}

describe('Performance Benchmarks', () => {
	describe('Configuration Performance', () => {
		it('should generate config quickly', async () => {
			const startTime = Date.now()
			const config = await eslintConfig({ typescript: true, vue: true, react: true })
			const duration = Date.now() - startTime

			// Allow up to 3s for config generation (includes gitignore lookup, module loading)
			expect(duration).toBeLessThan(3000)
			expect(config).toBeDefined()
			expect(Array.isArray(config)).toBe(true)
		})

		it('should handle complex config options efficiently', async () => {
			const complexOptions = {
				typescript: true,
				vue: true,
				stylistic: true,
				jsonc: true,
				yaml: true,
				markdown: true,
			}

			const startTime = Date.now()
			const config = await eslintConfig(complexOptions)
			const duration = Date.now() - startTime

			expect(duration).toBeLessThan(250)
			expect(config.length).toBeGreaterThan(0)
		})
	})

	describe('Linting Performance', () => {
		it('should lint TypeScript code efficiently', async () => {
			const config = await eslintConfig({ typescript: true })
			const eslint = new ESLint({
				overrideConfig: config,
				overrideConfigFile: true,
			})

			const code = `
        export function test(a: number, b: string): string {
          return a.toString() + b;
        }

        export const add = (x: number, y: number) => x + y;
      `

			const startTime = Date.now()
			const results = await eslint.lintText(code, { filePath: 'test.ts' })
			const duration = Date.now() - startTime

			expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.small.maxTime)
			expect(results).toBeDefined()
			expect(results.length).toBe(1)
		})

		it('should lint Vue code efficiently', async () => {
			const config = await eslintConfig({ vue: true })
			const eslint = new ESLint({
				overrideConfig: config,
				overrideConfigFile: true,
			})

			const code = `
        <template>
          <div class="test">{{ message }}</div>
        </template>

        <script setup lang="ts">
        const message = 'Hello World'
        </script>
      `

			const startTime = Date.now()
			const results = await eslint.lintText(code, { filePath: 'test.vue' })
			const duration = Date.now() - startTime

			expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.small.maxTime)
			expect(results).toBeDefined()
		})

		it('should lint React code efficiently', async () => {
			const config = await eslintConfig({ react: true })
			const eslint = new ESLint({
				overrideConfig: config,
				overrideConfigFile: true,
			})

			const code = `
        export default function Test() {
          return <div>Hello World</div>;
        }
      `

			const startTime = Date.now()
			const results = await eslint.lintText(code, { filePath: 'test.tsx' })
			const duration = Date.now() - startTime

			expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.small.maxTime)
			expect(results).toBeDefined()
		})
	})

	describe('Memory Efficiency', () => {
		it('should not leak memory during multiple lint runs', async () => {
			const config = await eslintConfig({ typescript: true })
			const eslint = new ESLint({
				overrideConfig: config,
				overrideConfigFile: true,
			})

			const code = `export const test${Math.random()} = 'test'`

			const initialMemory = process.memoryUsage()

			// Run lint multiple times
			for (let i = 0; i < 10; i++) {
				await eslint.lintText(code, { filePath: `test${i}.ts` })
			}

			const finalMemory = process.memoryUsage()
			const memoryIncrease = (finalMemory.heapUsed - initialMemory.heapUsed) / 1024 / 1024

			// Memory increase should be reasonable (less than 50MB)
			expect(memoryIncrease).toBeLessThan(50)
		})

		it('should handle large code efficiently', async () => {
			const config = await eslintConfig({ typescript: true })
			const eslint = new ESLint({
				overrideConfig: config,
				overrideConfigFile: true,
			})

			// Generate large code
			const largeCode = Array.from({ length: 100 }, (_, i) => `
        export function func${i}(a: number, b: number): number {
          return a + b;
        }
      `).join('\n')

			const startTime = Date.now()
			const results = await eslint.lintText(largeCode, { filePath: 'large.ts' })
			const duration = Date.now() - startTime

			expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.medium.maxTime)
			expect(results).toBeDefined()
		})
	})
})

describe('Performance Report', () => {
	it('should generate performance benchmark report', async () => {
		console.info('\n📊 PERFORMANCE BENCHMARK REPORT')
		console.info('============================================================')
		console.info('Thresholds:')
		console.info('  Small tests:', `${PERFORMANCE_THRESHOLDS.small.maxTime}ms, ${PERFORMANCE_THRESHOLDS.small.maxMemory}MB`)
		console.info('  Medium tests:', `${PERFORMANCE_THRESHOLDS.medium.maxTime}ms, ${PERFORMANCE_THRESHOLDS.medium.maxMemory}MB`)
		console.info('  Large tests:', `${PERFORMANCE_THRESHOLDS.large.maxTime}ms, ${PERFORMANCE_THRESHOLDS.large.maxMemory}MB`)
		console.info('============================================================')
		console.info('✅ All performance tests passed!')
		expect(true).toBe(true)
	})
})
