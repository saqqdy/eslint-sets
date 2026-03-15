import { beforeAll, describe, expect, it } from 'vitest'
import { hasRule, lintContent } from './utils'

describe('React Config', () => {
	beforeAll(async () => {
		// Ensure react plugin is loaded
		try {
			await import('@eslint-react/eslint-plugin')
		} catch {
			console.warn('@eslint-react/eslint-plugin not installed, skipping React tests')
		}
	})

	it('should parse JSX', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, react: true }),
			`function App() {
  return <div>Hello</div>
}`,
			'test.jsx',
		)

		// Should parse without fatal errors
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should detect @eslint-react/no-missing-key', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, react: true }),
			`function App() {
  return items.map((item) => <div>{item}</div>)
}`,
			'test.jsx',
		)

		expect(hasRule(messages, '@eslint-react/no-missing-key')).toBeTruthy()
	})

	it('should detect @eslint-react/no-comment-textnodes', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, react: true }),
			`function App() {
  return <div>// this is a comment</div>
}`,
			'test.jsx',
		)

		expect(hasRule(messages, '@eslint-react/no-comment-textnodes')).toBeTruthy()
	})

	it('should detect @eslint-react/hooks-extra/rules-of-hooks', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, react: true }),
			`function App() {
  if (condition) {
    useEffect(() => {}, [])
  }
  return <div>Test</div>
}`,
			'test.jsx',
		)

		// Should detect hooks rules violation
		expect(messages.length).toBeGreaterThan(0)
	})

	it('should parse TSX', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({ autoDetect: false, react: true, typescript: true }),
			`interface Props {
  name: string
}

function App({ name }: Props) {
  return <div>Hello {name}</div>
}`,
			'test.tsx',
		)

		// Should parse without fatal errors
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should support react-refresh plugin', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		// Check that react-refresh plugin is loaded
		const reactConfig = config.find(c => c.name === 'eslint-sets/react')

		expect(reactConfig).toBeDefined()
		expect(reactConfig?.plugins?.['react-refresh']).toBeDefined()
	})

	it('should support react compiler option', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: { reactCompiler: true } })

		// Config should be valid
		expect(config).toBeDefined()
		expect(Array.isArray(config)).toBeTruthy()
	})

	it('should have @eslint-react plugin loaded', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactConfig = config.find(c => c.name === 'eslint-sets/react')

		expect(reactConfig).toBeDefined()
		// Check that @eslint-react plugin is loaded
		const plugins = reactConfig?.plugins || {}
		const hasEslintReact = Object.keys(plugins).some(key => key.startsWith('@eslint-react'))

		expect(hasEslintReact).toBeTruthy()
	})

	it('should disable @eslint-react/no-nested-component-definitions by default', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactConfig = config.find(c => c.name === 'eslint-sets/react')

		expect(reactConfig?.rules?.['@eslint-react/no-nested-component-definitions']).toBe('off')
	})

	it('should configure react-refresh/only-export-components', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactConfig = config.find(c => c.name === 'eslint-sets/react')

		expect(reactConfig?.rules?.['react-refresh/only-export-components']).toBeDefined()
		expect(reactConfig?.rules?.['react-refresh/only-export-components']?.[0]).toBe('warn')
	})
})
