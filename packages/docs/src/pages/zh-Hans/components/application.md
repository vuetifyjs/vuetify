---
meta:
  title: 应用服务
  description: Vuetify 配备了一个默认的标记，使得它很容易为任何 Vue 应用创建布局（模板）。
  keywords: 默认布局，vuetify 默认标记，vuetify 默认布局
related:
  - /features/theme/
  - /components/app-bars/
  - /components/navigation-drawers/
---

# Application (应用程序)

在 Vuetify 中，`v-app` 组件和 `v-navigation-drawer`、`v-app-bar`、`v-footer` 等组件上的 **app** 属性，帮助你的应用围绕 `<v-main>` 组件进行适当的大小调整。 这使你可以创建真正独特的界面，无需因管理布局尺寸而烦恼。 所有应用都**需要** `v-app` 组件。 这是许多 Vuetify 组件和功能的挂载点，并确保它将默认的应用 _变体_ （**dark/light**）传递给子组件，并确保在浏览器中对某些点击事件的正确跨浏览器支持，如 Safari。 `v-app` 只应该在你的应用中渲染**一次**。

<entry-ad />

## API

- [v-app](/api/v-app)
- [v-main](/api/v-main)

<inline-api page="components/application" />

<alert type="error">

  为了让你的应用正常工作，你**必须**将其包裹在 `v-app` 组件中。 该组件是确保正确的**跨浏览器兼容性**所必需的。 Vuetify 不支持在一个页面上有多个孤立的 Vuetify 实例。 `v-app` 可以存在于你的应用主体的**任何地方**，但是只能有一个，而且它必须是**所有** Vuetify 组件的祖先节点。

</alert>

<alert type="info">

  如果你在应用中使用多个布局，你需要确保每个包含 Vuetify 组件的根布局文件在其模板的根部有一个 `v-app`。

</alert>

## 默认应用标记

这是一个 Vuetify 默认应用标记的例子。 只要设置 **app** 属性，你可以将布局元素放在任何地方。 ` v-main ` 是让您的页面内容和布局元素共同呈现的关键组件。 ` v-main ` 组件将根据指定的 **应用程序**组件结构，动态；灵活地调整大小。 你可以使用上述任何或所有组件的组合，包括 `v-bottom-navigation`。

当使用 [vue-router](https://router.vuejs.org/) 时，建议将你的视图放在 `v-main` 内。

```html
<!-- App.vue -->

<v-app>
  <v-navigation-drawer app>
    <!-- -->
  </v-navigation-drawer>

  <v-app-bar app>
    <!-- -->
  </v-app-bar>

  <!-- 根据应用组件来调整你的内容 -->
  <v-main>

    <!-- 给应用提供合适的间距 -->
    <v-container fluid>

      <!-- 如果使用 vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
```

<alert type="info">

  设置 **app** 属性会自动给布局元素设置 position: **fixed**。 如果你的应用程序需要一个 _绝对定位_ 元素，你可以使用 **absolute** 属性来覆盖这个功能。

</alert>

## 应用组件

以下是所有支持 **app** 属性的组件列表，这些组件可以在你的应用中用作布局元素。 这些组件可以混合和匹配，并且每个特定组件在任何时候都只能存在**一个**。 不过，你可以把它们换掉，布局也能适应。 有关如何构建各种布局的一些示例，请查看[预制布局](/getting-started/wireframes)页面。

每一个应用组件都有一个指定的位置和优先级，影响布局系统中的位置。

- [v-app-bar](/components/app-bars)：总是放在应用顶部，优先级低于 `v-system-bar`。
- [v-bottom-navigation](/components/bottom-navigation)：总是放在应用底部，优先级高于 `v-footer`。
- [v-footer](/components/footer)：总是放在应用底部，优先级低于 `v-bottom-navigation`。
- [v-navigation-drawer](/components/navigation-drawers)：可以放置在应用的左边或右边，并且可以配置在 `v-app-bar` 的旁边或下面。
- [v-system-bar](/components/system-bars)：总是放在应用顶部，优先级高于 `v-app-bar`。

<app-img src="https://cdn.vuetifyjs.com/images/layouts/app.png" alt="Vuetify Application" />

## 应用服务

**应用服务**用于配置你的 Vuetify 布局。 它与 `v-main` 组件通信，以便它能够正确地调整应用内容。 它有一些可以访问的属性：

```ts
{
  bar: number
  bottom: number
  footer: number
  insetFooter: number
  left: number
  right: number
  top: number
}
```

当你使用 **app** 属性添加和删除组件时，这些值会自动更新。 它们是 **不可** 编辑的，并且以 _只读_ 状态存在。 你可以通过引用 **$vuetify** 对象的应用属性来访问这些值。

```js
console.log(this.$vuetify.application.top) // 56
```

<alert type="error">

  为了让你的应用正常工作，你**必须**将其包裹在 `v-app` 组件中。 该组件是确保正确的**跨浏览器兼容性**所必需的。 Vuetify 不支持在一个页面上有多个孤立的 Vuetify 实例。 `v-app` 可以存在于你的应用主体的**任何地方**，但是只能有一个，而且它必须是**所有** Vuetify 组件的祖先节点。

</alert>

## 无障碍

默认情况下，`v-main` 被分配给 [TR](https://www.w3.org/TR/html51/) 标签 [**main**](https://www.w3.org/TR/html51/grouping-content.html#the-main-element)，表示它是一个文档或应用的 `body` 的主要内容区域。

<backmatter />
