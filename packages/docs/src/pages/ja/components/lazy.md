---
meta:
  title: Lazyコンポーネント
  description: lazy コンポーネントを使用すると、ユーザのビューポートに基づいて動的にコンテンツをレンダリングできます。
  keywords: lazy loading
related:
  - /components/badges/
  - /components/icons/
  - /components/lists/
---

# Lazy

`v-lazy` コンポーネントは、要素の可視性に基づいてコンポーネントを動的にロードするために使用されます。

<entry-ad />

## 使い方

デフォルトでは、 `v-lazy` コンポーネントはその内容がIntersect(交差)するまでレンダリングされません。 下にスクロールして、要素がレンダリングされるのを見てください。

<example file="v-lazy/usage" />

## API

- [v-lazy](/api/v-lazy)

<inline-api page="components/lazy" />

## 注意事項

<alert type="info">

  `v-lazy` コンポーネントは [v-intersect](/directives/intersect) ディレクティブを使用しており、IE11 / Safari で動作するためには [Polyfill](/directives/intersect#polyfill) が必要です。 一部のiOSバージョンでは、このpolyfillを使用する必要があります。

</alert>

<backmatter />
