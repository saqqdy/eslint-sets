# Change logs

## 2023.10.17 v5.9.0

1. upgrade `eslint-plugin-yml` from ^1.9 to ^1.10
2. upgrade `eslint-plugin-jsdoc` from ^46.7 to ^46.8
3. upgrade `eslint-plugin-jsonc` from ^2.9 to ^2.10
4. upgrade `eslint-plugin-n` from ^16.1 to ^16.2
5. upgrade `eslint-plugin-svelte` from ^2.33 to ^2.34

## 2023.09.14 v5.9.0

1. upgrade `eslint-plugin-yml` from ^1.8 to ^1.9
2. upgrade `@typescript-eslint/eslint-plugin` from ^6.3 to ^6.7
3. upgrade `@typescript-eslint/parser` from ^6.3 to ^6.7
4. upgrade `eslint-plugin-jsdoc` from ^46.4 to ^46.7
5. upgrade `eslint-plugin-n` from ^16.0 to ^16.1
6. upgrade `eslint-plugin-svelte` from ^2.32 to ^2.33
7. upgrade `svelte-eslint-parser` from ^0.32 to ^0.33
8. upgrade `eslint-plugin-vue` from ^9.16 to ^9.17

## 2023.08.09 v5.8.0

1. upgrade `eslint-config-prettier` from ^8.8 to ^9.0
2. upgrade `eslint-plugin-import` from ^2.27 to ^2.28
3. upgrade `@typescript-eslint/eslint-plugin` from ^6.1 to ^6.3
4. upgrade `@typescript-eslint/parser` from ^6.1 to ^6.3
5. upgrade `eslint-plugin-vue` from ^9.15 to ^9.16

## 2023.07.17 v5.7.0

1. Added support for prettier 3.0
2. output `.mjs`
3. upgrade `eslint-plugin-vitest-globals` from ^1.3 to ^1.4
4. upgrade `eslint-plugin-react` from ^7.22 to ^7.23
5. upgrade `@typescript-eslint/eslint-plugin` from ^5.60 to ^6.1
6. upgrade `@typescript-eslint/parser` from ^5.60 to ^6.1
7. upgrade `eslint-plugin-prettier` from ^4.2 to ^5.0

## 2023.06.30 v5.6.1

1. fix peerDependencies of prettier
2. upgrade `@node-kit/extra.fs`

## 2023.06.30 v5.6.0

1. Change the default value of `vue-scoped-css/enforce-style-type` to '['error', { allows: ['scoped', 'module'] }]'
2. upgrade `eslint-plugin-jsdoc` from ^46.2 to ^46.4
3. upgrade `eslint-plugin-svelte` from ^2.31 to ^2.32
4. upgrade `svelte-eslint-parser` from ^0.31 to ^0.32
5. upgrade `eslint-plugin-vue-scoped-css` from ^2.4 to 2.5

## 2023.06.24 v5.5.0

1. upgrade `eslint-plugin-vue` from ^9.14 to ^9.15
2. upgrade `eslint-plugin-svelte` from ^2.30 to ^2.31

## 2023.06.14 v5.4.0

1. `jsdoc/tag-lines` default setting changed to `[1, 'any', { startLines: 1 }]`
2. upgrade `eslint-plugin-jsdoc` from ^45 to ^46
3. upgrade `eslint-plugin-svelte` from ^2.29 to ^2.30
4. upgrade `svelte-eslint-parser` from ^0.29 to ^0.31
5. upgrade `eslint-plugin-jsonc` from ^2.8 to ^2.9
6. upgrade `eslint-plugin-yml` from ^1.7 to ^1.8

## 2023.05.29 v5.3.0

1. `vue/multi-word-component-names` default setting changed to 'off'
2. upgrade dependency package

## 2023.05.10 v5.2.0

1. `no-only-tests/no-only-tests` default setting changed to 'warn'
2. upgrade dependency package

## 2023.04.04 v5.1.0

1. add support for vue macros
2. upgrade dependencies

## 2023.03.27 v5.0.2

1. add vitest-global to the `react` `svelte` `nuxt` package

## 2023.03.27 v5.0.1

1. add vitest-global to the `vue` package

## 2023.02.14 v5.0.0 1.

1. add `@eslint-sets/eslint-config-svelte` to extend support for the svelte project
2. `@eslint-sets/eslint-config-all` to extend support for the svelte project
3. documentation
4. upgrade dependency packages

## 2023.02.07 v4.3.1

1. remove unnecessary `peerDependencies`.

## 2023.02.07 v4.3.0

1. change `typescript` to optional
2. build output ts type
3. adjust build output method
4. upgrade dependency packages

## 2023.01.31 v4.2.1

1. remove unnecessary `peerDependencies`. 2.
2. use `reinstaller` package loading tool
3. upgrade the dependency package

## 2023.01.13 v4.1.0

1. add jsdoc and tsdoc validation rules
2. add vue-scoped-css rules
3. fix some issues
4. adjust the build framework
5. upgrade dependency packages

## 2023.01.07 v4.0.0

1. compatible with eslint v7.x version
2. change `@eslint-sets/eslint-config-all` to `@eslint-sets/eslint-config`
3. `eslint-plugin-unicorn` downgraded to v40.1.0
4. change `all` to include react, vue, ts
5. remove vue3-ts, simple, simple-ts, react-ts, core

## 2023.01.03 v3.3.0

1. fix node17 assertion not parsing issue

## 2022.12.21 v3.2.0

1. fix jsx parsing problem
2. optimize the code

## 2022.12.20 v3.1.0

1. fix inconsistent dependency package versions
2. upgrade dependency packages

## 2022.09.08 v3.0.5

1. fix `eslint-plugin-ts` configuration
2. upgrade dependency packages

## 2022.07.28 v3.0.4

1. change `vue` configuration `eslint-plugin-vue` version, fix `no-v-for-template-key-on-child` issue

## 2022.07.24 v3.0.3

1. all package removes vue-related plugins

## 2022.07.22 v3.0.2

1. fix `comma-dangle`, `no-unused-vars` and `brace-style` issues in ts package

## 2022.07.21 v3.0.1

1. Update the documentation

## 2022.07.21 v3.0.0

1. add `all` configuration, including nuxt, egg, vue, vue3, ts, react all configuration
2. upgrade dependency packages

## 2022.05.03 v2.1.5

1. add `no-labels` to allow labels for for loops

## 2022.04.23 v2.1.4

1. fix `simple-ts` parsing ts error
2. explicitly introduce `prettier` plugin to all packages

## 2022.04.13 v2.1.3

1. fix the problem of parsing `es6`.
2. clean up some unused packages

## 2022.04.11 v2.1.1

1. fix `multiline-ternary` exception

## 2022.04.11 v2.1.0

Update `basic` `ts` configuration 2. add `eslint-config-prettier` plugin

## 2022.04.10 v2.0.5

1. fix `vue/html-indent` configuration

## 2022.04.10 v2.0.4

Fix `indent` error

## 2022.04.10 v2.0.3

1. fix `requireConfigFile` error

## 2022.04.10 v2.0.2

1. switch to `@babel/eslint-parser` parser
2. upgrade dependency packages

## 2022.04.05 v2.0.0

1. reorganize `egg` `nuxt` `react` `react-ts` `simple` `simple-ts` `vue` `vue3` `vue3-ts` sets of configurations, pulling out basic and ts configurations
2. remove the `merge` method
3. new way to introduce

```js
// .eslintrc.js
module.exports = {
  extends: ['@eslint-sets/vue3']
}
```

## 2022.04.01 v1.0.0

1. add `egg` `nuxt` `react` `react-ts` `simple` `simple-ts` `vue` `vue3` `vue3-ts` several configuration sets
2. provide `merge` method to pass in custom configurations
3. `typescript` support
