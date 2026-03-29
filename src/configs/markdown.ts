import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'
import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors'
import { GLOB_MD, GLOB_MD_CODE, GLOB_MD_IN_MD } from '../constants'
import { loadPlugin } from '../plugins'

/**
 * Markdown configuration options
 */
export interface MarkdownOptions extends OptionsOverrides {
	/**
	 * Use GitHub Flavored Markdown (GFM) or CommonMark
	 * @default true
	 */
	gfm?: boolean

	/**
	 * Overrides for markdown-specific rules
	 */
	overridesMarkdown?: Linter.RulesRecord
}

// Type definition for markdown plugin
type ESLintPluginMarkdown = typeof import('@eslint/markdown')

/**
 * Markdown configuration
 */
export async function markdown(options: MarkdownOptions = {}): Promise<Linter.Config[]> {
	const {
		gfm = true,
		overrides = {},
		overridesMarkdown = {},
	} = options

	// Try to use @eslint/markdown (newer) first
	const plugin = await loadPlugin<ESLintPluginMarkdown>('@eslint/markdown')

	if (plugin) {
		return [
			{
				name: 'eslint-sets/markdown/setup',
				plugins: {
					markdown: plugin as any,
				},
			},
			{
				name: 'eslint-sets/markdown/processor',
				files: [GLOB_MD],
				ignores: [GLOB_MD_IN_MD],
				// `eslint-plugin-markdown` only creates virtual files for code blocks,
				// but not the markdown file itself. We use `eslint-merge-processors` to
				// add a pass-through processor for the markdown file itself.
				processor: mergeProcessors([
					(plugin as any).processors!.markdown,
					processorPassThrough,
				]),
			},
			{
				name: 'eslint-sets/markdown/parser',
				files: [GLOB_MD],
				language: gfm ? 'markdown/gfm' : 'markdown/commonmark',
			},
			{
				name: 'eslint-sets/markdown/rules',
				files: [GLOB_MD],
				rules: {
					...((plugin as any).configs?.recommended?.at?.(0)?.rules || {}),
					'markdown/fenced-code-language': 'off',
					// https://github.com/eslint/markdown/issues/294
					'markdown/no-missing-label-refs': 'off',
					...overridesMarkdown,
				},
			},
			{
				name: 'eslint-sets/markdown/disables/markdown',
				files: [GLOB_MD],
				rules: {
					// Disable rules that do not work with markdown sourcecode.
					'no-irregular-whitespace': 'off',
					'perfectionist/sort-exports': 'off',
					'perfectionist/sort-imports': 'off',
					'regexp/no-legacy-features': 'off',
					'regexp/no-missing-g-flag': 'off',
					'regexp/no-useless-dollar-replacements': 'off',
					'regexp/no-useless-flag': 'off',
					'style/indent': 'off',
				},
			},
			{
				name: 'eslint-sets/markdown/disables/code',
				files: [GLOB_MD_CODE],
				languageOptions: {
					parserOptions: {
						ecmaFeatures: {
							impliedStrict: true,
						},
					},
				},
				rules: {
					'no-alert': 'off',
					'no-console': 'off',
					'no-labels': 'off',
					'no-lone-blocks': 'off',
					'no-restricted-syntax': 'off',
					'no-undef': 'off',
					'no-unused-expressions': 'off',
					'no-unused-labels': 'off',
					'no-unused-vars': 'off',
					'node/prefer-global/process': 'off',
					'style/comma-dangle': 'off',
					'style/eol-last': 'off',
					'style/padding-line-between-statements': 'off',
					'ts/consistent-type-imports': 'off',
					'ts/explicit-function-return-type': 'off',
					'ts/no-namespace': 'off',
					'ts/no-redeclare': 'off',
					'ts/no-require-imports': 'off',
					'ts/no-unused-expressions': 'off',
					'ts/no-unused-vars': 'off',
					'ts/no-use-before-define': 'off',
					'unicode-bom': 'off',
					'unused-imports/no-unused-imports': 'off',
					'unused-imports/no-unused-vars': 'off',
					...overrides,
				},
			},
		]
	}

	// Fallback: basic configuration without rules
	return [
		{
			name: 'eslint-sets/markdown/setup',
			files: [GLOB_MD],
			rules: {
				// No markdown-specific rules available
				...overrides,
			},
		},
	]
}
