import type { Linter } from 'eslint'
import type { OptionsOverrides } from '../types'

/**
 * Sort package.json configuration options
 */
export interface SortPackageJsonOptions extends OptionsOverrides {
	/**
	 * Glob pattern for package.json files
	 */
	files?: string[]
}

/**
 * Sort tsconfig.json configuration options
 */
export interface SortTsconfigOptions extends OptionsOverrides {
	/**
	 * Glob pattern for tsconfig files
	 */
	files?: string[]
}

/**
 * Sort package.json configuration
 * Note: Requires jsonc plugin to be loaded (via jsonc config)
 */
export async function sortPackageJson(
	options: SortPackageJsonOptions = {},
): Promise<Linter.Config[]> {
	const { files = ['**/package.json'], overrides = {} } = options

	return [
		{
			name: 'eslint-sets/sort-package-json',
			files,
			rules: {
				'jsonc/sort-keys': [
					'error',
					{
						pathPattern: '^$',
						order: [
							'name',
							'version',
							'type',
							'private',
							'packageManager',
							'description',
							'keywords',
							'license',
							'author',
							'contributors',
							'homepage',
							'repository',
							'bugs',
							'funding',
							'sideEffects',
							'bin',
							'main',
							'module',
							'exports',
							'browser',
							'types',
							'typings',
							'typesVersions',
							'files',
							'workspaces',
							'scripts',
							'engines',
							'publishConfig',
							'config',
							'dependencies',
							'devDependencies',
							'optionalDependencies',
							'peerDependencies',
							'peerDependenciesMeta',
							'bundledDependencies',
							'bundleDependencies',
							'overrides',
							'resolutions',
							'pnpm',
						],
					},
					{
						pathPattern: '^(?:dev|optional|peer)?Dependencies$',
						order: { type: 'asc' },
					},
				],

				// User overrides
				...overrides,
			},
		},
	]
}

/**
 * Sort tsconfig.json configuration
 * Note: Requires jsonc plugin to be loaded (via jsonc config)
 */
export async function sortTsconfig(options: SortTsconfigOptions = {}): Promise<Linter.Config[]> {
	const { files = ['**/tsconfig*.json'], overrides = {} } = options

	return [
		{
			name: 'eslint-sets/sort-tsconfig',
			files,
			rules: {
				'jsonc/sort-keys': [
					'error',
					{
						pathPattern: '^(?:compilerOptions|typeAcquisition|typingOptions)$',
						order: { type: 'asc' },
					},
					{
						pathPattern: '^$',
						order: [
							'extends',
							'compilerOptions',
							'typeRoots',
							'types',
							'files',
							'include',
							'exclude',
							'references',
						],
					},
				],

				// User overrides
				...overrides,
			},
		},
	]
}
