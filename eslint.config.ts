import eslintConfig from './src/index'

export default eslintConfig({
	ignores: [
		'**/examples/**',
		'src/typegen.d.ts',
	],
	markdown: false,
	stylistic: {
		indent: 'tab',
	},
})
