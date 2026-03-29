import type { Linter } from 'eslint'
import type { OptionsOverrides, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes } from '../types'
import { GLOB_ASTRO_TS, GLOB_MD, GLOB_REACT, GLOB_TS, GLOB_TSX } from '../constants'
import { hasNextjs, hasReactCompiler, hasReactRouter, hasRemix, hasVite, loadPlugin } from '../plugins'

/**
 * React configuration options
 */
export interface ReactOptions extends OptionsOverrides, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes {
	/**
	 * Files to apply React rules to
	 * @default ['**\/*.{jsx,tsx,js,ts}']
	 */
	files?: string[]

	/**
	 * Enable React Compiler rules
	 * @default auto-detect
	 */
	reactCompiler?: boolean

	/**
	 * Enable RSC (React Server Components) rules
	 * @default true
	 */
	rsc?: boolean
}

/**
 * Rename rules from @eslint-react/* prefixes to react* prefixes
 */
function renameRules(rules: Partial<Linter.RulesRecord>): Linter.RulesRecord {
	const result: Linter.RulesRecord = {}

	for (const [key, value] of Object.entries(rules)) {
		// @eslint-react/dom/xxx -> react-dom/xxx
		// @eslint-react/web-api/xxx -> react-web-api/xxx
		// @eslint-react/naming-convention/xxx -> react-naming-convention/xxx
		// @eslint-react/hooks-extra/xxx -> react-hooks-extra/xxx
		// @eslint-react/rsc/xxx -> react-rsc/xxx
		// @eslint-react/xxx -> react/xxx
		const newKey = key
			.replace('@eslint-react/dom/', 'react-dom/')
			.replace('@eslint-react/web-api/', 'react-web-api/')
			.replace('@eslint-react/naming-convention/', 'react-naming-convention/')
			.replace('@eslint-react/hooks-extra/', 'react-hooks-extra/')
			.replace('@eslint-react/rsc/', 'react-rsc/')
			.replace('@eslint-react/', 'react/')
		if (value !== undefined) {
			result[newKey] = value
		}
	}

	return result
}

/**
 * React configuration
 * Uses @eslint-react/eslint-plugin for modern React linting
 */
export async function react(options: ReactOptions = {}): Promise<Linter.Config[]> {
	const {
		files = [GLOB_REACT],
		filesTypeAware = [GLOB_TS, GLOB_TSX],
		ignoresTypeAware = [`${GLOB_MD}/**`, GLOB_ASTRO_TS],
		overrides = {},
		tsconfigPath,
		reactCompiler = hasReactCompiler(),
		rsc = true,
	} = options

	const [
		pluginReact,
		pluginReactHooks,
		pluginReactRefresh,
	] = await Promise.all([
		loadPlugin<ESLintReactPlugin>('@eslint-react/eslint-plugin'),
		loadPlugin<typeof import('eslint-plugin-react-hooks')>('eslint-plugin-react-hooks'),
		loadPlugin<typeof import('eslint-plugin-react-refresh')>('eslint-plugin-react-refresh'),
	])

	if (!pluginReact) {
		return []
	}

	const isTypeAware = !!tsconfigPath
	const isAllowConstantExport = hasVite()
	const isUsingRemix = hasRemix()
	const isUsingReactRouter = hasReactRouter()
	const isUsingNext = hasNextjs()

	// Get plugins from the all config
	const allPlugins = (pluginReact.configs.all as any).plugins

	// Check if RSC plugin is available (requires @eslint-react/eslint-plugin >= 2.0.0)
	const hasRscPlugin = !!allPlugins['@eslint-react/rsc']

	// Check for namespace import rule (renamed between v1 and v2)
	// v1.x: prefer-react-namespace-import
	// v2.x: prefer-namespace-import
	const hasNamespaceImportRule = 'prefer-namespace-import' in pluginReact.rules
	const namespaceImportRuleName = hasNamespaceImportRule ? 'react/prefer-namespace-import' : 'react/prefer-react-namespace-import'

	// Get recommended rules and rename them
	const recommendedRules = renameRules(pluginReact.configs.recommended?.rules || {})

	const typeAwareRules: Linter.RulesRecord = {
		'react/no-leaked-conditional-rendering': 'warn',
		'react/no-implicit-key': 'error',
	}

	const configs: Linter.Config[] = [
		{
			name: 'eslint-sets/react/setup',
			plugins: {
				react: allPlugins['@eslint-react'],
				'react-dom': allPlugins['@eslint-react/dom'],
				'react-hooks': pluginReactHooks as any,
				'react-hooks-extra': allPlugins['@eslint-react/hooks-extra'],
				'react-naming-convention': allPlugins['@eslint-react/naming-convention'],
				'react-refresh': pluginReactRefresh as any,
				...(hasRscPlugin ? { 'react-rsc': allPlugins['@eslint-react/rsc'] } : {}),
				'react-web-api': allPlugins['@eslint-react/web-api'],
			},
		},
		{
			name: 'eslint-sets/react/rules',
			files,
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
				sourceType: 'module',
			},
			rules: {
				// Use recommended rules from @eslint-react/eslint-plugin (renamed)
				...recommendedRules,

				// Additional rules
				[namespaceImportRuleName]: 'error',

				// RSC (React Server Components) rules - only if plugin is available
				...(rsc && hasRscPlugin ? {
					'react-rsc/function-definition': 'error',
				} : {}),

				// React hooks rules
				'react-hooks/rules-of-hooks': 'error',
				'react-hooks/exhaustive-deps': 'warn',

				// React Compiler rules
				...(reactCompiler ? {
					'react-hooks/config': 'error',
					'react-hooks/error-boundaries': 'error',
					'react-hooks/component-hook-factories': 'error',
					'react-hooks/gating': 'error',
					'react-hooks/globals': 'error',
					'react-hooks/immutability': 'error',
					'react-hooks/preserve-manual-memoization': 'error',
					'react-hooks/purity': 'error',
					'react-hooks/refs': 'error',
					'react-hooks/set-state-in-effect': 'error',
					'react-hooks/set-state-in-render': 'error',
					'react-hooks/static-components': 'error',
					'react-hooks/unsupported-syntax': 'warn',
					'react-hooks/use-memo': 'error',
					'react-hooks/incompatible-library': 'warn',
				} : {}),

				// React Refresh rules
				'react-refresh/only-export-components': [
					'error',
					{
						allowConstantExport: isAllowConstantExport,
						allowExportNames: [
							...(isUsingNext ? [
								'dynamic',
								'dynamicParams',
								'revalidate',
								'fetchCache',
								'runtime',
								'preferredRegion',
								'maxDuration',
								'generateStaticParams',
								'metadata',
								'generateMetadata',
								'viewport',
								'generateViewport',
								'generateImageMetadata',
								'generateSitemaps',
							] : []),
							...(isUsingRemix || isUsingReactRouter ? [
								'meta',
								'links',
								'headers',
								'loader',
								'action',
								'clientLoader',
								'clientAction',
								'handle',
								'shouldRevalidate',
							] : []),
						],
					},
				],

				// User overrides
				...overrides,
			},
		},
		{
			name: 'eslint-sets/react/typescript',
			files: filesTypeAware,
			rules: {
				// Disables rules that are already handled by TypeScript
				'react-dom/no-string-style-prop': 'off',
				'react-dom/no-unknown-property': 'off',
				// Additional TypeScript-specific rule disables (align with antfu)
				'react/jsx-no-duplicate-props': 'off',
				'react/jsx-no-undef': 'off',
				'react/jsx-uses-react': 'off',
				'react/jsx-uses-vars': 'off',
			},
		},
	]

	// Add type-aware rules if enabled
	if (isTypeAware) {
		configs.push({
			name: 'eslint-sets/react/type-aware',
			files: filesTypeAware,
			ignores: ignoresTypeAware,
			rules: typeAwareRules,
		})
	}

	return configs
}

// Type definitions for React plugins
interface ESLintReactPlugin {
	configs: Record<string, Linter.Config>
	rules: Record<string, unknown>
}
