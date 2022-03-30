import type { PackageManifest } from './types'

export const packages: PackageManifest[] = [
    {
        name: 'core',
        iife: false,
        submodules: true,
        display: 'some core js'
    },
    {
        name: 'utils',
        iife: false,
        display: 'Shared utilities'
    },
]
