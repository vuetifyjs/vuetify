---
meta:
  title: オートコンプリートコンポーネント
  description: autocompleteコンポーネントは先行入力の自動補完機能で、利用可能なオプションのリストを提供します。
  keywords: autocomplete, vuetify autocomplete component, vue autocomplete component
related:
  - /components/combobox/
  - /components/forms/
  - /components/selects/
---

# Autocompletes

`v-autocomplete` コンポーネントは、シンプルで柔軟な先行入力の機能を提供します。 大量のデータセットを検索したり、API から動的に情報を要求したりする場合に便利です。

<entry-ad />

## 使い方

オートコンプリートコンポーネントは `v-select` を拡張し、アイテムをフィルタする機能を追加します。

<usage name="v-autocomplete" />

## API

- [v-autocomplete](/api/v-autocomplete)

<inline-api page="components/autocompletes" />

## 注意事項

<alert type="error">

  **items** プロパティにオブジェクトを使用する場合、**item-text** と **item-value** をオブジェクトの既存のプロパティと関連付ける必要があります。 これらの値は **text** と **value** にデフォルトで設定されており、変更できます。

</alert>

<alert type="warning">

  **menu-props**の**auto**プロパティは、デフォルトの入力スタイルでのみサポートされています。

</alert>

<alert type="info">

  ブラウザーのオートコンプリートはデフォルトで off に設定されており、ブラウザーによって異なる場合があり、無視される可能性があります。 [MDN](https://developer.mozilla.org/ja/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)

</alert>

## サンプル

以下に、簡単な例から複雑な例まで示します。

### Props

#### Dense

`dense` プロパティを使用して、autocompleteの高さを減らし、リスト項目の最大高さを下げることができます。

<example file="v-autocomplete/prop-dense" />

#### Filter

`filter` プロパティを使うと、カスタムロジックで個々のアイテムをフィルタ処理できます。 この例では、アイテムを名前でフィルタリングします。

<example file="v-autocomplete/prop-filter" />

### Slots

#### Item and selection

スロットの活用して、selectのビジュアルをカスタマイズすることができます。 この例では、チップとリストアイテムの両方にプロフィール画像を追加しています。

<example file="v-autocomplete/slot-item-and-selection" />

### その他

#### API検索

動的データを簡単にフックして、ユニークなエクスペリエンスを生み出すことができます。 `v-autocomplete`の豊富なプロパティにより、入力のあらゆる面を簡単に微調整することができます。

<example file="v-autocomplete/misc-api-search" />

#### 非同期アイテム

検索クエリに基づいて外部からデータを読み込む必要がある場合もあります。 `autocomplete` propを使う場合は、`search-input` propを**.sync** 修飾子と一緒に使ってください。 また、新しい `cache-items` propも使います。 これは`items` propに渡された全てのアイテムの一意なリストを保持するので、非同期アイテムと**multiple** propを使うときは**必須** です。

<example file="v-autocomplete/misc-asynchronous-items" />

#### 暗号通貨の選択

`v-autocomplete` コンポーネントは非常に柔軟性があり、ほぼすべてのユースケースに適合します。 **no-data**, **item**, **selection**のカスタムディスプレイを作成して、独自のユーザーエクスペリエンスを提供します。 _slot_ を使用すると、アプリケーションの外観を簡単にカスタマイズできます。

<example file="v-autocomplete/misc-cryptocurrency-selector" />

#### 州名セレクタ

`v-autocomplete` スロットとトランジションを組み合わせて使用すると、この州名セレクタのような、スタイリッシュな切り替え可能なオートコンプリートフィールドを作成できます。

<example file="v-autocomplete/misc-state-selector" />

<backmatter />
