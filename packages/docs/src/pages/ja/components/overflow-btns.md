---
meta:
  title: オーバーフローボタン・コンポーネント
  description: オーバーフローボタンコンポーネントは、追加の機能と機能を含む select 用のインターフェイスを作成します。
  keywords: overflow buttons, vuetify overflow button component, vue overflow button component
related:
  - /components/forms/
  - /components/selection-controls/
  - /components/selects/
---

# Overflow buttons

`v-overflow-btn` は、ユーザにリストから項目を選択できるようにするために使用されます。 3つのバリエーションがあります: `editable`, `overflow`, `segmented`

<entry-ad />

## 使い方

`v-overflow-btn`は選択リストの作成に使用されます。

<usage name="v-overflow-btn" />

## API

- [v-overflow-btn](/api/v-overflow-btn)

<inline-api page="components/overflow-btns" />

## サンプル

### Props

#### Counter

`v-overflow-btn` にカウンタを追加して、文字数の最大値を制御することができます。

<example file="v-overflow-btn/prop-counter" />

#### Dense

`dense` プロパティを使用すると、オーバーフローボタンの高さを減らし、リスト項目の最大高さを下げることができます。

<example file="v-overflow-btn/prop-dense" />

#### Disabled

ユーザーが操作するのを防ぐために`v-overflow-btn`を無効にすることができます。

<example file="v-overflow-btn/prop-disabled" />

#### Editable

編集可能な `editable` `v-overflow-btn`は、`v-text-field` と同様に直接編集することができます。

<example file="v-overflow-btn/prop-editable" />

#### Filled

テキストフィールドは、ボックスデザインで使用できます。

<example file="v-overflow-btn/prop-filled" />

#### Hint

`hint` propを使って、ユーザーへのヒントを追加できます。

<example file="v-overflow-btn/prop-hint" />

#### Loading

`v-overflow-btn`は、下に線形プログレスバーを表示する`loading`状態を設定することができます。

<example file="v-overflow-btn/prop-loading" />

#### Menu props

`menu-props` propを使って`v-menu`の基本的なpropを設定できます。

<example file="v-overflow-btn/prop-menu-props" />

#### Readonly

`v-overflow-btn`を`readonly`モードにすると非アクティブになりますが、色は変わりません。

<example file="v-overflow-btn/prop-readonly" />

#### Segmented

`segmented` `v-overflow-btn` には、コンテンツとアイコンの間には仕切りが追加されます

<example file="v-overflow-btn/prop-segmented" />

<backmatter />
