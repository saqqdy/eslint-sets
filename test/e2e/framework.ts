import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ESLint } from 'eslint'

export interface E2EProjectConfig {
	name: string
	framework?: 'vue' | 'react' | 'typescript'
	projectType?: 'app' | 'lib'
	files?: Record<string, string>
	configOptions?: Record<string, any>
	expectations?: { errors?: number, warnings?: number }
}

export class E2ETestRunner {
	async createProject(config: E2EProjectConfig): Promise<string> {
		const root = await mkdtemp(join(tmpdir(), 'e2e-test-'))

		const packageJson = {
			name: config.name,
			type: 'module',
			version: '1.0.0',
			scripts: { lint: 'eslint .' },
			devDependencies: {
				'@eslint-sets/eslint-config': '^6.3.1',
				eslint: '^9.22.0',
			},
		}

		await writeFile(join(root, 'package.json'), JSON.stringify(packageJson, null, 2))
		await writeFile(join(root, 'eslint.config.ts'),
			`import eslintConfig from '@eslint-sets/eslint-config'\nexport default eslintConfig(${JSON.stringify(config.configOptions || {})})`)

		if (config.files) {
			for (const [filePath, content] of Object.entries(config.files)) {
				const fullPath = join(root, filePath)
				await mkdir(join(fullPath, '..'), { recursive: true })
				await writeFile(fullPath, content)
			}
		}

		return root
	}

	async runEslint(root: string): Promise<ESLint.LintResult[]> {
		const eslint = new ESLint({ useEslintrc: false, overrideConfigFile: true })
		return await eslint.lintFiles([root])
	}

	async cleanup(root: string): Promise<void> {
		await rm(root, { recursive: true, force: true })
	}

	async runFullTest(config: E2EProjectConfig): Promise<void> {
		const root = await this.createProject(config)
		try {
			const _results = await this.runEslint(root)
			// Validation logic would go here
		} finally {
			await this.cleanup(root)
		}
	}
}
