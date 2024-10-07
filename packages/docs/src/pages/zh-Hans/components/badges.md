---
meta:
  title: Badge 徽章
  description: 徽章组件是一个缩小的元素状态描述符。 它通常包含少量数字或短的字符集。
  keywords: 徽章, vuetify 徽章组件, vue 徽章组件
related:
  - /components/avatars/
  - /components/icons/
  - /components/toolbars/
---

# 徽章 (Badges)

`v-badge` 组件上覆或订阅一个像头像的图标或内容上的文本来突出显示用户的信息或只是提请注意某个特定元素。 徽章中的内容通常包含数字或图标。

<entry-ad />

## 使用

最简单形式的徽章显示在它包装的内容的右上角，并且需要徽章插槽。

<usage name="v-badge" />

## API

- [v-badge](/api/v-badge)

<inline-api page="components/badges" />

## 示例

### 其他

#### 自定义选项

`v-badge` 组件是灵活的，可以用于众多元素的各种使用案例。 调整位置的选项也可以通过 **offset-x** 和 **offset-y** props.”

<example file="v-badge/misc-customization" />

#### 动态通知

你可以将徽章与动态内容合并，以创建通知系统之类的东西。

<example file="v-badge/misc-dynamic" />

#### 鼠标悬停显示

你可以用可见性控制做很多事情，例如，在鼠标悬停时显示徽章。

<example file="v-badge/misc-hover" />

#### 标签页

徽章有助于以各种方式向用户传递信息。

<example file="v-badge/misc-tabs" />

<backmatter />
