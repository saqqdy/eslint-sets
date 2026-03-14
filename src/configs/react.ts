import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_REACT } from '../constants'
import { hasReactCompiler, loadPlugin } from '../plugins'

/**
 * React configuration options
 */
export interface ReactOptions extends OptionsOverrides {
	/**
	 * Enable React Compiler rules
	 * @default auto-detect
	 */
	reactCompiler?: boolean
}

// Type definitions for React plugins
interface ESLintReactPlugin {
	configs: Record<string, Linter.Config>
}
type ESLintPluginReactRefresh = typeof import('eslint-plugin-react-refresh')

/**
 * React configuration
 * Uses @eslint-react/eslint-plugin for modern React linting
 */
export async function react(options: ReactOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {}, reactCompiler = hasReactCompiler() } = options

	const [reactPlugin, refreshPlugin] = await Promise.all([
		loadPlugin<ESLintReactPlugin>('@eslint-react/eslint-plugin'),
		loadPlugin<ESLintPluginReactRefresh>('eslint-plugin-react-refresh'),
	])

	if (!reactPlugin) {
		return []
	}

	// Get the recommended config which includes all sub-plugins
	const recommendedConfig = reactPlugin.configs.recommended

	// Merge plugins from recommended config with react-refresh
	const plugins = {
		...(recommendedConfig?.plugins || {}),
		...(refreshPlugin && { 'react-refresh': refreshPlugin as any }),
	}

	const configs: Linter.Config[] = [
		{
			files: [GLOB_REACT],
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
			name: 'eslint-sets/react',
			plugins,
			rules: {
				// @eslint-react recommended rules
				...(recommendedConfig?.rules || {}),

				// Adjust some rules
				'@eslint-react/no-nested-component-definitions': 'off',

				// React Refresh rules
				...(refreshPlugin && {
					'react-refresh/only-export-components': [
						'warn',
						{
							allowConstantExport: true,
							allowExportNames: ['loader', 'meta', 'headers'],
						},
					],
				}),

				// React Compiler
				...(reactCompiler && {
					'react-compiler/react-compiler': 'error',
				}),

				// User overrides
				...overrides,
			},
			settings: {
				react: {
					version: 'detect',
				},
			},
		},
	]

	return configs
}
