import { isPackageExists } from 'local-pkg'
import { globSync } from 'tinyglobby'
import {
	ANGULAR_PACKAGES,
	ASTRO_PACKAGES,
	NEXTJS_PACKAGES,
	NUXT_PACKAGES,
	REACT_COMPILER_PACKAGES,
	REACT_REFRESH_ALLOW_CONSTANT_EXPORT_PACKAGES,
	REACT_ROUTER_PACKAGES,
	REMIX_PACKAGES,
	UNOCSS_PACKAGES,
	VUE_PACKAGES,
} from './constants'

/**
 * Check if Vue is installed
 */
export function hasVue(): boolean {
	return VUE_PACKAGES.some(pkg => isPackageExists(pkg))
}

/**
 * Check if React is installed
 */
export function hasReact(): boolean {
	return isPackageExists('react')
}

/**
 * Check if React Compiler is installed
 */
export function hasReactCompiler(): boolean {
	return REACT_COMPILER_PACKAGES.some(pkg => isPackageExists(pkg))
}

/**
 * Check if Svelte is installed
 */
export function hasSvelte(): boolean {
	return isPackageExists('svelte')
}

/**
 * Check if TypeScript is installed
 */
export function hasTypeScript(): boolean {
	return isPackageExists('typescript') || isPackageExists('@typescript/native-preview')
}

/**
 * Check if Prettier is installed
 */
export function hasPrettier(): boolean {
	return isPackageExists('prettier')
}

/**
 * Check if Vitest is installed
 */
export function hasVitest(): boolean {
	return isPackageExists('vitest')
}

/**
 * Check if Solid.js is installed
 */
export function hasSolid(): boolean {
	return isPackageExists('solid-js')
}

/**
 * Check if Next.js is installed
 */
export function hasNextjs(): boolean {
	return NEXTJS_PACKAGES.some(pkg => isPackageExists(pkg))
}

/**
 * Check if Nuxt is installed
 */
export function hasNuxt(): boolean {
	return NUXT_PACKAGES.some(pkg => isPackageExists(pkg))
}

/**
 * Check if Astro is installed
 */
export function hasAstro(): boolean {
	return ASTRO_PACKAGES.some(pkg => isPackageExists(pkg))
}

/**
 * Check if Angular is installed
 */
export function hasAngular(): boolean {
	return ANGULAR_PACKAGES.some(pkg => isPackageExists(pkg))
}

/**
 * Check if UnoCSS is installed
 */
export function hasUnoCSS(): boolean {
	return UNOCSS_PACKAGES.some(pkg => isPackageExists(pkg))
}

/**
 * Check if Remix is installed
 */
export function hasRemix(): boolean {
	return REMIX_PACKAGES.some(pkg => isPackageExists(pkg))
}

/**
 * Check if React Router is installed
 */
export function hasReactRouter(): boolean {
	return REACT_ROUTER_PACKAGES.some(pkg => isPackageExists(pkg))
}

/**
 * Check if Vite is installed (for React Refresh allowConstantExport)
 */
export function hasVite(): boolean {
	return REACT_REFRESH_ALLOW_CONSTANT_EXPORT_PACKAGES.some(pkg => isPackageExists(pkg))
}

/**
 * Check if a package is installed
 */
export function hasPackage(name: string): boolean {
	return isPackageExists(name)
}

/**
 * Dynamically load a plugin.
 *
 * By default failures are silent (the plugin is treated as optional). Pass
 * `{ required: true }` for core dependencies whose failure should be surfaced
 * — otherwise a broken/incompatible install silently reduces the config to a
 * ruleset with no rules (e.g. a TypeScript config with no `ts/*` rules).
 *
 * @param options.required when true, warn with the plugin name and error on failure
 */
export async function loadPlugin<T>(
	name: string,
	options: { required?: boolean } = {},
): Promise<T | null> {
	try {
		const mod = await import(name)

		// Handle ESM default export
		return (mod?.default ?? mod) as T
	} catch (error) {
		if (options.required) {
			console.warn(
				`[eslint-sets] Failed to load plugin "${name}": `
				+ `${error instanceof Error ? error.message : error}`,
			)
		}
		return null
	}
}

/**
 * Check if JSX/TSX files exist in the project.
 *
 * The result is cached per-process so repeated `config()` calls (e.g. editor
 * reloads) don't re-scan the whole tree.
 */
let cachedHasJsxFiles: boolean | null = null

export function hasJsxFiles(): boolean {
	if (cachedHasJsxFiles !== null)
		return cachedHasJsxFiles
	try {
		const files = globSync('**/*.{jsx,tsx}', {
			ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
			cwd: process.cwd(),
		})
		cachedHasJsxFiles = files.length > 0
		return cachedHasJsxFiles
	} catch {
		cachedHasJsxFiles = false
		return cachedHasJsxFiles
	}
}
