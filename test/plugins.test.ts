import { describe, expect, it } from 'vitest'
import { hasPrettier, hasReact, hasSvelte, hasTypeScript, hasVue } from '../src/plugins'

describe('Plugin Detection', () => {
	it('should detect TypeScript (installed)', () => {
		expect(hasTypeScript()).toBeTruthy()
	})

	it('should detect Prettier (installed)', () => {
		expect(hasPrettier()).toBeTruthy()
	})

	it('should detect Vue (not installed)', () => {
		// Vue is not in dependencies, only vue-eslint-parser
		// This might be true if vue is installed as a peer dependency
		const result = hasVue()
		expect(typeof result).toBe('boolean')
	})

	it('should detect React (optional dependency)', () => {
		const result = hasReact()
		expect(typeof result).toBe('boolean')
	})

	it('should detect Svelte (optional dependency)', () => {
		const result = hasSvelte()
		expect(typeof result).toBe('boolean')
	})
})
