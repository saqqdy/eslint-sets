import { execSync } from 'child_process'
import { packages } from '../build/packages'

// const cmd = process.platform === 'win32' ? 'start' : 'open'

for (const pkg of packages) {
	// execSync(`${cmd} https://npmmirror.com/sync/@eslint-sets/${pkg.pkgName}`)
	execSync(
		`curl -X PUT -d "sync_upstream=true" "https://registry-direct.npmmirror.com/@eslint-sets/${pkg.pkgName}/sync"`
	)
}
execSync(
	'curl -X PUT -d "sync_upstream=true" "https://registry-direct.npmmirror.com/@eslint-sets/monorepo/sync"'
)
