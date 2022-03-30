import { resolve, normalize } from 'path'
import { promises, readFileSync } from 'fs'
import nodeResolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import shebang from 'rollup-plugin-replace-shebang'
import json from '@rollup/plugin-json'
import { visualizer } from 'rollup-plugin-visualizer'

import type { OutputOptions, Plugin, RollupOptions } from 'rollup'
import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'

export const esbuildPlugin: Plugin = esbuild({
    target: 'es2017',
    minify: false // 避免\u005c被转码
})
export const dtsPlugin: Plugin = dts()
export const resolvePlugin: Plugin = nodeResolve({
    // Use the `package.json` "browser" field
    extensions: ['.mjs', '.js', '.ts'],
    preferBuiltins: true
})
export const visualPlugin: Plugin = visualizer()
export const shebangPlugin: Plugin = shebang({
    shebang: '#!/usr/bin/env node',
    skipBackslash: true // 跳过\u005c 反斜杠
})
export const esbuildMinify = (options: ESBuildOptions) => {
    const { renderChunk } = esbuild(options)
    return {
        name: 'esbuild-minifer',
        renderChunk
    }
}
export const minifyBanner = options => {
    return {
        name: 'replace-plugin',
        renderChunk(code) {
            return `${options.banner}\n${code}`
        }
    }
}
export const injectEslintSetsCore: Plugin = {
    name: 'inject-eslint-sets-core',
    renderChunk(code) {
        const ESLINT_SETS_CORE_IIFE = readFileSync(
            require.resolve('@eslint-sets/core/lib/index.iife.js'),
            'utf-8'
        )
        return `${ESLINT_SETS_CORE_IIFE};\n;${code}`
    }
}
