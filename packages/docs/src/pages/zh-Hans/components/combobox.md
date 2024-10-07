---
meta:
  title: Combobox 组合框
  description: 组合框组件提供了类型前自动完成功能，并允许用户在提供的选项列表之外提供一个自定义值。
  keywords: combobox, vuetify combobox组件, vue combobox组件
related:
  - /components/autocompletes/
  - /components/forms/
  - /components/selects/
---

# 组合选择框 (Combobox)

`v-combobox`组件是一个允许用户输入不存在于所提供**项目**的值的[v-autocomplete](/components/autocompletes)。 被创建的项目返回字符串类型

<entry-ad />

## 使用

使用组合框，您可以允许用户创建可能不在提供的项列表中显示的新值。

<usage name="v-combobox" />

## API

- [v-combobox](/api/v-combobox)

<inline-api page="components/combobox" />

## 注意

<alert type="error">

  因为组合框(ComboBox) 允许用户输入，它**总是**返回提供给它的完整值(例如，对象列表在选择时返回对象) 这是因为无法知道某个值是否被认为是用户输入或对象查找[GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)

</alert>

<alert type="warning">

  **menu-props** 的 **auto** 属性只支持默认输入样式。

</alert>

<alert type="info">

  浏览器自动补全默认设置为关闭，可能因不同的浏览器而变化或忽略。 [MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)

</alert>

## 示例

### 属性

#### Dense（密集）

你可以使用`dense`属性来降低自动完成的高度和缩小列表项的最大高度。

<example file="v-combobox/prop-dense" />

#### 多个组合框

以前被称为**tags** - 允许用户输入多个值

<example file="v-combobox/prop-multiple" />

### 插槽

#### No data with chips (无内容的插槽)

在本例中，我们使用一个自定义的 **no-data** 插槽在 搜索/创建 项时为用户提供上下文。

<example file="v-combobox/slot-no-data" />

### 其他

#### 高级自定义选项

`v-combobox`可以通过添加`v-select`和`v-autocomplete`功能来优化。 这为您提供了一个扩展接口，可以创建真正的定制实现程序。 此示例利用了一些更高级的功能，例如自定义 **过滤** 算法、内联列表编辑和动态输入项。

<example file="v-combobox/misc-advanced" />

<backmatter />
