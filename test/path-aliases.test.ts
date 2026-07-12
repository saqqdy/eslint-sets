import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('Path Aliases', () => {
	it('should resolve @company/ui-lib imports', async () => {
		const messages = await lintContent(
			async () => (await import('../src/index')).default({ react: true }),
			'import { Button } from \'@company/ui-lib\'\nexport const App = () => <Button />',
			'App.tsx',
		)
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should handle TypeScript path mappings', async () => {
		const messages = await lintContent(
			async () => (await import('../src/index')).default({ typescript: true }),
			'import type { User } from \'@/types\'\nexport const user: User = { name: \'test\' }',
			'test.ts',
		)
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})
})
