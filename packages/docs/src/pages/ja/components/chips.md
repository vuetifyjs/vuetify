---
meta:
  title: チップ・コンポーネント
  description: Chipを使用すると、情報を入力したり、選択を行ったり、コンテンツをフィルター処理したり、アクションを起動したりできます。
  keywords: chips, vuetify chip component, vue chip component
related:
  - /components/avatars/
  - /components/icons/
  - /components/selects/
---

# Chips

`v-chip` コンポーネントは、小さな情報を伝えるために使用されます。 `close` プロパティを使用すると、チップはインタラクティブになり、ユーザとのやり取りが可能になります。 [v-chip-group](/components/chip-groups) によって高度な選択オプションにも使用されます。

<entry-ad />

## 使い方

チップには、closeable, filter, outlined, pill のバリエーションがあります。 `v-chip` のデフォルトスロットは、テキストと並んでアバターとアイコンを受け付けます。

<usage name="v-chip" />

## API

- [v-chip](/api/v-chip)

<inline-api page="components/chips" />

## サンプル

### Props

#### 閉じるボタン付きラベル

クローズ可能なチップは、v-modelで制御できます。 チップが閉じられたタイミングを検知したい場合は`click:close`イベントを使うこともできます。

<example file="v-chip/prop-closable" />

#### 色付き

マテリアルデザインパレットのあらゆる色を使用して Chip に色を付けることができます。

<example file="v-chip/prop-colored" />

#### Draggable

`draggable` `v-chip` コンポーネントはマウスでドラッグできます。

<example file="v-chip/prop-draggable" />

#### Filter

`v-chip`コンポーネントにはチップがアクティブなときに追加のアイコンを表示する`filter`オプションがあります。 アイコンは`filter-icon`を使ってカスタマイズできます。

<example file="v-chip/prop-filter" />

#### Label

ラベル Chip は `v-card` の border-radius を使用します。

<example file="v-chip/prop-label" />

#### リップル効果を表示しない

`v-chip` は `ripple` prop が `false` に設定されている場合、リップルなしでレンダリングできます。

<example file="v-chip/prop-no-ripple" />

#### Outlined

アウトライン Chip は指定されているテキストの色を元にボーダーカラーが適用されます。

<example file="v-chip/prop-outlined" />

#### サイズ

`v-chip` コンポーネントは、 `x-small` から `x-large` まで、さまざまなサイズにできます。

<example file="v-chip/prop-sizes" />

### イベント

#### Actionを伴うチップ

チップはアクショナブルなアイテムとして使うことができます。 _click_イベントが与えられると、チップはインタラクティブになり、メソッドを呼び出せるようになります。

<example file="v-chip/event-action-chips" />

### Slots

#### Icon

Chip にはテキストのほか、Material Icons フォントに含まれるアイコンを使用することができます。

<example file="v-chip/slot-icon" />

### その他

#### カスタムリスト

この例では、[v-autocomplete](/components/autocompletes)の代わりにカスタマイズされたリストを使っています。 これにより、検索と選択という機能はそのままに、常に利用可能な選択肢を表示することができます。

<example file="v-chip/misc-custom-list" />

#### 伸縮自在

チップは `v-menu` と組み合わせることで、チップに対する特定のアクションセットを有効にすることができます。

<example file="v-chip/misc-expandable" />

#### フィルタリング

チップは、特定のタスクに補足的なアクションを提供するのに最適です。 この例では、アイテムのリストを検索し、情報のサブセットを収集して、使用可能なキーワードを表示しています。

<example file="v-chip/misc-filtering" />

#### Select との組み合わせ

選択したデータを表示するためにチップを使用できます。 以下に独自のタグを追加してみてください。

<example file="v-chip/misc-in-selects" />

<backmatter />
