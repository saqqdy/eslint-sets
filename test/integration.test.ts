import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('Integration Tests', () => {
	it('should lint a complete JavaScript file', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`// A sample JavaScript file
import { helper } from './utils'

export function main() {
  const used = 'this will not trigger no-unused-vars because it is used'
  console.warn(used)
  return helper()
}`,
			'main.js',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should lint a complete TypeScript file', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`// A sample TypeScript file
interface User {
  name: string
  age: number
}

export function greet(user: User): string {
  return \`Hello, \${user.name}\`
}`,
			'main.ts',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should lint a Vue component', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({ autoDetect: false,
					typescript: true,
					vue: true,
				}),
			`<template>
  <div class="app">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref<string>('Hello Vue')
</script>

<style scoped>
.app {
  padding: 20px;
}
</style>`,
			'App.vue',
		)

		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should lint a package.json file', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`{
  "name": "my-package",
  "version": "1.0.0",
  "main": "index.js"
}`,
			'package.json',
		)

		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should lint a YAML config file', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`name: CI
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3`,
			'.github/workflows/ci.yml',
		)

		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should lint multiple file types', async () => {
		// JavaScript
		const jsMessages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`export const x = 1`,
			'test.js',
		)

		expect(jsMessages.filter((m) => m.fatal)).toHaveLength(0)

		// TypeScript
		const tsMessages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`export const x: number = 1`,
			'test.ts',
		)

		expect(tsMessages.filter((m) => m.fatal)).toHaveLength(0)

		// JSON
		const jsonMessages = await lintContent(
			async () => await (await import('../src/index')).default(),
			`{"name": "test"}`,
			'test.json',
		)

		expect(jsonMessages.filter((m) => m.fatal)).toHaveLength(0)
	})
})
