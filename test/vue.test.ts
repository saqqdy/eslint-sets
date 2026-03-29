import { describe, expect, it } from 'vitest'
import { vue } from '../src/configs'
import { lintContent } from './utils'

describe('vue Config', () => {
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

	it('should support stylistic option with indent', async () => {
		const configs = await vue({ stylistic: { indent: 4 } })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['vue/html-indent']).toEqual(['error', 4])
	})

	it('should support tab indent', async () => {
		const configs = await vue({ stylistic: { indent: 'tab' } })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['vue/html-indent']).toEqual(['error', 'tab'])
	})

	it('should disable stylistic rules when stylistic is false', async () => {
		const configs = await vue({ stylistic: false })

		expect(configs).toBeDefined()
		expect(configs[0]?.rules?.['vue/html-indent']).toBeUndefined()
	})

	it('should have vue plugin loaded', async () => {
		const configs = await vue()

		expect(configs[0]?.plugins?.vue).toBeDefined()
	})

	it('should have vue-a11y plugin when a11y is enabled', async () => {
		const configs = await vue({ a11y: true })

		// If the plugin is installed, it should be present
		const mainConfig = configs.find(c => c.plugins?.['vue-a11y'])
		expect(mainConfig?.plugins?.['vue-a11y'] ?? undefined).toBeDefined()
	})

	it('should support sfcBlocks option with boolean true', async () => {
		const configs = await vue({ sfcBlocks: true })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
		// Should have sfc-blocks processor config when sfcBlocks is enabled
		// (requires eslint-processor-vue-blocks to be installed)
		const sfcBlocksConfig = configs.find(c => c.name === 'eslint-sets/vue/sfc-blocks')
		expect(sfcBlocksConfig?.processor).toBeDefined()
	})

	it('should support sfcBlocks option with custom config', async () => {
		const configs = await vue({ sfcBlocks: { styles: true, customBlocks: ['i18n'] } })

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
		// Should have sfc-blocks processor config
		// (requires eslint-processor-vue-blocks to be installed)
		const sfcBlocksConfig = configs.find(c => c.name === 'eslint-sets/vue/sfc-blocks')
		expect(sfcBlocksConfig?.processor).toBeDefined()
	})

	it('should support sfcBlocks with styles false', async () => {
		const configs = await vue({ sfcBlocks: { styles: false, customBlocks: false } })

		expect(configs).toBeDefined()
		const sfcBlocksConfig = configs.find(c => c.name === 'eslint-sets/vue/sfc-blocks')
		expect(sfcBlocksConfig?.processor).toBeDefined()
	})

	it('should not have sfc-blocks config when sfcBlocks is false', async () => {
		const configs = await vue({ sfcBlocks: false })

		const sfcBlocksConfig = configs.find(c => c.name === 'eslint-sets/vue/sfc-blocks')
		expect(sfcBlocksConfig).toBeUndefined()
	})

	it('should have correct vue3 globals', async () => {
		const configs = await vue({ vueVersion: 3 })

		const mainConfig = configs.find(c => c.name === 'eslint-sets/vue')
		expect(mainConfig?.languageOptions?.globals?.ref).toBe('readonly')
		expect(mainConfig?.languageOptions?.globals?.reactive).toBe('readonly')
		expect(mainConfig?.languageOptions?.globals?.computed).toBe('readonly')
	})

	it('should have correct block-order rule', async () => {
		const configs = await vue()

		expect(configs[0]?.rules?.['vue/block-order']).toEqual(['error', { order: ['script', 'template', 'style'] }])
	})

	it('should have component-name-in-template-casing rule', async () => {
		const configs = await vue()

		expect(configs[0]?.rules?.['vue/component-name-in-template-casing']).toEqual(['error', 'PascalCase'])
	})

	it('should have define-macros-order rule', async () => {
		const configs = await vue()

		expect(configs[0]?.rules?.['vue/define-macros-order']).toEqual(['error', { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] }])
	})

	it('should have disabled multi-word-component-names rule', async () => {
		const configs = await vue()

		expect(configs[0]?.rules?.['vue/multi-word-component-names']).toBe('off')
	})

	it('should have disabled no-v-html rule', async () => {
		const configs = await vue()

		expect(configs[0]?.rules?.['vue/no-v-html']).toBe('off')
	})
})
