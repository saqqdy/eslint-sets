import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_HTML, GLOB_TS } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Angular configuration options
 */
export interface AngularOptions extends OptionsOverrides {
	/**
	 * Template files glob pattern
	 */
	templateFiles?: string[]
}

/**
 * Angular configuration
 */
export async function angular(options: AngularOptions = {}): Promise<Linter.Config[]> {
	const { overrides = {}, templateFiles = [GLOB_HTML] } = options

	const [angularPlugin, angularTemplatePlugin, templateParser] = (await Promise.all([
		loadPlugin('@angular-eslint/eslint-plugin'),
		loadPlugin('@angular-eslint/eslint-plugin-template'),
		loadPlugin('@angular-eslint/template-parser'),
	])) as [any, any, any]

	if (!angularPlugin || !angularTemplatePlugin || !templateParser) {
		return []
	}

	// Separate overrides for TS and template rules
	const angularTsRules: Linter.RulesRecord = {}
	const angularTemplateRules: Linter.RulesRecord = {}

	Object.entries(overrides).forEach(([key, value]) => {
		if (key.startsWith('angular/') || key.startsWith('@angular-eslint/')) {
			angularTsRules[key] = value as Linter.RuleEntry
		}
		if (key.startsWith('angular-template/') || key.startsWith('@angular-eslint/template/')) {
			angularTemplateRules[key] = value as Linter.RuleEntry
		}
	})

	return [
		{
			name: 'eslint-sets/angular/setup',
			plugins: {
				angular: angularPlugin as any,
				'angular-template': angularTemplatePlugin as any,
			},
		},
		{
			files: [GLOB_TS],
			name: 'eslint-sets/angular/rules/ts',
			processor: angularTemplatePlugin.processors?.['extract-inline-html'],
			rules: {
				// Core Angular rules
				'angular/contextual-lifecycle': 'error',
				'angular/no-empty-lifecycle-method': 'error',
				'angular/no-input-rename': 'error',
				'angular/no-inputs-metadata-property': 'error',
				'angular/no-output-native': 'error',
				'angular/no-output-on-prefix': 'error',
				'angular/no-output-rename': 'error',
				'angular/no-outputs-metadata-property': 'error',
				'angular/prefer-inject': 'error',
				'angular/prefer-standalone': 'error',
				'angular/use-lifecycle-interface': 'error',
				'angular/use-pipe-transform-interface': 'error',

				// User overrides
				...angularTsRules,
			},
		},
		{
			files: templateFiles,
			languageOptions: {
				parser: templateParser as any,
			},
			name: 'eslint-sets/angular/rules/template',
			rules: {
				// Core template rules
				'angular-template/banana-in-box': 'error',
				'angular-template/eqeqeq': 'error',
				'angular-template/no-negated-async': 'error',
				'angular-template/prefer-control-flow': 'error',

				// User overrides
				...angularTemplateRules,
			},
		},
	]
}
