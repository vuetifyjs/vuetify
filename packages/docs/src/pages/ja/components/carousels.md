---
meta:
  title: カルーセル・コンポーネント
  description: カルーセルコンポーネントは、テキストや画像のスライドなどの視覚的なコンテンツを循環表示させるために使用されます。
  keywords: carousels, vuetify carousel component, vue carousel component
related:
  - /components/parallax/
  - /components/images/
  - /components/windows/
---

# Carousels

`v-carousel`コンポーネントは、タイマーで入れ替わる数枚の大きなビジュアルコンテンツを表示するために使います。

<entry-ad />

## 使い方

`v-carousel`コンポーネントは、`v-window`を拡張し、画像の表示を目的とした追加機能を提供します。

<example file="v-carousel/usage" />

## API

- [v-carousel](/api/v-carousel)
- [v-carousel-item](/api/v-carousel-item)

<inline-api page="components/carousels" />


<!-- ## Sub-components

### v-carousel-item

v-carousel-item description -->

## サンプル

### Props

#### 区切りのカスタマイズ

利用可能な任意のアイコンを、カルーセルスライドのデリミタ（区切り）として使用します。

<example file="v-carousel/prop-custom-icons" />

#### カスタムトランジション

`v-carousel-item` コンポーネントは **transition/reverse-transition** を変更することができます。

<example file="v-carousel/prop-custom-transition" />

#### Cycle

**cycle** プロパティを使用すると、次の利用可能なスライドに6秒（デフォルト）ごと自動的に切り替えることができます。

<example file="v-carousel/prop-cycle" />

#### コントロールを隠す

ナビゲーションコントロールは `:show-arrows="false"`で非表示にできます。

<example file="v-carousel/prop-hide-controls" />

#### 矢印のカスタマイズ

矢印は **prev** と **next** スロットを使用してカスタマイズできます。

<example file="v-carousel/slots-next-prev" />

#### Hide delimiters

`hide-delimiters` プロパティで下部のコントロールを非表示にすることができます。

<example file="v-carousel/prop-hide-delimiters" />

#### Model

カルーセルをmodelで制御できます。

<example file="v-carousel/prop-model" />

<backmatter />
