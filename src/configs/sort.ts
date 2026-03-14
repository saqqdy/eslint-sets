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
 *
 * Order based on master branch configuration
 */
export async function sortPackageJson(
	options: SortPackageJsonOptions = {},
): Promise<Linter.Config[]> {
	const { files = ['**/package.json'], overrides = {} } = options

	return [
		{
			files,
			name: 'eslint-sets/sort-package-json',
			rules: {
				'jsonc/sort-keys': [
					'error',
					{
						order: [
							'publisher',
							'name',
							'displayName',
							'icon',
							'description',
							'type',
							'version',
							'private',
							'packageManager',
							'bin',
							'main',
							'module',
							'unpkg',
							'jsdelivr',
							'types',
							'typings',
							'typesVersions',
							'exports',
							'files',
							'categories',
							'scripts',
							'activationEvents',
							'dependencies',
							'devDependencies',
							'peerDependencies',
							'peerDependenciesMeta',
							'optionalDependencies',
							'engines',
							'resolutions',
							'overrides',
							'sideEffects',
							'pnpm',
							'keywords',
							'license',
							'author',
							'homepage',
							'bugs',
							'repository',
							'simple-git-hooks',
							'funding',
							'husky',
							'lint-staged',
							'eslintConfig',
							'contributes',
						],
						// Root level package.json keys order (from master branch)
						pathPattern: '^$',
					},
					{
						order: { type: 'asc' },
						// Sort dependencies alphabetically
						pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
					},
					{
						order: ['types', 'require', 'import'],
						// Sort exports
						pathPattern: '^exports.*$',
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
	const { files = ['**/[jt]sconfig.json', '**/[jt]sconfig.*.json'], overrides = {} } = options

	return [
		{
			files,
			name: 'eslint-sets/sort-tsconfig',
			rules: {
				'jsonc/sort-keys': [
					'error',
					{
						// Root level tsconfig keys order
						order: ['extends', 'compilerOptions', 'references', 'files', 'include', 'exclude'],
						pathPattern: '^$',
					},
					{
						// compilerOptions keys order
						order: [
							/* Projects */
							'incremental',
							'composite',
							'tsBuildInfoFile',
							'disableSourceOfProjectReferenceRedirect',
							'disableSolutionSearching',
							'disableReferencedProjectLoad',
							/* Language and Environment */
							'target',
							'jsx',
							'jsxFactory',
							'jsxFragmentFactory',
							'jsxImportSource',
							'lib',
							'moduleDetection',
							'noLib',
							'reactNamespace',
							'useDefineForClassFields',
							'emitDecoratorMetadata',
							'experimentalDecorators',
							'libReplacement',
							/* Modules */
							'baseUrl',
							'rootDir',
							'rootDirs',
							'customConditions',
							'module',
							'moduleResolution',
							'moduleSuffixes',
							'noResolve',
							'paths',
							'resolveJsonModule',
							'resolvePackageJsonExports',
							'resolvePackageJsonImports',
							'typeRoots',
							'types',
							'allowArbitraryExtensions',
							'allowImportingTsExtensions',
							'allowUmdGlobalAccess',
							/* JavaScript Support */
							'allowJs',
							'checkJs',
							'maxNodeModuleJsDepth',
							/* Type Checking */
							'strict',
							'strictBindCallApply',
							'strictFunctionTypes',
							'strictNullChecks',
							'strictPropertyInitialization',
							'allowUnreachableCode',
							'allowUnusedLabels',
							'alwaysStrict',
							'exactOptionalPropertyTypes',
							'noFallthroughCasesInSwitch',
							'noImplicitAny',
							'noImplicitOverride',
							'noImplicitReturns',
							'noImplicitThis',
							'noPropertyAccessFromIndexSignature',
							'noUncheckedIndexedAccess',
							'noUnusedLocals',
							'noUnusedParameters',
							'useUnknownInCatchVariables',
							/* Emit */
							'declaration',
							'declarationDir',
							'declarationMap',
							'downlevelIteration',
							'emitBOM',
							'emitDeclarationOnly',
							'importHelpers',
							'importsNotUsedAsValues',
							'inlineSourceMap',
							'inlineSources',
							'mapRoot',
							'newLine',
							'noEmit',
							'noEmitHelpers',
							'noEmitOnError',
							'outDir',
							'outFile',
							'preserveConstEnums',
							'preserveValueImports',
							'removeComments',
							'sourceMap',
							'sourceRoot',
							'stripInternal',
							/* Interop Constraints */
							'allowSyntheticDefaultImports',
							'esModuleInterop',
							'forceConsistentCasingInFileNames',
							'isolatedDeclarations',
							'isolatedModules',
							'preserveSymlinks',
							'verbatimModuleSyntax',
							'erasableSyntaxOnly',
							/* Completeness */
							'skipDefaultLibCheck',
							'skipLibCheck',
						],
						pathPattern: '^compilerOptions$',
					},
				],

				// User overrides
				...overrides,
			},
		},
	]
}
