---
meta:
  title: Autocomplete 自动补全
  description: 自动补全组件提供了类型前自动补全功能，并提供了一个可用选项列表。
  keywords: 自动补全, vuetify 自动补全组件, vue 自动补全组件
related:
  - /components/combobox/
  - /components/forms/
  - /components/selects/
---

# Autocompletes（自动补全）

`v-autocomplete`组件提供简单且灵活的自动补全功能 且支持查找大规模数据甚至是从API请求的动态数据

<entry-ad />

## 使用

自动补全组件拓展了`v-select`并且添加了过滤项目的功能

<usage name="v-autocomplete" />

## API

- [v-autocomplete](/api/v-autocomplete)

<inline-api page="components/autocompletes" />

## 注意

<alert type="error">

  当使用一个Object(对象) 作为**items**的属性时，你必须使用**item-text**和**item-value**与传入的对象关联起来。 这些值默认为 **text** 和 **value** 且可以更改。

</alert>

<alert type="warning">

  **menu-props** 的 **auto** 属性只支持默认输入样式。

</alert>

<alert type="info">

  浏览器自动补全默认设置为关闭，可能因不同的浏览器而变化或忽略。 [MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)

</alert>

## 示例

下面是一些简单到复杂的例子。

### 属性

#### 紧凑

你可以使用`dense`属性来降低自动补全的高度和缩小列表项的最大高度。

<example file="v-autocomplete/prop-dense" />

#### 过滤器

`filter`属性可以用自定义的逻辑来过滤单独的项目 在这个例子中我们使用name来过滤项目

<example file="v-autocomplete/prop-filter" />

### 插槽

#### 项目和选择项

你可以使用插槽自定义被选中时的视觉效果。 在这个示例中，我们为`chips`和`list-item`添加了头像。

<example file="v-autocomplete/slot-item-and-selection" />

### 其他

#### API查找

轻松绑定动态数据并创建独特的体验。 `v-autocomplete`的扩展支持列表使得很容易调节每个方面的输入。

<example file="v-autocomplete/misc-api-search" />

#### 异步项目

有时您需要基于搜索查询加载外部的数据。 在赋值`autocomplete`的属性时使用`search-input`属性与**.sync**修饰符 我们还使用新的 `cache-items` 属性。 这将保持一个唯一的列表，它的所有项目都被传递到`items`属性。当使用异步项目和 **多个** 属性时是**必须的** 。

<example file="v-autocomplete/misc-asynchronous-items" />

#### 加密货币选择器

`v-autocomplete` 组件非常灵活，可以适合任何使用情况。 为**no-data**, **item**和**selection**插槽创建自定义的显示样式以提供独特的用户体验. 使用 _插槽_ 使您能够轻松自定义您的应用程序所需的外观。

<example file="v-autocomplete/misc-cryptocurrency-selector" />

#### 状态选择器

结合使用 `v-autocomplete`插槽和过渡，您可以创建一个现代的的可切换的自动补全栏，例如这个状态选择器。

<example file="v-autocomplete/misc-state-selector" />

<backmatter />
