---
meta:
  title: Icon 图标
  description: 图标组件与多个常见的图标字体兼容，如Material Design图标，Font Awesome等等。
  keywords: 图标，vuetify 图标组件，vue 图标组件
related:
  - /features/icon-fonts/
  - /components/buttons/
  - /components/cards/
assets:
  - https://use.fontawesome.com/releases/v5.0.8/css/all.css
  - https://fonts.googleapis.com/css?family=Material+Icons
---

# Icons（图标）

`v-icon` 组件提供了一系列用于为您的应用程序的各个方面提供上下文的胶卷。 对于所有可用图标的列表, 请访问官方的 [Material Design 图标](https://materialdesignicons.com/) 页面。 要使用任何这些图标，只需使用 `mdi-` 前缀，然后是图标名称。

<entry-ad />

## 使用

图标有两个主题（浅色和深色）和五个不同的大小（x-small, small, medium （默认）, large, and x-large）。

<usage name="v-icon" />

## API

- [v-icon](/api/v-icon)

<inline-api page="components/icons" />

## 示例

### 属性

#### 颜色

使用色彩辅助器，您可以改变标准的暗黑和明亮的主题的图标的颜色。

<example file="v-icon/prop-color" />

### 事件

#### 单击

将任何单击事件绑定到 `v-icon` 将自动将光标更改为指针。

<example file="v-icon/event-click" />

### 其他

#### 按钮

图标可以在按钮内部使用，以增加动作的重点。

<example file="v-icon/misc-buttons" />

#### Font Awesome

同样支持 [Font Awesome](https://fontawesome.com/icons/) 。 只需使用 `fa-` 预定图标名称。 请注意，您仍然需要在您的项目中包含Font Awesome 图标。 关于如何安装它的更多信息，请导航到 [安装页面](/features/icon-fonts#install-font-awesome-5-icons)

<example file="v-icon/misc-font-awesome" />

#### Material Design

[Material Design](https://material.io/tools/icons/?style=baseline) 同样也受支持。 有关如何安装的更多信息，请[浏览这里](/features/icon-fonts#install-material-icons)。

<example file="v-icon/misc-md" />

#### MDI SVG

当使用 [@mdi/js](https://www.npmjs.com/package/@mdi/js) 软件包时，您可以只导入需要的图标。 如果您想要在 `VIcon` 组件中使用SVG图标， 请阅读 [这里](/features/icon-fonts#install-material-design-icons-js-svg)。

<example file="v-icon/misc-mdi-svg" />

## 无障碍

图标可以传达各种各样有意义的信息，所以将他们传递给尽可能多的受众是至关重要的。 您可能会注意到这两个用例：

- **装饰性图标** 仅用于视觉或品牌加固。 如果他们被从页面删除，用户仍然会理解并能够使用您的页面。

- **语义图标** 是你用来表达含义的，而不仅仅是纯粹的装饰。 这包括将边上不带有文本的图标用作一些交互式控件 — 按钮，表单元素，切换等。

<alert type="error">

  WAI-ARIA Authoring Practices 1.1指出，`aria-hidden="false`目前[在浏览器之间的行为不一致](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden)。

</alert>

<alert type="info">

  WIP：当您通过标签prop时，我们的团队将会更改为组件不渲染`aria-hidden="false"。

</alert>

### 装饰形的字体图标

如果您的图标纯粹是装饰性的，您需要手动为您的每个图标添加属性，以便它们可以访问。`被隐藏的`(自动通过回义)

### 语义字体图标

如果您的图标具有语义含义，您则需要提供一个对协助的技术可见的文本替代方法。 还包括适当的CSS 以便视觉隐藏该元素，同时使其能够为辅助技术所利用。

```html
<v-icon aria-hidden="false">
  mdi-account
</v-icon>
```

### 装饰性的 SVG 图标

如果您的图标纯粹是装饰性的，您需要手动为您的每个图标添加属性，以便它们可以访问。`被隐藏的`(自动通过回义)

### 语义化的 SVG 图标

Apply accessibility attributes to the [v-icon](/components/icons/) component, such as `role="img"`, to give it a semantic meaning.

```html
<v-icon aria-label="My Account" role="img" aria-hidden="false">
  mdiAccount
</v-icon>

<script>
import { mdiAccount } from "@mdi/js";

export default {
  data: () => ({
    icons: {
      mdiAccount
    }
  })
};
</script>
```

<backmatter />
