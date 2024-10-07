---
meta:
  title: データイテレータ・コンポーネント
  description: データイテレータコンポーネントは、ソート、検索、ページネーション、選択などデータをフィルタリングおよび表示するために使用されます。
  keywords: data iterators, vuetify data iterator component, vue data iterator component
related:
  - /components/data-tables/
  - /components/simple-tables/
  - /components/toolbars/
---

# Data iterators

`v-data-iterator` コンポーネントは、データの表示に使用します。利用できる機能の大部分は `v-data-table` コンポーネントと共通です。 ソート、検索、ページネーション、選択などの機能が利用できます。

<entry-ad />

## 使い方

`v-data-iterator` では、データの表示方法を細かくカスタマイズできます。 この例は、カード形式のグリッド表示を使用する例です。

<usage name="v-data-iterator" />

## API

- [v-data-iterator](/api/v-data-iterator)
- [v-data-footer](/api/v-data-footer)

<inline-api page="components/data-iterators" />

## サンプル

### スロット

#### デフォルト

`v-data-iterator` は、`v-data-table` と同様に選択状態と展開状態を内部的に持ちます。 この例では、デフォルトのスロットで利用できるメソッドの `isExpanded` と `expand` を使用しています。

<example file="v-data-iterator/slot-default" />

#### ヘッダーとフッター

`v-data-iterator`は、コンテンツを追加できる headerとfooterのスロットを持ちます。

<example file="v-data-iterator/slot-header-and-footer" />

### その他

#### フィルター

ソート順、フィルタ、ページネーションは、対応するプロパティを設定することで外部からコントロールできます。

<example file="v-data-iterator/misc-filter" />

<backmatter />
