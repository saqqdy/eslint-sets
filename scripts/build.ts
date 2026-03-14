import { build } from 'esbuild'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = resolve(fileURLToPath(import.meta.url), '../../dist')

// Clean output directory
if (existsSync(outDir)) {
	rmSync(outDir, { recursive: true })
}
mkdirSync(outDir, { recursive: true })
mkdirSync(resolve(outDir, 'cli'), { recursive: true })

async function main() {
	// Generate types first
	console.log('Generating types...')
	execSync('jiti scripts/typegen.ts', { stdio: 'inherit' })

	console.log('Building...')

	// Main ESM build
	await build({
		bundle: true,
		entryPoints: ['src/index.ts'],
		format: 'esm',
		outfile: 'dist/index.mjs',
		packages: 'external',
		platform: 'node',
		splitting: false,
	})

	// Main CJS build
	await build({
		bundle: true,
		entryPoints: ['src/index.ts'],
		format: 'cjs',
		outfile: 'dist/index.js',
		packages: 'external',
		platform: 'node',
	})

	// CLI ESM build
	await build({
		banner: { js: '#!/usr/bin/env node' },
		bundle: true,
		entryPoints: ['src/cli/index.ts'],
		format: 'esm',
		outfile: 'dist/cli/index.mjs',
		packages: 'external',
		platform: 'node',
	})

	// CLI CJS build
	await build({
		banner: { js: '#!/usr/bin/env node' },
		bundle: true,
		entryPoints: ['src/cli/index.ts'],
		format: 'cjs',
		outfile: 'dist/cli/index.js',
		packages: 'external',
		platform: 'node',
	})

	// Generate declaration files using tsc
	console.log('Generating declaration files...')
	try {
		execSync('tsc --emitDeclarationOnly --declaration --outDir dist', { stdio: 'inherit' })
	} catch {
		// tsc may have type errors but still generate .d.ts files
		console.log('TypeScript completed with some type errors (non-blocking)')
	}

	console.log('Done!')
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
