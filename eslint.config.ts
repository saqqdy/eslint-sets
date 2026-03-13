import eslintConfig from './src/index'

export default eslintConfig({
	ignores: [
		'**/*.d.ts',
	],
	markdown: false,
	stylistic: {
		indent: 'tab',
	},
})
