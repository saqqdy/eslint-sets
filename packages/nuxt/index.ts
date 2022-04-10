const config = {
    plugins: [
        // 'eslint-plugin-jsdoc',
        // 'prettier',
        // 'import'
    ],
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended',
        '@eslint-sets/eslint-config-basic'
        // 'plugin:jsdoc/recommended'
    ],
    rules: {
        'vue/max-attributes-per-line': 'off',
        'vue/no-v-html': 'off',
        // 'prettier/prettier': 'error',
        'vue/component-tags-order': [
            'error',
            {
                order: ['template', 'script', 'style']
            }
        ]
    },
    globals: {
        h: true,
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
                'no-console': 'off',
                'vue/one-component-per-file': 'off'
            }
        },
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: '@babel/eslint-parser',
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    experimentalObjectRestSpread: true,
                    experimentalDecorators: true,
                    jsx: true
                },
                vueFeatures: {}
            },
            rules: {
                indent: 'off',
                'vue/no-v-model-argument': 'off',
                'vue/valid-v-model': 0
            }
        }
    ]
}

export default config
