import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('File Type Overrides', () => {
	it('should apply Vue rules to .vue files only', async () => {
		const vueMessages = await lintContent(
			async () => (await import('../src/index')).default({ vue: true }),
			'<template><div>Test</div></template>',
			'Test.vue',
		)
		expect(vueMessages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should handle mixed file types', async () => {
		const messages = await lintContent(
			async () => (await import('../src/index')).default({ vue: true, react: true, typescript: true }),
			'export const test = "hello"',
			'test.ts',
		)
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})
})
