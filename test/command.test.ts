import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('Command Config', () => {
	it('should allow console in scripts', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, command: true }),
			`#!/usr/bin/env node
console.log('Running script')`,
			'scripts/build.js',
		)
		const consoleErrors = messages.filter((m) => m.ruleId === 'no-console')

		expect(consoleErrors).toHaveLength(0)
	})

	it('should allow process.exit in scripts', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, command: true }),
			`#!/usr/bin/env node
process.exit(0)`,
			'bin/cli.js',
		)

		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should allow process.env in scripts', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, command: true }),
			`const env = process.env.NODE_ENV`,
			'tasks/deploy.ts',
		)

		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should allow require in scripts', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, command: true }),
			`const fs = require('fs')`,
			'tools/generate.js',
		)

		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})
})
