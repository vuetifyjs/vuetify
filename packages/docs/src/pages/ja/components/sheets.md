---
meta:
  title: シート・コンポーネント
  description: sheetコンポーネントは、Vuetifyで使用されるマテリアルデザインの多くの実装のベースラインです。
  keywords: sheets, vuetify sheet component, vue sheet component, paper, material design paper, material design sheets
related:
  - /components/cards/
  - /components/grids
  - /styles/elevation/
---

# Sheets

`v-sheet` コンポーネントは、 [v-card](/components/cards/), [v-toolbar](/components/toolbars/)などの多数のコンポーネントのベースラインです。 The available properties form the foundation of Material Design — the concept of paper and elevation (shadows).

<entry-ad />

## 使い方

`v-sheet` コンポーネントは、Vuetifyにおける機能の基本的な基盤を提供する変形可能な_paper_です。 For example, properties such as **rounded** and **shaped** modify the `border-radius` property while **elevation** increases/decreases `box-shadow`.

<usage name="v-sheet" />

## API

- [v-sheet](/api/v-sheet)

<inline-api page="components/sheets" />

## サンプル

### Props

#### Elevation

The `v-sheet` component accepts a custom elevation between **0** and **24** (0 is default). elevation属性はcssのbox-shadow属性を変更します。 詳細は、MD [Elevation Design Specification](https://material.io/design/environment/elevation.html)にあります。

<example file="v-sheet/prop-elevation" />

#### Rounded

**rounded** prop はデフォルトの `border-radius` に _4px_ 追加します。 デフォルトでは、 `v-sheet` コンポーネントは border-radius を持っていません。 カスタムの丸,め値 rounded valueを指定して、半径のサイズと位置をカスタマイズします。例: *tr-xl l-pill* の丸,め値は *rounded-tr-xl rounded-l-pill* になります。 追加情報は、 [Border Radius](/styles/border-radius/) ページにあります。

<example file="v-sheet/prop-rounded" />

#### Color

シートおよびそれに基づくコンポーネントは、異なるサイズおよび色を設定できます。

The `v-sheet` component accepts custom [Material Design Color](/styles/colors/) values such as `warning`, `amber darken-3`, and `deep-purple accent` — as well as *rgb*, *rgba*, and *hexadecimal* values.

<example file="v-sheet/prop-color" />

<backmatter />
