# 更新日志

## 2022.07.28 v3.0.4 更新日志

1. 更改`vue`配置`eslint-plugin-vue`版本，修复`no-v-for-template-key-on-child`问题

## 2022.07.24 v3.0.3 更新日志

1. all 包移除 vue 相关插件

## 2022.07.22 v3.0.2 更新日志

1. 修复 ts 包的`comma-dangle` `no-unused-vars` 和 `brace-style`问题

## 2022.07.21 v3.0.1 更新日志

1. 更新文档

## 2022.07.21 v3.0.0 更新日志

1. 新增`all`配置，包含 nuxt、egg、vue、vue3、ts、react 全部配置
2. 升级依赖包

## 2022.05.03 v2.1.5 更新日志

1. 新增`no-labels`，允许 for 循环的 labels

## 2022.04.23 v2.1.4 更新日志

1. 修复 `simple-ts` 解析 ts 报错的问题
2. 所有包显式引入`prettier`插件

## 2022.04.13 v2.1.3 更新日志

1. 修复解析 `es6` 的问题
2. 清理一些用不到的 package

## 2022.04.11 v2.1.1 更新日志

1. 修复`multiline-ternary`异常

## 2022.04.11 v2.1.0 更新日志

1. 更新`basic` `ts`配置
2. 增加`eslint-config-prettier`插件

## 2022.04.10 v2.0.5 更新日志

1. 修复`vue/html-indent`配置

## 2022.04.10 v2.0.4 更新日志

1. 修复`indent`报错

## 2022.04.10 v2.0.3 更新日志

1. 修复`requireConfigFile`报错

## 2022.04.10 v2.0.2 更新日志

1. 改用`@babel/eslint-parser`解析器
2. 依赖包升级

## 2022.04.05 v2.0.0 更新日志

1. 重新整理 `egg` `nuxt` `react` `react-ts` `simple` `simple-ts` `vue` `vue3` `vue3-ts` 几套配置，抽离出 basic 和 ts 配置
2. 移除 `merge` 方法
3. 全新的引入方式：

```js
// .eslintrc.js
module.exports = {
    extends: ['@eslint-sets/vue3-ts']
}
```

## 2022.04.01 v1.0.0 更新日志

1. 新增 `egg` `nuxt` `react` `react-ts` `simple` `simple-ts` `vue` `vue3` `vue3-ts` 几套配置
2. 提供 `merge` 方法，传入自定义配置
3. `typescript` 支持
