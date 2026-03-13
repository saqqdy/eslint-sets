import { describe, expect, it } from 'vitest'
import { lintContent } from './utils'

describe('Solid Config', () => {
	it('should parse Solid.js components', async () => {
		const messages = await lintContent(
			async () =>
				await (
					await import('../src/index')
				).default({
					solid: true,
				}),
			`import { createSignal } from 'solid-js'

function Counter() {
  const [count, setCount] = createSignal(0)
  return (
    <div>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}

export default Counter`,
			'Counter.tsx',
		)
		expect(messages.filter((m) => m.fatal)).toHaveLength(0)
	})
})
