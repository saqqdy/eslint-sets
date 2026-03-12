import { it, expect, describe, afterEach, beforeEach } from 'vitest'
import { parseGitignore, getGitignorePatterns } from '../src/utils/git'
import { rmSync, mkdirSync, existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { tmpdir } from 'node:os'

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
	})

	describe('getGitignorePatterns', () => {
		const tempDir = join(tmpdir(), 'eslint-sets-test-' + Date.now())

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
	})
})
