---
meta:
  title: Breadcrumbs コンポーネント
  description: breadcrumbs コンポーネントは、ページのナビゲーションヘルパーです。 区切り文字としてマテリアルアイコンのアイコンや文字を使えます。
  keywords: breadcrumbs, vuetify breadcrumbs component, vue breadcrumbs component, v-breadcrumbs component
related:
  - /components/buttons/
  - /components/navigation-drawers/
  - /components/icons/
---

# Breadcrumbs

`v-breadcrumbs` コンポーネントはページのナビゲーションヘルパーです。 区切り文字として**マテリアルアイコン** またはテキスト文字を使用できます。 オブジェクトの配列は、コンポーネントの **items** プロパティに渡すことができます。  さらに、breadcrumbsの制御を強化するためにスロットが用意されており `v-Breadcrumbs-item` または他のカスタムマークアップを利用できます。

<entry-ad />

## 使い方

デフォルトのbreadcrumbsはテキストで区切られます。 あらゆる文字を使用することができます。

<usage name="v-breadcrumbs" />

## API

- [v-breadcrumbs](/api/v-breadcrumbs)
- [v-breadcrumbs-item](/api/v-breadcrumbs-item)

<inline-api page="components/breadcrumbs" />


<!-- ## Sub-components

### v-breadcrumbs-item

v-breadcrumbs-item description -->

## 注意事項

<alert type="info">

  デフォルトでは `v-breadcrumbs` はネストされたパス内の現在のページまでのすべてのクラムを無効にします。 `items` 配列の各パンくずリストに `exact: true` を使用すると、この動作を防ぐことができます。

</alert>

## サンプル

### Props

#### Divider

区切り記号は、`divider`プロパティを使用して設定できます。

<example file="v-breadcrumbs/prop-divider" />

#### Large

Large指定されたパンくずリストはフォント サイズが大きくなります。

<example file="v-breadcrumbs/prop-large" />

### Slots

#### アイコン区切り

icon 変数を使用することで、 Material Design Icon に存在するアイコンを Breadcrumbs に使用することができます。

<example file="v-breadcrumbs/slot-icon-dividers" />

#### Item

`item`スロットを使用して、各breadcrumbをカスタマイズできます。

<example file="v-breadcrumbs/slot-item" />

<backmatter />
