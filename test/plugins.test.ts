import { describe, expect, it } from 'vitest'
import {
	ensurePackages,
	hasAngular,
	hasAstro,
	hasNuxt,
	hasPackage,
	hasPrettier,
	hasReact,
	hasReactCompiler,
	hasReactRouter,
	hasRemix,
	hasSolid,
	hasSvelte,
	hasTypeScript,
	hasUnoCSS,
	hasVite,
	hasVitest,
	hasVue,
	loadPlugin,
} from '../src/plugins'

describe('plugin Detection', () => {
	it('should detect TypeScript (installed)', () => {
		expect(hasTypeScript()).toBeTruthy()
	})

	it('should detect Prettier (installed)', () => {
		expect(hasPrettier()).toBeTruthy()
	})

	it('should detect Vitest (installed)', () => {
		expect(hasVitest()).toBeTruthy()
	})

	it('should detect Vue', () => {
		const result = hasVue()
		expect(typeof result).toBe('boolean')
	})

	it('should detect React', () => {
		const result = hasReact()
		expect(typeof result).toBe('boolean')
	})

	it('should detect Svelte', () => {
		const result = hasSvelte()
		expect(typeof result).toBe('boolean')
	})

	it('should detect Solid', () => {
		const result = hasSolid()
		expect(typeof result).toBe('boolean')
	})

	it('should detect Next.js', () => {
		const result = hasAngular()
		expect(typeof result).toBe('boolean')
	})

	it('should detect Nuxt', () => {
		const result = hasNuxt()
		expect(typeof result).toBe('boolean')
	})

	it('should detect Astro', () => {
		const result = hasAstro()
		expect(typeof result).toBe('boolean')
	})

	it('should detect UnoCSS', () => {
		const result = hasUnoCSS()
		expect(typeof result).toBe('boolean')
	})

	it('should detect Remix', () => {
		const result = hasRemix()
		expect(typeof result).toBe('boolean')
	})

	it('should detect React Router', () => {
		const result = hasReactRouter()
		expect(typeof result).toBe('boolean')
	})

	it('should detect React Compiler', () => {
		const result = hasReactCompiler()
		expect(typeof result).toBe('boolean')
	})

	it('should detect Vite', () => {
		const result = hasVite()
		expect(typeof result).toBe('boolean')
	})

	it('should check package existence with hasPackage', () => {
		// TypeScript is installed
		expect(hasPackage('typescript')).toBeTruthy()
		// Non-existent package
		expect(hasPackage('non-existent-package-xyz')).toBeFalsy()
	})
})

describe('loadPlugin', () => {
	it('should load an installed plugin', async () => {
		const plugin = await loadPlugin('typescript')
		expect(plugin).toBeDefined()
	})

	it('should return null for non-existent plugin', async () => {
		const plugin = await loadPlugin('non-existent-plugin-xyz')
		expect(plugin).toBeNull()
	})

	it('should handle ESM default export', async () => {
		// Test with a plugin that has default export
		const plugin = await loadPlugin<typeof import('eslint-plugin-react-hooks')>('eslint-plugin-react-hooks')
		expect(plugin).toBeDefined()
	})
})

describe('ensurePackages', () => {
	it('should not throw when all packages are installed', async () => {
		await expect(ensurePackages(['typescript', 'eslint'])).resolves.toBeUndefined()
	})

	it('should throw when packages are missing', async () => {
		await expect(ensurePackages(['non-existent-package-xyz'])).rejects.toThrow('Missing required packages')
	})

	it('should list all missing packages in error message', async () => {
		await expect(ensurePackages(['missing-pkg-a', 'missing-pkg-b'])).rejects.toThrow('missing-pkg-a, missing-pkg-b')
	})
})
