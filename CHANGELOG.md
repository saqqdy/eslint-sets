# 更新日志

## 2023.03.27 v5.0.2

1. `react` `svelte` `nuxt` 包里面增加 vitest-global

## 2023.03.27 v5.0.1

1. `vue` 包里面增加 vitest-global

## 2023.02.14 v5.0.0

1. 增加 `@eslint-sets/eslint-config-svelte` ，扩展支持 svelte 项目
2. `@eslint-sets/eslint-config-all` 扩展支持 svelte 项目
3. 文档
4. 升级依赖包

## 2023.02.07 v4.3.1

1. 删除不必要的 `peerDependencies`

## 2023.02.07 v4.3.0

1. 更改 `typescript` 为可选的
2. 构建输出 ts 类型
3. 调整构建输出方式
4. 升级依赖包

## 2023.01.31 v4.2.1

1. 删除不必要的 `peerDependencies`
2. 使用 `reinstaller` 装包工具
3. 升级依赖包

## 2023.01.13 v4.1.0

1. 增加 jsdoc 和 tsdoc 校验规则
2. 增加 vue-scoped-css 规则
3. 修复一些问题
4. 调整构建框架
5. 升级依赖包

## 2023.01.07 v4.0.0

1. 兼容 eslint v7.x 版本
2. `@eslint-sets/eslint-config-all` 更改为 `@eslint-sets/eslint-config`
3. `eslint-plugin-unicorn` 降级到 v40.1.0
4. 更改`all`包含 react、vue、ts
5. 移除 vue3-ts、simple、simple-ts、react-ts、core

## 2023.01.03 v3.3.0

1. 修复 node17 assertion 解析不到的问题

## 2022.12.21 v3.2.0

1. 修复 jsx 解析不到的问题
2. 优化代码

## 2022.12.20 v3.1.0

1. 处理依赖包版本不一致的问题
2. 升级依赖包

## 2022.09.08 v3.0.5

1. 修复`eslint-plugin-ts`配置
2. 升级依赖包

## 2022.07.28 v3.0.4

1. 更改`vue`配置`eslint-plugin-vue`版本，修复`no-v-for-template-key-on-child`问题

## 2022.07.24 v3.0.3

1. all 包移除 vue 相关插件

## 2022.07.22 v3.0.2

1. 修复 ts 包的`comma-dangle` `no-unused-vars` 和 `brace-style`问题

## 2022.07.21 v3.0.1

1. 更新文档

## 2022.07.21 v3.0.0

1. 新增`all`配置，包含 nuxt、egg、vue、vue3、ts、react 全部配置
2. 升级依赖包

## 2022.05.03 v2.1.5

1. 新增`no-labels`，允许 for 循环的 labels

## 2022.04.23 v2.1.4

1. 修复 `simple-ts` 解析 ts 报错的问题
2. 所有包显式引入`prettier`插件

## 2022.04.13 v2.1.3

1. 修复解析 `es6` 的问题
2. 清理一些用不到的 package

## 2022.04.11 v2.1.1

1. 修复`multiline-ternary`异常

## 2022.04.11 v2.1.0

1. 更新`basic` `ts`配置
2. 增加`eslint-config-prettier`插件

## 2022.04.10 v2.0.5

1. 修复`vue/html-indent`配置

## 2022.04.10 v2.0.4

1. 修复`indent`报错

## 2022.04.10 v2.0.3

1. 修复`requireConfigFile`报错

## 2022.04.10 v2.0.2

1. 改用`@babel/eslint-parser`解析器
2. 依赖包升级

## 2022.04.05 v2.0.0

1. 重新整理 `egg` `nuxt` `react` `react-ts` `simple` `simple-ts` `vue` `vue3` `vue3-ts` 几套配置，抽离出 basic 和 ts 配置
2. 移除 `merge` 方法
3. 全新的引入方式：

```js
// .eslintrc.js
module.exports = {
  extends: ['@eslint-sets/vue3']
}
```

## 2022.04.01 v1.0.0

1. 新增 `egg` `nuxt` `react` `react-ts` `simple` `simple-ts` `vue` `vue3` `vue3-ts` 几套配置
2. 提供 `merge` 方法，传入自定义配置
3. `typescript` 支持
