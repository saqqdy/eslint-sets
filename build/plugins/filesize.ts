import filesize from 'rollup-plugin-filesize'
import { reporter } from '../utils/rollup'
import type { Plugin } from 'rollup'

const filesizePlugin: Plugin = filesize({ reporter })

export default filesizePlugin
