import { terser } from 'rollup-plugin-terser'
import type { Plugin } from 'rollup'

const terserPlugin: Plugin = terser({
    format: {
        comments: false
    },
    compress: false
})

export default terserPlugin
