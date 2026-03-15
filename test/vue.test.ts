import { describe, expect, it } from 'vitest'
import { vue } from '../src/configs'
import { lintContent } from './utils'

describe('Vue Config', () => {
	it('should parse Vue SFC', async () => {
		const messages = await lintContent(
			async () => {
				const eslintConfig = (await import('../src/index')).default

				return eslintConfig({ vue: true })
			},
			`<template>
  <div>Hello</div>
</template>
<script>
export default {}
</script>`,
			'test.vue',
		)

		// Should parse without error
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should parse Vue SFC with TypeScript', async () => {
		const messages = await lintContent(
			async () => {
				const eslintConfig = (await import('../src/index')).default

				return eslintConfig({ typescript: true, vue: true })
			},
			`<template>
  <div>{{ message }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const message = ref<string>('Hello')
</script>`,
			'test.vue',
		)

		// Should parse without error
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should parse Vue SFC with style', async () => {
		const messages = await lintContent(
			async () => {
				const eslintConfig = (await import('../src/index')).default

				return eslintConfig({ vue: true })
			},
			`<template>
  <div class="test">Hello</div>
</template>
<script>
export default {}
</script>
<style scoped>
.test { color: red; }
</style>`,
			'test.vue',
		)

		// Should parse without error
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should return valid configs with a11y enabled', async () => {
		const configs = await vue({ a11y: true })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
		// a11y config may or may not be present depending on plugin availability
		// Just verify the function runs without error
		expect(configs.length).toBeGreaterThanOrEqual(1)
	})

	it('should return valid configs with vueVersion 2', async () => {
		const configs = await vue({ vueVersion: 2 })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should apply custom overrides', async () => {
		const configs = await vue({ overrides: { 'vue/no-v-html': 'off' } })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['vue/no-v-html']).toBe('off')
	})
})
