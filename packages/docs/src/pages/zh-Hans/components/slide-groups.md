---
meta:
  title: Slide group 幻灯片组
  description: 幻灯片组组件类似于项目组，可以从元素中制作出可选择的内容，但以单行的方式进行。
  keywords: 幻灯片组，可滑动组，vuetify 幻灯片组组件，vue 幻灯片组组件
related:
  - /components/icons/
  - /components/carousels/
  - /components/tabs/
---

# 幻灯片组 (Slide groups)

`v-slide-group` 组件用于显示伪分页信息 它以 [v-item-group](/components/item-groups) 为核心，为 [v-tabs](/components/tabs) 和 [v-chip-group](/components/chip-groups) 等组件提供基础。

<entry-ad />

## 使用

类似于 <a href=“/components/windows”>v-window</a>组件，`v-slide-group`允许项目根据需要占用尽可能多的空间，允许用户在提供的信息中水平移动。

<example file="v-slide-group/usage" />

## API

- [v-slide-group](/api/v-slide-group)
- [v-slide-item](/api/v-slide-item)

<inline-api page="components/slide-groups" />


<!-- ## Sub-components

### v-slide-item

v-slide-item description -->

## 示例

### 属性

#### 激活类

**active-class** 属性允许您在激活的项上设置自定义的 CSS 类。

<example file="v-slide-group/prop-active-class" />

#### 激活项居中

使用 **center-active** prop 将使活动的项目永远居中。

<example file="v-slide-group/prop-center-active" />

#### 自定义分隔符

您可以使用 **next-icon** 和 **prev-icon** prop 添加自定义分页图标代替箭头。

<example file="v-slide-group/prop-custom-icons" />

### 必填项

**mandatory** prop 将使幻灯片组需要至少选择一个项目。

<example file="v-slide-group/prop-mandatory" />

#### 多选

您可以通过设置 **multiple** prop来选择多个项目。

<example file="v-slide-group/prop-multiple" />

### 其他

#### 伪轮播

自定义幻灯片组以在图表上创造性地显示信息。 使用此选项，可以方便地为用户显示辅助信息。

<example file="v-slide-group/misc-pseudo-carousel" />

<backmatter />
