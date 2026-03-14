import eslintConfig from './src/index'

export default eslintConfig({
	ignores: [
		'**/*.d.ts',
		'**/examples/**',
	],
	markdown: false,
	stylistic: {
		indent: 'tab',
	},
})
