import type { Answers } from './types'
import { existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import * as p from '@clack/prompts'

/**
 * Generate ESLint config content based on answers
 */
export function generateConfig(answers: Answers): string {
	const lines: string[] = [
		'// eslint.config.ts',
		'import eslintConfig from \'@eslint-sets/eslint-config\'',
		'',
		'export default eslintConfig({',
		`  type: '${answers.type}',`,
	]

	if (answers.frameworks.length > 0) {
		for (const fw of answers.frameworks) {
			if (fw === 'vue' || fw === 'react') {
				lines.push(`  ${fw}: {`)
				if (answers.a11y) {
					lines.push('    a11y: true,')
				}
				lines.push('  },')
			} else {
				lines.push(`  ${fw}: true,`)
			}
		}
	}

	if (answers.formatter === 'stylistic') {
		lines.push('  prettier: false,')
		lines.push('  stylistic: true,')
	}

	if (!answers.gitignore) {
		lines.push('  gitignore: false,')
	}

	if (!answers.sortPackageJson) {
		lines.push('  sortPackageJson: false,')
	}

	if (!answers.sortTsconfig) {
		lines.push('  sortTsconfig: false,')
	}

	lines.push('})')

	return lines.join('\n')
}

/**
 * Get list of dependencies based on answers
 */
export function getDependencies(answers: Answers): string[] {
	const deps: string[] = ['@eslint-sets/eslint-config', 'eslint']

	if (answers.typescript) {
		deps.push('typescript')
	}

	if (answers.formatter === 'prettier') {
		deps.push('prettier')
	}

	// Framework specific dependencies
	if (answers.frameworks.includes('react')) {
		deps.push('@eslint-react/eslint-plugin')
		deps.push('eslint-plugin-react-refresh')
	}

	if (answers.frameworks.includes('nextjs')) {
		deps.push('@next/eslint-plugin-next')
		deps.push('@eslint-react/eslint-plugin')
		deps.push('eslint-plugin-react-refresh')
	}

	if (answers.frameworks.includes('astro')) {
		deps.push('eslint-plugin-astro')
		deps.push('astro-eslint-parser')
	}

	if (answers.frameworks.includes('angular')) {
		deps.push('@angular-eslint/eslint-plugin')
		deps.push('@angular-eslint/eslint-plugin-template')
		deps.push('@angular-eslint/template-parser')
	}

	if (answers.frameworks.includes('unocss')) {
		deps.push('@unocss/eslint-plugin')
	}

	if (answers.a11y) {
		if (answers.frameworks.includes('react')) {
			deps.push('eslint-plugin-jsx-a11y')
		}
		if (answers.frameworks.includes('vue')) {
			deps.push('eslint-plugin-vuejs-accessibility')
		}
	}

	return deps
}

/**
 * Get install command for package manager
 */
export function getInstallCommand(packageManager: string, deps: string[]): string {
	const depsStr = deps.join(' ')

	switch (packageManager) {
		case 'pnpm':
			return `pnpm add -D ${depsStr}`
		case 'npm':
			return `npm install -D ${depsStr}`
		case 'yarn':
			return `yarn add -D ${depsStr}`
		case 'bun':
			return `bun add -D ${depsStr}`
		default:
			return `pnpm add -D ${depsStr}`
	}
}

async function main() {
	console.clear()

	p.intro(' @eslint-sets/eslint-config ')

	const answers: Answers = {
		type: 'app',
		a11y: false,
		formatter: 'prettier',
		frameworks: [],
		gitignore: true,
		sortPackageJson: true,
		sortTsconfig: true,
		typescript: true,
	}

	// Project type
	const projectType = await p.select({
		message: 'What type of project is this?',
		options: [
			{ value: 'app', hint: 'Web application with relaxed rules', label: 'Application' },
			{ value: 'lib', hint: 'Library with stricter rules', label: 'Library' },
		],
	})

	if (p.isCancel(projectType)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.type = projectType as 'app' | 'lib'

	// TypeScript
	const typescript = await p.confirm({
		initialValue: true,
		message: 'Use TypeScript?',
	})

	if (p.isCancel(typescript)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.typescript = typescript

	// Frameworks
	const frameworks = await p.multiselect({
		message: 'Select frameworks you use',
		options: [
			{ value: 'vue', hint: 'Vue.js framework', label: 'Vue' },
			{ value: 'react', hint: 'React library', label: 'React' },
			{ value: 'svelte', hint: 'Svelte framework', label: 'Svelte' },
			{ value: 'solid', hint: 'SolidJS framework', label: 'Solid' },
			{ value: 'nextjs', hint: 'React framework', label: 'Next.js' },
			{ value: 'nuxt', hint: 'Vue framework', label: 'Nuxt' },
			{ value: 'astro', hint: 'Static site builder', label: 'Astro' },
			{ value: 'angular', hint: 'Angular framework', label: 'Angular' },
			{ value: 'unocss', hint: 'Atomic CSS engine', label: 'UnoCSS' },
		],
		required: false,
	})

	if (p.isCancel(frameworks)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.frameworks = frameworks as string[]

	// Accessibility
	if (answers.frameworks.includes('vue') || answers.frameworks.includes('react')) {
		const a11y = await p.confirm({
			initialValue: false,
			message: 'Enable accessibility (a11y) rules?',
		})

		if (p.isCancel(a11y)) {
			p.cancel('Operation cancelled.')
			process.exit(0)
		}
		answers.a11y = a11y
	}

	// Formatter
	const formatter = await p.select({
		message: 'Choose a formatter',
		options: [
			{ value: 'prettier', hint: 'Popular code formatter', label: 'Prettier' },
			{ value: 'stylistic', hint: 'ESLint-based formatting', label: 'ESLint Stylistic' },
		],
	})

	if (p.isCancel(formatter)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.formatter = formatter as 'prettier' | 'stylistic'

	// Additional options
	const gitignore = await p.confirm({
		initialValue: true,
		message: 'Auto-read .gitignore?',
	})

	if (p.isCancel(gitignore)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.gitignore = gitignore

	const sortPackageJson = await p.confirm({
		initialValue: true,
		message: 'Auto-sort package.json?',
	})

	if (p.isCancel(sortPackageJson)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.sortPackageJson = sortPackageJson

	const sortTsconfig = await p.confirm({
		initialValue: true,
		message: 'Auto-sort tsconfig.json?',
	})

	if (p.isCancel(sortTsconfig)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.sortTsconfig = sortTsconfig

	// Generate config
	const config = generateConfig(answers)

	// Write config file
	const cwd = process.cwd()
	const configPath = resolve(cwd, 'eslint.config.ts')

	if (existsSync(configPath)) {
		const overwrite = await p.confirm({
			initialValue: false,
			message: 'eslint.config.ts already exists. Overwrite?',
		})

		if (p.isCancel(overwrite) || !overwrite) {
			p.cancel('Operation cancelled.')
			process.exit(0)
		}
	}

	writeFileSync(configPath, config, 'utf-8')

	p.note(`Created ${configPath}`, 'Success!')

	// Install dependencies
	const packageManager = await p.select({
		message: 'Choose a package manager',
		options: [
			{ value: 'pnpm', label: 'pnpm' },
			{ value: 'npm', label: 'npm' },
			{ value: 'yarn', label: 'yarn' },
			{ value: 'bun', label: 'bun' },
		],
	})

	if (p.isCancel(packageManager)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}

	const deps = getDependencies(answers)
	const installCommand = getInstallCommand(packageManager as string, deps)

	p.note(`Run the following command to install dependencies:\n\n${installCommand}`, 'Next steps')

	p.outro(' Done! ')
}

main().catch(error => {
	console.error(error)
	process.exit(1)
})
