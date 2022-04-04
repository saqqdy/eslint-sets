#!/usr/bin/env zx
/* global $ */

import { packages } from '../build/packages'

const cmd = process.platform === 'win32' ? 'start' : 'open'

for (const pkg of packages) {
    await $`${cmd} https://npmmirror.com/sync/@eslint-sets/${pkg.pkgName}`
}
