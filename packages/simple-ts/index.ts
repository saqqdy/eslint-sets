const config = {
    env: {
        node: true,
        es6: true,
        browser: true,
        shelljs: true,
        commonjs: true
    },
    // parser: '@typescript-eslint/parser',
    // parserOptions: {
    //     parser: '@typescript-eslint/parser',
    //     ecmaVersion: 2020,
    //     sourceType: 'module',
    //     ecmaFeatures: {
    //         experimentalObjectRestSpread: true,
    //         experimentalDecorators: true,
    //         jsx: true
    //     }
    // },
    plugins: [
        // 'eslint-plugin-tsdoc',
        // 'prettier',
        // 'import'
    ],
    extends: [
        '@eslint-sets/eslint-config-basic'
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
