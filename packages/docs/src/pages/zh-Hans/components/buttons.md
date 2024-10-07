---
meta:
  title: Button 按钮
  description: 按钮组件传达用户可以进行的操作，通常被放置在对话框、表单、卡片和工具栏中。
  keywords: 按钮，vuetify 按钮组件，vue 按钮组件
related:
  - /components/button-groups/
  - /components/icons/
  - /components/floating-action-buttons/
---

# Buttons（按钮）

`v-btn` （按钮）组件采Material Design设计主题风格，并增加众多的配置选项替换了标准的 html 按钮。 任何颜色助手类都可以用来改变背景或文字颜色。 <inline-ad slug="scrimba-buttons" />

<entry-ad />

## 使用

最简单的按钮包含大写文本、轻微的仰角、悬停效果和单击时的波纹效果。

<usage name="v-btn" />

## API

- [v-btn](/api/v-btn)
- [v--btn-toggle](/api/v-btn-toggle)

<inline-api page="components/buttons" />

## 注意

<alert type="warning">

  当使用 **dark** 属性(prop) 时，`v-btn`(按钮) 是唯一一种拥有不同行为的组件。 通常来说，组件使用 **dark** 属性（prop）来表示他们将有深色背景，文本也需要是白色的。 虽然这对 `v-btn`（按钮组件）也是起作用的，但由于禁用状态与白色背景容易造成混淆，建议仅在按钮 **为**彩色背景时使用此属性。 If you need white text, simply add the `white--text` class.

</alert>

## 示例

### 属性

#### 块级按钮

添加**block** 属性，按钮将延占满可用的宽度。

<example file="v-btn/prop-block" />

#### 凹陷

**depressed** buttons still maintain their background color, but have no box shadow.

<example file="v-btn/prop-depressed" />

#### 浮动

浮动按钮是圆形的，通常包含一个图标。

<example file="v-btn/prop-floating" />

#### 图标

图标可以被用作按钮的主要内容。 这个属性是按钮变为圆角的，并且应用 **text** 属性样式.

<example file="v-btn/prop-icon" />

#### 加载器

Using the loading prop, you can notify a user that there is processing taking place. The default behavior is to use a `v-progress-circular` component but this can be customized.

<example file="v-btn/prop-loaders" />

<random-ad />

#### 轮廓

添加**outlined** 属性，按钮的边框颜色将继承自当前应用的按钮颜色。

<example file="v-btn/prop-outlined" />

#### Plain(朴实)

应用**plain**属性， 按钮将会有较低的基准不透明度, 以响应 **hover**(悬停) 和 **focus**(聚焦) 事件。

<example file="v-btn/prop-plain" />

#### Rounded（圆角）

**rounded** buttons behave the same as regular buttons but have rounded edges.

<example file="v-btn/prop-rounded" />

#### Sizing

Buttons can be given different sizing options to fit a multitude of scenarios.

<example file="v-btn/prop-sizing" />

#### 文本

Text buttons have no box shadow and no background. Only on hover is the container for the button shown. When used with the **color** prop, the supplied color is applied to the button text instead of the background.

<example file="v-btn/prop-text" />

#### 方块

**tile** buttons behave the same as regular buttons but have no border radius.

<example file="v-btn/prop-tile" />

### 其他

#### Raised

**raised** buttons have a box shadow that increases when clicked. This is the default style.

<example file="v-btn/misc-raised" />

<backmatter />
