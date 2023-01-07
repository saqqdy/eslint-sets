import { execSync } from 'child_process'
import { join } from 'path'
import consola from 'consola'
import { version } from '../package.json'
import { packages } from '../build/packages'

export const ROOT = join(__dirname, '..')
export const PACKAGE = join(ROOT, 'packages')

const REGISTRY_URL = 'https://registry.npmjs.org'
let command = `npm --registry=${REGISTRY_URL} publish --access public`

if (version.includes('rc')) command += ' --tag release'
if (version.includes('beta')) command += ' --tag beta'
if (version.includes('alpha')) command += ' --tag alpha'

for (const { name, pkgName } of packages) {
	execSync(command, {
		stdio: 'inherit',
		cwd: join(PACKAGE, name, 'dist')
	})
	consola.success(`Published @eslint-sets/${pkgName}`)
}
execSync(command, {
	stdio: 'inherit',
	cwd: ROOT
})
consola.success('Published @eslint-sets/monorepo')
