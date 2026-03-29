import fs from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { config } from '../src/configs'

async function main() {
	// Full options to enable all rules
	const fullOptions = {
		type: 'app' as const,
		angular: true,
		astro: true,
		autoDetect: false,
		command: true,
		comments: true,
		disables: true,
		formatters: true,
		gitignore: false,
		imports: true,
		jsdoc: true,
		jsonc: true,
		jsx: true,
		markdown: true,
		nextjs: true,
		node: true,
		nuxt: true,
		perfectionist: true,
		pnpm: true,
		prettier: false,
		react: true,
		regexp: true,
		solid: true,
		sortPackageJson: true,
		sortTsconfig: true,
		stylistic: true,
		svelte: true,
		test: true,
		toml: true,
		typescript: true,
		unicorn: true,
		unocss: true,
		vue: true,
		yaml: true,
	}

	const configs = await config(fullOptions).then(c =>
		c.concat({
			name: 'eslint-sets/builtin-rules',
			plugins: {
				'': {
					rules: Object.fromEntries(builtinRules.entries()),
				},
			},
		}),
	)

	const configNames = configs.map(i => i.name).filter(Boolean) as string[]

	// Filter out configs that don't have proper plugin structure for typegen
	const validConfigs = configs.filter(c => {
		if (!c.plugins) return false
		return Object.values(c.plugins).every((p: any) => p && typeof p.rules === 'object')
	})

	let dts: string
	try {
		dts = await flatConfigsToRulesDTS(validConfigs, {
			includeAugmentation: false,
		})
	} catch (e) {
		console.warn('Warning: Failed to generate type definitions for some rules')
		console.warn(e)
		dts = ''
	}

	dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

	await fs.writeFile('src/typegen.d.ts', dts, 'utf-8')
	console.log('Generated src/typegen.d.ts')
}

main().catch(console.error)
