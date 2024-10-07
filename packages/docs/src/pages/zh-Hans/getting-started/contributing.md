---
meta:
  title: 参与此项目
  description: 为开源做出贡献可以帮助开发者免费访问令人惊叹的工具。 了解如何帮助开发 Vuetify 框架。
  keywords: 贡献、捐赠、功能请求
related:
  - /getting-started/unit-testing/
  - /about/code-of-conduct/
  - /getting-started/frequently-asked-questions/
---

# 参与此项目

Vuetify是由一个可以提交问题、创建请求并提供反馈的出色社区促成的。 我们的工作是让您能够创建令人惊叹的应用程序。 很多时候，你会遇到一些可以改进的东西。 也许你发现了一个 bug，或者你有一个关于额外功能的想法。 太棒了！ 克隆Vuetify仓库即可开始在开发环境中工作。

<promoted-ad slug="vuetify-discord" />

## 报告问题

此仓库的问题列表仅适用于错误报告和功能请求。 不符合规定的问题将立即关闭。 在报告问题之前：

- 搜索相似的 [问题](https://github.com/vuetifyjs/vuetify/issues), 它可能已经被解答了。
- 尝试使用[最新的](https://github.com/vuetifyjs/vuetify/releases/latest)版本在[codepen](https://template.vuetifyjs.com/)或可克隆的仓库中以生产预期行为进行复现。
- 请确保复现的是 **最小化** 和简洁的(代码逻辑).

这些步骤确保我们掌握一切必要的信息，以便迅速细分和解决你的问题。 复制完成后，使用 [Vuetify Issue Creator](https://issues.vuetifyjs.com/) 提交一个新问题。

在撰写问题时，请提供尽可能详细的信息。 请注意，“复制步骤”应该是另一个开发人员在单击您的复制链接后应该采取的一系列操作，而不是回忆您是如何发现错误的。

复杂且缺乏适当复现的问题可能被 [核心团队][] 的成员关闭. 有关报告问题和创建复制品的其他问题，请加入官方的Vuetify Discord[社区][]。

<alert type="success">

  **提示**

  创建复制品时，排除复制品不需要的所有**元素、属性和数据变量**。 这对于减少对问题进行分类并最终解决它所需的时间有很大的帮助。

</alert>

在下一节中，您将逐步学习如何设置您的本地环境以及如何配置Vuetify用于开发。

## 本地开发

Vuetify仓库是一个 [lerna](https://github.com/lerna/lerna) 管理的monorepo, 它连接了vuetify代码库, 文档, api生成器, 同时减少同时处理多个项目之间的摩擦。 下面的指南是为了帮助您立即启动和运行。

### 设置您的本地环境

所需软件：

- [Git](https://git-scm.com/) >v2.20
- [Node.js](https://nodejs.org/) LTS
- [Yarn](https://classic.yarnpkg.com/)

我们的一些依赖项使用 [node-gyp](https://github.com/nodejs/node-gyp#installation) 来构建自己。 您不需要安装node-gyp本身，但可能需要安装其他工具，尤其是在windows上。 了解更多信息请查看node-gyp文档.

安装完所有内容后，克隆仓库：

```bash
# 使用 HTTPS
git clone https://github.com/vuetifyjs/vuetify.git

# 使用 SSH
git clone git@github.com:vuetifyjs/vuetify.git
```

<alert type="info">

[我应该使用哪个远程URL？](https://docs.github.com/en/free-pro-team@latest/github/using-git/whit-remote-url-should-i-use)

</alert>

然后安装依赖项并执行初始生成以将所有包链接在一起：

```bash
# 导航到 vuetify 文件夹
cd vuetify

# 安装所有的项目依赖
yarn

# 构建包
yarn build
```

构建过程将编译所有用于开发的Vuetify包，可能需要一段时间（来点☕）。 一旦软件包构建完毕，您就可以开始开发了。

### Vuetify

Vuetify 库位于 `packages/vuetify` 中。 在 `packages/vuetify/dev` 中您将找到一个 `Playground.vue` 文件. 在项目根目录执行 ` yarn dev` 将在 [localhost:8080](http://localhost:8080/) 启动一个开发服务器并加载此文件. 您可以在playground测试您的更改，然后在准备好后将其内容复制到pull请求中。

您也可以使用 [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/) 测试您自己的项目中的 vuetify ：

- 导航到 `packages/vuetify`
- 执行 `yarn link`
- 导航到您的项目目录
- 执行 `yarn link vuetify`

如果你的项目正在使用 vuetify-loader，你必须运行 `yarn build:lib` 才能看到变化。 否则您可以使用 `yarn watch` 启用增量构建。

#### Playground.vue

<strong x-id=“1”>Playground</strong>文件是用于Vuetify开发的清洁室，是框架内迭代更改的推荐方法。

```html
<template>
  <v-container>
    <!--  -->
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      //
    }),
  }
</script>
```

用于Vuetify 开发的 **App.vue** 文件位于 `packages/vuetify/dev` 中。 它包含 [v-app](/api/v-app/) 和 [v-main](/api/v-main/) 组件以及本地 Playground.vue 文件。

### 开发文档

文档位于 `packages/docs` 中，但也使用了一些来自 `packages/api-generator` 的文件。 文档的开发服务器可以通过从项目根目录运行 `yarn dev docs` 来启动，默认情况下将在 [localhost:8080](http://localhost:8080/) 上可用。

如果你想要在文档中看到来自Vuetify的更改，你需要在启动文档服务器之前在vuetify 包中运行 `yarn build:lib`。

### 提交更改/Pull requests

首先，您应该创建一个 vuetify 仓库的分支来推送您的更改。 在 [GitHub 文档](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) 中可以找到关于分支仓库的信息。

然后将你的分支添加为远程git：

```bash
# 使用 HTTPS
git remote add fork https://github.com/YOUR_USERNAME/vuetify.git

# 使用 SSH
git remote add fork git@github.com:YOUR_USERNAME/vuetify.git
```

#### 选择一个基础分支

在开始开发之前，您应该知道您的更改基于哪个分支。 如果有疑问，使用master作为对master的更改通常可以合并到一个不同的分支中，而无需重新变基。

| 更改类型      | 分支       |
| --------- | -------- |
| 开发文档      | `master` |
| Bug修复     | `master` |
| 新功能       | `dev`    |
| 具有断代变更的功能 | `next`   |

```bash
# 切换到所需的分支
git switch master

# 拉取上游的更新
git pull

# 创建一个新的分支继续工作
git switch --create fix/1234-some-issue
```

<alert type="warning">永远不要直接提交到基础分支，总是创建一个功能分支来工作</alert>

按照 <a href=“#Commit guidelines”>提交准则</a> 提交您的更改，然后使用`git push-u fork` 将分支推送到您的fork，然后按照提供的模板在Vuetify仓库上打开一个pull请求。

<alert type="warning">

  包含不相关提交或本地合并的Pull请求可能会被**关闭**，恕不另行通知。

</alert>

## 使用 GitHub

Vuetify的仓库位于 [GitHub](https://github.com/vuetifyjs/vuetify) 上，并且是所有开发相关信息的主要位置。 此外，我们还有一个公开的GitHub 项目，详细描述目前我们在[Vuetify 3](https://titan.vuetifyjs.com)中的开发进程。

这些服务中一些更值得注意的环节包括：

**GitHub**

- [Issues][]
- [讨论区](https://github.com/vuetifyjs/vuetify/discussions)
- [项目](https://github.com/vuetifyjs/vuetify/projects)
- [编码准则](https://github.com/vuetifyjs/vuetify/wiki/coding-guidelines)

---

以下部分是为了让您熟悉我们的 Vuetify 开发的标准操作过程。

<promoted-ad slug="vue-jobs" />

### 问题分类

随着Vuetify的规模和普及，新的issues、新问题和功能请求不断涌入。 To organize these requests the [Core Team][] developed tools to aid not only the triaging of issues, but creating them as well.

<a href=https://github.com/vuetifyjs/vuetify/issues“fo=”5“>Issues</a> 板大量使用GitHub的标签系统，并进行一些轻微的自动化，例如在新问题上添加 `分类` 标签。

#### 文档-语言

我们 **不** 接受与除 `en` 外的任何语言相关的文档更改 PRs。 所有 `en` 以外的语言修改都通过我们的 [Crowdin项目](https://crowdin.com/project/vuetify) 提交. 您可以通过以下两种方式之一帮助翻译：

- 直接通过文档网站使用上下文翻译服务。 只需在文档中选择 `Help Translate/帮助翻译` 语言下拉选项。
- 直接通过 [Crowdin 项目](https://crowdin.com/project/vuetify)。

**注意**: 语言不会被添加到文档站点的语言下拉选项，直到他们完成了至少50%的翻译。

### 请求新功能

Vuetify 使用 **RFC** (征求意见) 流程来获取新功能建议。 它的目的是为新特性进入框架提供一个一致的受控路径。

许多更改，包括bug修复和文档改进，都可以通过正常的GitHub pull request 工作流来实现和审查。

不过，有些变更是 _重大的_ 的，我们要求这些变更通过一些设计过程，并在Vuetify [核心团队](/about/meet-the-team/) 和 [社区](https://discord.gg/eXubxyJ) 之间达成共识。

#### 快速入门

要将一个主要功能添加到Vuetify，您必须将RFC作为`.md`文件合并到此仓库中。 以下是如何开始的指南：

- Fork Vuetify RFC 仓库 <https://github.com/vuetifyjs/rfcs>

- 复制 `0000-template.md` 到 `active-rfcs/0000-my-feature.md` (其中 **my-feature** 是说明性的. **还没有** 分配一个 RFC 编号).

- 填写RFC。 详细记录。

  <alert type="error">!!crwd_CB_78_BC_dwrc!!  </alert>

- 提交一个 pull request 请求。 作为一个 pull request，RFC将从更大的社区接收设计反馈，作者应该准备好对其进行相应的修改。 新的 RFC pull requests 开始于 **Pending** 阶段.

- 建立共识并整合反馈。 得到广泛支持的 RFC 比那些没有收到任何评论的 RFC 更有可能取得进展。

- Eventually, the [Core Team][] will decide whether the RFC is a candidate for inclusion in Vuetify.

- An RFC can be modified based upon feedback from the [Core Team][] and [community][]. 重大修改可能会触发一个新的 _最终评论_ 期.

- 在公开讨论结束并对拒绝理由进行总结后，可拒绝RFC。 A [Core Team][] member will close the RFCs associated pull request, at which point the RFC will enter the **Rejected** stage.

- RFC可能在其 _最终评论_ 结束时被接受。 A [Core Team][] member will merge the RFCs associated pull request, at which point the RFC will enter the **Active** stage.

一旦一个 RFC 被合并并且在Vuetify 仓库中实现了相应的功能， 它将是下一个 _主要_ 或 _次要_ 发布版本的一部分。 一旦版本发布，RFC 将进入 **Released** 阶段并被锁定。

欲了解更多关于RFCs的信息，请参阅官方仓库： <https://github.com/vuetifyjs/rfcs>

### 提交准则

所有提交消息都需要遵循使用 _angular_ 预设的 [常规changelog](https://github.com/conventional-changelog/conventional-changelog) 标准。 此标准格式包含两种类型的提交：

- 使用作用域: `<type>(scope): <subject>`

  ```bash
  修复(VSelec): 当一个可禁用的子项目被点击时不要关闭

  修复 #12354
  ```

- 不使用作用域: `<type>(scope): <subject>`

  ```bash
  文档：调整 nav 组件

  在抽屉中移动重复的功能以减少
  责任范围
  ```

#### 一般规则

- 提交信息必须有主题行，并且可以有正文副本。 这些必须用空白行隔开。
- 主题行不能超过60个字符
- 主题行必须用命令语气书写（修复，而不是 修复了/修复(s) 等）
- 正文副本必须包括所有已解决问题的参考：

  ```bash
  文档(sass-variables): 修复损坏的api链接

  解决了 #3219
  解决了 #3254
  ```

- 正文必须用72个字符换行
- 正文必须只包含做了什么和为什么做的说明，而不是怎么做的说明。 后者属于文档和实现。

#### 提交类型

以下是一个 _angular_ 预设中使用的 **提交类型** 的列表:

- **feat:** 提交会导致新特性或功能的提交。 向后兼容的功能将在下一个 <strong x-id=“1”>小版本</strong> 中发布，而突破性的更改将在下一个 <strong x-id=“1”>主要版本</strong> 中发布。 具有突破性更改的提交主体必须以 `breaking CHANGE` 开头，接下来是关于API如何更改的描述。
- **fix:** 为vuetify的代码库中的错误提供修复的提交。
- **docs:** 为文档更新提供的提交。
- **style:** 不影响代码运行方式的提交，这些只是对样式的更改。
- **refactor:** 提交既不修复错误也不添加功能。
- **perf:** 提交承诺提高性能。
- **test:** 提交以添加缺少的或更正现有的测试。
- **chore:** 其他不修改src或测试文件的提交。
- **revert:** 还原以前提交的提交。

<promoted-ad slug="vuetify-reddit" />

#### 共同化

[Vuetify团队](/about/meet-the-team/) 将 [commitizen][] 用于所有仓库提交。 这使我们能够轻松阅读和有组织的承诺，并尽量减少对正常提交功能的更改。 Commitizen为处理语义版本控制提供了一个灵活的接口，使编写<a href=“https://github.com/vuetifyjs/vuetify/releases“>发行说明</a> 更加容易。

开始, 使用 [yarn](https://yarnpkg.com/) 在您的终端里执行以下命令以[全局安装commitizen包](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility) :

```bash
# 安装commitizen和传统的changelog适配器
yarn global add commitizen cz-conventional-changelog

# 然后创建一个.czrc文件来告诉commitizen
# 全局使用哪个适配器。
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

<alert type="warning">

  有时使用 **命令提示** 创建 `.czrc` 文件无法工作。 如果得到意外结果，请在主目录下的用户文件夹中创建该文件。 这通常位于你的主硬盘在 `Users` 文件夹中。

</alert>

完成后，您将在终端中运行命令 <kbd>git cz</kbd> 替代 <kbd>git commit</kbd> 。 在这里，您将看到一系列用于构建提交消息的提示。 有关更多信息，请查看我们关于 <a href=“#commit guidelines”>提交</a> 的指南。

<backmatter />

[commitizen]: https://github.com/commitizen/cz-cli
[社区]: https://community.vuetifyjs.com/
[community]: https://community.vuetifyjs.com/
[核心团队]: /about/meet-the-team/
[Core Team]: /about/meet-the-team/
[Issues]: https://github.com/vuetifyjs/vuetify/issues
