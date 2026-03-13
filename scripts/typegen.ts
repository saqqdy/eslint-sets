import fs from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { config } from '../src/configs'

async function main() {
	// Full options to enable all rules
	const fullOptions = {
		angular: true,
		astro: true,
		autoDetect: false,
		command: true,
		disables: true,
		e18e: true,
		eslintComments: true,
		formatters: true,
		gitignore: false,
		imports: true,
		jsonc: true,
		jsxA11y: true,
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
		type: 'app' as const,
		typescript: true,
		unicorn: true,
		unocss: true,
		vue: true,
		yaml: true,
	}

	const configs = await config(fullOptions).then((c) =>
		c.concat({
			name: 'eslint-sets/builtin-rules',
			plugins: {
				'': {
					rules: Object.fromEntries(builtinRules.entries()),
				},
			},
		}),
	)

	const configNames = configs.map((i) => i.name).filter(Boolean) as string[]

	let dts = await flatConfigsToRulesDTS(configs, {
		includeAugmentation: false,
	})

	dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')}
`

	await fs.writeFile('src/typegen.d.ts', dts, 'utf-8')
	console.log('Generated src/typegen.d.ts')
}

main().catch(console.error)
