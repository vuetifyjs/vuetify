---
meta:
  title: 无障碍 (a11y)
  description: 请看例子，以及 Vuetify 组件中的支持可访问性 (a11y) 的优势。
  keywords: a11y, 可访问性, 可用性
related:
  - /features/bidirectionality/
  - /components/menus/
  - /components/list-item-groups/
---

# 无障碍 (a11y)

网络可访问性**(简称a11y)**是一种包容性的实践，旨在确保没有阻碍残疾人与万维网网站互动或访问的障碍。 Vuetify组件的构建旨在为所有基于鼠标的操作提供键盘交互，并在适用的情况下利用HTML5语义元素。

<promoted-ad slug="vuetify-fundamentals-cheat-sheet" />

## Material Design 无障碍

Google提供了一个详细的概述，介绍了它们的组件是如何在a11y中创建的。 他们还提供了一些示例，说明如何确保在创建应用程序时使用最佳实践（超出了Vuetify默认支持的范围）。 您可以在规范站点找到更多关于 [实现辅助功能](https://material.io/design/usability/accessibility.html) 的信息。

## 激活器插槽

Vuetify 对许多组件使用激活器插槽，如 `v-menu`, `v-dialog` 等等。 在某些情况下，这些激活器元素应该具有特定的 a11y 属性，将它们与相应的内容联系起来。 为了实现这一点，我们通过slots scope传递必要的a11y选项。

```html
<!-- Vue Template HTML Markup -->

<template>
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
      >
        点击我
      </v-btn>
    </template>

    <v-list>
      <v-list-item @click="method">
        <v-list-item-title>选项 1</v-list-item-title>
      </v-list-item>

      <v-list-item disabled>
        <v-list-item-title>选项 2</v-list-item-title>
      </v-list-item>

      <v-list-item @click="method">
        <v-list-item-title>选项 3</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template><v-btn
        v-bind="attrs"
        v-on="on"
      >
```

当激活器元素被渲染时，它现在将包含绑定的 a11y 属性

```html
<!-- Rendered `v-btn` HTML Output -->

<button
  aria-expanded="false"
  aria-haspopup="true"
  role="button"
  type="button"
>
  点击我
</button>
```

## 项目插槽

在某些情况下，您需要为组件使用插槽，并且需要正确的aria属性来绑定到元素。 当使用 (**v-slot**)时，它会在插槽范围内传递给您，就像上面的 `v-menu` 示例所示。 但是，还有其他更复杂的组件，您需要将属性绑定到正确的组件以确保适当的支持。

### v-select

`v-select` 组件将自动配置所有需要的 a11y 属性。 每个项目在默认情况下将生成相应的 **id**, **aria-labelled-by**, **aria-selected** 和 ** roles ** ：

```html
<!-- Vue Template HTML Markup -->

<template>
  <v-select
    :items="['Foo', 'Bar']"
    label="Items"
  ></v-select>
</template>
```

渲染时， `v-select` 组件的内容将类似于：

```html
<!-- Rendered `v-select-list` content HTML Output -->

<div
  role="listbox"
  tabindex="-1"
>
  <div
    aria-labelledby="foo-list-item-12"
    aria-selected="true"
    class="v-list-item"
    role="option"
    tabindex="0"
  >
    <div
      class="v-list-item__title"
      id="foo-list-item-12"
    >
      Foo
    </div>
  <div
    aria-labelledby="bar-list-item-13"
    aria-selected="false"
    class="v-list-item"
    role="option"
    tabindex="0"
  >
    <div
      id="bar-list-item-13"
      class="v-list-item__title"
    >
      Bar
    </div>
  </div>
</div>
```

但是，在使用插槽时，有些情况下您需要利用传递的属性来获得正确的aria设置。 此信息也适用于 `v-autocomplete`, `v-combobox` 和 `v-overflow-btn` 因为它们都扩展了 `v-select` 组件.

<example file="accessibility/select-list-item" />

<promoted-ad slug="vuetify-github-sponsors" />

When providing a `v-list-item` component in a slot, the aria attributes are passed through the **attrs** data property and can be bound with `v-bind`.

```html
<!-- Vue Template HTML Markup -->

<template>
  <v-select
    :items="['Fizz', 'Buzz']"
    label="Items"
  >
    <template v-slot:item="{ item, attrs, on }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
        <v-list-item-content>
          <v-list-item-title
            :id="attrs['aria-labelledby']"
            v-text="item.title"
          ></v-list-item-title>

          <v-list-item-subtitle v-text="item.sub"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>
```

In order to properly associate a label with the correct _option_ you will need to bind `attrs.id` to the `aria-labelled-by` on your `v-list-item-title`. This will ensure that the text is properly associated. Keep in mind, this is done automatically for you if you are not using slots.

## 焦点管理和键盘交互

Beyond attributes, components such as `v-menu` also support interaction by pressing <kbd>↑</kbd> and <kbd>↓</kbd> for navigating between options.

### v-menu

When inside of a `v-menu`, `v-list-item` will be automatically configured to have a role of **menuitem**. Navigate to the [Menu](/components/menus) for more information on the components features.

<example file="accessibility/menu" />

When the `v-menu` component is rendered it will resemble the following:

```html
<!-- Rendered `v-menu` content HTML Output -->

<div
  class="v-menu__content"
  role="menu"
>
  <div class="v-list">
    <div
      class="v-list-item"
      role="menuitem"
      tabindex="0"
    >
      ...
    </div>
    <div
      aria-disabled="true"
      class="v-list-item"
      role="menuitem"
      tabindex="-1"
    >
      ...
    </div>
  </div>
</div>
```

### v-list-item-group

The `v-list-item-group` component makes `v-list-item` interactable and navigatable when pressing the <kbd>tab</kbd> key. It also configures `v-list-item` to have a role of **listitem**. Navigate to the [List-item group](/components/list-item-groups) for more information on the components features.

<example file="accessibility/list-item-group" />

When the `v-list-item-group` component is rendered it have all the necessary a11y attributes. The following is an example of the rendered component:

```html
<!-- Rendered `v-list-group` content HTML Output -->

<div
  class="v-list-item-group"
  role="listbox"
>
  <div
    aria-selected="true"
    class="v-list-item"
    role="listitem"
    tabindex="0"
  >
    ...
  </div>
  <div
    aria-disabled="true"
    aria-selected="true"
    class="v-list-item"
    role="listitem"
    tabindex="-1"
  >
    ...
  </div>
  <div
    aria-selected="false"
    class="v-list-item"
    role="listitem"
    tabindex="0"
  >
    ...
  </div>
</div>
```

## 额外资源

While Vuetify attempts to make a11y as easy as possible in your application, there are times where additional information is needed. Below you can find a list of helpful resources.

- [W3C Web可访问性计划](https://www.w3.org/WAI/)
- [WAI-ARIA创作实践](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [A11Y 项目](https://a11yproject.com/)"

<backmatter />
