---
meta:
  title: カラーピッカー・コンポーネント
  description: カラーピッカーコンポーネントを使用すると、さまざまな入力やフォーマットを使用して、事前に定義された色やカスタム色から選択することができます。
  keyword: color pickers, vuetify color picker component, vue color picker component
related:
  - /components/menu/
  - /styles/colors/
  - /features / theme/
---

# Color pickers

`v-color-picker` では、さまざまな入力方法で色を選択できます。

<entry-ad />

## 使い方

<usage name="v-color-picker" />

## API

- [v-color-picker](/api/v-color-picker)

<inline-api page="components/color-pickers" />

## サンプル

### Props

#### Canvas

キャンバスは `hide-canvas` プロパティで非表示にでき、`canvas-height` プロパティで高さを設定できます。 選択ドットのサイズは `dot-size` プロパティで制御できます。

<example file="v-color-picker/prop-canvas" />

#### Elevation

`v-color-picker` コンポーネントの標高（Elevation）を **elevation** または **flat**プロパティを使用して調整します。 **flat** は、 **elevation** を0に設定するのと同等です。

<example file="v-color-picker/prop-elevation" />

#### Inputs

数値入力は `hide-inputs` プロパティで非表示にでき、スライダーは `hide-sliders` プロパティで非表示にできます。 `hide-mode-switch` プロパティでモード切り替えアイコンを非表示にすることもできます。 モードは `mode` プロパティを介して外部から制御することもできます。

<example file="v-color-picker/prop-inputs" />

#### Model

`v-color-picker` は `v-model` プロパティを使用して表示される色を制御します。 **#FF00FF**、**#FF00FF00**のような16進文字列と、**RGBA**、**HSLA**、**HSVA**の値を表すオブジェクトをサポートしています。

<example file="v-color-picker/prop-model" />

#### スウォッチ

`show-swatches` prop を使用すると、ユーザが選択できる色のスウォッチの配列を表示できます。 `swatch` プロパティを使用して表示される色をカスタマイズすることもできます。 このプロパティは2次元配列を受け付けます。最初の次元は列を定義し、2番目の次元はRGBA 16進文字列を提供することによってスウォッチを上から下に定義します。 また、 `swatches-max-height` prop を使用して、スウォッチセクションの最大高さを設定することもできます。

<example file="v-color-picker/prop-swatches" />

<backmatter />
