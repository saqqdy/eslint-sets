import type { Linter } from 'eslint'
import { EDITOR_ENV_KEYS, GLOB_EXCLUDES } from '../constants'

// Re-export types
export * from './types'

/**
 * Rename rule keys by a prefix map (longest-prefix-first).
 *
 * Backward compatible: pass a `prefix` string (with optional `from`, default
 * `@typescript-eslint`) to rename a single prefix; or pass a full map.
 */
export function renameRules(
	rules: Record<string, Linter.RuleEntry>,
	mapOrPrefix: Record<string, string> | string,
	from?: string,
): Record<string, Linter.RuleEntry> {
	const map = typeof mapOrPrefix === 'string' ? { [from ?? '@typescript-eslint']: mapOrPrefix } : mapOrPrefix
	const sorted = Object.entries(map).sort(([a], [b]) => b.length - a.length)

	return Object.fromEntries(
		Object.entries(rules).map(([key, value]) => {
			let newKey = key
			for (const [fromPrefix, to] of sorted) {
				const prefix = `${fromPrefix}/`
				if (newKey.startsWith(prefix)) {
					newKey = `${to}/${newKey.slice(prefix.length)}`
					break
				}
			}
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
 * Check if currently running inside a git hook or lint-staged context.
 * In these contexts we want strict rules (not the editor-downgraded ones).
 */
export function isInGitHooksOrLintStaged(): boolean {
	return !!(
		process.env.GIT_PARAMS
		|| process.env.VSCODE_GIT_COMMAND
		|| process.env.npm_lifecycle_script?.startsWith('lint-staged')
	)
}

/**
 * Check if currently running in an editor environment.
 *
 * Returns `false` in CI and git-hook / lint-staged contexts so that rules
 * downgraded for editors (e.g. `prefer-const`) stay strict where it matters.
 */
export function isInEditorEnv(): boolean {
	if (process.env.CI)
		return false
	if (isInGitHooksOrLintStaged())
		return false
	// ZED ships a bundled terminal (ZED_TERM); only count as editor when not in it
	if (process.env.ZED_ENVIRONMENT && !process.env.ZED_TERM)
		return true
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
