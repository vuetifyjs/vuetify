---
meta:
  title: イメージ・コンポーネント
  description: imageコンポーネントは、さまざまな種類の画像を表示するための柔軟なインターフェイスを提供します。
  keywords: images, vuetify image component, vue image component
related:
  - /components/grids
  - /components/aspect-ratios/
  - /components/parallax/
---

# Images

`v-img` コンポーネントにはリッチメディアをサポートする機能が詰め込まれています。 [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader)と組み合わせることで、ダイナミックなプログレッシブ画像を追加し、より良いユーザーエクスペリエンスを提供することができます。

<entry-ad />

## 使い方

`v-img`コンポーネントは、遅延読み込みとプレースホルダを持つレスポンシブな画像を表示するために使用されます。

<usage name="v-img" />

## API

- [v-img](/api/v-img)

<inline-api page="components/images" />

## 注意事項

<alert type="info">

  `v-img`コンポーネントは [v-intersect](/directives/intersect) ディレクティブを使用しており、IE11 / Safari で動作するためには [Polyfill](/directives/intersect#polyfill) が必要です。 この機能をサポートしていないブラウザが検出されると、画像は通常通り読み込まれます。

</alert>

## サンプル

### Props

#### Aspect ratio

画像のアスペクト比を変更したい場合は、固定アスペクト比を設定できます。

<example file="v-img/prop-aspect-ratio" />

#### Contain

If the provided aspect ratio doesn't match that of the actual image, the default behavior is to fill as much space as possible, clipping the sides of the image. Enabling the `contain` prop will prevent this, but will result in empty space at the sides.

<example file="v-img/prop-contain" />

#### グラデーション

The `gradient` prop can be used to apply a simple gradient overlay to the image. More complex gradients should be written as a class on the content slot instead.

<example file="v-img/prop-gradient" />

#### 高さ

`v-img` will automatically grow to the size of its `src`, preserving the correct aspect ratio. You can limit this with the `height` and `max-height` props.

<example file="v-img/prop-max-height" />

### Slots

#### プレースホルダー

`v-img` has a special `placeholder` slot for placeholder to display while image's loading. Note: the example below has bad src which won't load for you to see placeholder.

<example file="v-img/slot-placeholder" />

### その他

#### グリッド

You can use `v-img` to make, for example, a picture gallery.

<example file="v-img/misc-grid" />

<backmatter />
