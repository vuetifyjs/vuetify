---
meta:
  title: システムバー・コンポーネント
  description: システムバーコンポーネントは、アプリケーションの最上部にあるAndroidスタイルのステータスバーを作成します。
  keywords: system bars, vuetify system bar component, vue system bar component, android status bar, status bar
related:
  - /components/buttons/
  - /components/toolbars/
  - /components/tabs/
---

# System bars

`v-system-bar` コンポーネントは、ユーザにステータスを表示するために使用できます。 Androidのシステムバーのように見え、アイコンやスペーサー、テキストを含むことができます。

<entry-ad />

## 使い方

最もシンプルな形式の `v-system-bar`は、デフォルトのテーマを持つ小さなコンテナに表示されます。

<usage name="v-system-bar" />

## API

- [v-system-bar](/api/v-system-bar)

<inline-api page="components/system-bars" />

## サンプル

### Props

#### 色

オプションで、 `color` propを使用して`v-system-bar` の色を変更できます。

<example file="v-system-bar/prop-color" />

#### Lights out

`lights-out`プロパティを使用して、 `v-system-bar` の不透明度を減らすことができます。

<example file="v-system-bar/prop-lights-out" />

#### テーマ

DarkまたはLightテーマを、`v-system-bar` に適用することができます。

<example file="v-system-bar/prop-themes" />

#### Window

ウィンドウ コントロールとステータス情報を備えたウィンドウ バー。

<example file="v-system-bar/prop-window" />

<backmatter />
