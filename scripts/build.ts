import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

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
		banner: { js: '#!/usr/bin/env node' },
		bundle: true,
		entryPoints: ['src/index.ts'],
		format: 'esm',
		outfile: 'dist/index.js',
		packages: 'external',
		platform: 'node',
	})

	// CLI build
	await build({
		banner: { js: '#!/usr/bin/env node' },
		bundle: true,
		entryPoints: ['src/cli/index.ts'],
		format: 'esm',
		outfile: 'dist/cli/index.js',
		packages: 'external',
		platform: 'node',
	})

	// Generate declaration files using tsc (hard-fail on type errors so the
	// published .d.ts are always valid — see prepublishOnly typecheck gate)
	console.log('Generating declaration files...')
	execSync('tsc --emitDeclarationOnly --declaration --outDir dist', { stdio: 'inherit' })

	console.log('Done!')
}

main().catch(error => {
	console.error(error)
	process.exit(1)
})
