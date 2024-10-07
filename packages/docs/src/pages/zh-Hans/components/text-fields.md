---
meta:
  title: Text field 输入框
  description: 文本框组件接受用户的文本输入.
  keywords: 文本框，vuetify 文本框组件，vue 文本框组件
related:
  - /components/forms/
  - /components/selects/
  - /components/textarea/
---

# 单行文本框 (Text fields)

文本框组件用于收集用户提供的信息。

<entry-ad />

## 使用

具有占位符 和/或 标签的简单文本字段。

<example file="v-text-field/usage" />

## API

- [v-text-field](/api/v-text-field)

<inline-api page="components/text-fields" />

## 示例

### 属性

#### 计数器

使用 **计数器** prop 通知用户字符限制。 The counter does not perform any validation by itself - you will need to pair it with either the internal validation system, or a 3rd party library. The counter can be customised with the **counter-value** prop and **counter** scoped slot.

<example file="v-text-field/prop-counter" />

#### 可清除

When **clearable**, you can customize the clear icon with **clear-icon**. Note that **readonly** will not remove the clear icon, to prevent readonly inputs from being cleared you should also disable **clearable**.

<example file="v-text-field/prop-clearable" />

#### 自定义颜色

您可以选择性地将文本字段更改为材料设计色板中的任何颜色。 下面是验证的自定义表单的执行示例。

<example file="v-text-field/prop-custom-colors" />

#### 密集

You can reduce the text field height with **dense** prop.

<example file="v-text-field/prop-dense" />

#### 禁用且只读

文本字段可以是 **禁用** 或 **只读**。

<example file="v-text-field/prop-disabled-and-readonly" />

#### Filled（填充）

文本字段可以与其他(布局)盒子一起使用。

<example file="v-text-field/prop-filled" />

#### 隐藏详细信息

当 `hide-details` 设置为 `auto` 时，只有在有信息（提示、错误信息等）显示的情况下，才会显示信息。

<example file="v-text-field/prop-hide-details" />

#### 提示

文本字段上的 **提示** 属性添加了文本字段下方提供的字符串。 使用 **持久性提示** 在文本字段未被焦点时显示提示。 单声道模式不支持提示 _****_

<example file="v-text-field/prop-hint" />

#### 图标 (Icons)

您可以添加图标到文本字段使用 **前置图标**。 **附加图标** 和 **附加边栏图标** props.

<example file="v-text-field/prop-icon" />

#### Outlined（轮廓）

文本字段可以与其他轮廓设计一起使用。

<example file="v-text-field/prop-outlined" />

#### 前缀和后缀

**前缀** 和 **后缀** 属性允许您在文本字段旁边添加和附加不可更改的内联文本。

<example file="v-text-field/prop-prefixes-and-suffixes" />

#### 形状

<strong x-id=“1”>shaped</strong>文本字段如果是 **outlined**  则是圆角的；如果是**filled**，则具有更大的 **border-radius**。

<example file="v-text-field/prop-shaped" />

#### 单行亮色主题

单行文本框的标签不会浮动到焦点或数据之上。

<example file="v-text-field/prop-single-line" />

#### 单独

文本字段可以与其他单独设计一起使用。

<example file="v-text-field/prop-solo" />

#### 验证

Vuetify包括通过 **规则** prop进行简单的验证。 prop 接受了各种类型 `函数`, `布尔值` 和 `字符串` 的组合。 当输入值发生变化时，数组中的每个元素将被验证。 函数传递当前的v-model 作为参数，必须返回 `true` / `false` 或 `字符串` 包含错误消息。

<example file="v-text-field/prop-validation" />

### 事件

#### 图标事件

`点击:前缀`, `点击:附加`, `点击外部`并且 `点击：清除` 将在点击相应的图标时发出。 请注意，如果使用插槽，将不会触发这些事件。

<example file="v-text-field/event-icons" />

### 插槽

#### 图标插槽

可以使用插槽来扩展输入的功能，而不是使用 prepend / append / append-outer 图标。

<example file="v-text-field/slot-icons" />

#### 标签

文本字段标签可以在 `label` 插槽中定义 - 允许使用 HTML 内容

<example file="v-text-field/slot-label" />

#### Progress（进度条）

您可以显示进度条而不是底线。 您可以使用与文本字段相同的默认不可确定的进度或使用 `进度` 指定一个自定义的进度

<example file="v-text-field/slot-progress" />

### 其他

#### 自定义验证

虽然内置的 `v-form` 组件以及第三方插件比如 \[vuelidate\](https://github.com/monterail/vuelidate) or \[vee-validation\](https://github.com/logaretm/vee-validate) 可以帮助你简化验证过程，但你仍可以简单的自行控制它。

<example file="v-text-field/misc-custom-validation" />

#### 带计数器的全宽度

全宽文本字段允许您创建无限输入。 在此示例中，我们使用 `v-divider` 分隔字段。

<example file="v-text-field/misc-full-width-with-counter" />

#### 密码输入

Using the HTML input **type** [password](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password) can be used with an appended icon and callback to control the visibility.

<example file="v-text-field/misc-password" />

<backmatter />
