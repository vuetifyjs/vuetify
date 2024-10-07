---
meta:
  title: データテーブル・コンポーネント
  description: データテーブルコンポーネントは、ユーザーが使いやすい方法で表形式のデータを表示するために使用されます。 並べ替え、検索、ページネーション、選択が使用可能です。
  keywords: data tables, vuetify data table component, vue data table component
related:
  - /components/data-iterators/
  - /components/simple-tables/
  - /components/lists/
---

# Data tables

`v-data-table` コンポーネントは、表形式のデータを表示するために使用します。 v-data-tableにはソート、検索、ページネーション、コンテンツ編集、行選択などの機能が搭載されています。

<vuetify-ad slug="vs-vuetify-subscribe" />

## 使い方

デフォルトでは、データ テーブルのデータは単純な行の集まりとして表示されます。

<example file="v-data-table/usage" />

## API

- [v-data-table](/api/v-data-table)
- [v-data-table-header](/api/v-data-table-header)
- [v-data-footer](/api/v-data-footer)
- [v-edit-dialog](/api/v-edit-dialog)
- [v-simple-checkbox](/api/v-simple-checkbox)

<inline-api page="components/data-tables" />


<!-- ## Sub-components

### v-data-table-header

v-data-table-header description

### v-data-footer

v-data-footer description

### v-edit-dialog

v-edit-dialog description

### v-simple-checkbox

v-simple-checkbox description -->

## サンプル

### Props

#### カスタムフィルター

**search** prop で使用されるデフォルトのフィルタリングは、**custom-filter** prop に関数を指定することでオーバーライドできます。 特定の列でのみフィルタリングをカスタマイズしたい場合は、ヘッダーアイテムの **filter** プロパティに関数を指定します。 シグネチャは  `(value: any, search: string | null, item: any) => boolean` です。 **search** prop が指定されていない場合でも、この関数は常に実行されます。 そのため、フィルタを利用しない場合は `true` の値で早期リターンするようにしてください。

<example file="v-data-table/prop-custom-filter" />

#### Dense

**dense** プロパティを指定すると、データテーブルのスタイルが少し変化します。

<example file="v-data-table/prop-dense" />

#### Filterable

ヘッダー項目のプロパティの **filterable** を false に設定すると、テーブル行を検索する際に特定の列を除外することができます。 下の例では、Dessertの列が検索に当たらなくなります。

<example file="v-data-table/prop-filterable" />

#### Footer props

`v-data-table` では、`v-data-footer` コンポーネントを使用するとデフォルトのフッターをレンダリングできます。 このコンポーネントには、**footer-props** を使って props を渡すことができます。

<example file="v-data-table/prop-footer-props" />

#### グループ化

**group-by** と **group-desc** プロパティを使用すると、itemのプロパティに沿って行をグループ化できます。 **show-group-by** prop を指定すると、デフォルトヘッダにグループボタンを表示します。 ヘッダー項目の **groupable** プロパティを使用すると、グループボタンを無効にできます。

<example file="v-data-table/prop-grouping" />

#### デフォルトのヘッダーとフッターを非表示にする

**hide-default-header** と **hide-default-footer** プロパティを指定すると、デフォルトのヘッダーとフッターを取り除くことができます。

<example file="v-data-table/prop-hide-header-footer" />

#### Loading

**loading** prop を指定すると、テーブル内のデータが現在ロード中であることを示すことができます。 テーブルにデータがない場合は、ローディングメッセージも表示されます。 このメッセージは、 **loading-text** プロパティまたは `loading` スロットを使用してカスタマイズできます。

<example file="v-data-table/prop-loading" />

#### Multi sort

**multi-sort** プロパティを指定すると、同時に複数の列を並べ替え基準に使用することができます。 有効にすると、 **sort-by** と **sort-desc** のそれぞれに単一値ではなく配列を渡すことで、プログラムからソートを制御することもできます。

<example file="v-data-table/prop-multi-sort" />

#### 行の選択

**show-select** プロパティを指定すると、デフォルトヘッダーにチェックボックスが追加され、すべての行の選択を一括で切り替えられるようになります。また、各デフォルト行にも個別のチェックボックスが追加されます。 これらはスロット `header.data-table-select` と `item.data-table-select` を使ってカスタマイズできます。 **single-select** プロパティでは、複数選択を許可するか、単一の選択にするかを切り替えることができます。

<example file="v-data-table/prop-row-selection" />

#### Search

データテーブルでは、データをフィルタリングできる **search** prop が用意されています。

<example file="v-data-table/prop-search" />

### Slots

<vuetify-ad slug="vs-vue-3-slots" />

`v-data-table`には、テーブルをカスタマイズするための多数のスロットが用意されています。 この例では、いくつかのスロットを取り上げ、それぞれ何ができるかを紹介します。 It is important to note some slots (eg: `item`/`body`/`header`) will completely take over the internal rendering of the component which will require you to re-implement functionalities such as selection and expansion. Some slots will override each other such as: `body` > `item` > `item.<name>` and `header`/`header.<name>`.

<alert type="info">

  `item.` や<name>`header.` などの<name>一部のスロットでは、対象とするスロットのスコープを限定するために修飾子を使用できます。 デフォルトのEslintでは、スロットで修飾子を使用するとエラーが発生します。 このようなエラーを無効にするには、eslint の設定に次のルールを追加します: `"vue/valid-v-slot": ["error", { "allowModifiers": true }]`

</alert>

<example file="v-data-table/slot-main" />

#### ヘッダー

動的スロット `header.<name>` を使用すると、特定の列のみをカスタマイズすることができます。 `<name>` は、**headers** に伝えられる、対応するヘッダー項目の`value`プロパティの名前です。

<example file="v-data-table/slot-header" />

#### Item

動的スロット `item.<name>` を使用すると、特定の列のみをカスタマイズすることができます。 `<name>` は、**headers** に伝えられる、対応するヘッダー項目の`value`プロパティの名前です。 Calories列をカスタマイズするには、 `item.calories` スロットを使用します。

<example file="v-data-table/slot-item" />

#### 単純なチェックボックス

データテーブルのスロットテンプレート内のチェックボックスコンポーネントを使用する場合は、`v-checkbox` コンポーネントではなく、`v-simple-checkbox` コンポーネントを使用します。 `v-simple-checkbox` コンポーネントは内部的に使用されるもので、ヘッダーの配置が考慮されています。

<example file="v-data-table/slot-simple-checkbox" />

### その他

#### CRUD アクション

各行を編集する `v-dialog` コンポーネントを備えた、CRUD アクション付きの `v-data-table` のサンプルです。

<example file="v-data-table/misc-crud" />

#### ダイアログを編集する

`v-edit-dialog` コンポーネントを使用すると、 `v-data-table` 内のデータを直接編集できます。 `v-edit-dialog` の外側をクリックしたときに閉じないようにするためには **persistent** プロパティを合わせて指定します。

<example file="v-data-table/misc-edit-dialog" />

#### 展開可能な行

**show-expand** prop を指定すると、各行に展開アイコンが表示されます。 これは `item.data-table-expand` スロットでカスタマイズできます。 スロットの位置は、ヘッダー用の配列に`value: 'data-table-expand'` カラムを追加してカスタマイズできます。 **single-expand** prop では、複数行の同時展開を許可するか、1行ずつ展開するかを切り替えできます。 展開された行は `expanded.sync` プロパティで利用できます。 展開を機能させるため、それぞれの行のアイテムには一意のキープロパティが必要です。 デフォルトは `id`ですが、**item-key** プロパティを使って他の項目プロパティを指定することもできます。

<example file="v-data-table/misc-expand" />

#### 外部ページネーション

外部ページネーションは、個々の props を使用して制御するか、**options** プロパティを使用して制御します。 **.sync** 修飾子を適用する必要があることに注意してください。

<example file="v-data-table/misc-external-paginate" />

#### 外部ソート

外部ソートは、個々の props を使用して制御するか、**options** プロパティを使用して制御します。 **.sync** 修飾子を適用する必要があることに注意してください。

<example file="v-data-table/misc-external-sort" />

#### サーバサイドのページネーションとソート

バックエンドであらかじめページ分割とソートが適用されたデータをロードする場合、**server-items-length** プロパティを使用できます。 このプロパティを指定すると、組み込みのソートとページネーションが無効になり、それに代わり利用可能になる `update:page`、`update:sortBy`、`update:options` などのイベントを使用する必要があります。これらのイベントにより、バックエンドから新しいページを要求するタイミングを把握します。 **loading** プロパティを指定すると、データの取得中にプログレスバーを表示できます。

<example file="v-data-table/misc-server-side-paginate-and-sort" />

<backmatter />
