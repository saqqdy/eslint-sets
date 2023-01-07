import type { PackageManifest } from './types'

export const packages: PackageManifest[] = [
	{
		name: 'all',
		pkgName: 'eslint-config',
		iife: false,
		mjs: false,
		dts: false,
		display: 'Eslint config all sets'
	},
	{
		name: 'basic',
		pkgName: 'eslint-config-basic',
		iife: false,
		mjs: false,
		dts: false,
		submodules: true,
		display: 'Eslint config basic sets'
	},
	{
		name: 'ts',
		pkgName: 'eslint-config-ts',
		iife: false,
		mjs: false,
		dts: false,
		display: 'Eslint config basic sets for typescript'
	},
	{
		name: 'egg',
		pkgName: 'eslint-config-egg',
		iife: false,
		mjs: false,
		dts: false,
		display: 'Eslint config sets for eggjs'
	},
	{
		name: 'nuxt',
		pkgName: 'eslint-config-nuxt',
		iife: false,
		mjs: false,
		dts: false,
		display: 'Eslint config sets for nuxt'
	},
	{
		name: 'react',
		pkgName: 'eslint-config-react',
		iife: false,
		mjs: false,
		dts: false,
		display: 'Eslint config sets for react'
	},
	{
		name: 'vue',
		pkgName: 'eslint-config-vue',
		iife: false,
		mjs: false,
		dts: false,
		display: 'Eslint config sets for vue'
	}
]
