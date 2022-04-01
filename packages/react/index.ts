import { extend } from '@eslint-sets/core'

export const config = {
    root: true,
    env: {
        node: true,
        browser: true,
        commonjs: true,
        es6: true
    },
    parser: 'babel-eslint',
    extends: [
        'eslint:recommended',
        'plugin:jsdoc/recommended',
        'plugin:react/recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            experimentalDecorators: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: ['react', 'react-hooks'],
    globals: {
        __DEV__: false,
        __dirname: false,
        h: true,
        window: true,
        define: true,
        history: true,
        location: true,
        wxjs: true,
        $: true,
        WeixinJSBridge: true,
        wx: true,
        process: true,
        qq: true
    },
    settings: {
        react: {
            version: '17.0.0'
        }
    },
    rules: {
        'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
        'no-debugger': 1,
        semi: [2, 'never'],
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
        'object-shorthand': 2,
        'no-unused-vars': [
            2,
            { ignoreRestSiblings: true, argsIgnorePattern: '^h$' }
        ],
        'no-dupe-keys': 2,
        'no-func-assign': 2,
        'valid-typeof': 2,
        'no-shadow': 0,
        'no-prototype-builtins': 0,
        'no-undef': 2,
        'no-irregular-whitespace': 1,
        quotes: ['error', 'single'],
        'react/react-in-jsx-scope': 0
    }
}

export const merge = (customConfig: object) =>
    extend(true, config, customConfig)
export default config
