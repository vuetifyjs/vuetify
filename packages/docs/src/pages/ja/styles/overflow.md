---
meta:
  title: CSS Overflow helpers
  description: オーバーフローヘルパークラスでは、コンテンツが大きすぎるときにオーバーフローする方法を設定できます。
  keywords: overflow helper classes, overflow classes, vuetify overflow
related:
  - /styles/elevation/
  - /styles/content/
  - /components/grids
---

# Overflow

コンテナの境界外になったときにコンテンツがオーバーフローする方法を設定します。

<entry-ad />

## どのように機能するか

要素に `overflow`, `overflow-x`, または `overflow-y` プロパティを指定します。 これらのクラスは、 `{overflow}{value}-` 形式で適用できます。 **overflow**は、`overflow`, `overflow-x`, `overflow-y`のいずれかのタイプを指し、**value**は、`auto`, `hidden`, `visible`のいずれかとなります。

プロパティのリストです:

- `overflow-auto`
- `overflow-hidden`
- `overflow-visible`
- `overflow-x-auto`
- `overflow-x-hidden`
- `overflow-x-visible`
- `overflow-y-auto`
- `overflow-y-hidden`
- `overflow-y-visible`

## サンプル

### Overflow プロパティ

`overflow-auto` は、コンテンツが境界を超えたときに要素にスクロールバーを追加するために使用されます。 一方、 `overflow-hidden` は、境界をオーバーフローするすべてのコンテンツをクリップするために使用されます。 `overflow-visible` は、境界をオーバーフローしてもコンテンツがクリッピングされないようにします。

<example file="overflow/overflow" />

### Overflow-X プロパティ

必要に応じて**overflow-x** で、要素に水平オーバーフローを指定できます。

<example file="overflow/overflow-x" />

<backmatter />
