---
meta:
  title: Paginationコンポーネント
  description: Paginationコンポーネントは、ユーザーが情報を容易に利用できるように、長いデータセットを分離するために使用されます。
  keywords: pagination, vuetify pagination component, vue pagination component
related:
  - /components/data-iterator/
  - /components/data-tables/
  - /components/lists/
---

# Pagination

`v-pagination` コンポーネントは、長いデータ セットを分離して、ユーザーが情報を簡単に利用できるようにします。 指定された長さに応じて、paginationコンポーネントは自動的に拡大縮小されます。 現在のページを維持するには、 単に**v-model** 属性を指定します。

<entry-ad />

## 使い方

デフォルトの、Paginationは設定された **length** prop に基づいてページ数を表示し、**prev** ボタンと**next** ボタンを使用したナビゲーションを表示します。

<example file="v-pagination/usage" />

## API

- [v-pagination](/api/v-pagination)

<inline-api page="components/paginations" />

## サンプル

### Props

#### Circle

**circle** プロパティはpaginationボタンの代替スタイル（円形）を提供します。

<example file="v-pagination/prop-circle" />

#### Disabled

Pagination項目は、 **disabled** プロパティを使用して手動で無効にできます。

<example file="v-pagination/prop-disabled" />

#### Icons

前ページと次ページのアイコンは **prev-icon** と **next-icon** プロパティでカスタマイズできます。

<example file="v-pagination/prop-icons" />

#### Length

**length**  propを使用して、`v-pagination` の長さを設定できます。ページボタンの数が親コンテナーを超えると、リストは切り捨てられます。

<example file="v-pagination/prop-length" />

#### Total visible

**total-visible** propを使って、表示されるページボタンの最大数を手動で設定することもできます。

<example file="v-pagination/prop-total-visible" />

<backmatter />
