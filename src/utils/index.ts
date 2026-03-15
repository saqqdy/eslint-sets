import type { Linter } from 'eslint'
import { EDITOR_ENV_KEYS, GLOB_EXCLUDES } from '../constants'

// Re-export git utilities
export * from './git'

// Re-export types
export * from './types'

/**
 * Combine multiple ESLint flat configs into one array
 */
export function combine(...configs: Linter.Config[]): Linter.Config[] {
	return configs.flat()
}

/**
 * Rename rules with a prefix
 * Converts @typescript-eslint/rule-name to prefix/rule-name
 */
export function renameRules(
	rules: Record<string, Linter.RuleEntry>,
	prefix: string,
	from?: string,
): Record<string, Linter.RuleEntry> {
	const fromPrefix = from ?? '@typescript-eslint'

	return Object.fromEntries(
		Object.entries(rules).map(([key, value]) => {
			const newKey = key.startsWith(`${fromPrefix}/`) ? `${prefix}/${key.slice(fromPrefix.length + 1)}` : key

			return [newKey, value]
		}),
	)
}

/**
 * Check if a value is a plain object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Merge two objects deeply
 */
export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
	const result = { ...target }

	for (const key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			const sourceValue = source[key]
			const targetValue = target[key]

			if (isObject(sourceValue) && isObject(targetValue)) {
				result[key] = deepMerge(
					targetValue as Record<string, unknown>,
					sourceValue as Record<string, unknown>,
				) as T[Extract<keyof T, string>]
			} else if (sourceValue !== undefined) {
				result[key] = sourceValue as T[Extract<keyof T, string>]
			}
		}
	}

	return result
}

/**
 * Ensure a value is an array
 */
export function ensureArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value]
}

/**
 * Filter out undefined values from an array
 */
export function filterNil<T>(array: (T | undefined | null)[]): T[] {
	return array.filter((item): item is T => item !== undefined && item !== null)
}

/**
 * Check if currently running in an editor environment
 */
export function isInEditorEnv(): boolean {
	return EDITOR_ENV_KEYS.some(key => process.env[key])
}

/**
 * Interop default export
 */
export async function interopDefault<T>(
	promise: Promise<T>,
): Promise<T extends { default: infer D } ? D : T> {
	const result = await promise

	return (result as any).default ?? result
}

/**
 * Resolve sub-options from parent options
 */
export function resolveSubOptions<K extends string>(
	options: Record<string, unknown>,
	key: K,
): Record<string, unknown> {
	const value = options[key]

	if (typeof value === 'object' && value !== null) {
		return value as Record<string, unknown>
	}

	return {}
}

/**
 * Get overrides from options
 */
export function getOverrides(options: Record<string, unknown>, key: string): Linter.RulesRecord {
	const subOptions = resolveSubOptions(options, key)

	return (subOptions.overrides as Linter.RulesRecord) || {}
}

/**
 * Process ignores option
 */
export function processIgnores(
	userIgnores: string[] | ((defaults: string[]) => string[]) | undefined,
): string[] {
	const defaults = [...GLOB_EXCLUDES]

	if (!userIgnores) {
		return defaults
	}

	if (typeof userIgnores === 'function') {
		return userIgnores(defaults)
	}

	return [...defaults, ...userIgnores]
}
