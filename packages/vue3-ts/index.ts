
export const config = {
    plugins: [
        // 'eslint-plugin-tsdoc',
        // 'prettier',
        // 'import'
    ],
    extends: [
        'plugin:vue/vue3-recommended',
        '@eslint-sets/eslint-config-ts',
        'plugin:vitest-globals/recommended'
    ],
    rules: {
        'vue/max-attributes-per-line': 'off',
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/multi-word-component-names': 'off',
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
        jest: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/*.spec.{j,t}s?(x)'],
            env: {
                mocha: true,
                jest: true,
                'vitest-globals/env': true
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
                parser: '@typescript-eslint/parser',
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    experimentalObjectRestSpread: true,
                    experimentalDecorators: true,
                    jsx: true,
                    tsx: true
                },
                vueFeatures: {}
            },
            rules: {
                'vue/no-v-model-argument': 'off',
                'vue/valid-v-model': 0
            }
        }
    ]
}

export default config
