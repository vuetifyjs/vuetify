---
meta:
  title: Intersection observer directive
  description: intersection observerディレクティブは、Intersection observer API を利用します。 要素が画面上にいつ表示されるかを判断できます。
  keywords: intersect, vuetify intersect directive, intersection observer directive
related:
  - /components/cards/
  - /components/images/
---

# Intersection observer

`v-intersect` ディレクティブは [Intersection Observer API](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API) を利用します。 要素がユーザーのビューポート内に表示されていることを検出するための使いやすいインターフェイスを提供します。 これは [v-lazy](/components/lazy) コンポーネントにも使用されます。

<entry-ad />

## 使い方

ウィンドウをスクロールして、色のついた点を見てください。 [v-card](/components/cards) がエラーから成功へと変化することに注目してください。

<example file="v-intersect/usage" />

## API

- [v-intersect](/api/v-intersect)

<inline-api page="directives/intersect" />

## 注意事項

<alert type="info">

  [Intersection Observer API](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API) はIE11ではデフォルトでは使用できませんが、 [polyfill](https://github.com/w3c/IntersectionObserver) を使用して実装することができます。

</alert>

## サンプル

### Props

#### オプション

`v-intersect` ディレクティブは オプションを受け付けます。 利用可能なオプションは [Intersection Observer API](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API) にあります。 以下は、 `threshold` オプションを使用した例です。

<example file="v-intersect/prop-options" />

<backmatter />
