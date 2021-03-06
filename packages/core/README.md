<div style="text-align: center;" align="center">

# @eslint-sets/core

some core js for eslint-sets

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

## Install

```bash
# use npm
$ npm install -D @eslint-sets/core

# use yarn
$ yarn add -D @eslint-sets/core

# use pnpm
$ pnpm install -D @eslint-sets/core
```

## Usage

```js
// .eslintrc.js
const { extend } = require('@eslint-sets/core')

module.exports = extend(true, {}, {})
```

## Issues & Support

Please open an issue [here](https://github.com/saqqdy/@eslint-sets/core/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@eslint-sets/core.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@eslint-sets/core
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/@eslint-sets/core/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/@eslint-sets/core&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/@eslint-sets/core.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/@eslint-sets/core?branch=master
[download-image]: https://img.shields.io/npm/dm/@eslint-sets/core.svg?style=flat-square
[download-url]: https://npmjs.org/package/@eslint-sets/core
[gzip-image]: http://img.badgesize.io/https://unpkg.com/@eslint-sets/core/index.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/@eslint-sets/core/index.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_eslint-sets
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_eslint-sets
