---
meta:
  title: Parallaxコンポーネント
  description: v-parallax コンポーネントは、画像をウィンドウよりも遅くスクロールさせる3Dエフェクトを作成します。
  keywords: parallax, vuetify parallax component, vue parallax component
related:
  - /components/aspect-ratios/
  - /components/cards/
  - /components/images/
---

# Parallax

`v-parallax` コンポーネントは、画像をウィンドウよりも遅くスクロールさせる3Dエフェクトを作成します。

<entry-ad />

## 使い方

ユーザーがページをスクロールすると、パララックスにより背景画像がシフトします。

<example file="v-parallax/usage" />

## API

- [v-parallax](/api/v-parallax)

<inline-api page="components/parallax" />

## サンプル

### その他

#### Content

パララックス内に任意のコンテンツを配置することもできます。 これにより、parallaxをヒーロー画像として使用できます。

<example file="v-parallax/misc-content" />

#### 高さ指定

パララックスは任意の高さで指定できます。 画像のサイズが正しくない場合、パララックスを壊す可能性があることに注意してください。

<example file="v-parallax/misc-custom-height" />

<backmatter />
