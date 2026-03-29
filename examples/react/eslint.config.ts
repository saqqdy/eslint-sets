import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  markdown: false,
  react: {
    reactCompiler: false, // Set to true if using React Compiler
    rsc: true, // RSC (React Server Components) rules
  },
  typescript: true,
})
