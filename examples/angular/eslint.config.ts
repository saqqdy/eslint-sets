import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  angular: true,
  rules: {
    '@angular-eslint/component-max-inline-declarations': 'off',
  },
  typescript: true,
})
