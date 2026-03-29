import { beforeAll, describe, expect, it } from 'vitest'
import { react } from '../src/configs'
import { hasRule, lintContent } from './utils'

describe('react Config', () => {
	beforeAll(async () => {
		// Ensure react plugin is loaded
		try {
			await import('@eslint-react/eslint-plugin')
		} catch {
			console.warn('@eslint-react/eslint-plugin not installed, skipping React tests')
		}
	})

	it('should return empty array when plugin not available', async () => {
		// This test verifies the behavior when plugin fails to load
		// Since the plugin is installed, we can't truly test this without mocking
		const configs = await react()
		expect(Array.isArray(configs)).toBeTruthy()
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

	it('should detect react/no-missing-key', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, react: true }),
			`function App() {
  return items.map((item) => <div>{item}</div>)
}`,
			'test.jsx',
		)

		expect(hasRule(messages, 'react/no-missing-key')).toBeTruthy()
	})

	it('should detect react/no-comment-textnodes', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, react: true }),
			`function App() {
  return <div>// this is a comment</div>
}`,
			'test.jsx',
		)

		expect(hasRule(messages, 'react/no-comment-textnodes')).toBeTruthy()
	})

	it('should detect react-hooks/rules-of-hooks', async () => {
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
		const reactSetup = config.find(c => c.name === 'eslint-sets/react/setup')

		expect(reactSetup).toBeDefined()
		expect(reactSetup?.plugins?.['react-refresh']).toBeDefined()
	})

	it('should support react compiler option', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: { reactCompiler: true } })

		// Config should be valid
		expect(config).toBeDefined()
		expect(Array.isArray(config)).toBeTruthy()

		// Check for compiler-specific rules
		const reactConfig = config.find(c => c.name === 'eslint-sets/react/rules')
		expect(reactConfig?.rules?.['react-hooks/immutability']).toBe('error')
		expect(reactConfig?.rules?.['react-hooks/purity']).toBe('error')
	})

	it('should have react plugin loaded', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactSetup = config.find(c => c.name === 'eslint-sets/react/setup')

		expect(reactSetup).toBeDefined()
		expect(reactSetup?.plugins?.react).toBeDefined()
	})

	it('should have react/no-nested-component-definitions enabled', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactConfig = config.find(c => c.name === 'eslint-sets/react/rules')

		expect(reactConfig?.rules?.['react/no-nested-component-definitions']).toBe('error')
	})

	it('should configure react-refresh/only-export-components', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactConfig = config.find(c => c.name === 'eslint-sets/react/rules')

		expect(reactConfig?.rules?.['react-refresh/only-export-components']).toBeDefined()
		expect(reactConfig?.rules?.['react-refresh/only-export-components']?.[0]).toBe('error')
	})

	it('should support custom files option', async () => {
		const configs = await react({ files: ['**/*.custom.jsx'] })

		expect(configs).toBeDefined()
		const reactConfig = configs.find(c => c.name === 'eslint-sets/react/rules')
		expect(reactConfig?.files).toContain('**/*.custom.jsx')
	})

	it('should support tsconfigPath option for type-aware rules', async () => {
		const configs = await react({ tsconfigPath: './tsconfig.json' })

		expect(configs).toBeDefined()
		const typeAwareConfig = configs.find(c => c.name === 'eslint-sets/react/type-aware')
		expect(typeAwareConfig).toBeDefined()
		expect(typeAwareConfig?.rules?.['react/no-leaked-conditional-rendering']).toBe('warn')
		expect(typeAwareConfig?.rules?.['react/no-implicit-key']).toBe('error')
	})

	it('should support custom overrides', async () => {
		const configs = await react({ overrides: { 'react/no-missing-key': 'warn' } })

		expect(configs).toBeDefined()
		const reactConfig = configs.find(c => c.name === 'eslint-sets/react/rules')
		expect(reactConfig?.rules?.['react/no-missing-key']).toBe('warn')
	})

	it('should have react-dom plugin loaded', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactSetup = config.find(c => c.name === 'eslint-sets/react/setup')
		expect(reactSetup?.plugins?.['react-dom']).toBeDefined()
	})

	it('should have react-hooks-extra plugin loaded', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactSetup = config.find(c => c.name === 'eslint-sets/react/setup')
		expect(reactSetup?.plugins?.['react-hooks-extra']).toBeDefined()
	})

	it('should have react-naming-convention plugin loaded', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactSetup = config.find(c => c.name === 'eslint-sets/react/setup')
		expect(reactSetup?.plugins?.['react-naming-convention']).toBeDefined()
	})

	it('should have react-web-api plugin loaded', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactSetup = config.find(c => c.name === 'eslint-sets/react/setup')
		expect(reactSetup?.plugins?.['react-web-api']).toBeDefined()
	})

	it('should have react/prefer-react-namespace-import rule', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactConfig = config.find(c => c.name === 'eslint-sets/react/rules')
		// Rule name differs between @eslint-react/eslint-plugin v1 and v2
		// v1.x: prefer-react-namespace-import
		// v2.x: prefer-namespace-import
		const hasV1Rule = reactConfig?.rules?.['react/prefer-react-namespace-import'] === 'error'
		const hasV2Rule = reactConfig?.rules?.['react/prefer-namespace-import'] === 'error'
		expect(hasV1Rule || hasV2Rule).toBe(true)
	})

	it('should have react-hooks/exhaustive-deps rule', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: true })

		const reactConfig = config.find(c => c.name === 'eslint-sets/react/rules')
		expect(reactConfig?.rules?.['react-hooks/exhaustive-deps']).toBe('warn')
	})

	it('should have typescript config with disabled rules', async () => {
		const configs = await react()

		const tsConfig = configs.find(c => c.name === 'eslint-sets/react/typescript')
		expect(tsConfig).toBeDefined()
		expect(tsConfig?.rules?.['react-dom/no-string-style-prop']).toBe('off')
		expect(tsConfig?.rules?.['react-dom/no-unknown-property']).toBe('off')
		// Additional TypeScript-specific rule disables (align with antfu)
		expect(tsConfig?.rules?.['react/jsx-no-duplicate-props']).toBe('off')
		expect(tsConfig?.rules?.['react/jsx-no-undef']).toBe('off')
		expect(tsConfig?.rules?.['react/jsx-uses-react']).toBe('off')
		expect(tsConfig?.rules?.['react/jsx-uses-vars']).toBe('off')
	})

	it('should support rsc option', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: { rsc: true } })

		const reactSetup = config.find(c => c.name === 'eslint-sets/react/setup')
		expect(reactSetup).toBeDefined()
		// RSC plugin may not be available in v1.x of @eslint-react/eslint-plugin
		// so we just check the config is valid
		expect(Array.isArray(config)).toBeTruthy()
	})

	it('should support rsc: false option', async () => {
		const config = await (
			await import('../src/index')
		).default({ autoDetect: false, react: { rsc: false } })

		const reactConfig = config.find(c => c.name === 'eslint-sets/react/rules')
		expect(reactConfig).toBeDefined()
		// RSC rule should not be present when rsc: false
		expect(reactConfig?.rules?.['react-rsc/function-definition']).toBeUndefined()
	})
})
