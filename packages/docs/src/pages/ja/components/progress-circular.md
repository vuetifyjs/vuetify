---
meta:
  title: Progress circularコンポーネント
  description: Progress circularコンポーネントは、円形で視覚的に数値データを表示するのに役立ちます。
  keywords: progress circular, vuetify progress circular component, vue progress circular component, circular progress
related:
  - /components/cards/
  - /components/progress-linear/
  - /components/lists/
---

# Progress circular

`v-progress-circular` コンポーネントは、環状の外観でデータをユーザーに伝えるために使用されます。 また、ロードを描写するために不確定な状態に置くこともできます。

<entry-ad />

## 使い方

最もシンプルな形式では、v-progress-circularは円形のプロレスバーを表示します。 value propを使って進行状況を制御してください。

<example file="v-progress-circular/usage" />

## API

- [v-progress-circular](/api/v-progress-circular)

<inline-api page="components/progress-circular" />

## サンプル

### Props

#### Color

`color` propを使用して、`v-progress-circular`に任意の色を設定できます。

<example file="v-progress-circular/prop-color" />

#### Indeterminate

`indeterminate` プロパティを使用すると、 `v-progress-circular` が無期限でアニメーションし続けます。

<example file="v-progress-circular/prop-indeterminate" />

#### Rotate

`rotate` prop は、`v-progress-circular`の原点をカスタマイズする機能を提供します。

<example file="v-progress-circular/prop-rotate" />

#### Size と Width

`size` と `width` プロパティを使用すると、 `v-progress-circular` コンポーネントのサイズと幅を簡単に変更できます。

<example file="v-progress-circular/prop-size-and-width" />

<backmatter />
