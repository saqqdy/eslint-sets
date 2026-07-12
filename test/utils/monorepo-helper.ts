import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export interface MonorepoPackage {
	name: string
	type: 'app' | 'lib'
	framework?: 'vue' | 'react' | 'svelte' | 'typescript'
	dependencies?: string[]
}

export interface MonorepoConfig {
	tool: 'pnpm-workspace' | 'turborepo' | 'nx'
	packages: MonorepoPackage[]
	dependencies?: Record<string, string[]>
}

export class TempMonorepo {
	private root: string

	constructor() {
		this.root = join(tmpdir, `monorepo-test-${Date.now()}`)
	}

	async create(config: MonorepoConfig): Promise<string> {
		mkdirSync(this.root, { recursive: true })

		if (config.tool === 'pnpm-workspace') {
			writeFileSync(
				join(this.root, 'pnpm-workspace.yaml'),
				'packages:\n  - "packages/*"\n  - "apps/*"\n',
			)
		}

		const rootPackageJson = {
			name: 'monorepo-root',
			private: true,
			scripts: { lint: 'eslint .' },
			devDependencies: {
				'@eslint-sets/eslint-config': '^6.3.1',
				eslint: '^9.22.0',
				typescript: '^5.9.0',
			},
		}

		writeFileSync(join(this.root, 'package.json'), JSON.stringify(rootPackageJson, null, 2))
		writeFileSync(join(this.root, 'eslint.config.ts'),
			'import eslintConfig from \'@eslint-sets/eslint-config\'\nexport default eslintConfig({ typescript: true })')

		for (const pkg of config.packages) {
			await this.createPackage(pkg, config.dependencies?.[pkg.name] || [])
		}

		return this.root
	}

	private async createPackage(pkg: MonorepoPackage, dependencies: string[]): Promise<void> {
		const pkgDir = join(this.root, pkg.type === 'app' ? 'apps' : 'packages', pkg.name)
		mkdirSync(pkgDir, { recursive: true })

		const packageJson = {
			name: pkg.name,
			version: '1.0.0',
			scripts: { lint: 'eslint .' },
			dependencies: dependencies.reduce((acc, dep) => ({ ...acc, [dep]: 'workspace:*' }), {}),
			devDependencies: { '@eslint-sets/eslint-config': '^6.3.1', eslint: '^9.22.0' },
		}

		if (pkg.framework) packageJson.devDependencies.typescript = '^5.9.0'

		writeFileSync(join(pkgDir, 'package.json'), JSON.stringify(packageJson, null, 2))

		mkdirSync(join(pkgDir, 'src'), { recursive: true })
		writeFileSync(join(pkgDir, 'src/index.ts'),
			`export const ${pkg.name.replace(/-/g, '_')} = 'Hello from ${pkg.name}'`)

		if (pkg.type === 'lib') {
			writeFileSync(join(pkgDir, 'src/types.ts'), `export interface ${pkg.name}Config { name: string }\n`)
		}
	}

	async cleanup(): Promise<void> {
		try {
			rmSync(this.root, { recursive: true, force: true })
		} catch {}
	}
}

export function createMonorepoConfig(overrides?: Partial<MonorepoConfig>): MonorepoConfig {
	return {
		tool: 'pnpm-workspace',
		packages: [
			{ name: 'shared-lib', type: 'lib', framework: 'typescript' },
			{ name: 'web-app', type: 'app', framework: 'vue', dependencies: ['shared-lib'] },
		],
		...overrides,
	}
}
