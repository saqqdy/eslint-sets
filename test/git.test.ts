import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { findGitignore, getGitignorePatterns, parseGitignore } from '../src/utils/git'

const { join } = path

describe('Git Utils', () => {
	describe('parseGitignore', () => {
		it('should parse basic patterns', () => {
			const content = `node_modules
dist
*.log`
			const patterns = parseGitignore(content)

			expect(patterns).toContain('**/node_modules')
			expect(patterns).toContain('**/dist')
			expect(patterns).toContain('**/*.log')
		})

		it('should ignore comments', () => {
			const content = `# This is a comment
node_modules
# Another comment
dist`
			const patterns = parseGitignore(content)

			expect(patterns).not.toContain('# This is a comment')
			expect(patterns).toContain('**/node_modules')
			expect(patterns).toContain('**/dist')
		})

		it('should handle empty lines', () => {
			const content = `node_modules

dist

*.log`
			const patterns = parseGitignore(content)

			expect(patterns).toHaveLength(3)
		})

		it('should handle negation patterns', () => {
			const content = `*.log
!important.log`
			const patterns = parseGitignore(content)

			expect(patterns).toContain('**/*.log')
			expect(patterns).toContain('!important.log')
		})

		it('should handle directory patterns', () => {
			const content = `node_modules/
dist/`
			const patterns = parseGitignore(content)

			expect(patterns).toContain('node_modules/**')
			expect(patterns).toContain('dist/**')
		})

		it('should handle patterns with slashes', () => {
			const content = `src/**/*.test.ts
build/output/`
			const patterns = parseGitignore(content)

			expect(patterns).toContain('src/**/*.test.ts')
			expect(patterns).toContain('build/output/**')
		})

		it('should handle patterns without slashes', () => {
			const content = `*.log
*.tmp`
			const patterns = parseGitignore(content)

			expect(patterns).toContain('**/*.log')
			expect(patterns).toContain('**/*.tmp')
		})
	})

	describe('findGitignore', () => {
		it('should return empty array when no .gitignore exists', async () => {
			const tempDir = join(tmpdir(), `eslint-sets-test-find-${Date.now()}`)

			mkdirSync(tempDir, { recursive: true })
			const patterns = await findGitignore(tempDir)

			expect(patterns).toEqual([])
			rmSync(tempDir, { recursive: true })
		})
	})

	describe('getGitignorePatterns', () => {
		const tempDir = join(tmpdir(), `eslint-sets-test-${Date.now()}`)

		beforeEach(() => {
			if (existsSync(tempDir)) {
				rmSync(tempDir, { recursive: true })
			}
			mkdirSync(tempDir, { recursive: true })
		})

		afterEach(() => {
			if (existsSync(tempDir)) {
				rmSync(tempDir, { recursive: true })
			}
		})

		it('should return empty array when no .gitignore exists', async () => {
			const patterns = await getGitignorePatterns(tempDir)

			expect(patterns).toEqual([])
		})

		it('should read .gitignore from directory', async () => {
			writeFileSync(join(tempDir, '.gitignore'), 'node_modules\ndist\n*.log')
			const patterns = await getGitignorePatterns(tempDir)

			expect(patterns.length).toBeGreaterThan(0)
			expect(patterns).toContain('**/node_modules')
		})

		it('should also read .git/info/exclude if exists', async () => {
			writeFileSync(join(tempDir, '.gitignore'), 'node_modules')
			// Create .git/info directory and exclude file
			mkdirSync(join(tempDir, '.git', 'info'), { recursive: true })
			writeFileSync(join(tempDir, '.git', 'info', 'exclude'), 'dist\n*.log')
			const patterns = await getGitignorePatterns(tempDir)

			expect(patterns).toContain('**/node_modules')
			expect(patterns).toContain('**/dist')
			expect(patterns).toContain('**/*.log')
		})

		it('should deduplicate patterns', async () => {
			writeFileSync(join(tempDir, '.gitignore'), 'node_modules\ndist')
			mkdirSync(join(tempDir, '.git', 'info'), { recursive: true })
			writeFileSync(join(tempDir, '.git', 'info', 'exclude'), 'node_modules\n*.log')
			const patterns = await getGitignorePatterns(tempDir)
			// node_modules should only appear once
			const nodeModulesCount = patterns.filter((p) => p.includes('node_modules')).length

			expect(nodeModulesCount).toBe(1)
		})
	})
})
