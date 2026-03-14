import type { Linter } from 'eslint'
import solidPlugin from 'eslint-plugin-solid'

/**
 * Glob patterns for Solid.js files
 */
const GLOB_SOLID = '**/*.{tsx,jsx}'

/**
 * Solid.js configuration
 */
export async function solid(): Promise<Linter.Config[]> {
	// Get the flat recommended config which has the proper plugin structure
	const flatRecommended = solidPlugin.configs?.['flat/recommended'] as unknown as Linter.Config | undefined

	return [
		{
			files: [GLOB_SOLID],
			languageOptions: flatRecommended?.languageOptions,
			name: 'eslint-sets/solid',
			plugins: {
				solid: ((flatRecommended?.plugins as Record<string, unknown>)?.solid as any) ?? solidPlugin,
			},
			rules: {
				// Use recommended rules as base
				...((flatRecommended as Record<string, unknown>)?.rules as Record<string, Linter.RuleEntry>),

				// Solid.js specific overrides
				'solid/event-handlers': 'warn',
				'solid/no-array-handlers': 'warn',
				'solid/no-innerhtml': ['error', { allowStatic: true }],
				'solid/no-proxy-apis': 'off',
				'solid/prefer-classlist': 'warn',
				'solid/prefer-show': 'warn',
				'solid/reactivity': 'warn',
			},
		},
	]
}
