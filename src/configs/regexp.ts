import type { Linter } from 'eslint'
import regexpPlugin from 'eslint-plugin-regexp'
import { GLOB_SRC } from '../constants'

/**
 * Regexp configuration
 */
export function regexp(): Linter.Config {
	return {
		files: [GLOB_SRC],
		name: 'eslint-sets/regexp',
		plugins: {
			regexp: regexpPlugin as any,
		},
		rules: {
			'regexp/no-control-character': 'warn',
			'regexp/no-dupe-characters-character-class': 'error',
			'regexp/no-dupe-disjunctions': 'error',
			'regexp/no-empty-capturing-group': 'error',
			'regexp/no-empty-character-class': 'error',
			'regexp/no-empty-group': 'error',
			'regexp/no-empty-lookarounds-assertion': 'error',
			'regexp/no-escape-backspace': 'error',
			'regexp/no-invalid-regexp': 'error',
			'regexp/no-lazy-ends': 'warn',
			'regexp/no-legacy-features': 'error',
			'regexp/no-octal': 'error',
			'regexp/no-standalone-backslash': 'error',
			'regexp/no-trivially-nested-assertion': 'error',
			'regexp/no-trivially-nested-quantifier': 'error',
			'regexp/no-useless-assertions': 'error',
			'regexp/no-useless-backreference': 'error',
			'regexp/no-useless-character-class': 'error',
			'regexp/no-useless-escape': 'error',
			'regexp/no-useless-lazy': 'error',
			'regexp/no-useless-non-capturing-group': 'error',
			'regexp/no-useless-quantifier': 'error',
			'regexp/no-useless-range': 'error',
			'regexp/no-zero-quantifier': 'error',
			'regexp/prefer-character-class': 'error',
			'regexp/prefer-d': 'error',
			'regexp/prefer-plus-quantifier': 'error',
			'regexp/prefer-quantifier': 'error',
			'regexp/prefer-question-quantifier': 'error',
			'regexp/prefer-range': 'error',
			'regexp/prefer-star-quantifier': 'error',
			'regexp/prefer-w': 'error',
		},
	}
}
