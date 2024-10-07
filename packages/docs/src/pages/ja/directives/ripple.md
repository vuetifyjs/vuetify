---
meta:
  title: Ripple directive
  description: リップルディレクティブは、任意の要素に水の波紋の形で、タッチとクリックフィードバックを追加します。
  keywords: ripples, ink, vuetify ripple directive, vue ripple directive
related:
  - /components/buttons/
  - /components/expansion-panels/
  - /styles/transitions/
---

# Ripple directive

`v-ripple` ディレクティブはユーザのアクションを表示するために使用されます。 これは、任意のブロックレベル要素に適用できます。 `v-btn`, `v-tabs-item` など、多くのコンポーネントに ripple ディレクティブが組み込まれています。

<entry-ad />

## 使い方

基本的なリップル（波紋効果）は、コンポーネントまたはHTML要素で`v-ripple`ディレクティブを使用するだけで有効にできます。

<example file="v-ripple/usage" />

## API

- [v-ripple](/api/v-ripple)

<inline-api page="directives/ripple" />

## サンプル

### オプション

#### Center

`center`オプションを使用すると、リップルは常にターゲットの中心から発生します。

<example file="v-ripple/option-center" />

### その他

#### 色の変更

Helperクラスを利用すれば波紋の色を変更できます。

<example file="v-ripple/misc-custom-color" />

#### コンポーネント内のリップル

リップル効果を制御する`ripple` プロパティを提供するコンポーネントもあります。 `class` または `center` オプションを使用し、無効にしたり、動作をカスタマイズすることができます。

<example file="v-ripple/misc-ripple-in-components" />

<backmatter />
