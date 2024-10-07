---
meta:
  title: Rating 评级
  description: 星级评级组件是一个专门的小工具，通过评级收集用户反馈。
  keywords: 星级评级，vuetify 星级评级组件，vue 星级评级组件，评级组件
related:
  - /components/cards/
  - /components/icons/
  - /components/lists/
---

# 评价 (Ratings)

评级组件是构建用户小部件的一个特殊但至关重要的部分。 通过评级收集用户反馈是一种简单的分析工具，可以为您的产品或应用程序提供大量反馈。

<entry-ad />

## 使用

`v-rating` 组件为收集用户反馈提供了一个简单的界面。

<usage name="v-rating" />

## API

- [v-rating](/api/v-rating)

<inline-api page="components/ratings" />

## 示例

### 属性

#### 颜色

`v-rating` 组件可以根据您的需要进行着色，您可以设置选定和未选定的颜色。

<example file="v-rating/prop-color" />

#### 长度

Sometimes an application will call for a customized implementation. Easily change length or displayed icons.

<example file="v-rating/prop-length" />

#### 增量

A rating can have 3 defined icons, **full-icon**, **half-icon** (with the **half-increments** prop) and **empty-icon**.

<example file="v-rating/prop-half-increments" />

#### 尺寸

使用`v-icon`中提供的相同尺寸等级，或提供您自己的<strong x-id=“1”>size</strong> prop。

<example file="v-rating/prop-size" />

#### 图标标签

Provide a label to assistive technologies for icons.

<example file="v-rating/prop-icon-label" />

### 插槽

#### 项目插槽

Slots are provided to give you even more freedom in how you display the rating.

<example file="v-rating/slot-item" />

### 其他

#### 高级用法

`v-rating`组件可与现有组件相匹配。 用丰富的功能和漂亮的设计构建复杂的例子。

<example file="v-rating/misc-advanced" />

#### 卡片评级

评级组件与产品搭配良好，使你能够收集和显示客户反馈。

<example file="v-rating/misc-card" />

<backmatter />
