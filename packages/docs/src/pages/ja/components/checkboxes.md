---
meta:
  title: チェックボックス・コンポーネント
  description: チェックボックスコンポーネントにより、ユーザは 二値を選択できます。
  keywords: checkbox, checkbox component, vuetify checkbox component, vue checkbox component
related:
  - /components/switches/
  - /components/forms/
  - /components/text-fields/
---

# Checkboxes

`v-checkbox`コンポーネントは、ユーザーに二値を選択する機能を提供します。 スイッチに非常によく似ており、複雑なフォームやチェックリストで使用できます。 シンプルな `v-simple-checkbox` は主にdata-tableコンポーネントで行を選択したり、インラインのブール値データを表示したりするための軽量な代替手段として使用されています。 <entry-ad />

## 使い方

最もシンプルなフォームの `v-checkbox` は、二値の切り替えを提供します。

<example file="v-checkbox/usage" />

## API

- [v-checkbox](/api/v-checkbox)
- [v-simple-checkbox](/api/v-simple-checkbox)

<inline-api page="components/checkboxes" />

## サンプル

### Props

#### Colors

チェックボックスは、 **color** propを使用して、組み込みの色とコンテキスト名を使用して色を付けることができます。

<example file="v-checkbox/prop-colors" />

#### 配列としてのモデル

複数の `v-checkbox`群 は配列を使用して同じ **v-model** を共有できます。

<example file="v-checkbox/prop-model-as-array" />

#### ブール値としてのモデル

単体の `v-checkbox` は**value**としてブール値を持ちます。

<example file="v-checkbox/prop-model-as-boolean" />

#### 状態

`v-checkbox` は、**default**, **disabled**, **indeterminate**のような異なる状態を持つことができます。

<example file="v-checkbox/prop-states" />

### Slots

#### Label スロット

`label` スロットで、チェックボックスのラベルを定義することができます。HTML コンテンツを使用することができます。

<example file="v-checkbox/slot-label" />

### その他

#### インライン・テキストフィールド

`v-checkbox` は、 `v-text-field` のような他のコンポーネントと並べて配置できます。

<example file="v-checkbox/misc-inline-textfield" />

<backmatter />
