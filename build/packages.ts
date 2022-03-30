import type { PackageManifest } from './types'

export const packages: PackageManifest[] = [
    {
        name: 'core',
        iife: false,
        submodules: true,
        display: 'some core js'
    },
    {
        name: 'vue',
        iife: false,
        display: 'Eslint config sets for vue2.0'
    }
]
