import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const examplesDir = join(process.cwd(), 'examples')

describe('Examples Validation', () => {
	const exampleProjects = (() => {
		if (!existsSync(examplesDir)) return []
		return readdirSync(examplesDir, { withFileTypes: true })
			.filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
			.map(entry => entry.name)
	})()

	it('should have example projects', () => {
		expect(exampleProjects.length).toBeGreaterThan(0)
	})

	describe.each(exampleProjects)('Example: %s', projectName => {
		const projectPath = join(examplesDir, projectName)
		const packageJsonPath = join(projectPath, 'package.json')
		const eslintConfigPath = join(projectPath, 'eslint.config.ts')

		it('should have package.json', () => {
			expect(existsSync(packageJsonPath)).toBe(true)
		})

		it('should have eslint.config.ts', () => {
			expect(existsSync(eslintConfigPath)).toBe(true)
		})

		it('should have valid package.json', () => {
			if (!existsSync(packageJsonPath)) return
			const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
			expect(packageJson.name).toBeDefined()
		})
	})
})
