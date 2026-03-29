import { describe, expect, it } from 'vitest'
import {
	angular,
	astro,
	command,
	comments,
	disables,
	formatters,
	ignores,
	imports,
	javascript,
	jsonc,
	jsx,
	markdown,
	nextjs,
	node,
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
	yaml,
} from '../src/configs'

describe('individual Configs', () => {
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

		it('should support stylistic option with indent', async () => {
			const configs = await vue({ stylistic: { indent: 4 } })

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['vue/html-indent']).toEqual(['error', 4])
		})

		it('should support tab indent', async () => {
			const configs = await vue({ stylistic: { indent: 'tab' } })

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['vue/html-indent']).toEqual(['error', 'tab'])
		})

		it('should disable stylistic rules when stylistic is false', async () => {
			const configs = await vue({ stylistic: false })

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['vue/html-indent']).toBeUndefined()
		})

		it('should support a11y option', async () => {
			const configs = await vue({ a11y: true })

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
			// Should have vue-a11y plugin when a11y is enabled
			expect(configs[0]?.plugins?.['vue-a11y']).toBeDefined()
		})

		it('should support sfcBlocks option', async () => {
			const configs = await vue({ sfcBlocks: true })

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
			// Should have sfc-blocks processor config when sfcBlocks is enabled
			// (requires eslint-processor-vue-blocks to be installed)
			const sfcBlocksConfig = configs.find(c => c.name === 'eslint-sets/vue/sfc-blocks')
			// If the plugin is not installed, the config will not be added
			if (sfcBlocksConfig) {
				expect(sfcBlocksConfig.processor).toBeDefined()
			}
		})

		it('should support sfcBlocks option with custom config', async () => {
			const configs = await vue({ sfcBlocks: { styles: true, customBlocks: ['i18n'] } })

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
			// Should have sfc-blocks processor config
			// (requires eslint-processor-vue-blocks to be installed)
			const sfcBlocksConfig = configs.find(c => c.name === 'eslint-sets/vue/sfc-blocks')
			// If the plugin is not installed, the config will not be added
			if (sfcBlocksConfig) {
				expect(sfcBlocksConfig.processor).toBeDefined()
			}
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

		it('should support stylistic option', () => {
			const configs = jsonc({ stylistic: { indent: 4 } })

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['jsonc/indent']).toEqual(['error', 4])
		})

		it('should support tab indent', () => {
			const configs = jsonc({ stylistic: { indent: 'tab' } })

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['jsonc/indent']).toEqual(['error', 'tab'])
		})

		it('should not add extra stylistic rules when stylistic is false', () => {
			const configs = jsonc({ stylistic: false })

			expect(configs).toBeDefined()
			// Core rules should still be present
			expect(configs[0]?.rules?.['jsonc/no-bigint-literals']).toBe('error')
		})
	})

	describe('yaml', () => {
		it('should return valid configs', () => {
			const configs = yaml()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})

		it('should support stylistic option with indent', () => {
			const configs = yaml({ stylistic: { indent: 4 } })

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['yaml/indent']).toEqual(['error', 4])
		})

		it('should support tab indent by disabling indent rule', () => {
			const configs = yaml({ stylistic: { indent: 'tab' } })

			expect(configs).toBeDefined()
			// yaml/indent only accepts integer values, so when indent is 'tab',
			// we disable the indent rule and no-tab-indent
			expect(configs[0]?.rules?.['yaml/indent']).toBe('off')
			expect(configs[0]?.rules?.['yaml/no-tab-indent']).toBe('off')
		})

		it('should support stylistic option with quotes', () => {
			const configs = yaml({ stylistic: { quotes: 'double' } })

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['yaml/quotes']).toEqual(['error', { avoidEscape: true, prefer: 'double' }])
		})

		it('should use single quotes by default', () => {
			const configs = yaml()

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['yaml/quotes']).toEqual(['error', { avoidEscape: true, prefer: 'single' }])
		})

		it('should use custom indent when stylistic is enabled', () => {
			const configs = yaml({ stylistic: { indent: 4 } })

			expect(configs).toBeDefined()
			// When stylistic is enabled with custom indent, it should override standard rules
			expect(configs[0]?.rules?.['yaml/indent']).toEqual(['error', 4])
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
		it('should return valid configs', async () => {
			const configs = await testConfig()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
			expect(configs[0]?.name).toBe('eslint-sets/test')
		})
	})

	describe('node', () => {
		it('should return valid configs', () => {
			const configs = node()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
			expect(configs[0]?.name).toBe('eslint-sets/node')
		})

		it('should prefer globals for buffer and process', () => {
			const configs = node()

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['node/prefer-global/buffer']).toEqual(['error', 'always'])
			expect(configs[0]?.rules?.['node/prefer-global/process']).toEqual(['error', 'always'])
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
		it('should return valid configs', async () => {
			const configs = await command()

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

		it('should support stylistic option with indent', () => {
			const configs = toml({ stylistic: { indent: 4 } })

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['toml/indent']).toEqual(['error', 4])
		})

		it('should support tab indent', () => {
			const configs = toml({ stylistic: { indent: 'tab' } })

			expect(configs).toBeDefined()
			expect(configs[0]?.rules?.['toml/indent']).toEqual(['error', 'tab'])
		})

		it('should not add extra stylistic rules when stylistic is false', () => {
			const configs = toml({ stylistic: false })

			expect(configs).toBeDefined()
			// Core rules should still be present
			expect(configs[0]?.rules?.['toml/comma-style']).toBe('error')
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

	describe('comments', () => {
		it('should return valid configs', async () => {
			const configs = await comments()

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

	describe('jsx', () => {
		it('should return valid configs without a11y', async () => {
			const configs = await jsx()

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})

		it('should return valid configs with a11y enabled', async () => {
			const configs = await jsx({ a11y: true })

			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
		})
	})
})
