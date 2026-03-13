# GitHub Workflows 使用指南

## 发布命令说明

### bumpp

`bumpp` 是一个交互式的版本号升级工具，它会：

1. **显示当前版本** - 显示 package.json 中的当前版本
2. **提示选择新版本** - 提供选项让你选择：
   - `patch` (0.0.x) - 修复 bug
   - `minor` (0.x.0) - 新功能
   - `major` (x.0.0) - 破坏性变更
   - 自定义版本号
3. **自动更新文件** - 更新 package.json、CHANGELOG.md 等文件
4. **创建 git commit 和 tag** - 自动提交版本变更并创建 git tag

```shell
# 运行 bumpp 时的交互示例
? Current version: 6.0.0-beta.0
? Select release type:
  patch (6.0.0-beta.1)
  minor (6.0.1-beta.0)
  major (6.1.0-beta.0)
  premajor (7.0.0-beta.0)
❯ custom
```

### pnpm publish

将包发布到 npm registry：

1. **运行 prepublishOnly** - 执行 `pnpm build` 构建项目
2. **上传到 npm** - 将 `dist` 目录发布到 npm

### && 连接符

两个命令串联执行：
- `bumpp` 成功后才执行 `pnpm publish`
- 如果 `bumpp` 失败或用户取消，`pnpm publish` 不会执行

### 完整发布流程

```shell
pnpm run release
```

等同于：

```shell
# 1. bumpp 交互式选择版本
bumpp
  → 更新 package.json 版本号
  → 更新 CHANGELOG.md
  → 创建 git commit
  → 创建 git tag (如 v6.0.0)

# 2. 发布到 npm
pnpm publish
  → 运行 prepublishOnly (pnpm build)
  → 上传到 npm registry
```

### 发布后还需要

```shell
git push --follow-tags
```

将 commit 和 tag 推送到远程仓库。

## 工作流触发条件

| 工作流 | 触发条件 | 用途 |
|--------|---------|------|
| `ci.yml` | push/PR 到 master/dev | 完整 CI 检查 |
| `lint.yml` | push/PR 到 master/dev | 代码检查 |
| `build.yml` | push/PR 到 master | 构建产物 |
| `publish.yml` | GitHub Release 创建 | 发布到 npm |
| `publish-test.yml` | push 到 dev | 测试发布流程 |

## 具体使用流程

### 1. 日常开发（自动触发）

```shell
# 在 dev 分支开发
git checkout dev
git pull

# 修改代码后提交
git add .
git commit -m "feat: add new feature"
git push origin dev
```

推送后自动触发：
- `ci.yml` - 运行 lint、typecheck、test、build
- `lint.yml` - 运行 lint、typecheck
- `publish-test.yml` - 测试构建（不发布）

### 2. 合并到主分支（自动触发）

```shell
# 创建 PR: dev → master
# 或直接合并
git checkout master
git merge dev
git push origin master
```

推送后自动触发：
- `ci.yml` - 完整 CI 检查
- `lint.yml` - 代码检查
- `build.yml` - 构建并上传 artifacts

### 3. 发布新版本（手动触发）

**方式一：使用 bumpp 本地发布**

```shell
# 本地运行
pnpm run release

# 这会：
# 1. 交互式选择版本号
# 2. 更新 package.json、CHANGELOG.md
# 3. 创建 git commit 和 tag
# 4. 发布到 npm
```

**方式二：使用 GitHub Release 自动发布**

```shell
# 1. 本地创建 tag 并推送
bumpp  # 只升级版本，不发布
git push --follow-tags

# 2. 在 GitHub 网页创建 Release
#    → 自动触发 publish.yml 发布到 npm
```

### 4. 查看构建产物

```
GitHub → Actions → Build workflow → 点击具体运行 → Artifacts → dist
```

## GitHub Release 发布流程

```
┌─────────────────────────────────────────────────────────┐
│  本地                                                    │
│                                                          │
│  git checkout master                                     │
│  git pull                                                │
│  pnpm run release    ←── 或手动 bumpp                    │
│      ↓                                                   │
│  bumpp 交互选择版本                                       │
│      ↓                                                   │
│  创建 commit + tag (v6.0.0)                              │
│      ↓                                                   │
│  pnpm publish (发布到 npm)                               │
│      ↓                                                   │
│  git push --follow-tags                                  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  GitHub (可选)                                           │
│                                                          │
│  Releases → Draft a new release                          │
│  选择 tag: v6.0.0                                        │
│  填写 Release notes                                       │
│  Publish release                                         │
│      ↓                                                   │
│  自动触发 publish.yml (再次发布，可跳过)                   │
└─────────────────────────────────────────────────────────┘
```

## 推荐的发布流程

```shell
# 1. 确保 dev 分支所有测试通过
git checkout dev
pnpm lint && pnpm test && pnpm build

# 2. 合并到 master
git checkout master
git merge dev

# 3. 发布
pnpm run release

# 4. 推送 tags
git push --follow-tags

# 5. 在 GitHub 创建 Release（可选）
```

## 所需的 GitHub Secrets

在 `Settings → Secrets and variables → Actions` 中配置：

| Secret | 用途 |
|--------|------|
| `NPM_TOKEN` | npm 发布令牌 |

### 获取 NPM_TOKEN

1. 访问 https://www.npmjs.com/settings/tokens
2. 创建新的 Access Token (Automation 类型)
3. 添加到 GitHub Secrets

## 工作流文件说明

### ci.yml

完整的 CI 流程，包含：
- Lint 检查
- TypeScript 类型检查
- 单元测试
- 构建

### lint.yml

代码质量检查，包含：
- ESLint 检查
- TypeScript 类型检查

### build.yml

构建流程，包含：
- 项目构建
- 上传构建产物（保留 7 天）

### publish.yml

发布到 npm，包含：
- 完整 CI 检查
- 构建项目
- 发布到 npm registry
- 同步到 npmmirror 镜像

### publish-test.yml

测试发布流程（不实际发布），用于验证构建是否正常。
