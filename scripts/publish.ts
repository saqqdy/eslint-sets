import { execSync } from 'child_process'
import { join } from 'path'
import consola from 'consola'
import { readJSON, writeJSON } from '../build/utils/fs'
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
	const PKG_FILE = join(PACKAGE, name, 'package.json')
	const pkgJson = readJSON(PKG_FILE)
	const newPkgJson = JSON.parse(JSON.stringify(pkgJson))
	console.log(50, PKG_FILE)
	for (let { pkgName: pkg } of packages) {
		pkg = `@eslint-sets/${pkgName}`
		console.log(66, pkg)

		// console.log(90, pkg, newPkgJson.dependencies, pkg in newPkgJson.dependencies)
		if (pkg in ((newPkgJson.dependencies as Record<string, unknown>) || {})) {
			newPkgJson.dependencies[pkg] = version
			console.log(90, newPkgJson.dependencies[pkg])
		}
		// if (pkg in ((newPkgJson.devDependencies as Record<string, unknown>) || {})) {
		// 	newPkgJson.devDependencies[pkg] = version
		// }
		// if (pkg in ((newPkgJson.peerDependencies as Record<string, unknown>) || {})) {
		// 	newPkgJson.peerDependencies[pkg] = version
		// }
		// pkg === '@eslint-sets/eslint-config-basic' &&
		// console.log(
		// 	77,
		// 	newPkgJson.dependencies['@eslint-sets/eslint-config-basic'],
		// 	// [JSON.stringify(pkg)],
		// 	pkg,
		// 	version
		// )
	}
	writeJSON(PKG_FILE, newPkgJson, {
		encoding: 'utf8'
	})
	// execSync(command, {
	// 	stdio: 'inherit',
	// 	cwd: join(PACKAGE, name)
	// })
	// writeJSON(PKG_FILE, pkgJson, {
	// 	encoding: 'utf8'
	// })
	execSync(`npx prettier --write ${PKG_FILE}`, {
		stdio: 'inherit',
		cwd: ROOT
	})
	consola.success(`Published @eslint-sets/${pkgName}`)
}
// execSync(command, {
// 	stdio: 'inherit',
// 	cwd: ROOT
// })
consola.success('Published @eslint-sets/monorepo')
