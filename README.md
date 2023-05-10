<div style="text-align: center;" align="center">

# @eslint-sets/eslint-config

Eslint config sets for basic/ts/egg/nuxt/react/vue/vue3/svelte

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

## Package list

- Eslint config for all: [@eslint-sets/eslint-config](https://github.com/saqqdy/eslint-sets/tree/master/packages/all)
- Eslint config basic: [@eslint-sets/eslint-config-basic](https://github.com/saqqdy/eslint-sets/tree/master/packages/basic)
- Eslint config ts: [@eslint-sets/eslint-config-ts](https://github.com/saqqdy/eslint-sets/tree/master/packages/ts)
- Eslint config for egg: [@eslint-sets/eslint-config-egg](https://github.com/saqqdy/eslint-sets/tree/master/packages/egg)
- Eslint config for nuxt: [@eslint-sets/eslint-config-nuxt](https://github.com/saqqdy/eslint-sets/tree/master/packages/nuxt)
- Eslint config for react: [@eslint-sets/eslint-config-react](https://github.com/saqqdy/eslint-sets/tree/master/packages/react)
- Eslint config for vue: [@eslint-sets/eslint-config-vue](https://github.com/saqqdy/eslint-sets/tree/master/packages/vue)
- Eslint config for vue3: [@eslint-sets/eslint-config-vue3](https://github.com/saqqdy/eslint-sets/tree/master/packages/vue3)
- Eslint config for svelte: [@eslint-sets/eslint-config-svelte](https://github.com/saqqdy/eslint-sets/tree/master/packages/svelte)

## Install

e.g: use `@eslint-sets/eslint-config`

```shell
# use pnpm
pnpm install -D @eslint-sets/eslint-config
# use npm
npm install -D @eslint-sets/eslint-config
# use yarn
yarn add -D @eslint-sets/eslint-config
```

## Usage

```js
// .eslintrc.js
module.exports = {
  extends: '@eslint-sets',
  rules: {
    // custom rules
  }
}
```

## Issues & Support

Please open an issue [here](https://github.com/saqqdy/eslint-sets/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@eslint-sets/monorepo.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@eslint-sets/monorepo
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/@eslint-sets/monorepo/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/@eslint-sets/monorepo&utm_campaign=Badge_Grade
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_eslint-sets
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_eslint-sets
