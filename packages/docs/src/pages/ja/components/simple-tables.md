---
meta:
  title: シンプルテーブル・コンポーネント
  description: シンプルテーブルコンポーネントは、面倒な手続きなしでMaterial Designのフィーリングを提供するテーブル要素の軽量ラッパーです。
  keywords: simple table, vuetify simple table component, vue simple table component, table component
related:
  - /components/data-iterators/
  - /components/data-tables/
  - /components/lists/
---

# Simple tables

`v-simple-table` コンポーネントは `<table>` 要素を囲むシンプルなラッパーコンポーネントです。 このコンポーネント内では、`<thead>`、`<tbody>`、`<tr>`など、すべての標準的なテーブル要素が使用できます。

<entry-ad />

## 使い方

v-simple-tableは `<table>` 要素を囲むシンプルなラッパーコンポーネントです。

<example file="v-simple-table/usage" />

## API

- [v-simple-table](/api/v-simple-table)

<inline-api page="components/simple-tables" />

## サンプル

### Props

#### Dark

テーブルをdarkテーマに切り替えるには、 **dark** prop を使用します。

<example file="v-simple-table/prop-dark" />

#### Dense

**dense** prop を指定すると、テーブルの各行の高さを詰めて表示します。

<example file="v-simple-table/prop-dense" />

#### ヘッダーの固定

**fixed-height** プロパティと **height** プロパティを同時に設定すると、ヘッダをテーブルの先頭に固定できます。

<example file="v-simple-table/prop-fixed-header" />

#### 高さ

テーブルの高さを設定するには、 **height** プロパティを使用します。

<example file="v-simple-table/prop-height" />

<backmatter />
