import eslintConfig from './src/index'

export default eslintConfig({
	typescript: true,
	test: true,
	prettier: true,
	markdown: false,
	yaml: false,
	ignores: ['**/dist/**', '**/node_modules/**', '**/*.d.ts', '**/*.md', '**/*.yml', '**/*.yaml'],
	rules: {
		'no-console': 'off',
		'import-x/order': 'off',
		'import-x/no-extraneous-dependencies': 'off',
		'perfectionist/sort-objects': 'off',
		'perfectionist/sort-interfaces': 'off',
		'perfectionist/sort-imports': 'off',
		'perfectionist/sort-exports': 'off',
		'unicorn/no-array-push-push': 'off',
		'@typescript-eslint/consistent-type-imports': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
})
