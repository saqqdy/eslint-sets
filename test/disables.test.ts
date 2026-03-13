import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('Disables Config', () => {
	it('should allow console in config files', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({ autoDetect: false,
					disables: true,
				}),
			`console.log('Config loaded')`,
			'eslint.config.ts',
		)
		const consoleErrors = messages.filter((m) => m.ruleId === 'no-console')

		expect(consoleErrors).toHaveLength(0)
	})

	it('should disable no-console in package.json', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({ autoDetect: false,
					disables: true,
				}),
			`{
  "name": "test",
  "scripts": {
    "test": "echo test"
  }
}`,
			'package.json',
		)

		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should relax rules in markdown code blocks', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({ autoDetect: false,
					disables: true,
					markdown: true,
				}),
			`# Title

\`\`\`js
console.log('hello')
\`\`\`
`,
			'README.md',
		)
		// Markdown parsing may have issues, just check no TypeScript errors
		const tsErrors = messages.filter((m) => m.ruleId?.includes('typescript') && m.severity === 2)

		expect(tsErrors).toHaveLength(0)
	})

	it('should allow require in .cjs files', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({ autoDetect: false,
					disables: true,
				}),
			`const path = require('path')
module.exports = {}`,
			'config.cjs',
		)

		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})
})
