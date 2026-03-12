import { isPackageExists } from 'local-pkg'

/**
 * Check if Vue is installed
 */
export function hasVue(): boolean {
	return isPackageExists('vue')
}

/**
 * Check if React is installed
 */
export function hasReact(): boolean {
	return isPackageExists('react')
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
	return isPackageExists('typescript')
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
 * Dynamically load a plugin
 */
export async function loadPlugin<T>(name: string): Promise<T | null> {
	try {
		return (await import(name)) as T
	} catch {
		return null
	}
}
