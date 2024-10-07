---
meta:
  title: セレクト・コンポーネント
  description: select コンポーネントは、ユーザーが選択できるオプションのリストを提供します。
  keywords: selects, vuetify select component, vue select component
related:
  - /components/autocompletes/
  - /components/combobox/
  - /components/forms/
---

# Selects

選択フィールド コンポーネントは、オプションのリストからユーザーが提供した情報を収集するために使用されます。

<entry-ad />

## 使い方

<example file="v-select/usage" />

## API

- [v-select](/api/v-select)

<inline-api page="components/selects" />

## 注意事項

<alert type="info">

  ブラウザのオートコンプリートはデフォルトではオフに設定されていますが、ブラウザによって異なり、無視される場合があります。 [MDN](https://developer.mozilla.org/ja/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)

</alert>

<alert type="warning">

  **menu-props**の**auto**プロパティは、デフォルトの入力スタイルでのみサポートされています。

</alert>

<alert type="error">

  **items** プロパティにオブジェクトを使用する場合、**item-text** と **item-value** をオブジェクトの既存のプロパティと関連付ける必要があります。 これらの値は **text** と **value** にデフォルトで設定されていますが、変更できます。

</alert>

## サンプル

### Props

#### カスタムtextとvalue

items配列内で、テキストフィールドと値フィールドに対応する特定のプロパティを指定することができます。 デフォルトでは、**text** と **value** です。 この例では、 **return-object** プロパティも使用しており、選択した項目のオブジェクト全体を返します。

<example file="v-select/prop-custom-text-and-value" />

#### Dense

**dense** propを使用して、フィールドの高さを減らし、リスト項目の最大高さを下げることができます。

<example file="v-select/prop-dense" />

#### Disabled

**disabled** prop を `v-select` に適用すると、ユーザーがコンポーネントとやりとりすることが出来なくなります。

<example file="v-select/prop-disabled" />

#### Icons

前後に任意のアイコンを配置します。

<example file="v-select/prop-icons" />

#### Light

標準的なSingle selectには、多数の構成オプションがあります。

<example file="v-select/prop-light" />

#### Menu props

カスタム props は `v-menu` に **menuProps** プロパティを使用して直接渡すことができます。 この例では、メニューは強制的に上に向けられ、上にシフトされます。

<example file="v-select/prop-menu-props" />

#### Multiple

複数選択では、選択した項目の表示に`v-chip`を使用できます。

<example file="v-select/prop-multiple" />

#### Readonly

`v-select` の **read-only** プロパティを使用すると、ユーザが値を変更できなくなります。

<example file="v-select/prop-readonly" />

### Slots

#### Append/Prependアイテム

`v-select` コンポーネントは、オプションで先頭と末尾に項目を追加できます。 これはカスタマイズされた **select-all** 機能に最適です。

<example file="v-select/slot-append-and-prepend-item" />

#### Selection

**selection** スロットは、選択された値を入力で表示する方法をカスタマイズするために使われます。 `foo (+20 other)` のようにしたいときや、選択範囲を複数行に分けたくないときに便利です。

<example file="v-select/slot-selection" />

<backmatter />
