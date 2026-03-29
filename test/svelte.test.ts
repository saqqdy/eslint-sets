import { beforeAll, describe, expect, it } from 'vitest'
import { svelte } from '../src/configs'
import { hasRule, lintContent } from './utils'

describe('svelte Config', () => {
	beforeAll(async () => {
		try {
			await import('eslint-plugin-svelte')
		} catch {
			console.warn('eslint-plugin-svelte not installed, skipping Svelte tests')
		}
	})

	it('should parse Svelte SFC', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, svelte: true }),
			`<script>
  let name = 'world'
</script>

<h1>Hello {name}!</h1>`,
			'test.svelte',
		)

		// Should parse without fatal errors
		expect(messages.filter(m => m.fatal)).toHaveLength(0)
	})

	it('should detect svelte/button-has-type', async () => {
		const messages = await lintContent(
			async () => await (await import('../src/index')).default({ autoDetect: false, svelte: true }),
			`<script>
  let name = 'world'
</script>

<button>Click me</button>`,
			'test.svelte',
		)

		expect(hasRule(messages, 'svelte/button-has-type')).toBeTruthy()
	})

	it('should return valid configs', async () => {
		const configs = await svelte()

		expect(configs).toBeDefined()
		expect(Array.isArray(configs)).toBeTruthy()
	})

	it('should support typescript option', async () => {
		const configs = await svelte({ typescript: true })

		expect(configs).toBeDefined()
		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.languageOptions?.parserOptions?.parser).toBe('@typescript-eslint/parser')
	})

	it('should support non-typescript option', async () => {
		const configs = await svelte({ typescript: false })

		expect(configs).toBeDefined()
		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.languageOptions?.parserOptions?.parser).toBeUndefined()
	})

	it('should support custom overrides', async () => {
		const configs = await svelte({ overrides: { 'svelte/no-at-html-tags': 'warn' } })

		expect(configs).toBeDefined()
		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.rules?.['svelte/no-at-html-tags']).toBe('warn')
	})

	it('should have svelte plugin loaded', async () => {
		const configs = await svelte()

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.plugins?.svelte).toBeDefined()
	})

	it('should have processor configured', async () => {
		const configs = await svelte()

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.processor).toBeDefined()
	})

	it('should have core svelte rules enabled', async () => {
		const configs = await svelte()

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.rules?.['svelte/button-has-type']).toBe('error')
		expect(svelteConfig?.rules?.['svelte/html-quotes']).toBe('error')
		expect(svelteConfig?.rules?.['svelte/no-at-html-tags']).toBe('error')
	})

	it('should have svelte/no-reactive-literals as warn', async () => {
		const configs = await svelte()

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.rules?.['svelte/no-reactive-literals']).toBe('warn')
	})

	it('should have block-lang rule with typescript', async () => {
		const configs = await svelte({ typescript: true })

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.rules?.['svelte/block-lang']).toEqual(['error', { script: ['ts'] }])
	})

	it('should have block-lang rule without typescript', async () => {
		const configs = await svelte({ typescript: false })

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.rules?.['svelte/block-lang']).toEqual(['error', { script: ['js'] }])
	})

	it('should have correct files pattern', async () => {
		const configs = await svelte()

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.files).toBeDefined()
		expect(svelteConfig?.files?.length).toBeGreaterThan(0)
	})

	it('should have extraFileExtensions for .svelte', async () => {
		const configs = await svelte()

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.languageOptions?.parserOptions?.extraFileExtensions).toContain('.svelte')
	})

	it('should have correct language options', async () => {
		const configs = await svelte()

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.languageOptions?.parserOptions?.ecmaVersion).toBe('latest')
		expect(svelteConfig?.languageOptions?.parserOptions?.sourceType).toBe('module')
	})

	it('should have all essential rules', async () => {
		const configs = await svelte()

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.rules?.['svelte/html-self-closing']).toBe('error')
		expect(svelteConfig?.rules?.['svelte/prefer-class-directive']).toBe('error')
		expect(svelteConfig?.rules?.['svelte/prefer-style-directive']).toBe('error')
		expect(svelteConfig?.rules?.['svelte/require-each-key']).toBe('error')
		expect(svelteConfig?.rules?.['svelte/shorthand-attribute']).toBe('error')
		expect(svelteConfig?.rules?.['svelte/shorthand-directive']).toBe('error')
		expect(svelteConfig?.rules?.['svelte/valid-compile']).toBe('error')
	})

	it('should have svelte/no-inner-declarations enabled', async () => {
		const configs = await svelte()

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.rules?.['svelte/no-inner-declarations']).toBe('error')
	})

	it('should have Svelte 5 runes globals in svelte files', async () => {
		const configs = await svelte()

		const svelteConfig = configs.find(c => c.name === 'eslint-sets/svelte')
		expect(svelteConfig?.languageOptions?.globals?.$state).toBe('readonly')
		expect(svelteConfig?.languageOptions?.globals?.$derived).toBe('readonly')
		expect(svelteConfig?.languageOptions?.globals?.$effect).toBe('readonly')
		expect(svelteConfig?.languageOptions?.globals?.$props).toBe('readonly')
		expect(svelteConfig?.languageOptions?.globals?.$bindable).toBe('readonly')
		expect(svelteConfig?.languageOptions?.globals?.$inspect).toBe('readonly')
		expect(svelteConfig?.languageOptions?.globals?.$host).toBe('readonly')
	})

	it('should have runes-in-ts config for composables', async () => {
		const configs = await svelte()

		const runesConfig = configs.find(c => c.name === 'eslint-sets/svelte/runes-in-ts')
		expect(runesConfig).toBeDefined()
		expect(runesConfig?.files).toContain('**/composables/**/*.?([cm])[jt]s?(x)')
		expect(runesConfig?.files).toContain('**/stores/**/*.?([cm])[jt]s?(x)')
	})

	it('should have runes globals in runes-in-ts config', async () => {
		const configs = await svelte()

		const runesConfig = configs.find(c => c.name === 'eslint-sets/svelte/runes-in-ts')
		expect(runesConfig?.languageOptions?.globals?.$state).toBe('readonly')
		expect(runesConfig?.languageOptions?.globals?.$effect).toBe('readonly')
	})
})
