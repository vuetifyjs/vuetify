---
meta:
  title: CSS Elevation helpers
  description: Elevation ヘルパークラスを使用すると、Z 軸に沿った 2 つのサーフェス間の相対的な深さ、または距離を制御できます。
  keywords: elevation helper classes, elevation classes, vuetify elevation
related:
  - /components/cards/
  - /components/sheets/
  - /components/sheets/
---

# Elevation

Elevation（標高）ヘルパーを使用すると、 **z-axis** に沿った2つのサーフェス間の相対的な深度、または距離を制御できます。 合計25の標高レベルがあります。 クラス `elevation-{n}`で要素のElevationを設定します。`n`は、目的の標高に対応する 0 ~ 24 の整数です。

<entry-ad />

## 使い方

`elevation` ヘルパークラスでは、任意の要素にカスタムの **z-depth** を割り当てることができます。

<example file="elevation/usage" />

## サンプル

### Props

#### 動的エレベーション

多くのコンポーネントは**elevatable** ミックスインを利用し、 **elevation** プロパティを与えられます。 サポートされていないコンポーネントの場合、クラスを動的に変更できます。

<example file="elevation/prop-dynamic" />

<backmatter />
