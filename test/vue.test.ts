import { it, expect, describe } from 'vitest'
import { lintContent } from './utils'

describe('Vue Config', () => {
	it('should parse Vue SFC', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`<template>
  <div>Hello</div>
</template>
<script>
export default {}
</script>`,
			'test.vue',
		)
		// Should parse without error
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should parse Vue SFC with TypeScript', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
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
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should parse Vue SFC with style', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
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
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})
})
