---
meta:
  title: レーティング・コンポーネント
  description: '★評価コンポーネントは、レーティングを介してユーザーからのフィードバックを収集するための特別なウィジェットです。'
  keywords: star ratings, vuetify star rating component, vue star rating component, rating component
related:
  - /components/cards/
  - /components/icons/
  - /components/lists/
---

# Ratings

レーティングコンポーネントは、ユーザーウィジェットを構築する上で、特殊ですが重要な要素です。 ユーザからの評価をあつめて手軽に分析することで、製品またはアプリケーションを改善できます。

<entry-ad />

## 使い方

`v-rating` コンポーネントは、ユーザーのフィードバックを集めるためのシンプルなインターフェイスを提供します。

<usage name="v-rating" />

## API

- [v-rating](/api/v-rating)

<inline-api page="components/ratings" />

## サンプル

### Props

#### 色

`v-rating`コンポーネントはお好みで色を付けることができ、選択した色と選択していない色それぞれを設定できます。

<example file="v-rating/prop-color" />

#### Length

アプリケーションによってはカスタマイズされた実装が求められることがあります。 長さや表示するアイコンを簡単に変更することができます。

<example file="v-rating/prop-length" />

#### インクリメント

レーティングには**full-icon**、**half-icon** (**half-increments** propが必要) 、**empty-icon**という3つのアイコンが定義されています。

<example file="v-rating/prop-half-increments" />

#### Size

`v-icon` で利用可能な同じサイズ設定クラスを利用するか、**size** propを使用します。

<example file="v-rating/prop-size" />

#### Icon Label

アイコンのための支援技術（a11y）を提供します。

<example file="v-rating/prop-icon-label" />

### Slots

#### Item スロット

レーティングの表示方法をさらに自由にするためスロットが提供されています。

<example file="v-rating/slot-item" />

### その他

#### 高度な使用方法

`v-rating` コンポーネントは、既存のコンポーネントにぴったりとフィットします。 豊富な機能と美しいデザインで、複雑な例も構築できます。

<example file="v-rating/misc-advanced" />

#### Card ratings

レーティングコンポーネントは、収集した顧客のフィードバックを表示するプロダクトと相性が良いでしょう。

<example file="v-rating/misc-card" />

<backmatter />
