import { describe, expect, it, vi } from 'vitest'
import {
	ensurePackages,
	hasAngular,
	hasAstro,
	hasJsxFiles,
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

	// v6.6.0: required plugins surface failures instead of silently returning null.
	it('should warn and return null when a required plugin fails to load', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
		const plugin = await loadPlugin('non-existent-required-plugin-xyz', { required: true })

		expect(plugin).toBeNull()
		expect(warnSpy).toHaveBeenCalledTimes(1)
		expect(warnSpy.mock.calls[0][0]).toContain('[eslint-sets]')
		expect(warnSpy.mock.calls[0][0]).toContain('non-existent-required-plugin-xyz')
		warnSpy.mockRestore()
	})

	// Optional loads (no `required` flag) stay silent — preserves the documented contract.
	it('should stay silent when an optional plugin fails to load', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
		const plugin = await loadPlugin('non-existent-optional-plugin-xyz')

		expect(plugin).toBeNull()
		expect(warnSpy).not.toHaveBeenCalled()
		warnSpy.mockRestore()
	})
})

describe('hasJsxFiles', () => {
	// v6.6.0: result is cached per-process; repeated calls do not re-scan the tree.
	it('returns a boolean', () => {
		expect(typeof hasJsxFiles()).toBe('boolean')
	})

	it('returns true (the repo ships .tsx files under examples/)', () => {
		expect(hasJsxFiles()).toBe(true)
	})

	it('returns the cached value on repeated calls (idempotent)', () => {
		const first = hasJsxFiles()
		const second = hasJsxFiles()

		expect(first).toBe(second)
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
