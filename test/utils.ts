import type { Linter } from 'eslint'
import { ESLint } from 'eslint'
import eslintConfig from '../src/index'

/**
 * Create an ESLint instance with the given config
 */
export async function createESLint(
	config: Linter.Config[] | (() => Promise<Linter.Config[]>),
): Promise<ESLint> {
	const configs = typeof config === 'function' ? await config() : config

	return new ESLint({
		overrideConfig: configs,
		overrideConfigFile: true,
	})
}

/**
 * Lint a single file content
 */
export async function lintContent(
	config: Linter.Config[] | (() => Promise<Linter.Config[]>),
	code: string,
	filePath: string = 'test.js',
): Promise<Linter.LintMessage[]> {
	const configs = typeof config === 'function' ? await config() : config

	const eslint = new ESLint({
		overrideConfig: configs,
		overrideConfigFile: true,
	})

	const results = await eslint.lintText(code, { filePath })

	return results[0]?.messages || []
}

/**
 * Get rule IDs from lint messages
 */
export function getRuleIds(messages: Linter.LintMessage[]): string[] {
	return messages.filter(msg => msg.ruleId).map(msg => msg.ruleId as string)
}

/**
 * Check if a rule is triggered
 */
export function hasRule(messages: Linter.LintMessage[], ruleId: string): boolean {
	return messages.some(msg => msg.ruleId === ruleId)
}

/**
 * Export default config for testing
 */
export { eslintConfig }
