---
meta:
  title: リスト・コンポーネント
  description: リストコンポーネントは、テキスト、画像、アイコンの連続したグループであり、主なアクションまたは補足的なアクションを含むことができます。
  keywords: lists, vuetify list component, vue list component
related:
  - /components/item-groups/
  - /components/list-item-groups/
  - /components/subheaders/
---

# Lists

`v-list` コンポーネントは情報を表示するために使用されます。 アバター、コンテンツ、アクション、サブヘッダーなどを含めることができます。 リストは、コレクション内の特定のアイテムを簡単に識別できるようにコンテンツを表示します。 テキストや画像のグループを整理するための一貫したスタイルを提供します。

<entry-ad />

## 使い方

リストには主に3つのバリエーションがあります。 **single-line** (デフォルト), **two-line**, **three-line** です。 このリスト宣言はアイテムの最小の高さを指定しており、`v-list`の同じpropから制御することもできます。

<example file="v-list/usage" />

## API

- [v-list](/api/v-list)
- [v-list-group](/api/v-list-group)
- [v-list-item](/api/v-list-item)
- [v-list-item-action](/api/v-list-item-action)
- [v-list-item-action-text](/api/v-list-item-action-text)
- [v-list-item-avatar](/api/v-list-item-avatar)
- [v-list-item-content](/api/v-list-item-content)
- [v-list-item-group](/api/v-list-item-group)
- [v-list-item-icon](/api/v-list-item-icon)
- [v-list-item-subtitle](/api/v-list-item-subtitle)
- [v-list-item-title](/api/v-list-item-title)

<inline-api page="components/lists" />


<!-- ## Sub-components

### v-list-item

v-list-item description

### v-list-item-action

v-list-item-action description

### v-list-item-action-text

v-list-item-action-text description

### v-list-item-avatar

v-list-item-avatar description

### v-list-item-content

v-list-item-content description

### v-list-item-subtitle

v-list-item-subtitle description

### v-list-item-title

v-list-item-title description -->

## 注意事項

<alert type="info">

  ステートフルリストアイテムを探している場合は、[v-list-item-group](/components/list-item-groups) を確認してください。

</alert>

## サンプル

### Props

#### Dense

`v-list` は **dense** プロパティで高さを下げることができます。

<example file="v-list/prop-dense" />

#### Disabled

無効にされた `v-list`を操作することはできません。

<promoted-ad slug="vuetify-lux-admin-pro" />

<example file="v-list/prop-disabled" />

#### Flat

`v-list` で **flat** プロパティを持つアイテムは変更されません。

<example file="v-list/prop-flat" />

#### Nav

リストは、`v-list-item`が占める幅を小さくしたり、border radiusを追加したりする代替 **nav** スタイルを受け取ることができます。

<example file="v-list/prop-nav" />

#### Rounded

`v-list`アイテムの両側を丸めることができます。

<example file="v-list/prop-rounded" />

#### Shaped

Shaped lists では、`v-list-item` の片側が丸くなります。

<example file="v-list/prop-shaped" />

#### Sub group

`v-list-group` コンポーネントを利用すると、 **sub-group** プロパティを利用して、深さ**2**までのサブグループを作成できます。

<example file="v-list/prop-sub-group" />

#### Three line

3行リストを指定すると、サブタイトルは2行で省略表示されます。 この機能は [line-clamp](https://developer.mozilla.org/ja/docs/Web/CSS/-webkit-line-clamp) を使用しており、すべてのブラウザでサポートされているわけではありません。

<example file="v-list/prop-three-line" />

#### 2つの行とサブヘッダー

リストには、サブヘッダーや水平線、1行以上を含めることができます。 サブタイトルは、1行を超えると省略して表示されます。

<example file="v-list/prop-two-line-and-subheader" />

### Slots

#### 展開リスト

リストは、`v-list-group`の`activator`スロットを使って、クリックすると表示されるアイテムグループを含めることができます。 展開リストは**[v-navigation-drawer](/components/navigation-drawers)**コンポーネントでも使われています。

<example file="v-list/slot-expansion-lists" />

### その他

#### アクションとアイテムグループ

アクション付きの **3行** リスト。 **[v-list-item-group](/components/list-item-groups)**を利用して、簡単にタイルにアクションを接続できます。

<example file="v-list/misc-action-and-item-groups" />

#### アクションスタック

リストでは、アクションの中に色々なものを含めることができます。 これはアクションアイテムの横にメタテキストを表示する必要があるときに便利です。

<example file="v-list/misc-action-stack" />

#### カードリスト

リストはカードと組み合わせることができます。

<example file="v-list/misc-card-list" />

#### シンプルなアバターリスト

`v-list-item-icon`, `v-list-item-title` と `v-list-item-avatar` を利用したシンプルなリスト

<example file="v-list/misc-simple-avatar-list" />

#### 単一行リスト

ここでは、 **v-list-item-avatar** と **v-list-item-icon** を単一行のリストに組み合わせます。

<example file="v-list/misc-single-line-list" />

#### サブヘッダと区切り線

リストには、複数のサブヘッダーと区切り線を含めることができます。

<example file="v-list/misc-subheadings-and-dividers" />

<backmatter />
