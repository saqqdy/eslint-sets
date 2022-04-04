const config = {
    env: {
        node: true,
        es6: true,
        shelljs: true,
        commonjs: true
    },
    plugins: [
        // 'eslint-plugin-jsdoc',
        // 'prettier',
        // 'import'
    ],
    extends: ['eslint-config-egg', '@eslint-sets/eslint-config-basic'],
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
