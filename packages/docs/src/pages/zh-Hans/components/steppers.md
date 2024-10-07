---
meta:
  title: Stepper 步骤条
  description: 步骤条组件提供了一个类似于表单向导的信息收集和显示给用户的线性递进过程。
  keywords: 步骤条, vuetify 步骤条组件, vue 步骤条组件
related:
  - /components/tabs/
  - /components/buttons/
  - /components/windows/
---

# Steppers（步骤条）

`v-stepper` 组件通过数字步骤显示进度。

<entry-ad />

## 使用

一个步骤组件适用于多种场景，包括购物车、创建记录等等。

<example file="v-stepper/usage" />

## API

- [v-stepper](/api/v-stepper)
- [v-stepper-content](/api/v-stepper-content)
- [v-stepper-header](/api/v-stepper-header)
- [v-stepper-items](/api/v-stepper-items)
- [v-stepper-step](/api/v-stepper-step)

<inline-api page="components/steppers" />


<!-- ## Sub-components

### v-stepper-content

v-stepper-content description

### v-stepper-header

v-stepper-header description

### v-stepper-items

v-stepper-header description

### v-stepper-step

v-stepper-step description -->

## 示例

### 属性

#### 备用标签

步骤组件也有一个放置在步骤下方的备用标签样式。

<example file="v-stepper/prop-alternate-label" />

#### 非线性的步骤条

非线性步骤可以让用户按照自己选择路线在流程中移动。

<example file="v-stepper/prop-non-linear" />

#### 垂直

水平步骤线通过定义的步骤将用户沿 y轴 移动。其他地方与水平方向的一致。

<example file="v-stepper/prop-vertical" />

### 其他

#### 错误状态的备用标签

错误状态同样可以应用于备用标签样式的显示。

<example file="v-stepper/misc-alternate-error" />

#### 动态步骤

步骤条可以动态地添加或移除他们的步骤。 如果删除了一个当前激活的步骤，请务必通过更改应用model来说明这一点。

<example file="v-stepper/misc-dynamic" />

#### 可编辑步骤

用户随时可以选择可编辑的步骤并将跳转到该步。

<example file="v-stepper/misc-editable" />

#### 错误状态

可以显示错误状态来通知用户必须采取的一些行动。

<example file="v-stepper/misc-error" />

#### 水平步骤线

水平步骤线通过定义的步骤将用户沿 x轴 移动。

<example file="v-stepper/misc-horizontal" />

#### 线性步骤

线性步骤始终沿着你定义的路径移动。

<example file="v-stepper/misc-linear" />

#### 不可编辑步骤

不可编辑步骤（Non-editable steps）强制用户在整个流程中进行线性处理。

<example file="v-stepper/misc-non-editable" />

#### 可选步骤

可选步骤可由子文本调出。

<example file="v-stepper/misc-optional" />

#### 垂直错误

同样的，错误状态也可以应用于垂直的步骤。

<example file="v-stepper/misc-vertical-error" />

<backmatter />
