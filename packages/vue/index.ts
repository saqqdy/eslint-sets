export const config = {
    root: true,
    env: {
        node: true,
        browser: true,
        commonjs: true,
        es6: true
    },
    rules: {
        'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
        'no-debugger': 1,
        semi: [2, 'always'],
        'vue/no-use-v-if-with-v-for': [2, { allowUsingIterationVar: false }],
        'comma-dangle': 'off',
        'one-var': [
            'warn',
            {
                var: 'always',
                let: 'always',
                const: 'never'
            }
        ],
        'no-throw-literal': 0,
        'no-new-wrappers': 2,
        'no-useless-escape': 0,
        'no-redeclare': 2,
        'no-tabs': 0,
        'no-mixed-spaces-and-tabs': 1,
        'space-before-function-paren': [0, 'always'],
        'no-unused-vars': 1,
        'no-dupe-keys': 2,
        'no-func-assign': 2,
        'valid-typeof': 2,
        'no-shadow': 0,
        'no-prototype-builtins': 0,
        'no-undef': 0,
        'no-irregular-whitespace': 1,
        'vue/custom-event-name-casing': 0
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off'
            }
        }
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint',
        vueFeatures: {}
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
        'plugin:vue-scoped-css/base',
        'plugin:jsdoc/recommended',
        'prettier'
    ]
}
export default config
