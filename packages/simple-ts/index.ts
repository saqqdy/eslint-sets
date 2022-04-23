const config = {
    env: {
        node: true,
        es6: true,
        browser: true,
        shelljs: true,
        commonjs: true
    },
    plugins: [
        // 'eslint-plugin-tsdoc',
        'prettier'
        // 'import'
    ],
    extends: [
        '@eslint-sets/eslint-config-ts',
        'prettier'
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
