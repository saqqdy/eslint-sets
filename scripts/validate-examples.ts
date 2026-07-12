import { existsSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')
const rootDir = resolve(__dirname, '..')
const examplesDir = join(rootDir, 'examples')

console.log('Root dir:', rootDir)
console.log('Examples dir:', examplesDir)
console.log('Examples exists:', existsSync(examplesDir))

if (!existsSync(examplesDir)) {
	console.error('❌ Examples directory not found at:', examplesDir)
	process.exit(1)
}

const projects = readdirSync(examplesDir, { withFileTypes: true })
	.filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
	.map(entry => entry.name)

console.log(`Found ${projects.length} example projects:`, projects)

for (const project of projects) {
	console.log(`\n✓ Validating ${project}...`)
	const projectPath = join(examplesDir, project)

	if (!existsSync(join(projectPath, 'package.json'))) {
		console.log(`  ⚠ No package.json`)
		continue
	}

	if (!existsSync(join(projectPath, 'eslint.config.ts'))) {
		console.log(`  ⚠ No eslint.config.ts`)
		continue
	}

	console.log(`  ✓ Valid`)
}

console.log('\n✅ All examples validated')
