import type { Linter } from 'eslint'
import { GLOB_SRC, GLOB_SRC_EXT } from '../constants'

/**
 * Disables configuration
 * Disables certain rules in specific file types
 */
export function disables(): Linter.Config[] {
	return [
		{
			name: 'eslint-sets/disables/scripts',
			files: [`**/scripts/${GLOB_SRC}`],
			rules: {
				'no-console': 'off',
				'ts/explicit-function-return-type': 'off',
			},
		},
		{
			name: 'eslint-sets/disables/cli',
			files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
			rules: {
				'no-console': 'off',
			},
		},
		{
			name: 'eslint-sets/disables/bin',
			files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
			rules: {},
		},
		{
			name: 'eslint-sets/disables/dts',
			files: ['**/*.d.?([cm])ts'],
			rules: {
				'eslint-comments/no-unlimited-disable': 'off',
				'no-restricted-syntax': 'off',
				'unused-imports/no-unused-vars': 'off',
			},
		},
		{
			name: 'eslint-sets/disables/cjs',
			files: ['**/*.js', '**/*.cjs'],
			rules: {
				'ts/no-require-imports': 'off',
			},
		},
		{
			name: 'eslint-sets/disables/config-files',
			files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
			rules: {
				'no-console': 'off',
				'ts/explicit-function-return-type': 'off',
			},
		},
	]
}
