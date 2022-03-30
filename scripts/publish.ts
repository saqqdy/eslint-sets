import { execSync } from 'child_process'
import path from 'path'
import consola from 'consola'
import { version } from '../package.json'
import { packages } from '../build/packages'

// execSync('npm run build', { stdio: 'inherit' })

let command = 'npm publish --access public'

if (version.includes('beta')) command += ' --tag beta'
if (version.includes('alpha')) command += ' --tag alpha'

for (const { name } of packages) {
    execSync(command, {
        stdio: 'inherit',
        cwd: path.join('packages', name, 'dist')
    })
    consola.success(`Published @eslint-sets/${name}`)
}
