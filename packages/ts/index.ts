import { extend } from '@eslint-sets/core'
const basic = require('@eslint-sets/eslint-config-basic')

export const config = {
    plugins: [
        '@typescript-eslint/eslint-plugin'
        // 'eslint-plugin-tsdoc'
    ],
    extends: [
        '@eslint-sets/eslint-config-basic',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended'
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    '.js',
                    '.jsx',
                    '.cjs',
                    '.mjs',
                    '.ts',
                    '.tsx',
                    '.d.ts'
                ]
            }
        }
    },
    rules: {
        'import/named': 'off',
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            2,
            {
                argsIgnorePattern: '^h$',
                varsIgnorePattern: '^h$'
            }
        ]
    },
    overrides: [
        ...basic.overrides,
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off'
            }
        },
        {
            files: ['**/*.md/*.*'],
            rules: {
                '@typescript-eslint/no-redeclare': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-use-before-define': 'off',
                '@typescript-eslint/no-var-requires': 'off'
            }
        }
    ]
}

export const merge = (customConfig: object) =>
    extend(true, config, customConfig)
export default config
