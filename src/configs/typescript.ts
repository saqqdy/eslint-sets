import type { Linter } from 'eslint'
import type { OptionsOverrides, OptionsProjectType, OptionsTypeScriptErasableOnly, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes } from '../types'
import tsParser from '@typescript-eslint/parser'
import { GLOB_SRC, GLOB_TS } from '../constants'
import { loadPlugin } from '../plugins'
import { interopDefault, renameRules } from '../utils'

/**
 * TypeScript configuration options
 */
export interface TypeScriptOptions
	extends OptionsOverrides,
	OptionsTypeScriptWithTypes,
	OptionsTypeScriptParserOptions,
	OptionsProjectType,
	OptionsTypeScriptErasableOnly {
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
		erasableOnly = false,
		filesTypeAware = [GLOB_TS],
		ignoresTypeAware = ['**/*.md/**', '**/*.astro/*.ts'],
		overrides = {},
		overridesTypeAware = {},
		parserOptions = {},
		tsconfigPath,
		type = 'app',
		typeAware = false,
	} = options

	const tseslint = await loadPlugin<TypeScriptESLintPlugin>('@typescript-eslint/eslint-plugin')

	if (!tseslint) {
		return []
	}

	const isTypeAware = typeAware && !!tsconfigPath

	// Get recommended rules and rename them
	const recommendedRules = tseslint.configs.recommended.rules
	const strictRules = tseslint.configs.strict?.rules || {}

	// Rename @typescript-eslint/* rules to ts/*
	const tsRecommendedRules = renameRules(recommendedRules as Record<string, Linter.RuleEntry>, 'ts')
	const tsStrictRules = renameRules(strictRules as Record<string, Linter.RuleEntry>, 'ts')

	const typeAwareRules: Linter.RulesRecord = {
		// Turn off base rules
		'dot-notation': 'off',
		'no-implied-eval': 'off',
		'ts/await-thenable': 'error',
		'ts/dot-notation': ['error', { allowKeywords: true }],
		'ts/no-floating-promises': 'error',
		'ts/no-for-in-array': 'error',
		'ts/no-implied-eval': 'error',
		'ts/no-misused-promises': 'error',
		'ts/no-unnecessary-type-assertion': 'error',
		'ts/no-unsafe-argument': 'error',
		'ts/no-unsafe-assignment': 'error',
		'ts/no-unsafe-call': 'error',
		'ts/no-unsafe-member-access': 'error',
		'ts/no-unsafe-return': 'error',
		'ts/promise-function-async': 'error',
		'ts/restrict-plus-operands': 'error',
		'ts/restrict-template-expressions': 'error',
		'ts/return-await': ['error', 'in-try-catch'],
		'ts/strict-boolean-expressions': ['error', { allowNullableBoolean: true, allowNullableObject: true }],
		'ts/switch-exhaustiveness-check': 'error',
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
					...(isTypeAware ? {
						projectService: {
							allowDefaultProject: ['./*.js'],
							defaultProject: tsconfigPath,
						},
						tsconfigRootDir: process.cwd(),
					} : {}),
					...parserOptions,
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
				'no-redeclare': 'off',
				'no-use-before-define': 'off',
				'no-useless-constructor': 'off',

				// Essential custom rules
				'ts/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
				'ts/consistent-type-definitions': ['error', 'interface'],
				'ts/consistent-type-imports': ['error', {
					disallowTypeAnnotations: false,
					fixStyle: 'separate-type-imports',
					prefer: 'type-imports',
				}],
				'ts/method-signature-style': ['error', 'property'],
				'ts/no-dynamic-delete': 'off',
				'ts/no-explicit-any': 'off',
				'ts/no-extraneous-class': 'off',
				'ts/no-import-type-side-effects': 'error',
				'ts/no-invalid-void-type': 'off',
				'ts/no-non-null-assertion': 'off',
				'ts/no-redeclare': ['error', { builtinGlobals: false }],
				'ts/no-require-imports': 'error',
				'ts/no-unused-expressions': ['error', {
					allowShortCircuit: true,
					allowTaggedTemplates: true,
					allowTernary: true,
				}],
				'ts/no-unused-vars': 'off',
				'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
				'ts/no-useless-constructor': 'off',
				'ts/no-wrapper-object-types': 'error',
				'ts/triple-slash-reference': 'off',
				'ts/unified-signatures': 'off',

				// Library-specific rules
				...(type === 'lib' ? {
					'ts/explicit-function-return-type': ['error', {
						allowExpressions: true,
						allowHigherOrderFunctions: true,
						allowIIFEs: true,
					}],
				} : {}),

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
			rules: {
				...typeAwareRules,
				...overridesTypeAware,
			},
		})
	}

	// Add erasable syntax only rules if enabled
	if (erasableOnly) {
		const erasablePlugin = await interopDefault(import('eslint-plugin-erasable-syntax-only'))

		if (erasablePlugin) {
			configs.push({
				name: 'eslint-sets/typescript/erasable-syntax-only',
				plugins: {
					'erasable-syntax-only': erasablePlugin as any,
				},
				rules: {
					'erasable-syntax-only/enums': 'error',
					'erasable-syntax-only/import-aliases': 'error',
					'erasable-syntax-only/namespaces': 'error',
					'erasable-syntax-only/parameter-properties': 'error',
				},
			})
		}
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
