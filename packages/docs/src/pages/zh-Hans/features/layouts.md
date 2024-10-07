---
meta:
  title: 创建布局
  description: 通过我们的一步一步指南学习如何利用Vuetify扩展布局系统的强大功能
  keywords: 布局、预制布局、vuetify布局、预制vuetify布局、material布局、material设计布局
related:
  - /getting-started/installation/
  - /getting-started/wireframes/
---


# 布局

使用可定制和扩展的布局选项，构建漂亮的用户体验。

<alert type="warning">

  以下各章节假设您已使用Vue CLI创建了一个新的Vuetify应用程序，并对Vue、HTML、CSS和JavaScript有基本的了解。 在[安装页面]（/getting-started/Installation/#Vue CLI install）上查找有关使用Vue CLI安装Vuetify的更多信息。

</alert>

## 使用

Vuetify有一个内置的开箱即用的布局系统。 组件如 [v-app-bar](/components/app-bars/) 和 [v-foot](/components/footer/) 支持一个名为 **app** 的特殊属性。 此属性告诉Vuetify，相应的组件是应用程序布局的一部分。 在本节中，您将学习布局系统如何工作的基本知识。 如何合并多个布局组件，以及如何动态地改变它们。

Vuetify有两个主要布局组件， `v-app` 和 `v-main`。 `v-app` 组件是您的应用程序的根节点，直接替换默认的 Vue 入口`<div id="app">`。 `v-main` 组件是替换 `main` HTML 元素和您应用程序的根节点 __内容__ 的语义替代。 当Vue挂载到DOM时，作为布局一部分的任何Vuetify组件都会将其当前高度和/或宽度注册到框架核心。 `v-main` 组件接下来需要这些值并调整容器的大小。

为了更好地说明这一点，让我们创建一个基本的 Vuetify 布局：

```html
<v-app>
  <v-main>
    Hello World
  </v-main>
</v-app>
```

模板中没有布局组件, `v-main` 不需要调整其大小, 而是要占用整个页面。 让我们在 `v-main` 元素上面添加 [v-app-bar](/components/app-bars/) 来更改布局：

```html
<v-app>
  <!-- 必须有app属性 -->
  <v-app-bar app></v-app-bar>

  <v-main>
    Hello World
  </v-main>
</v-app>
```

因为我们给了 `v-app-bar` **app** prop, Vuetify 知道它是布局的一部分。 `v-main`然后获取我们的bar的注册高度，并从其可用内容区域中移除相同数量的空间。在这个例子中，<strong x-id=“1”>64px</strong>的空间从`v-main`的容器顶部移除。

<alert type="info">

  Vuetify有多个预制布局，名为 [wireframes](/getting-started/wiresmes/)，用于为应用程序的 UI 区域进行配置。

</alert>

最后，让我们通过将内容包装在`v-container`组件中来添加一个gutter：

```html
<v-app>
  <v-app-bar app></v-app-bar>

  <v-main>
    <v-container>
      Hello World
    </v-container>
  </v-main>
</v-app>
```

接下来，我们使用新建立的基线并使用新的布局组件和定制选项对其进行增强。

## 组合布局组件

关注更多

## 动态布局

关注更多

<backmatter />
