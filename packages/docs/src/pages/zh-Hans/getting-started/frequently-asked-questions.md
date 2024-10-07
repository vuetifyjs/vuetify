---
meta:
  title: 常见问题
  description: 遇到问题时手忙脚乱？ 看看 Vuetify 社区最常问的问题。
  keywords: 常见问题，解答
related:
  - /getting-started/contributing/
  - /features/treeshaking/
---

# 常见问题

在特定问题上被卡住？ 在创建工单之前先回顾下这些常见的问题和答案。 If you still cannot find what you are looking for, you can submit an [issue](https://issues.vuetifyjs.com/) on GitHub or ask the in our [community](https://community.vuetifyjs.com/).

<promoted-ad slug="vuetify-discord" />

## 目录列表

- [Vuetify v3 何时发布？](#version-3)
- [为什么搜索 Vuetify 不能正常工作？](#search-broke)
- [由于 sass/scss 错误，我的应用程序无法编译.](#sass-compile-error)
- [有 v2 网格和 v1.5 比较的例子吗？](#v2-v15-grid)
- [错误: Cannot find module 'node-sass'.](#cannot-find-module-sass)
- [@content: expected "}" 后无效的CSS"($material-light);".](#invalid-css-content)
- [我的应用程序无法正常运行。](#my-application-is-not-working)
- [我看到控制台中的$attrs和/或$listeners是只读的。](#attrs-is-readonly)
- [我看到模块解析“失败”错误。 终端中的Unexpected token。](#unexpected-token)
- [暗黑和亮白主题不能正常工作。](#codepen-template-with-router)
- [如何扩展 Vuetify 组件？](#extend-components)
- [我的应用程序无法工作.](#my-application-does-not-look-correct)
- [如何垂直居中？](#menu-dialog-drawer)
- [滚动条正在显示，即使我的内容没有垂直溢出。](#scrollbar-overflow)
- [如何垂直居中内容？](#vertically-center-content)
- [我的 _/_ 链接在我在 _/home_ 页面时处于激活状态。](#link-active-home)
- [为什么我的应用程序在移动设备上没有响应式布局？](#mobile-responsiveness)
- [我应该怎么使用 Font Awesome, Material Design 图标 或 Material 图标?](#custom-icons)
- [为什么在点击按钮后， &lt;v-dialogue> 立即关闭？](#dialog-close-click)
- [我应该如何升级到最新版本?](#latest-version-upgrade)
- [如何报告错误或请求某个功能？](#report-request-feature)
- [Vuetify-loader 没有加载所有组件](#vuetify-loader-components)
- [1.5 版本将被支持多久？](#v15-lts)
- [我在哪里能看到 v1.5 的文档？](#v15-docs)
- [[Vue 警告]: 未知的自定义元素: &lt;v-app>](#unknown-element)
- [SCRIPT5022: 预期为标识符、字符串或数字](#script5022)
- [错误：无法找到模块“vuetify/lib”的声明文件](#typescript-declaration-file)

## 问题专区

有一个属于这里的问题？ 在我们的 [Discord 社区](https://community.vuetifyjs.com/) 告诉我们或在我们的 [Issue 生成器](https://issues.vuetifyjs.com/) 上创建一个请求。

---

- **Vuetify v3 何时发布？** { #version-3 }

  通过我们的[Github项目](https://titan.vuetifyjs.com)或者阅读[路径图](/introduction/roadmap/)的内容来关注我们的进度

<br>

- **由于sass / scss 错误，我的应用程序不会编译。**{ #sass-compile-error }

  Ensure that you are have webpack configured properly using the proper options object in accordance with your sass-loader version. See the [webpack install](/getting-started/installation/#webpack-install) section for details.

<br>

- **为什么搜索 Vuetify 不能正常工作？**{ #search-broke }

  此刻，Algolia docsearch 只是主生产站点的 crawls 。 [https://vuetifyjs.com/](https://vuetifyjs.com/)。

<br>

- **v2网格比较v1.5是否有示例？**{ #v2-v15-grid }

  是的，你可以在这里查看 [网格示例](https://gist.github.com/johnleider/207f63c9d30fb77042a0bb0258c5ab32)。

<br>

- **错误：找不到模块“node-sass”。**{ #cannot-find-module-sass }

  确保您的 `@vue/cli-*` 软件包位于 `package.json` 至少 **^3.5.0**。

<br>

- **@content：期望"}"之后无效的 CSS "($material-light);"。**{ #invalid-css-content}

  请确保您在您的 **package.json** 中使用 `sass` 而不是 `node-sass`。

<br>

- **我的应用程序无法工作。**{ #my-application-is-not-working }

  首先，确保你使用的是最新版本的 Vue.js 和 Vuetify。 尝试在 codepen 中使用这个[模板](https://template.vuetifyjs.com/)重现它。 如果你无法在本地环境之外重现问题，这通常意味着这个问题是一个本地问题。 如果你仍然无法解决问题，请在[社区](https://community.vuetifyjs.com)合适的帮助频道中提供你的代码和问题描述。

<br>

- **我看到 `$attrs 只读` 和/或 `$listeners 只读` 控制台**{ #attrs-is-readonly }

  Vuetify 使用Typescript，当前必须导入并扩展Vue 对象。 这在某些应用程序中有可能生成警告信息。 There is currently an ongoing [GitHub discussion](https://github.com/vuetifyjs/vuetify/issues/4068) with potential work-arounds in a variety of use-cases.

<br>

- **我发现 `Error in ./node_modules/vuetify/src/dir/file.js Module parse failed: Unexpected token (<lineno>:<characterno>)` 在控制台.**{ #unexpected-token }

  如果您使用的是IDE，比如intelliJ IDEA或WebStorm，它通常会添加指向所使用组件的`vuetify/src`目录的自动导入。 将导入语句路径从 `vuetif/src` 更改为 `vuetif/lib`。

<br>

- **是否有带路由器的模板示例？**{ #codepen-template-with-router }

  是的. [Vuetify Codepen 路由模板](https://codepen.io/johnjleider/pen/PMZvpr).

<br>

- **如何基于 Vuetify 开发组件**{ #extend-components }

  Vuetify 组件可以轻松地通过导入它并使用 `extends` 选项来扩展。 [Codepen 示例](https://codepen.io/whoistobias/pen/yLNgjwy)

```js
// src/components/ActivateBtn
import { VBtn } from 'vuetify/lib'

export default {
  extends: VBtn,

  methods: {
    // 这里我们重写了VBtn 的 genContent 方法来覆盖默认的 genContent 方法.
    genContent() {
      return this.$createElement('div', {
        staticClass: 'v-btn__contents'
      }, [
        'Activate ',
        this.$slots.default
      ])
    }
  }
}
```

<br>

- **我的应用程序无法工作。**{ #my-application-does-not-look-correct }

  Vuetify 需要使用 `v-app` 组件。 它应该将您的整个应用程序包裹，并且是包括主题在内的大部分框架功能的中心点。 请确保遵循在 [应用程序](/components/application/) 页面中记录的正确标识。

<br>

- **Menu/Dialog/Navigation 抽屉未正确打开。**{ #menu-dialog-drawer }

  确保你的组件被包裹有一个 `v-app` 元素。 如果您正在使用一个元素来激活未放入 **activator** 槽中的组件， 确保您停止点击事件的传播。 这些组件使用 **v-outside-click** 指令，并将立即关闭。

<br>

- **滚动条正在显示，即使我的内容没有垂直溢出。**{ #scrollbar-overflow }

  Vuetify 使用稍作修改版本的 [resse reset](https://github.com/filipelinhares/ress) ，默认情况下使用 html 滚动条来正常化浏览器之间的行为。 这是一种设计上的选择，已经多次辩论。 有滚动条和没有滚动条都有利弊，到目前为止，投票赞成保持现状。 如果您想禁用此功能，只需将 `html { overflow-y: auto }` 添加到您的样式文件中。 在 [CSS 重置](/styles/css-reset/) 页面上查找更多信息。

- **如何垂直居中内容？**{ #vertically-center-content }

  将 **fill-height** prop 应用于 `v-container`。 这个辅助类通过只增加 **height: 100%**, 但是对于容器, 它还查找子 `v-layout` 并添加应用所需的类将内容垂直居中。

<promoted-ad slug="vuetify-reddit" />

- **个人中心_/_ 链接在我在 _/首页_ 页面上处于激活状态。**{ #link-active-home }

  将 **exact** 添加到指向绝对值 /的链接。 欲了解更多信息，您可以访问官方的 Vue 路由器 [文档](https://router.vuejs.org/en/api/router-link.html)。

<br>

- **为什么我的应用程序在移动设备上没有响应式布局？**{ #mobile-responsiveness }

  请确保您的 index.html的 `<head>` 内有正确的 meta 标签。

```html
<!-- public/index.html -->
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>
</html>
```

<br>

- **如何使用 Font Awesome, Material Design 图标或Material 图标？**{ #custom-icons }

  您可以在我们的 [图标指南](/features/icon-fonts/) 中找到更多信息。

<br>

- **为什么在点击按钮后立即关闭 &lt;v-dialk> ？**{ #dialog-close-click }

  当不为 `v-menu` 和 `v-dialogue` 使用 **activator** 插槽时. 您必须手动停止点击事件的传播。 要做到这一点，只需将 `.stop` 修改器添加到单击事件。

```html
<!-- Vue Component -->
<template>
  <div>
    <v-dialog v-model="dialog">
      <v-card>...</v-card>
    </v-dialog>

    <v-btn @click.stop="dialog = true">
      打开弹窗
    </v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
    }),
  }
</script>

```

<br>

- **如何升级到最新版本？**{ #latest-version-upgrade }

  关于如何升级到最新版本的详细指南，导航到 [发布和迁移](/getting-started/releases-and-migrations/) 页面。 此外，所有必要的更改都会在所有版本的 **升级指南** 中指出。

  **已发布**:

- [最新版](https://github.com/vuetifyjs/vuetify/releases/latest)
- [v2.0.0](https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0)
- [v1.5.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.5.0)
- [v1.4.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.4.0)
- [v1.3.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.3.0)
- [v1.2.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.2.0)
- [v1.1.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.1.0)
- [v1.0.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.0.0)
- [v0.17.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.17.0)
- [v0.16.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.16.0)
- [v0.15.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.15.0)
- [v0.14.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.14.0)
- [v0.13.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.13.0)
- [v0.12.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.12.0)

<br>

- **如何报告错误或请求功能？**{ #report-request-feature }

  为了确保提供所有需要的信息，我们创建了一个 [问题生成器](https://issues.vuetifyjs.com) ，帮助您完成这个过程。 不使用生成器创建的任何问题都将自动关闭，所以请使用它。

<br>

- **vuetify-loader没有加载所有组件。**{ #vuetify-loader-components }

  Vuetify-loader 在 _动态_ 组件中有限制。 请务必检查 [限制](/features/treeshaking/#limitations) 部分以获取更多信息。

<br>

- **1.5 版本将被支持多久？**{ #v15-lts }

  到2020年7月为止。 更多信息位于 [长期支持](/introduction/long-term-support/) 页面。

<br>

- **我在哪里能看到 v1.5 的文档？**{ #v15-docs }

  [https://v15.vuetifyjs.com](https://v15.vuetifyjs.com)

<br>

- **[Vue 警告]: 未知的自定义元素: &lt;v-app>**{ #unknown-element }

  请确保在 **package.json** 中安装了最新版本的 [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugin-vuetify) 和 [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader).

<br>

- **SCRIPT5022: 预期为标识符, 字符串或数字**{ #script5022 }

  为了支持 **vue-cli-3** 中的 ** 现代模式** ， `vuetify/lib` 没有被编译。 你必须告诉vue-cli 来编辑 `vutify` 包。 这是在安装Vuetify cli插件时自动配置的。 如果您正在使用旧版本，只需在 `vue.config.js` 中将 'vuetify' 添加到 ` transpileDependencies` 数组。

<br>

- **添加typescript - 错误：无法找到模块 'vuetify/lib' 的声明文件**{ #typescript-declaration-file }

  在 `tsconfig.json` 中使用 vuetify 更新 ` compilerOptions ` 的 type类型：

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vuetify"]
  }
}
```

## 需要帮助?

如果您需要帮助，请使用我们的一个帮助渠道：

- [Vuetify 专业支持](https://vuetifyjs.com/en/introduction/enterprise-support/)
- [Discord 社区](https://community.vuetifyjs.com/)
- [热门讨论](https://discussions.vuetifyjs.com/)

<br>

如需更多查询，请联系 [John Leider](mailto:john@vuetifyjs.com) or [Heather Leider](mailto:heather@vuetifyjs.com)

<promoted-ad type="theme" />

<backmatter />
