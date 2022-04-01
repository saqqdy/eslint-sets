import type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import type { Plugin } from 'rollup'

const nodeResolvePlugin = (options: RollupNodeResolveOptions = {}): Plugin =>
	nodeResolve(
		Object.assign(
			{
				extensions: [
					'.mjs',
					'.js',
					'.ts',
					'.tsx',
					'.jsx',
					'.json',
					'.less',
					'.css'
				]
				// preferBuiltins: true
			},
			options
		)
	)

export default nodeResolvePlugin
