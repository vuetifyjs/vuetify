---
meta:
  title: コンボボックス・コンポーネント
  description: コンボボックスコンポーネントは、先行入力オートコンプリート機能を提供し、ユーザーが提供するオプションのリスト以外のカスタム値を提供できるようにします。
  keywords: combobox, vuetify combobox component, vue combobox component
related:
  - /components/autocompletes/
  - /components/forms/
  - /components/selects/
---

# Combobox

`v-combobox`コンポーネントは選択肢 **items**内に存在しない値を入力できる[v-autocomplete](/components/autocompletes)です。 作成されたアイテムは文字列として返されます。

<entry-ad />

## 使い方

コンボボックスを使用すると、提供されたアイテムリストに存在しない値をユーザーが作成できるようにすることができます。

<usage name="v-combobox" />

## API

- [v-combobox](/api/v-combobox)

<inline-api page="components/combobox" />

## 注意事項

<alert type="error">

  コンボボックスはユーザー入力を許可しているため、**常に** 完全な値を返します（例えば、オブジェクトのリストが選択されている場合は、常にオブジェクトを返します）。 これは、値がユーザー入力なのかオブジェクト検索によるものかを見分ける方法がないからです [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)

</alert>

<alert type="warning">

  **menu-props**の**auto**プロパティは、デフォルトの入力スタイルでのみサポートされています。

</alert>

<alert type="info">

  ブラウザのオートコンプリートはデフォルトではオフに設定されていますが、ブラウザによって異なり、無視される場合があります。 [MDN](https://developer.mozilla.org/ja/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)

</alert>

## サンプル

### Props

#### Dense

`dense` propを使用して、コンボボックスの高さを減らし、リスト項目の最大高さを下げることができます。

<example file="v-combobox/prop-dense" />

#### Multiple コンボボックス

複数の値を入力できます - 以前は**tags**と呼ばれていました

<example file="v-combobox/prop-multiple" />

### Slots

#### No data with chips

この例では、アイテムの検索や作成時にユーザーにコンテキストを提供するために、カスタム **no-data**スロットを利用しています。

<example file="v-combobox/slot-no-data" />

### その他

#### 高度なカスタムオプション

`v-combobox` は、`v-select` や `v-autocomplete` で追加された機能を改良したものです。 これらにより、カスタマイズされた実装を作成するためのインターフェースが提供されます。 この例では、カスタム **filter** アルゴリズム、インラインリスト編集、動的入力アイテムなど、いくつかのより高度な機能を利用します。

<example file="v-combobox/misc-advanced" />

<backmatter />
