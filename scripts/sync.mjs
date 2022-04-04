#!/usr/bin/env zx
/* global $ */

import { packages } from '../build/packages'

let cmd = 'open'
if (process.platform === 'win32') cmd = 'start'

for (const pkg of packages) {
    await $`${cmd} https://npmmirror.com/sync/@eslint-sets/${pkg.pkgName}`
}
