---
meta:
  title: スパークライン・コンポーネント
  description: sparkline コンポーネントは数値データを表示するための美しく表現力豊かなシンプルなグラフを作成します。
  keywords: sparklines, vuetify sparkline component, vue sparkline component, sparkline, graph, chart, line
related:
  - /components/cards/
  - /components/sheets/
  - /components/expansion-panels/
---

# Sparklines

sparkline コンポーネントは、GitHub のコントリビューションチャートのような単純なグラフを作成するために使用できます。

以下のもの以外にも、[SVG属性](https://developer.mozilla.org/ja/docs/Web/SVG/Attribute)を使用することができます。

<entry-ad />

## 使い方

スパークラインは、データを視覚的に表現する小さなグラフです。 sparkline コンポーネントには、 **trend**(デフォルト) と **bar** の 2 つのバリエーションがあります。 それぞれスパークリングラインのルックアンドフィールをカスタマイズするための多数のオプションをサポートしています。

<example file="v-sparkline/usage" />

## API

- [v-sparkline](/api/v-sparkline)

<inline-api page="components/sparklines" />

## サンプル

### Props

#### Fill

`fill` プロパティを使用すると、塗りつぶし付きの`v-sparkline`を作成できます。

<example file="v-sparkline/prop-fill" />

### その他

#### カスタムラベル

**label**スロットを用意することで、ドル記号（$）を追加して表示内容を変更することができます。 このスロットはテキストコンテンツ**_専用_**です。 svg `<text>` 要素の詳細については、 [こちら](https://developer.mozilla.org/ja/docs/Web/SVG/Element/text) をご覧ください。

<example file="v-sparkline/misc-custom-labels" />

#### Dashboard カード

`v-sparkline`コンポーネントは、`v-card`や`v-sheet`と相性が良く、管理者向けダッシュボードに最適なカスタマイズされた情報カードを作成できます。 この例では、カスタムラベルを使用して、スパークラインに追加のコンテキストを提供しています。

<example file="v-sparkline/misc-dashboard-card" />

#### 心拍数

簡潔な情報については、ごてごてしたチャートはやり過ぎかもしれません。 グラデーション付きのトレンドラインを使用すると、情報をあまり表示せずともユーザーに十分なディテールを提供できます。

<example file="v-sparkline/misc-heart-rate" />

<backmatter />
