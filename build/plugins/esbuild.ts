import _esbuild, { type Options } from 'rollup-plugin-esbuild'
import type { Plugin } from 'rollup'

export const esbuild = (options: Options = {}): Plugin =>
	_esbuild({
		minify: false, // Avoid \u005c being transcoded
		sourceMap: options.minify || false,
		target: 'es2017',
		define: {
			'process.env.NODE_ENV': JSON.stringify('production')
		},
		...options
	})

export default esbuild
