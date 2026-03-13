import type { Answers } from './types'
import { existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import * as p from '@clack/prompts'

async function main() {
	console.clear()

	p.intro(' @eslint-sets/eslint-config ')

	const answers: Answers = {
		type: 'app',
		typescript: true,
		frameworks: [],
		formatter: 'prettier',
		gitignore: true,
		sortPackageJson: true,
		sortTsconfig: true,
		a11y: false,
	}

	// Project type
	const projectType = await p.select({
		message: 'What type of project is this?',
		options: [
			{ value: 'app', label: 'Application', hint: 'Web application with relaxed rules' },
			{ value: 'lib', label: 'Library', hint: 'Library with stricter rules' },
		],
	})

	if (p.isCancel(projectType)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.type = projectType as 'app' | 'lib'

	// TypeScript
	const typescript = await p.confirm({
		message: 'Use TypeScript?',
		initialValue: true,
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
			{ value: 'vue', label: 'Vue', hint: 'Vue.js framework' },
			{ value: 'react', label: 'React', hint: 'React library' },
			{ value: 'svelte', label: 'Svelte', hint: 'Svelte framework' },
			{ value: 'solid', label: 'Solid', hint: 'SolidJS framework' },
			{ value: 'nextjs', label: 'Next.js', hint: 'React framework' },
			{ value: 'nuxt', label: 'Nuxt', hint: 'Vue framework' },
			{ value: 'astro', label: 'Astro', hint: 'Static site builder' },
			{ value: 'angular', label: 'Angular', hint: 'Angular framework' },
			{ value: 'unocss', label: 'UnoCSS', hint: 'Atomic CSS engine' },
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
			message: 'Enable accessibility (a11y) rules?',
			initialValue: false,
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
			{ value: 'prettier', label: 'Prettier', hint: 'Popular code formatter' },
			{ value: 'stylistic', label: 'ESLint Stylistic', hint: 'ESLint-based formatting' },
		],
	})

	if (p.isCancel(formatter)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.formatter = formatter as 'prettier' | 'stylistic'

	// Additional options
	const gitignore = await p.confirm({
		message: 'Auto-read .gitignore?',
		initialValue: true,
	})

	if (p.isCancel(gitignore)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.gitignore = gitignore

	const sortPackageJson = await p.confirm({
		message: 'Auto-sort package.json?',
		initialValue: true,
	})

	if (p.isCancel(sortPackageJson)) {
		p.cancel('Operation cancelled.')
		process.exit(0)
	}
	answers.sortPackageJson = sortPackageJson

	const sortTsconfig = await p.confirm({
		message: 'Auto-sort tsconfig.json?',
		initialValue: true,
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
			message: 'eslint.config.ts already exists. Overwrite?',
			initialValue: false,
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

function generateConfig(answers: Answers): string {
	const lines: string[] = [
		'// eslint.config.ts',
		"import eslintConfig from '@eslint-sets/eslint-config'",
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

function getDependencies(answers: Answers): string[] {
	const deps: string[] = ['@eslint-sets/eslint-config', 'eslint']

	if (answers.typescript) {
		deps.push('typescript')
	}

	if (answers.formatter === 'prettier') {
		deps.push('prettier')
	}

	// Framework specific dependencies
	if (answers.frameworks.includes('nextjs')) {
		deps.push('@next/eslint-plugin-next')
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

function getInstallCommand(packageManager: string, deps: string[]): string {
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

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
