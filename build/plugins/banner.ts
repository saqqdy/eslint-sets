import banner, { type Options } from 'rollup-plugin-add-banner'
import { banner as content } from '../config'
import type { Plugin } from 'rollup'

const bannerPlugin = (options: Options): Plugin =>
    banner(
        Object.assign(
            {
                content
            },
            options
        )
    )

export default bannerPlugin
