import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { GLOB_TS, GLOB_TSX } from '../constants'
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
	const { overrides = {}, templateFiles = ['**/*.html'] } = options

	const [angularPlugin, angularTemplatePlugin, templateParser] = (await Promise.all([
		loadPlugin('@angular-eslint/eslint-plugin'),
		loadPlugin('@angular-eslint/eslint-plugin-template'),
		loadPlugin('@angular-eslint/template-parser'),
	])) as [any, any, any]

	if (!angularPlugin || !angularTemplatePlugin || !templateParser) {
		return []
	}

	return [
		{
			files: [GLOB_TS, GLOB_TSX],
			name: 'eslint-sets/angular',
			plugins: {
				'@angular-eslint': angularPlugin as any,
			},
			rules: {
				// Angular recommended rules
				...angularPlugin.configs.recommended.rules,

				// Additional Angular rules
				'@angular-eslint/component-class-suffix': 'error',
				'@angular-eslint/component-max-inline-declarations': [
					'error',
					{
						animations: 5,
						styles: 3,
						template: 3,
					},
				],
				'@angular-eslint/component-selector': [
					'error',
					{
						prefix: ['app'],
						style: 'kebab-case',
						type: 'element',
					},
				],
				'@angular-eslint/consistent-component-styles': 'error',
				'@angular-eslint/directive-class-suffix': 'error',
				'@angular-eslint/directive-selector': [
					'error',
					{
						prefix: ['app'],
						style: 'camelCase',
						type: 'attribute',
					},
				],
				'@angular-eslint/no-async-lifecycle-method': 'error',
				'@angular-eslint/no-attribute-decorator': 'error',
				'@angular-eslint/no-conflicting-lifecycle': 'error',
				'@angular-eslint/no-empty-lifecycle-method': 'warn',
				'@angular-eslint/no-forward-ref': 'warn',
				'@angular-eslint/no-host-metadata-property': 'off',
				'@angular-eslint/no-input-prefix': 'error',
				'@angular-eslint/no-input-rename': 'error',
				'@angular-eslint/no-inputs-metadata-property': 'error',
				'@angular-eslint/no-lifecycle-call': 'error',
				'@angular-eslint/no-output-native': 'error',
				'@angular-eslint/no-output-on-prefix': 'error',
				'@angular-eslint/no-output-rename': 'error',
				'@angular-eslint/no-outputs-metadata-property': 'error',
				'@angular-eslint/no-queries-metadata-property': 'error',
				'@angular-eslint/prefer-standalone': 'warn',
				'@angular-eslint/relative-url-prefix': 'error',
				'@angular-eslint/sort-lifecycle-methods': 'error',
				'@angular-eslint/use-component-selector': 'error',
				'@angular-eslint/use-component-view-encapsulation': 'warn',
				'@angular-eslint/use-injectable-provided-in': 'error',
				'@angular-eslint/use-lifecycle-interface': 'warn',

				// User overrides
				...overrides,
			},
		},
		{
			files: templateFiles,
			languageOptions: {
				parser: templateParser as any,
			},
			name: 'eslint-sets/angular/template',
			plugins: {
				'@angular-eslint/template': angularTemplatePlugin as any,
			},
			rules: {
				// Angular template recommended rules
				...angularTemplatePlugin.configs.recommended.rules,

				// Additional template rules
				'@angular-eslint/template/accessibility-alt-text': 'error',
				'@angular-eslint/template/accessibility-elements-content': 'error',
				'@angular-eslint/template/accessibility-label-for': 'error',
				'@angular-eslint/template/accessibility-label-has-associated-control': 'error',
				'@angular-eslint/template/accessibility-table-scope': 'error',
				'@angular-eslint/template/accessibility-valid-aria': 'error',
				'@angular-eslint/template/attributes-order': 'error',
				'@angular-eslint/template/banana-in-box': 'error',
				'@angular-eslint/template/click-events-have-key-events': 'error',
				'@angular-eslint/template/conditional-complexity': 'warn',
				'@angular-eslint/template/cyclomatic-complexity': 'warn',
				'@angular-eslint/template/eqeqeq': 'error',
				'@angular-eslint/template/i18n': 'off',
				'@angular-eslint/template/mouse-events-have-key-events': 'error',
				'@angular-eslint/template/no-any': 'warn',
				'@angular-eslint/template/no-autofocus': 'error',
				'@angular-eslint/template/no-call-expression': 'warn',
				'@angular-eslint/template/no-distracting-elements': 'error',
				'@angular-eslint/template/no-duplicate-attributes': 'error',
				'@angular-eslint/template/no-inline-styles': 'off',
				'@angular-eslint/template/no-negated-async': 'error',
				'@angular-eslint/template/no-positive-tabindex': 'error',
				'@angular-eslint/template/no-shadowed-variable': 'warn',
				'@angular-eslint/template/prefer-control-flow': 'warn',
				'@angular-eslint/template/prefer-self-closing-tags': 'warn',
				'use-lifecycle-interface': 'warn',
				'valid-aria': 'error',
			},
		},
	]
}
