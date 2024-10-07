---
meta:
  title: ツリービュー・コンポーネント
  description: ツリービューコンポーネントは、ツリー構造内の階層データを表すために使用されるユーザーインターフェイスです。
  keywords: treeview, vuetify treeview component, vue treeview component
related:
  - /components/lists/
  - /components/list-item-groups/
  - /components/timelines/
---

# Treeview

`v-treeview` コンポーネントは大量のネストされたデータを表示するのに便利です。

<entry-ad />

## 使い方

基本的な使い方の例

<example file="v-treeview/usage" />

## API

- [v-treeview](/api/v-treeview)

<inline-api page="components/treeview" />

## サンプル

### Props

#### Activatable

ツリービューのノードは、それらをクリックすることによってアクティブにすることができます。

<example file="v-treeview/prop-activatable" />

#### 色

アクティブなツリービューノードのテキストと背景色をコントロールできます。

<example file="v-treeview/prop-color" />

#### Dense（高密度）モード

Dense（高密度）モードでは、アイテムの高さが減少し、よりコンパクトなレイアウトが提供されます。

<example file="v-treeview/prop-dense" />

#### Hoverable

ツリービューノードは、ホバー効果を設定できます。

<example file="v-treeview/prop-hoverable" />

#### Item disabled

**item-disabled** propを設定すると、`true`に設定したときに、どのノードのプロパティが無効になるかを制御することができます。

<example file="v-treeview/prop-item-disabled" />

#### Load children

**load-children** プロパティに _Promise_ コールバックを提供することで、子データを動的にロードすることができます。 このコールバックは、ユーザーが空の配列である子プロパティを持つアイテムを展開しようとするときに実行されます。

<example file="v-treeview/prop-load-children" />

#### Open all

ツリービューノードは、ページの読み込み時に事前に開くことができます。

<example file="v-treeview/prop-open-all" />

#### Rounded

ツリービューノードを丸めることができます。

<example file="v-treeview/prop-rounded" />

#### Selectable

ツリービューノードと子を簡単に選択できます。

<example file="v-treeview/prop-selectable" />

#### Selected color

選択したノードのチェックボックスの色を制御できます。

<example file="v-treeview/prop-selected-color" />

#### Selection type

Treeview が 2 つの異なる選択タイプをサポートするようになりました。 デフォルトの型は **'leaf'**で、v-model 配列にリーフノードのみ含まれます。 しかし、親ノードは部分的または完全に選択されたものとしてレンダリングされます。 代替モードは **'independent'**で、親ノードを選択することができますが、各ノードは親ノードと子ノードとは独立しています。

<example file="v-treeview/prop-selection-type" />

#### Shaped

シェイプされたツリービューでは、ノードの片側は丸い境界線になります。

<example file="v-treeview/prop-shaped" />

### Slots

#### AppendとLabel

**label**と**append**スロットを使用して、直感的なファイルエクスプローラを作成することができます。

<example file="v-treeview/slot-append-and-label" />

### その他

#### SearchとFilter

**search** プロパティを使用すると、ツリービューを簡単にフィルタリングできます。 大文字小文字を区別するフィルタリングやファジーフィルタリングが必要な場合は、 **filter** プロパティを設定することで、カスタムフィルタ機能を簡単に適用できます。 これは [v-autocomplete](/components/autocompletes) コンポーネントに似ています。

<example file="v-treeview/misc-search-and-filter" />

#### Selectable（選択可能）なアイコン

**on**, **off**, **indeterminate** アイコンをカスタマイズして、選択可能なツリーを表示します。 API が読み込まれた項目などの他の高度な機能と組み合わせてください。

<example file="v-treeview/misc-selectable-icons" />

<backmatter />
