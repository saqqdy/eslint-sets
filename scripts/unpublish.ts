import { execSync } from 'child_process'
import consola from 'consola'
import { packages } from '../build/packages'
let [, , version] = process.argv

if (!version) process.exit(1)
version = version.replace(/\"/g, '')
const versions = version.split(',')

const REGISTRY_URL = 'https://registry.npmjs.org'
const command = `npm --registry=${REGISTRY_URL} unpublish`

for (const { pkgName } of packages) {
    for (const version of versions) {
        execSync(`${command} @eslint-sets/${pkgName}@${version}`, {
            stdio: 'inherit'
        })
        consola.success(`UnPublished @eslint-sets/${pkgName}@${version}`)
    }
}
