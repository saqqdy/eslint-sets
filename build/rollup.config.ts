import { resolve, normalize } from 'path'
import fg from 'fast-glob'
import { packages } from './packages'
import {
    esbuild,
    dts as dtsPlugin,
    terser,
    filesize,
    nodeResolve,
    visual,
    banner as bannerPlugin,
    minify
} from './plugins'

import type { OutputOptions, RollupOptions } from 'rollup'

// const production = !process.env.ROLLUP_WATCH

const options: RollupOptions[] = []
const externals = ['js-cool', '@eslint-sets/utils', '@eslint-sets/core']

for (const {
    globals = {},
    name,
    external = [],
    submodules,
    iife,
    build,
    cjs,
    mjs,
    dts,
    target
} of packages) {
    if (build === false) continue
    const pkg = require(`packages/${name}/package.json`)
    const banner =
        '/*!\n' +
        ' * ' +
        pkg.name +
        ' v' +
        pkg.version +
        '\n' +
        ' * ' +
        pkg.description +
        '\n' +
        ' * (c) 2021-' +
        new Date().getFullYear() +
        ' saqqdy<https://github.com/saqqdy> \n' +
        ' * Released under the MIT License.\n' +
        ' */'
    // const deps = Object.keys(pkg.dependencies || {})
    const iifeGlobals = {
        'js-cool': 'JsCool',
        '@eslint-sets/utils': 'EslintSets',
        '@eslint-sets/core': 'EslintSets',
        ...globals
    }
    const iifeName = 'EslintSets'
    const functionNames = ['index']

    // submodules
    if (submodules)
        functionNames.push(
            ...fg
                .sync('*/index.ts', { cwd: resolve(`packages/${name}`) })
                .map(i => i.split('/')[0])
        )

    for (const fn of functionNames) {
        const input =
            fn === 'index'
                ? `packages/${name}/index.ts`
                : `packages/${name}/${fn}/index.ts`
        const output: OutputOptions[] = []
        // output mjs
        if (mjs !== false) {
            output.push({
                file: `packages/${name}/dist/${fn}.mjs`,
                exports: 'auto',
                banner,
                format: 'es'
            })
        }
        // output cjs
        if (cjs !== false) {
            output.push({
                file: `packages/${name}/dist/${fn}.cjs`,
                exports: 'named',
                banner,
                format: 'cjs'
            })
        }
        // output iife
        if (iife !== false) {
            output.push(
                {
                    file: `packages/${name}/dist/${fn}.iife.js`,
                    format: 'iife',
                    exports: 'named',
                    name: iifeName,
                    extend: true,
                    globals: iifeGlobals,
                    banner,
                    plugins: [
                        // injectEslintSetsCore,
                    ]
                },
                {
                    file: `packages/${name}/dist/${fn}.iife.min.js`,
                    format: 'iife',
                    exports: 'named',
                    name: iifeName,
                    extend: true,
                    globals: iifeGlobals,
                    plugins: [
                        // injectEslintSetsCore,
                        minify({
                            minify: true
                        }),
                        bannerPlugin({
                            content: banner
                        })
                    ]
                }
            )
        }

        // create library options
        options.push({
            input,
            output,
            plugins: [
                nodeResolve,
                target ? esbuild({ target }) : esbuild(),
                filesize
            ],
            external: [...externals, ...external]
            // external(id) {
            //     return (
            //         ['regenerator-runtime', ...externals, ...external].some(k =>
            //             new RegExp('^' + k).test(id)
            //         ) || deps.some(k => new RegExp('^' + k).test(id))
            //     )
            // }
        })

        // create dts options
        if (dts !== false) {
            options.push({
                input,
                output: {
                    file: `packages/${name}/dist/${fn}.d.ts`,
                    format: 'es'
                },
                plugins: [dtsPlugin],
                external: [...externals, ...external]
            })
        }
    }
}

export default options
