---
meta:
  title: Card 卡片
  description: v-card 组件是一个可用于从面板到静态图像的多功能组件。
  keywords: 卡片，vuetify 卡片组件，vue 卡片组件
related:
  - /components/buttons/
  - /components/images/
  - /styles/text-and-typography/
---

# Cards（卡片）

`v-card` 组件是一个可用于从面板到静态图像的多功能组件。 **卡** 组件有许多帮助程序组件来尽可能简单地进行标记。 没有列出选项的组件使用Vue的功能组件来更快渲染并充当标记糖以使建筑变得更加容易。 <inline-ad slug="scrimba-cards" />

<entry-ad />

## 使用

卡中有4个基本组件。 `v-card-title`, `v-card-subtitle`, `v-card-text` 和 `v-card-actions`

<usage name="v-card" />

## API

- [v-card](/api/v-card)
- [v-card-actions](/api/v-card-actions)
- [v-card-subtitle](/api/v-card-subtitle)
- [v-card-text](/api/v-card-text)
- [v-card-title](/api/v-card-title)

<inline-api page="components/cards" />

## 函数式组件

<vuetify-ad slug="vs-video-functional-components" />

### v-card-actions

`v-card-actions`的空间可用于放置用于卡片的**选项**，例如[v-btn](/components/buttons)按钮组件或者[v-menu](/components/menus)菜单组件。 它也在选项按钮上应用了*特殊边距排版*，使其能够和卡片上的其他内容正确排列起来。

### v-card-subtitle

`v-card-subtitle`组件能为卡片的小标或字幕提供其默认的**字体大小**和**填充**排版。 字体大小可以使用文本和排版中的[文字排版属性](/styles/typography)进行调整。

### v-card-text

`v-card-text`主要用于显示卡片中的文本内容。 它使卡片中的文本能够进行填充排版，并将字体大小减小至 .875rem 的大小。

### v-card-title

`v-card-title`为卡片的大标提供了默认的**字体大小**和**填充排版**。 字体大小可以使用文本和排版中的[文字排版属性](/styles/typography)进行调整。

## 示例

### 属性

#### 加载

Cards can be set to a loading state when processing a user action. This disables further actions and provides visual feedback with an indeterminate [v-progress-linear](/components/progress-linear).

<example file="v-card/prop-loading" />

#### 轮廓

An **outlined** card has 0 elevation and contains a soft border.

<example file="v-card/prop-outlined" />

### 其他

#### 卡片显示

Using [v-expand-transition](/api/v-expand-transition/) and a `@click` event you can have a card that reveals more information once the button is clicked, activating the hidden card to be revealed.

<example file="v-card/misc-card-reveal" />

#### 包含内容

The `v-card` component is useful for wrapping content.

<example file="v-card/misc-content-wrapping" />

#### 自定义操作

With a simple conditional, you can easily add supplementary text that is hidden until opened.

<example file="v-card/misc-custom-actions" />

#### 布局组件 (Grids)

Using grids, you can create beautiful layouts.

<example file="v-card/misc-grids" />

#### 水平卡片

Using `v-col`, you can create customized horizontal cards. Use the `contain` property to shrink the `v-img` to fit inside the container, instead of covering.

<example file="v-card/misc-horizontal-cards" />

#### 信息卡片

Cards are entry points to more detailed information. To keep things concise, ensure to limit the number of actions the user can take.

<example file="v-card/misc-information-card" />

#### 带文字的媒体

Using the layout system, we can add custom text anywhere within the background.

<example file="v-card/misc-media-with-text" />

#### Twitter 卡片

The `v-card` component has multiple children components that help you build complex examples without having to worry about spacing. This example is comprised of the `v-card-title`, `v-card-text` and `v-card-actions` components.

<example file="v-card/misc-twitter-card" />

#### 天气卡片

Using [v-list-items](/components/lists) and a [v-slider](/components/sliders), we are able to create a unique weather card. The list components ensure that we have consistent spacing and functionality while the slider component allows us to provide a useful interface of selection to the user.

<example file="v-card/misc-weather-card" />

<backmatter />
