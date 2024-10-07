---
meta:
  title: ボタングループ・コンポーネント
  description: ボタングループコンポーネントを使用すると、一連の選択可能なボタンを単一行にまとめることができます。
  keywords: button groups, vuetify button group component, vue button group component
related:
  - /components/buttons/
  - /components/icons/
  - /components/selection-controls/
---

# Button groups

`v-btn-toggle` コンポーネントは、`v-btn`と組み合わせて動作するように設計された`v-item-group`のシンプルなラッパーです。

<entry-ad />

## 使い方

v-btn-toggle を使用すると、1 つの **v-model** に対応する、選択とトグルの動作をするボタンのグループを作成できます。

<example file="v-btn-toggle/usage" />

## API

- [v-btn-toggle](/api/v-btn-toggle)
- [v-btn](/api/v-btn)

<inline-api page="components/button-groups" />

## サンプル

### Props

#### Mandatory（必須）

`v-btn-toggle` の **mandatory** prop を指定すると、常に値を持つようになります。

<example file="v-btn-toggle/prop-mandatory" />

#### Multiple

`v-btn-toggle` の **multiple** prop を設定すると、ユーザーの選択は複数の返り値の配列になります。

<example file="v-btn-toggle/prop-multiple" />

#### Rounded

`v-btn-toggle` の **rounded** prop を指定すると、角を丸くできます。

<example file="v-btn-toggle/prop-rounded" />

### その他

#### Toolbar

カスタムのボタンのセットは `v-toolbar` に簡単に統合できます。

<example file="v-btn-toggle/misc-toolbar" />

#### WYSIWYG

似たようなアクションをグループ化し、オリジナルのWYSIWYGコンポーネントを設計できます。

<example file="v-btn-toggle/misc-wysiwyg" />

<backmatter />
