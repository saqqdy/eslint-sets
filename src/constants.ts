/**
 * Glob patterns for common file types
 */
export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)'
export const GLOB_SRC = `**/*.${GLOB_SRC_EXT}`
export const GLOB_JS = '**/*.?([cm])js'
export const GLOB_JSX = '**/*.?([cm])jsx'
export const GLOB_TS = '**/*.?([cm])ts'
export const GLOB_TSX = '**/*.?([cm])tsx'
export const GLOB_VUE = '**/*.vue'
export const GLOB_REACT = '**/*.{jsx,tsx,js,ts}'
export const GLOB_SVELTE = '**/*.svelte'
export const GLOB_JSON = '**/*.json'
export const GLOB_JSON5 = '**/*.json5'
export const GLOB_JSONC = '**/*.jsonc'
export const GLOB_YAML = '**/*.{yml,yaml}'
export const GLOB_MD = '**/*.md'
export const GLOB_MD_IN_MD = '**/*.md/*.md'
export const GLOB_MD_CODE = '**/*.md/**/*.?([cm])[jt]s?(x)'
export const GLOB_HTML = '**/*.html'
export const GLOB_TESTS = '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
export const GLOB_ALL = '**/*'

/**
 * Glob patterns for specific file types
 */
export const GLOB_ASTRO = '**/*.astro'
export const GLOB_ASTRO_TS = '**/*.astro/*.ts'
export const GLOB_CONFIG_FILES = '**/*.config.{js,ts,mjs,mts,cjs,cts}'
export const GLOB_COMMAND_FILES = [
	'**/scripts/**/*.{js,ts,mjs,mts,cjs,cts}',
	'**/bin/**/*.{js,ts,mjs,mts,cjs,cts}',
	'**/cli/**/*.{js,ts,mjs,mts,cjs,cts}',
	'**/tasks/**/*.{js,ts,mjs,mts,cjs,cts}',
	'**/tools/**/*.{js,ts,mjs,mts,cjs,cts}',
]

/**
 * Glob patterns for files to ignore by default
 */
export const GLOB_EXCLUDES = [
	'**/node_modules',
	'**/dist',
	'**/package-lock.json',
	'**/yarn.lock',
	'**/pnpm-lock.yaml',
	'**/bun.lockb',
	'**/output',
	'**/coverage',
	'**/temp',
	'**/.temp',
	'**/tmp',
	'**/.tmp',
	'**/.history',
	'**/.vitepress/cache',
	'**/.nuxt',
	'**/.next',
	'**/.svelte-kit',
	'**/.vercel',
	'**/.changeset',
	'**/.idea',
	'**/.cache',
	'**/.output',
	'**/.vite-inspect',
	'**/.yarn',
	'**/vite.config.*.timestamp-*',
	'**/CHANGELOG*.md',
	'**/*.min.*',
	'**/LICENSE*',
	'**/__snapshots__',
	'**/auto-import?(s).d.ts',
	'**/components.d.ts',
]

/**
 * Packages that indicate Vue is being used
 */
export const VUE_PACKAGES = ['vue', 'nuxt', 'vitepress', '@slidev/cli', 'vue-tsc']

/**
 * Packages that indicate Next.js is being used
 */
export const NEXTJS_PACKAGES = ['next']

/**
 * Packages that indicate Nuxt is being used
 */
export const NUXT_PACKAGES = ['nuxt', '@nuxt/kit', '@nuxt/schema']

/**
 * Packages that indicate Astro is being used
 */
export const ASTRO_PACKAGES = ['astro']

/**
 * Packages that indicate Angular is being used
 */
export const ANGULAR_PACKAGES = ['@angular/core', '@angular-eslint/eslint-plugin']

/**
 * Packages that indicate UnoCSS is being used
 */
export const UNOCSS_PACKAGES = ['@unocss/eslint-plugin', 'unocss']

/**
 * Packages that indicate React Compiler is being used
 */
export const REACT_COMPILER_PACKAGES = ['babel-plugin-react-compiler']

/**
 * Packages that indicate Remix is being used
 */
export const REMIX_PACKAGES = [
	'@remix-run/node',
	'@remix-run/react',
	'@remix-run/serve',
	'@remix-run/dev',
]

/**
 * Packages that indicate React Router is being used
 */
export const REACT_ROUTER_PACKAGES = [
	'@react-router/node',
	'@react-router/react',
	'@react-router/serve',
	'@react-router/dev',
]

/**
 * Packages that support React Refresh allowConstantExport
 */
export const REACT_REFRESH_ALLOW_CONSTANT_EXPORT_PACKAGES = ['vite']

/**
 * Editor environment indicators
 */
export const EDITOR_ENV_KEYS = [
	'VSCODE_PID',
	'VSCODE_CWD',
	'JETBRAINS_IDE',
	'WEBIDE_PID',
	'TERM_PROGRAM',
]
