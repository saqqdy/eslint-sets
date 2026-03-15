import { existsSync, readFileSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'

const { resolve } = path

/**
 * Find a file by walking up parent directories
 * @param name - File name to find
 * @param options - Options
 * @returns File path if found, undefined otherwise
 */
async function findUp(name: string, options?: { cwd?: string }): Promise<string | undefined> {
	let directory = path.resolve(options?.cwd ?? process.cwd())
	const { root } = path.parse(directory)

	while (true) {
		const filePath = path.join(directory, name)

		try {
			const stats = await stat(filePath)

			if (stats.isFile()) {
				return filePath
			}
		} catch {
			// File doesn't exist, continue
		}

		if (directory === root) {
			break
		}

		directory = path.dirname(directory)
	}

	return undefined
}

/**
 * Parse gitignore content into patterns
 */
export function parseGitignore(content: string): string[] {
	return content
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith('#'))
		.map((line) => {
			// Handle negation
			if (line.startsWith('!')) {
				return line
			}

			// Handle directory patterns
			if (line.endsWith('/')) {
				return `${line}**`
			}

			// If pattern doesn't contain a slash, it can match anywhere
			if (!line.includes('/')) {
				return `**/${line}`
			}

			return line
		})
}

/**
 * Find and parse .gitignore file
 */
export async function findGitignore(cwd: string = process.cwd()): Promise<string[]> {
	const gitignorePath = await findUp('.gitignore', { cwd })

	if (!gitignorePath) {
		return []
	}

	try {
		const content = readFileSync(gitignorePath, 'utf-8')

		return parseGitignore(content)
	} catch {
		return []
	}
}

/**
 * Get all gitignore patterns from project root
 */
export async function getGitignorePatterns(cwd: string = process.cwd()): Promise<string[]> {
	const patterns: string[] = []

	// Find .gitignore in current directory and parent directories
	const gitignorePath = await findUp('.gitignore', { cwd })

	if (gitignorePath) {
		try {
			const content = readFileSync(gitignorePath, 'utf-8')

			patterns.push(...parseGitignore(content))
		} catch {
			// Ignore errors
		}
	}

	// Also check for .git/info/exclude
	const gitExcludePath = resolve(cwd, '.git', 'info', 'exclude')

	if (existsSync(gitExcludePath)) {
		try {
			const content = readFileSync(gitExcludePath, 'utf-8')

			patterns.push(...parseGitignore(content))
		} catch {
			// Ignore errors
		}
	}

	return [...new Set(patterns)]
}
