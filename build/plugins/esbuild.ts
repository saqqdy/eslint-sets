import esbuild, { type Options } from 'rollup-plugin-esbuild'
import type { Plugin } from 'rollup'

export const esbuildPlugin = (options: Options = {}): Plugin =>
    esbuild({
        minify: false, // 避免\u005c被转码
        sourceMap: options.minify || false,
        target: 'es2017',
        define: {
            'process.env.NODE_ENV': JSON.stringify('production')
        },
        ...options
    })

export default esbuildPlugin
