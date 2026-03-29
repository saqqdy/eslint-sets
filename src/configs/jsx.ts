import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_JSX, GLOB_TSX } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * JSX configuration options
 */
export interface JSXOptions extends OptionsOverrides {
	/**
	 * Enable JSX a11y rules
	 * @default false
	 */
	a11y?: boolean | OptionsOverrides
}

// Type definition for jsx-a11y plugin
interface JsxA11yPlugin {
	rules: Linter.RulesRecord
	flatConfigs?: {
		recommended?: Linter.Config
	}
}

/**
 * JSX configuration
 * Base JSX setup with optional a11y support
 */
export async function jsx(options: JSXOptions = {}): Promise<Linter.Config[]> {
	const { a11y = false, overrides = {} } = options

	// Base JSX configuration
	const baseConfig: Linter.Config = {
		name: 'eslint-sets/jsx',
		files: [GLOB_JSX, GLOB_TSX],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {},
		rules: {
			...overrides,
		},
	}

	// Return early if no a11y configuration is needed
	if (!a11y) {
		return [baseConfig]
	}

	// Load jsx-a11y plugin
	const jsxA11yPlugin = await loadPlugin<JsxA11yPlugin>('eslint-plugin-jsx-a11y')

	if (!jsxA11yPlugin) {
		return [baseConfig]
	}

	// Get recommended config
	const a11yConfig = jsxA11yPlugin.flatConfigs?.recommended || {}
	const a11yRules = {
		...(a11yConfig.rules || {}),
		...(typeof a11y === 'object' && a11y.overrides ? a11y.overrides : {}),
	}

	// Merge base config with a11y configuration
	return [
		{
			...baseConfig,
			...a11yConfig,
			name: baseConfig.name,
			files: baseConfig.files,
			languageOptions: {
				...baseConfig.languageOptions,
				...(a11yConfig.languageOptions || {}),
			},
			plugins: {
				...baseConfig.plugins,
				'jsx-a11y': jsxA11yPlugin as any,
			},
			rules: {
				...baseConfig.rules,
				...a11yRules,
			},
		},
	]
}
