import { isPackageExists } from 'local-pkg'
import {
	ANGULAR_PACKAGES,
	ASTRO_PACKAGES,
	NEXTJS_PACKAGES,
	NUXT_PACKAGES,
	REACT_COMPILER_PACKAGES,
	UNOCSS_PACKAGES,
	VUE_PACKAGES,
} from './constants'

/**
 * Check if Vue is installed
 */
export function hasVue(): boolean {
	return VUE_PACKAGES.some((pkg) => isPackageExists(pkg))
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
	return REACT_COMPILER_PACKAGES.some((pkg) => isPackageExists(pkg))
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
	return NEXTJS_PACKAGES.some((pkg) => isPackageExists(pkg))
}

/**
 * Check if Nuxt is installed
 */
export function hasNuxt(): boolean {
	return NUXT_PACKAGES.some((pkg) => isPackageExists(pkg))
}

/**
 * Check if Astro is installed
 */
export function hasAstro(): boolean {
	return ASTRO_PACKAGES.some((pkg) => isPackageExists(pkg))
}

/**
 * Check if Angular is installed
 */
export function hasAngular(): boolean {
	return ANGULAR_PACKAGES.some((pkg) => isPackageExists(pkg))
}

/**
 * Check if UnoCSS is installed
 */
export function hasUnoCSS(): boolean {
	return UNOCSS_PACKAGES.some((pkg) => isPackageExists(pkg))
}

/**
 * Check if a package is installed
 */
export function hasPackage(name: string): boolean {
	return isPackageExists(name)
}

/**
 * Dynamically load a plugin
 */
export async function loadPlugin<T>(name: string): Promise<T | null> {
	try {
		const mod = await import(name)

		// Handle ESM default export
		return (mod?.default ?? mod) as T
	} catch {
		return null
	}
}

/**
 * Ensure packages are installed
 */
export async function ensurePackages(packages: string[]): Promise<void> {
	const missing = packages.filter((pkg) => !isPackageExists(pkg))

	if (missing.length > 0) {
		throw new Error(
			`Missing required packages: ${missing.join(', ')}. Please install them with: pnpm add -D ${missing.join(' ')}`,
		)
	}
}
