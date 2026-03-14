import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import tsParser from '@typescript-eslint/parser'
import { GLOB_SRC, GLOB_TS } from '../constants'
import { loadPlugin } from '../plugins'
import { renameRules } from '../utils'

/**
 * TypeScript configuration options
 */
export interface TypeScriptOptions extends OptionsOverrides {
	/**
	 * Glob patterns for files that should be type aware
	 * @default ['**\/*.{ts,tsx}']
	 */
	filesTypeAware?: string[]

	/**
	 * Glob patterns for files that should not be type aware
	 */
	ignoresTypeAware?: string[]

	/**
	 * Path to tsconfig.json
	 * @default './tsconfig.json'
	 */
	tsconfigPath?: string | string[]

	/**
	 * Enable rules that require type information
	 * @default false
	 */
	typeAware?: boolean
}

// Type definition for TypeScript ESLint plugin
type TypeScriptESLintPlugin = typeof import('@typescript-eslint/eslint-plugin')

/**
 * TypeScript configuration
 * Minimal and essential rules with rule renaming
 */
export async function typescript(options: TypeScriptOptions = {}): Promise<Linter.Config[]> {
	const {
		filesTypeAware = [GLOB_TS],
		ignoresTypeAware = ['**/*.md/**', '**/*.astro/*.ts'],
		overrides = {},
		tsconfigPath = './tsconfig.json',
		typeAware = false,
	} = options

	const tseslint = await loadPlugin<TypeScriptESLintPlugin>('@typescript-eslint/eslint-plugin')

	if (!tseslint) {
		return []
	}

	const isTypeAware = typeAware && tsconfigPath
	const tsconfigPaths = Array.isArray(tsconfigPath) ? tsconfigPath : [tsconfigPath]

	// Get recommended rules and rename them
	const recommendedRules = tseslint.configs.recommended.rules
	const strictRules = tseslint.configs.strict?.rules || {}

	// Rename @typescript-eslint/* rules to ts/*
	const tsRecommendedRules = renameRules(recommendedRules as Record<string, Linter.RuleEntry>, 'ts')
	const tsStrictRules = renameRules(strictRules as Record<string, Linter.RuleEntry>, 'ts')

	const typeAwareRules: Linter.RulesRecord = {
		// Turn off base rules
		'no-implied-eval': 'off',
		'no-throw-literal': 'off',
		'ts/await-thenable': 'error',
		'ts/no-floating-promises': 'error',
		'ts/no-for-in-array': 'error',
		'ts/no-implied-eval': 'error',
		'ts/no-misused-promises': 'error',
		'ts/no-throw-literal': 'error',
		'ts/no-unnecessary-type-assertion': 'error',
		'ts/no-unsafe-argument': 'error',
		'ts/no-unsafe-assignment': 'error',
		'ts/no-unsafe-call': 'error',
		'ts/no-unsafe-member-access': 'error',
		'ts/no-unsafe-return': 'error',
		'ts/restrict-plus-operands': 'error',
		'ts/restrict-template-expressions': 'error',
		'ts/unbound-method': 'error',
	}

	const configs: Linter.Config[] = [
		{
			files: [GLOB_TS, GLOB_SRC],
			languageOptions: {
				parser: tsParser,
				parserOptions: {
					ecmaVersion: 'latest',
					sourceType: 'module',
					...(isTypeAware
						? {
							project: tsconfigPaths,
						}
						: {}),
				},
			},
			name: 'eslint-sets/typescript',
			plugins: {
				ts: tseslint as any,
			},
			rules: {
				// Recommended and strict rules with renamed prefix
				...tsRecommendedRules,
				...tsStrictRules,

				// Override JavaScript rules
				'no-dupe-class-members': 'off',
				'no-loss-of-precision': 'off',
				'no-redeclare': 'off',
				'no-use-before-define': 'off',
				'no-useless-constructor': 'off',

				// Essential custom rules
				'ts/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
				'ts/consistent-type-definitions': ['error', 'interface'],
				'ts/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
				'ts/no-dynamic-delete': 'off',
				'ts/no-explicit-any': 'off',
				'ts/no-extraneous-class': 'off',
				'ts/no-import-type-side-effects': 'error',
				'ts/no-invalid-void-type': 'off',
				'ts/no-non-null-assertion': 'off',
				// Use TypeScript's no-redeclare rule instead
				'ts/no-redeclare': 'error',
				'ts/no-require-imports': 'error',
				'ts/no-unused-vars': 'off',

				'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
				'ts/no-useless-constructor': 'off',
				'ts/prefer-ts-expect-error': 'error',
				'ts/triple-slash-reference': 'off',
				'ts/unified-signatures': 'off',

				// User overrides
				...overrides,
			},
		},
	]

	// Add type-aware rules if enabled
	if (isTypeAware) {
		configs.push({
			files: filesTypeAware,
			ignores: ignoresTypeAware,
			name: 'eslint-sets/typescript/type-aware',
			rules: typeAwareRules,
		})
	}

	// Add disables for .d.ts files
	configs.push({
		files: ['**/*.d.ts'],
		name: 'eslint-sets/typescript/disables/dts',
		rules: {
			'eslint-comments/no-unlimited-disable': 'off',
			'import-x/no-duplicates': 'off',
			'no-restricted-syntax': 'off',
			'unused-imports/no-unused-vars': 'off',
		},
	})

	// Add disables for test files
	configs.push({
		files: ['**/*.{test,spec}.ts?(x)'],
		name: 'eslint-sets/typescript/disables/test',
		rules: {
			'no-unused-expressions': 'off',
		},
	})

	// Add disables for .js/.cjs files
	configs.push({
		files: ['**/*.js', '**/*.cjs'],
		name: 'eslint-sets/typescript/disables/cjs',
		rules: {
			'ts/no-require-imports': 'off',
			'ts/no-var-requires': 'off',
		},
	})

	return configs
}
