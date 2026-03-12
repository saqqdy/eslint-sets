/**
 * Glob patterns for common file types
 */
export const GLOB_SRC = '**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
export const GLOB_JS = '**/*.{js,mjs,cjs,jsx}'
export const GLOB_TS = '**/*.{ts,mts,cts,tsx}'
export const GLOB_VUE = '**/*.vue'
export const GLOB_REACT = '**/*.{jsx,tsx,js,ts}'
export const GLOB_SVELTE = '**/*.svelte'
export const GLOB_JSON = '**/*.json'
export const GLOB_JSON5 = '**/*.json5'
export const GLOB_JSONC = '**/*.jsonc'
export const GLOB_YAML = '**/*.{yml,yaml}'
export const GLOB_MD = '**/*.md'
export const GLOB_TESTS = '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
export const GLOB_ALL = '**/*'

/**
 * Glob patterns for files to ignore by default
 */
export const GLOB_EXCLUDES = [
	'**/node_modules/**',
	'**/dist/**',
	'**/build/**',
	'**/.output/**',
	'**/.nuxt/**',
	'**/.next/**',
	'**/coverage/**',
	'**/.cache/**',
	'**/.git/**',
	'**/.vscode/**',
	'**/.idea/**',
	'**/*.min.js',
	'**/*.min.css',
	'**/pnpm-lock.yaml',
	'**/package-lock.json',
	'**/yarn.lock',
]
