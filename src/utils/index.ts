import type { Linter } from 'eslint'

// Re-export git utilities
export * from './git'

/**
 * Combine multiple ESLint flat configs into one array
 */
export function combine(...configs: Linter.Config[]): Linter.Config[] {
	return configs.flat()
}

/**
 * Rename rules with a prefix
 */
export function renameRules(
	rules: Record<string, Linter.RuleEntry>,
	prefix: string,
): Record<string, Linter.RuleEntry> {
	return Object.fromEntries(
		Object.entries(rules).map(([key, value]) => [`${prefix}/${key}`, value]),
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
