---
meta:
  title: Select 下拉框
  description: 选择组件提供了用户可以从中选择的选项列表。
  keywords: 选择, vuetify 选择组件, vue 选择组件
related:
  - /components/autocompletes/
  - /components/combobox/
  - /components/forms/
---

# 下拉选择框 (Selects)

选择器组件用于从选项列表中收集用户提供的信息。

<entry-ad />

## 使用

<example file="v-select/usage" />

## API

- [v-select](/api/v-select)

<inline-api page="components/selects" />

## 注意

<alert type="info">

  浏览器自动补全默认设置为关闭，可能因不同的浏览器而变化或忽略。 [MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)

</alert>

<alert type="warning">

  **menu-props** 的 **auto** 属性只支持默认输入样式。

</alert>

<alert type="error">

  当使用一个Object(对象) 作为**items**的属性时，你必须使用**item-text**和**item-value**将存在于你对象中的属性关联起来。 这些值默认为 **text** 和 **value** 且可以更改。

</alert>

## 示例

### 属性

#### 自定义选项的文本和值

您可以在您的项目中指定特定属性的值和文本字段相对应。 默认情况下，将是属性 **text** 和 **value**相对应。 而在这个示例中，我们将应用 **return-object** 属性的方式来返回所选项目的整个对象值。

<example file="v-select/prop-custom-text-and-value" />

#### 密集

你可以使用**dense**属性来降低自动完成的高度和缩小列表项的最大高度。

<example file="v-select/prop-dense" />

#### 禁用

将**disabled**属性应用于`v-select`将阻止用户与组件交互。

<example file="v-select/prop-disabled" />

#### 图标 (Icons)

使用自定义前置或者后置图标。

<example file="v-select/prop-icons" />

#### 浅色主题

标准的单选有多种配置选项

<example file="v-select/prop-light" />

#### 菜单属性

</strong> 在这个示例中，菜单被指定向上打开并移动至顶部。

<example file="v-select/prop-menu-props" />

#### 多选

多选择器可以使用 `v-chip` 组件来显示已选项。

<example file="v-select/prop-multiple" />

#### 只读

您可以在 `v-select` 上应用**只读** 属性来防止用户更改其值。

<example file="v-select/prop-readonly" />

### 插槽

#### 附加代码

`v-select` 组件可以通过预定和附加项目进行扩展。 这完全适合自定义的 **选择所有** 功能。

<example file="v-select/slot-append-and-prepend-item" />

#### 选择

**选择** 可用于自定义选中值在输入中显示的方式。 当您想要像 `foo (+20 others)` 或不想让选区占用多行时，这是很棒的。

<example file="v-select/slot-selection" />

<backmatter />
