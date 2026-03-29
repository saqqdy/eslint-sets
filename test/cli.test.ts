import type { Answers } from '../src/cli/types'
import { describe, expect, it } from 'vitest'
import { generateConfig, getDependencies, getInstallCommand } from '../src/cli/index'

describe('CLI', () => {
	describe('generateConfig', () => {
		it('should generate basic config for app type', () => {
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

			const config = generateConfig(answers)

			expect(config).toContain('type: \'app\'')
			expect(config).toContain('@eslint-sets/eslint-config')
		})

		it('should generate config for lib type', () => {
			const answers: Answers = {
				type: 'lib',
				a11y: false,
				formatter: 'prettier',
				frameworks: [],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const config = generateConfig(answers)

			expect(config).toContain('type: \'lib\'')
		})

		it('should include Vue framework with a11y', () => {
			const answers: Answers = {
				type: 'app',
				a11y: true,
				formatter: 'prettier',
				frameworks: ['vue'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const config = generateConfig(answers)

			expect(config).toContain('vue: {')
			expect(config).toContain('a11y: true')
		})

		it('should include Vue framework without a11y', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: ['vue'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const config = generateConfig(answers)

			expect(config).toContain('vue: {')
			expect(config).not.toContain('a11y: true')
		})

		it('should include React framework with a11y', () => {
			const answers: Answers = {
				type: 'app',
				a11y: true,
				formatter: 'prettier',
				frameworks: ['react'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const config = generateConfig(answers)

			expect(config).toContain('react: {')
			expect(config).toContain('a11y: true')
		})

		it('should include other frameworks as boolean', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: ['svelte', 'solid', 'nextjs', 'nuxt', 'astro', 'angular', 'unocss'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const config = generateConfig(answers)

			expect(config).toContain('svelte: true')
			expect(config).toContain('solid: true')
			expect(config).toContain('nextjs: true')
			expect(config).toContain('nuxt: true')
			expect(config).toContain('astro: true')
			expect(config).toContain('angular: true')
			expect(config).toContain('unocss: true')
		})

		it('should use stylistic formatter', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'stylistic',
				frameworks: [],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const config = generateConfig(answers)

			expect(config).toContain('prettier: false')
			expect(config).toContain('stylistic: true')
		})

		it('should disable gitignore when false', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: [],
				gitignore: false,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const config = generateConfig(answers)

			expect(config).toContain('gitignore: false')
		})

		it('should disable sortPackageJson when false', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: [],
				gitignore: true,
				sortPackageJson: false,
				sortTsconfig: true,
				typescript: true,
			}

			const config = generateConfig(answers)

			expect(config).toContain('sortPackageJson: false')
		})

		it('should disable sortTsconfig when false', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: [],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: false,
				typescript: true,
			}

			const config = generateConfig(answers)

			expect(config).toContain('sortTsconfig: false')
		})

		it('should include multiple frameworks with React and Vue', () => {
			const answers: Answers = {
				type: 'app',
				a11y: true,
				formatter: 'prettier',
				frameworks: ['vue', 'react', 'svelte'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const config = generateConfig(answers)

			expect(config).toContain('vue: {')
			expect(config).toContain('react: {')
			expect(config).toContain('svelte: true')
		})
	})

	describe('getDependencies', () => {
		it('should return base dependencies', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: [],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: false,
			}

			const deps = getDependencies(answers)

			expect(deps).toContain('@eslint-sets/eslint-config')
			expect(deps).toContain('eslint')
			expect(deps).toContain('prettier')
		})

		it('should include TypeScript', () => {
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

			const deps = getDependencies(answers)

			expect(deps).toContain('typescript')
		})

		it('should include React dependencies', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: ['react'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const deps = getDependencies(answers)

			expect(deps).toContain('@eslint-react/eslint-plugin')
			expect(deps).toContain('eslint-plugin-react-refresh')
		})

		it('should include Next.js dependencies', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: ['nextjs'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const deps = getDependencies(answers)

			expect(deps).toContain('@next/eslint-plugin-next')
			expect(deps).toContain('@eslint-react/eslint-plugin')
		})

		it('should include Astro dependencies', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: ['astro'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const deps = getDependencies(answers)

			expect(deps).toContain('eslint-plugin-astro')
			expect(deps).toContain('astro-eslint-parser')
		})

		it('should include Angular dependencies', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: ['angular'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const deps = getDependencies(answers)

			expect(deps).toContain('@angular-eslint/eslint-plugin')
			expect(deps).toContain('@angular-eslint/eslint-plugin-template')
			expect(deps).toContain('@angular-eslint/template-parser')
		})

		it('should include UnoCSS dependencies', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: ['unocss'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const deps = getDependencies(answers)

			expect(deps).toContain('@unocss/eslint-plugin')
		})

		it('should include React a11y dependency', () => {
			const answers: Answers = {
				type: 'app',
				a11y: true,
				formatter: 'prettier',
				frameworks: ['react'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const deps = getDependencies(answers)

			expect(deps).toContain('eslint-plugin-jsx-a11y')
		})

		it('should include Vue a11y dependency', () => {
			const answers: Answers = {
				type: 'app',
				a11y: true,
				formatter: 'prettier',
				frameworks: ['vue'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const deps = getDependencies(answers)

			expect(deps).toContain('eslint-plugin-vuejs-accessibility')
		})

		it('should not include prettier with stylistic formatter', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'stylistic',
				frameworks: [],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const deps = getDependencies(answers)

			expect(deps).not.toContain('prettier')
		})

		it('should not include a11y dependencies when a11y is false', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: ['vue', 'react'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const deps = getDependencies(answers)

			expect(deps).not.toContain('eslint-plugin-jsx-a11y')
			expect(deps).not.toContain('eslint-plugin-vuejs-accessibility')
		})

		it('should not duplicate dependencies when both react and nextjs are selected', () => {
			const answers: Answers = {
				type: 'app',
				a11y: false,
				formatter: 'prettier',
				frameworks: ['react', 'nextjs'],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			const deps = getDependencies(answers)

			// Count occurrences of @eslint-react/eslint-plugin
			const reactPluginCount = deps.filter(d => d === '@eslint-react/eslint-plugin').length
			expect(reactPluginCount).toBe(2) // Once for react, once for nextjs
		})
	})

	describe('getInstallCommand', () => {
		it('should generate pnpm command', () => {
			const deps = ['eslint', 'typescript']
			const command = getInstallCommand('pnpm', deps)

			expect(command).toBe('pnpm add -D eslint typescript')
		})

		it('should generate npm command', () => {
			const deps = ['eslint', 'typescript']
			const command = getInstallCommand('npm', deps)

			expect(command).toBe('npm install -D eslint typescript')
		})

		it('should generate yarn command', () => {
			const deps = ['eslint', 'typescript']
			const command = getInstallCommand('yarn', deps)

			expect(command).toBe('yarn add -D eslint typescript')
		})

		it('should generate bun command', () => {
			const deps = ['eslint', 'typescript']
			const command = getInstallCommand('bun', deps)

			expect(command).toBe('bun add -D eslint typescript')
		})

		it('should default to pnpm for unknown package manager', () => {
			const deps = ['eslint']
			const command = getInstallCommand('unknown', deps)

			expect(command).toBe('pnpm add -D eslint')
		})

		it('should handle empty deps array', () => {
			const deps: string[] = []
			const command = getInstallCommand('pnpm', deps)

			expect(command).toBe('pnpm add -D ')
		})

		it('should handle single dependency', () => {
			const deps = ['eslint']
			const command = getInstallCommand('pnpm', deps)

			expect(command).toBe('pnpm add -D eslint')
		})
	})

	describe('Answers type', () => {
		it('should have correct default values', () => {
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

			expect(answers.type).toBe('app')
			expect(answers.a11y).toBe(false)
			expect(answers.formatter).toBe('prettier')
			expect(answers.frameworks).toEqual([])
			expect(answers.gitignore).toBe(true)
			expect(answers.sortPackageJson).toBe(true)
			expect(answers.sortTsconfig).toBe(true)
			expect(answers.typescript).toBe(true)
		})

		it('should support lib type', () => {
			const answers: Answers = {
				type: 'lib',
				a11y: false,
				formatter: 'prettier',
				frameworks: [],
				gitignore: true,
				sortPackageJson: true,
				sortTsconfig: true,
				typescript: true,
			}

			expect(answers.type).toBe('lib')
		})
	})
})
