import type { Linter } from 'eslint'
import { GLOB_SVELTE } from '../constants'
import { loadPlugin } from '../plugins'

// Type definitions for Svelte plugins
type ESLintPluginSvelte = typeof import('eslint-plugin-svelte')
type SvelteEslintParser = typeof import('svelte-eslint-parser')

/**
 * Svelte configuration
 */
export async function svelte(): Promise<Linter.Config[]> {
	const [sveltePlugin, svelteParser] = await Promise.all([
		loadPlugin<ESLintPluginSvelte>('eslint-plugin-svelte'),
		loadPlugin<SvelteEslintParser>('svelte-eslint-parser'),
	])

	if (!sveltePlugin || !svelteParser) {
		return []
	}

	// Get rules from flat config
	const svelteRecommended = sveltePlugin.configs.recommended
	const svelteRecommendedRules = Array.isArray(svelteRecommended)
		? svelteRecommended.find((c: any) => c.rules)?.rules || {}
		: {}

	return [
		{
			name: 'eslint-sets/svelte/setup',
			files: [GLOB_SVELTE],
			languageOptions: {
				parser: svelteParser,
				parserOptions: {
					ecmaVersion: 'latest',
					sourceType: 'module',
				},
			},
			plugins: {
				svelte: sveltePlugin,
			},
			rules: {
				...svelteRecommendedRules,

				// Svelte specific rules
				'svelte/block-lang': [
					'error',
					{
						script: ['ts'],
					},
				],
				'svelte/button-has-type': 'error',
				'svelte/comment-directive': 'warn',
				'svelte/first-attribute-linebreak': 'off',
				'svelte/html-closing-bracket-spacing': 'off',
				'svelte/html-quotes': 'error',
				'svelte/html-self-closing': 'error',
				'svelte/indent': [
					'error',
					{
						indent: 'tab',
						alignAttributesVertically: true,
						switchCase: 1,
					},
				],
				'svelte/infinite-reactive-loop': 'error',
				'svelte/max-attributes-per-line': 'off',
				'svelte/mustache-spacing': 'off',
				'svelte/no-at-debug-tags': 'warn',
				'svelte/no-at-html-tags': 'error',
				'svelte/no-dom-manipulating': 'error',
				'svelte/no-dupe-else-if-blocks': 'error',
				'svelte/no-dupe-on-directives': 'error',
				'svelte/no-dupe-style-properties': 'error',
				'svelte/no-dynamic-slot-name': 'error',
				'svelte/no-extra-reactive-curlies': 'error',
				'svelte/no-ignored-unsubscribe': 'error',
				'svelte/no-immutable-reactive-statements': 'error',
				'svelte/no-inline-styles': 'off',
				'svelte/no-inner-declarations': 'error',
				'svelte/no-not-function-handler': 'error',
				'svelte/no-object-in-text-mustaches': 'error',
				'svelte/no-reactive-functions': 'warn',
				'svelte/no-reactive-literals': 'warn',
				'svelte/no-reactive-reassign': 'error',
				'svelte/no-restricted-html-elements': 'off',
				'svelte/no-shorthand-style-property-overrides': 'error',
				'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
				'svelte/no-store-async': 'error',
				'svelte/no-svelte-internal': 'error',
				'svelte/no-target-blank': 'error',
				'svelte/no-trailing-spaces': 'error',
				'svelte/no-unknown-style-directive-property': 'error',
				'svelte/no-unused-class-name': 'off',
				'svelte/no-unused-svelte-ignore': 'error',
				'svelte/no-useless-mustaches': 'error',
				'svelte/prefer-class-directive': 'error',
				'svelte/prefer-destructured-store-props': 'off',
				'svelte/prefer-style-directive': 'error',
				'svelte/require-each-key': 'error',
				'svelte/require-event-dispatcher-types': 'off',
				'svelte/require-optimized-style-attribute': 'off',
				'svelte/require-store-callbacks': 'off',
				'svelte/require-store-reactive-access': 'error',
				'svelte/require-stores-init': 'error',
				'svelte/shorthand-attribute': 'error',
				'svelte/shorthand-directive': 'error',
				'svelte/sort-attributes': 'off',
				'svelte/spaced-html-comment': 'error',
				'svelte/system': 'off',
				'svelte/valid-compile': 'error',
				'svelte/valid-each-key': 'error',
			},
		},
	]
}
