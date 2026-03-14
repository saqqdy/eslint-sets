import { describe, expect, it } from 'vitest'
import {
	angular,
	astro,
	command,
	disables,
	e18e,
	eslintComments,
	formatters,
	ignores,
	imports,
	javascript,
	jsonc,
	jsxA11y,
	markdown,
	nextjs,
	node,
	noOnlyTests,
	nuxt,
	perfectionist,
	pnpm,
	prettier,
	react,
	regexp,
	solid,
	sortPackageJson,
	sortTsconfig,
	stylistic,
	svelte,
	test as testConfig,
	toml,
	typescript,
	unicorn,
	unocss,
	vue,
	vueA11y,
	yaml,
} from '../src/configs'

describe('Individual Configs', () => {
	describe('javascript', () => {
		it('should return a valid config', () => {
			const config = javascript()

			expect(config).toBeDefined()
			expect(config.name).toBe('eslint-sets/javascript')
			expect(config.files).toBeDefined()
			expect(config.rules).toBeDefined()
		})
	})

	describe('typescript', () => {
		it('should return valid configs', async () => {
			const configs = await typescript()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
			expect(configs.length).toBeGreaterThan(0)
		})
	})

	describe('vue', () => {
		it('should return valid configs', async () => {
			const configs = await vue()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('react', () => {
		it('should return valid configs', async () => {
			const configs = await react()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('jsonc', () => {
		it('should return valid configs', () => {
			const configs = jsonc()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
			expect(configs[0]?.files).toBeDefined()
		})
	})

	describe('yaml', () => {
		it('should return valid configs', () => {
			const configs = yaml()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('imports', () => {
		it('should return a valid config', () => {
			const config = imports()

			expect(config).toBeDefined()
			expect(config.name).toBe('eslint-sets/imports')
			expect(config.plugins).toBeDefined()
		})
	})

	describe('unicorn', () => {
		it('should return a valid config', () => {
			const config = unicorn()

			expect(config).toBeDefined()
			expect(config.name).toBe('eslint-sets/unicorn')
			expect(config.plugins).toBeDefined()
		})
	})

	describe('perfectionist', () => {
		it('should return a valid config', () => {
			const config = perfectionist()

			expect(config).toBeDefined()
			expect(config.name).toBe('eslint-sets/perfectionist')
			expect(config.rules).toBeDefined()
		})
	})

	describe('regexp', () => {
		it('should return a valid config', () => {
			const config = regexp()

			expect(config).toBeDefined()
			expect(config.name).toBe('eslint-sets/regexp')
			expect(config.plugins).toBeDefined()
		})
	})

	describe('test', () => {
		it('should return a valid config', () => {
			const config = testConfig()

			expect(config).toBeDefined()
			expect(config.name).toBe('eslint-sets/test')
		})
	})

	describe('node', () => {
		it('should return valid configs', () => {
			const configs = node()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
			expect(configs[0]?.name).toBe('eslint-sets/node')
		})
	})

	describe('prettier', () => {
		it('should return valid configs', () => {
			const configs = prettier()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('ignores', () => {
		it('should return a valid config', () => {
			const config = ignores(['**/custom/**'])

			expect(config).toBeDefined()
			expect(config.name).toBe('eslint-sets/ignores')
			expect(config.ignores).toContain('**/custom/**')
		})
	})

	describe('markdown', () => {
		it('should return valid configs', async () => {
			const configs = await markdown()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('disables', () => {
		it('should return valid configs', () => {
			const configs = disables()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('command', () => {
		it('should return valid configs', () => {
			const configs = command()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('nuxt', () => {
		it('should return valid configs', () => {
			const configs = nuxt()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('svelte', () => {
		it('should return valid configs', async () => {
			const configs = await svelte()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('solid', () => {
		it('should return valid configs', async () => {
			const configs = await solid()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('toml', () => {
		it('should return valid configs', () => {
			const configs = toml()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('sortPackageJson', () => {
		it('should return valid configs', async () => {
			const configs = await sortPackageJson()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('sortTsconfig', () => {
		it('should return valid configs', async () => {
			const configs = await sortTsconfig()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('eslintComments', () => {
		it('should return valid configs', async () => {
			const configs = await eslintComments()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('noOnlyTests', () => {
		it('should return valid configs', async () => {
			const configs = await noOnlyTests()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('nextjs', () => {
		it('should return valid configs', async () => {
			const configs = await nextjs()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('astro', () => {
		it('should return valid configs', async () => {
			const configs = await astro()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('angular', () => {
		it('should return valid configs', async () => {
			const configs = await angular()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('unocss', () => {
		it('should return valid configs', async () => {
			const configs = await unocss()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('e18e', () => {
		it('should return valid configs', async () => {
			const configs = await e18e()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('pnpm', () => {
		it('should return valid configs', async () => {
			const configs = await pnpm()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('formatters', () => {
		it('should return valid configs', async () => {
			const configs = await formatters()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('stylistic', () => {
		it('should return valid configs', () => {
			const configs = stylistic()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('jsxA11y', () => {
		it('should return valid configs', async () => {
			const configs = await jsxA11y()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})

	describe('vueA11y', () => {
		it('should return valid configs', async () => {
			const configs = await vueA11y()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})
})
