# 更新日志

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
