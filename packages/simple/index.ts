const config = {
    env: {
        node: true,
        es6: true,
        browser: true,
        shelljs: true,
        commonjs: true
    },
    plugins: [
        // 'eslint-plugin-jsdoc',
        // 'prettier',
        // 'import'
    ],
    extends: [
        '@eslint-sets/eslint-config-basic',
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
