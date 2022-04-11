const config = {
    env: {
        node: true,
        es6: true,
        browser: true,
        shelljs: true,
        commonjs: true
    },
    // parser: '@babel/eslint-parser',
    // parserOptions: {
    //     ecmaVersion: 6,
    //     sourceType: 'module'
    // },
    plugins: [
        // 'eslint-plugin-jsdoc',
        // 'prettier',
        // 'import'
    ],
    extends: [
        '@eslint-sets/eslint-config-basic',
        'prettier'
        // 'plugin:vue-scoped-css/base',
        // 'plugin:jsdoc/recommended',
    ],
    rules: {},
    globals: {
        jest: 'readonly'
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/*.spec.{j,t}s?(x)'],
            env: {
                mocha: true,
                jest: true
            },
            rules: {
                'no-console': 'off'
            }
        }
    ]
}

export default config
