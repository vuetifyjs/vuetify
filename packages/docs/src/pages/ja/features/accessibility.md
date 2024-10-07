---
meta:
  title: アクセシビリティ(a11y)
  description: Vuetify のコンポーネントでアクセシビリティ (accessibility; a11y) をサポートする例と利点を見ましょう。
  keywords: a11y、アクセシビリティ、ユーザビリティ
related:
  - /features/bidirectionality/
  - /components/menus/
  - /components/list-item-groups/
---

# アクセシビリティ(a11y)

Web accessibility **(a11y)** は、障碍を持つ人々のワールド・ワイド・ウェブ上の Web サイトとの対話やアクセスを妨げる障壁がないことを保証する包括的な方法です。 Vuetify コンポーネントは、すべてのマウスベースのアクションにキーボード操作を提供し、必要に応じて HTML5 セマンティック要素を使用するように構築されています。

<promoted-ad slug="vuetify-fundamentals-cheat-sheet" />

## Material Designアクセシビリティ

Googleは、a11yを念頭に置いてコンポーネントがどのように作成されるかについての詳細な概要を提供しています。 また、アプリケーションを作成するときにベストプラクティスを使用していることを確認する方法の例も提供しています（Vuetify でデフォルトでサポートされている範囲を超えています）。 [アクセシビリティを実装する](https://material.io/design/usability/accessibility.html) についての詳細は仕様サイトに記載されています。

## アクティベータースロット

Vuetifyは `v-menu`, `v-dialog` などの多くのコンポーネントにアクティベータースロットを使用します。 場合によっては、これらのアクティベーター要素には、対応するコンテンツに関連付けられる特定の a11y 属性が必要です。 これを達成するために、私たちはスロットスコープを通して必要なa11yオプションを渡します。

```html
<!-- Vue Template HTML Markup -->

<template>
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
      >
        Click me
      </v-btn>
    </template>

    <v-list>
      <v-list-item @click="method">
        <v-list-item-title>Option 1</v-list-item-title>
      </v-list-item>

      <v-list-item disabled>
        <v-list-item-title>Option 2</v-list-item-title>
      </v-list-item>

      <v-list-item @click="method">
        <v-list-item-title>Option 3</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
```

activator要素がレンダリングされると、バインドされたa11y属性が含まれるようになります。

```html
<!-- Rendered `v-btn` HTML Output -->

<button
  aria-expanded="false"
  aria-haspopup="true"
  role="button"
  type="button"
>
  Click me
</button>
```

## Item スロット

コンポーネントにスロットを使用し、要素にバインドするために正しいaria属性が必要な場合があります。 (**v-slot**) を使用する場合、上記の `v-menu` の例のように、これはスロットスコープで渡されます。 しかし、より複雑なコンポーネントもあり、適切なサポートを確保するために正しいコンポーネントに属性をバインドする必要があります。

### v-select

`v-select` コンポーネントは、すべての a11y 属性を自動的に設定します。 各アイテムは対応する **id**, **aria-labelledby**, **aria-selected** と **role** をデフォルトで生成します:

```html
<!-- Vue Template HTML Markup -->

<template>
  <v-select
    :items="['Foo', 'Bar']"
    label="Items"
  ></v-select>
</template>
```

レンダリングされると、`v-select`コンポーネントのコンテンツは次のようになります:

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

ただし、スロットを使用する場合は、渡されたプロパティを使用して適切なariaセットアップを取得する必要があります。 この情報は `v-autocomplete`、 `v-combobox` および `v-overflow-btn` にも適用され、すべてが `v-select` コンポーネントを拡張します。

<example file="accessibility/select-list-item" />

<promoted-ad slug="vuetify-github-sponsors" />

スロットで`v-list-item`コンポーネントを提供する場合、aria属性は**attrs**データプロパティに渡され、`v-bind`でバインドすることができます。

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

ラベルを正しい_option_に適切に関連付けるためには、`attrs.id` を `v-list-item-title` の `aria-labelled-by` にバインドする必要があります。 これにより、テキストが適切に関連付けられるようになります。 スロットを使用していない場合は、これは自動的に行われることを覚えておいてください。

## フォーカス管理とキーボード操作

属性以外にも、`v-menu` などのコンポーネントで<kbd>↑</kbd>と<kbd>↓</kbd>のキーによるオプション間移動のような操作もサポートされます。

### v-menu

When inside of a `v-menu`, `v-list-item` will be automatically configured to have a role of **menuitem**. Navigate to the [Menu](/components/menus) for more information on the components features.

<example file="accessibility/menu" />

`v-menu` コンポーネントがレンダリングされると、以下のようになります:

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

`v-list-item-group` コンポーネントがレンダリングされると、必要な a11y 属性がすべて表示されます。 以下は、レンダリングされたコンポーネントの例です:

```html
<!-- `v-list-group` content HTML Output -->

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

## 追加リソース

Vuetifyはアプリケーションでa11yをできるだけ簡単にすることを試みていますが、追加の情報が必要な場合があります。 以下に有用なリソースのリストを示します。

- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [The A11Y Project](https://a11yproject.com/)"

<backmatter />
