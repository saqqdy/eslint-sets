import { describe, expect, it } from 'vitest'
import { command } from '../src/configs'
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

	it('should allow shebang in scripts', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, command: true }),
			`#!/usr/bin/env node
console.log('Hello')`,
			'scripts/cli.js',
		)

		// Should not have n/hashbang error
		const hashbangErrors = messages.filter((m) => m.ruleId === 'n/hashbang')

		expect(hashbangErrors).toHaveLength(0)
	})

	it('should disable n/hashbang for command files', () => {
		const configs = command()
		const mainConfig = configs.find((c) => c.name === 'eslint-sets/command')

		expect(mainConfig).toBeDefined()
		expect(mainConfig?.rules?.['n/hashbang']).toBe('off')
	})

	it('should disable unicorn/prefer-module for scripts', () => {
		const configs = command()
		const mainConfig = configs.find((c) => c.name === 'eslint-sets/command')

		expect(mainConfig).toBeDefined()
		expect(mainConfig?.rules?.['unicorn/prefer-module']).toBe('off')
	})

	it('should disable unicorn/prefer-top-level-await for scripts', () => {
		const configs = command()
		const mainConfig = configs.find((c) => c.name === 'eslint-sets/command')

		expect(mainConfig).toBeDefined()
		expect(mainConfig?.rules?.['unicorn/prefer-top-level-await']).toBe('off')
	})

	it('should apply to scripts directory', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, command: true }),
			`console.log('test')`,
			'scripts/test.js',
		)

		// Should not have no-console error
		const consoleErrors = messages.filter((m) => m.ruleId === 'no-console')

		expect(consoleErrors).toHaveLength(0)
	})

	it('should apply to bin directory', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, command: true }),
			`console.log('cli')`,
			'bin/cli.js',
		)

		// Should not have no-console error
		const consoleErrors = messages.filter((m) => m.ruleId === 'no-console')

		expect(consoleErrors).toHaveLength(0)
	})

	it('should apply to cli directory', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, command: true }),
			`console.log('cli tool')`,
			'cli/index.js',
		)

		// Should not have no-console error
		const consoleErrors = messages.filter((m) => m.ruleId === 'no-console')

		expect(consoleErrors).toHaveLength(0)
	})

	it('should apply to tasks directory', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, command: true }),
			`console.log('task')`,
			'tasks/build.js',
		)

		// Should not have no-console error
		const consoleErrors = messages.filter((m) => m.ruleId === 'no-console')

		expect(consoleErrors).toHaveLength(0)
	})

	it('should apply to tools directory', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, command: true }),
			`console.log('tool')`,
			'tools/generate.js',
		)

		// Should not have no-console error
		const consoleErrors = messages.filter((m) => m.ruleId === 'no-console')

		expect(consoleErrors).toHaveLength(0)
	})
})
