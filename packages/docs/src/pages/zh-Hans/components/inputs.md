---
meta:
  title: Input 输入框
  description: 输入框组件是所有 Vuetify 表单组件的基础功能，为自定义实现提供了一个基础。
  keywords: 输入, vuetify 输入组件, vue 输入组件
related:
  - /components/forms/
  - /components/selects/
  - /components/text-fields/
---

# Inputs（输入框）

`v-input` 组件为您提供了一个基线来创建您自己的自定义输入。 它包含一个预留/附加的空档，消息和一个默认的空档。 _建议_扩展该组件，但它可以作为一个独立组件使用

<entry-ad />

## 使用

`v-input` 有4个主要区域。 前列位置、所附位置、默认位置和消息。 这些构成了所有形式组件之间共享的核心逻辑。

<example file="v-input/usage" />

## API

- [v-input](/api/v-input)

<inline-api page="components/inputs" />

## 注意

<alert type="warning">

  `v-input`组件被用作所有Vuetify表单控件的包装器。 它**不**继承属性，因为这些属性预计会传递到内部输入。

</alert>

## 示例

### 属性

#### 出错

作为任何可验证的Vuetify组件，`v-input`可以使用**error** prop设置为错误状态，可以使用**error-messages** prop添加消息。 您可以使用 **error-count** 属性来决定是否显示错误消息。

#### 错误计数：

你可以使用**error-count** 属性给 `v-input` 添加多个错误。

<example file="v-input/prop-error-count" />

<example file="v-input/prop-error" />

#### 隐藏详细信息

当 `hide-details` 设置为 `auto` 时，只有在有信息（提示、错误信息等）显示的情况下，才会显示信息。

<example file="v-input/prop-hide-details" />

#### 提示

`v-input` 可以有 **提示** 可以告诉用户如何使用输入。 **持久性提示** prop 如果没有显示消息，则提示总是可见。

<example file="v-input/prop-hint" />

#### 加载

`v-input` 有 **正在加载** 状态，可以使用，例如用于数据加载指示器。 注意：例如， `v-text field` 被使用。

<example file="v-input/prop-loading" />

#### 规则

您可以将自定义验证规则添加到 `v-input`, 添加它们作为函数返回 `true`/errors 消息。 注意：例如， `v-text field` 被使用。

<example file="v-input/prop-rules" />

#### 成功

作为任何可验证的Vuetify组件，`v-input`可以使用**error** prop设置为错误状态，可以使用**error-messages** prop添加消息。

<example file="v-input/prop-success" />

### 事件

#### 点击槽位

`v-input` 可以有 `点击：追加` 和 `点击：前缀` 事件作为其位置。 注意：例如， `v-text field` 被使用。

<example file="v-input/event-slot-clicks" />

### 插槽

#### 附加代码

`v-input` 有 `追加` 和 `前缀` 插槽。 你可以在插槽中放置自定义图标.

<example file="v-input/slot-append-and-prepend" />

<backmatter />
