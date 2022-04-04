const config = {
    plugins: [
        'react',
        'react-hooks'
        // 'eslint-plugin-tsdoc'
    ],
    extends: ['plugin:react/recommended', '@eslint-sets/eslint-config-ts'],
    rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        'react/react-in-jsx-scope': 'off'
    },
    globals: {
        __DEV__: false,
        h: true,
        window: true,
        define: true,
        history: true,
        location: true,
        $: true,
        process: true
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
    ],
    settings: {
        react: {
            version: '17.0.0'
        }
    }
}

export default config
