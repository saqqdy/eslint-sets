import type { PackageManifest } from './types'

export const packages: PackageManifest[] = [
	{
		name: 'monorepo',
		pkgName: '@eslint-sets/monorepo',
		build: false,
		display: 'Eslint config sets'
	},
	{
		name: 'all',
		pkgName: '@eslint-sets/eslint-config',
		iife: false,
		browser: false,
		mjs: false,
		display: 'Eslint config all sets'
	},
	{
		name: 'basic',
		pkgName: '@eslint-sets/eslint-config-basic',
		iife: false,
		browser: false,
		mjs: false,
		submodules: true,
		display: 'Eslint config basic sets'
	},
	{
		name: 'ts',
		pkgName: '@eslint-sets/eslint-config-ts',
		iife: false,
		browser: false,
		mjs: false,
		display: 'Eslint config basic sets for typescript'
	},
	{
		name: 'egg',
		pkgName: '@eslint-sets/eslint-config-egg',
		iife: false,
		browser: false,
		mjs: false,
		display: 'Eslint config sets for eggjs'
	},
	{
		name: 'nuxt',
		pkgName: '@eslint-sets/eslint-config-nuxt',
		iife: false,
		browser: false,
		mjs: false,
		display: 'Eslint config sets for nuxt'
	},
	{
		name: 'react',
		pkgName: '@eslint-sets/eslint-config-react',
		iife: false,
		browser: false,
		mjs: false,
		display: 'Eslint config sets for react'
	},
	{
		name: 'vue',
		pkgName: '@eslint-sets/eslint-config-vue',
		iife: false,
		browser: false,
		mjs: false,
		display: 'Eslint config sets for vue2.0'
	},
	{
		name: 'vue3',
		pkgName: '@eslint-sets/eslint-config-vue3',
		iife: false,
		browser: false,
		mjs: false,
		display: 'Eslint config sets for vue3.0'
	},
	{
		name: 'svelte',
		pkgName: '@eslint-sets/eslint-config-svelte',
		iife: false,
		browser: false,
		mjs: false,
		display: 'Eslint config sets for svelte'
	}
]

export const packageNames = packages.map(({ pkgName }) => pkgName)

export function getPackages(name?: string | string[]) {
	if (!name) return packages

	const list = packages.filter(item => ([] as string[]).concat(name).includes(item.name))
	if (list.length === 0) {
		console.info(`no package founded`)
		return packages
	}

	return list
}
