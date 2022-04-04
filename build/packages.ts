import type { PackageManifest } from './types'

export const packages: PackageManifest[] = [
    {
        name: 'core',
        pkgName: 'core',
        iife: false,
        mjs: false,
        submodules: true,
        display: 'some core js'
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
        exportType: 'named',
        display: 'Eslint config sets for eggjs'
    },
    {
        name: 'nuxt',
        pkgName: 'eslint-config-nuxt',
        iife: false,
        mjs: false,
        dts: false,
        exportType: 'named',
        display: 'Eslint config sets for nuxt'
    },
    {
        name: 'react',
        pkgName: 'eslint-config-react',
        iife: false,
        mjs: false,
        dts: false,
        exportType: 'named',
        display: 'Eslint config sets for react'
    },
    {
        name: 'react-ts',
        pkgName: 'eslint-config-react-ts',
        iife: false,
        mjs: false,
        dts: false,
        exportType: 'named',
        display: 'Eslint config sets for react typescript'
    },
    {
        name: 'simple',
        pkgName: 'eslint-config-simple',
        iife: false,
        mjs: false,
        dts: false,
        exportType: 'named',
        display: 'Eslint config sets for simple'
    },
    {
        name: 'simple-ts',
        pkgName: 'eslint-config-simple-ts',
        iife: false,
        mjs: false,
        dts: false,
        exportType: 'named',
        display: 'Eslint config sets for simple typescript'
    },
    {
        name: 'vue',
        pkgName: 'eslint-config-vue',
        iife: false,
        mjs: false,
        dts: false,
        exportType: 'named',
        display: 'Eslint config sets for vue2.0'
    },
    {
        name: 'vue3',
        pkgName: 'eslint-config-vue3',
        iife: false,
        mjs: false,
        dts: false,
        exportType: 'named',
        display: 'Eslint config sets for vue3.0'
    },
    {
        name: 'vue3-ts',
        pkgName: 'eslint-config-vue3-ts',
        iife: false,
        mjs: false,
        dts: false,
        exportType: 'named',
        display: 'Eslint config sets for vue3.0 typescript'
    }
]
