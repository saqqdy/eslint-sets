export interface Answers {
	type: 'app' | 'lib'
	typescript: boolean
	frameworks: string[]
	formatter: string
	gitignore: boolean
	sortPackageJson: boolean
	sortTsconfig: boolean
	a11y: boolean
}
