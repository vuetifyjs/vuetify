---
meta:
  title: フッター・コンポーネント
  description: フッターコンポーネントは、サイトに関する追加のナビゲーション情報を表示するためのコンテナを提供します。
  keywords: footers, vuetify footer component, vue footer component
related:
  - /components/grids
  - /components/buttons/
  - /components/toolbars/
---

# Footers

`v-footer` コンポーネントは、サイト内のどのページからでもアクセスしたい一般的な情報を表示するために使われます。

<entry-ad />

## 使い方

最も単純な形式の `v-footer`コンポーネントはコンテナです。

<example file="v-footer/usage" />

## API

- [v-footer](/api/v-footer)

<inline-api page="components/footer" />

## サンプル

### Props

#### Padless Footer

`padless` prop はフッターコンポーネントからデフォルトのパディングをすべて削除します。

<example file="v-footer/prop-padless" />

### その他

#### 会社のフッター

フッターコンポーネントは、企業や団体のサイトでよくあるリンクを掲載した下部分になります。

<example file="v-footer/misc-company-footer" />

#### 藍色のフッター

Indigoの背景色で、ソーシャルメディアのアイコンとボタンのあるフッターコンポーネントです。

<example file="v-footer/misc-indigo-footer" />

#### 鴨の羽色のフッター

ティールカラーのヘッダーと列と行のリンクを持つフッターコンポーネントです。

<example file="v-footer/misc-teal-footer" />

<backmatter />
