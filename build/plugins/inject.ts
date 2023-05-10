import injectCode, { type Options } from 'rollup-plugin-inject-code'
import type { Plugin } from 'rollup'

const injectEslintSetsCore = (options: Options): Plugin =>
	injectCode(
		Object.assign(
			{
				path: '@eslint-sets/core/lib/index.iife.js',
				position: 'before'
			},
			options
		)
	)

export default injectEslintSetsCore
