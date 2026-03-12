import { it, expect, describe, beforeAll } from 'vitest'
import { hasRule, lintContent } from './utils'

describe('React Config', () => {
	beforeAll(async () => {
		// Ensure react plugin is loaded
		try {
			await import('eslint-plugin-react')
		} catch {
			console.warn('eslint-plugin-react not installed, skipping React tests')
		}
	})

	it('should parse JSX', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ react: true }),
			`function App() {
  return <div>Hello</div>
}`,
			'test.jsx',
		)
		// Should parse without fatal errors
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})

	it('should detect react-hooks/rules-of-hooks', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ react: true }),
			`function App() {
  if (condition) {
    useEffect(() => {}, [])
  }
}`,
			'test.jsx',
		)
		expect(hasRule(messages, 'react-hooks/rules-of-hooks')).toBeTruthy()
	})

	it('should detect react/button-has-type', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ react: true }),
			`function App() {
  return <button>Click me</button>
}`,
			'test.jsx',
		)
		expect(hasRule(messages, 'react/button-has-type')).toBeTruthy()
	})

	it('should detect react/jsx-key', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ react: true }),
			`function App() {
  return items.map((item) => <div>{item}</div>)
}`,
			'test.jsx',
		)
		expect(hasRule(messages, 'react/jsx-key')).toBeTruthy()
	})
})
