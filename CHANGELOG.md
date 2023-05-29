# Changelog

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
