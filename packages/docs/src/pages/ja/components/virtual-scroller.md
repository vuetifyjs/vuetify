---
meta:
  title: 仮想スクロール・コンポーネント
  description: バーチャルスクロールコンポーネントは、可視要素のみをレンダリングするコンテナです。 大量の均一なデータを表示する必要がある場合に便利です。
  keywords: virtual scroll, vuetify virtual scroll component, vue virtual scroll component, v-virtual-scroll component
related:
  - /components/lists/
  - /components/data-tables/
  - /components/data-iterators/
---

# Virtual scroller

`v-virtual-scroll` コンポーネントは仮想的な _infinte_ (無限) リストを表示します。 動的な高さと垂直方向のスクロールをサポートしています。

<entry-ad />

## 使い方

仮想スクロールはビューポートを埋めるぶんのレコードを表示し、既存のコンポーネントを使用して、新しいデータで再ハイドレート（水分補給）します。

<usage name="v-virtual-scroll" />

## API

- [v-virtual-scroll](/api/v-virtual-scroll)

<inline-api page="components/virtual-scroller" />

## 注意事項

<alert type="info">

`v-virtual-scroll` コンポーネントを既存の機能やコンポーネントに統合する作業を進めています。 ヘルプに興味がある場合は、[Discord コミュニティ](https://community.vuetifyjs.com)の **John Leider** までお問い合わせください。

</alert>

## サンプル

### Props

#### Bench

デフォルトでは、 `v-virtual-scroll` はビューポート外の追加アイテムを事前にレンダリングしません。 `bench` propを使用すると、スクロールが追加のアイテムを **padding**としてレンダリングします。 可能な限り最高のパフォーマンスを得るために、この数字を可能な限り低く保つことを **推奨します**。

<example file="v-virtual-scroll/prop-bench" />

### その他

#### User directory

`v-virtual-scroll` コンポーネントは、スクロールのビューポートを埋めるために必要なものだけをレンダリングすることで、無制限のアイテムをレンダリングできます。

<example file="v-virtual-scroll/misc-user-directory" />

<backmatter />
