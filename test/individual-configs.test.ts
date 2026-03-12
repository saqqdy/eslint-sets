import { it, expect, describe } from 'vitest'
import {
	vue,
	yaml,
	node,
	jsonc,
	regexp,
	imports,
	unicorn,
	prettier,
	javascript,
	typescript,
	perfectionist,
	test as testConfig,
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
		it('should return valid configs', () => {
			const configs = typescript()
			expect(configs).toBeDefined()
			expect(Array.isArray(configs)).toBeTruthy()
			expect(configs.length).toBeGreaterThan(0)
		})
	})

	describe('vue', () => {
		it('should return valid configs', () => {
			const configs = vue()
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
})
