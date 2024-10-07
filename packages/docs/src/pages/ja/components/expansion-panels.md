---
meta:
  title: エクスパンションパネル・コンポーネント
  description: expansion-panelコンポーネントは、展開拡張・折り畳み縮小で背後に情報を隠す軽量コンテナです。
  keywords: expansion panels, vuetify expansion panel component, vue expansion panel component
related:
  - /components/cards/
  - /components/data-tables/
  - /components/lists/
---

# Expansion panels

`v-expansion-panel`コンポーネントは、大量の情報がある垂直方向のスペースを減らすのに役立ちます。 コンポーネントのデフォルトの機能は、一度に 1 つのexpansion-panel本体のみを表示することです。 ただし、 `multiple` プロパティを使用すると、明示的に閉じるまでexpansion-panelを開いたままにすることができます。

<entry-ad />

## 使い方

最も単純な形式なエクスパンションパネルでは、項目のリストが表示されます。

<example file="v-expansion-panels/usage" />

## API

- [v-expansion-panels](/api/v-expansion-panels)
- [v-expansion-panel](/api/v-expansion-panel)
- [v-expansion-panel-header](/api/v-expansion-panel-header)
- [v-expansion-panel-content](/api/v-expansion-panel-content)

<inline-api page="components/expansion-panels" />


<!-- ## Sub-components

### v-expansion-panel

v-expansion-panel description

### v-expansion-panel-header

v-expansion-panel-header description

### v-expansion-panel-content

v-expansion-panel-content description -->

## サンプル

### Props

#### アコーディオン

**accordion** expansion-panelはアクティブなパネルの周りに余白がありません。

<example file="v-expansion-panels/prop-accordion" />

#### 無効化

エクスパンションパネルとそのコンテンツの両方は、 **disabled** propを使用して無効にできます。

<example file="v-expansion-panels/prop-disabled" />

#### Focusable

**focusable** propでフォーカス可能にすることができます。

<example file="v-expansion-panels/prop-focusable" />

#### Inset

**inset**エクスパンションパネルは、アクティブ化すると小さくなります。

<example file="v-expansion-panels/prop-inset" />

#### Model

**v-model** を変更することで、エクスパンションパネルを外部から制御することができます。 値は、現在開いているエクスパンションパネルのコンテンツのゼロベースのインデックスに対応します。 **multiple** prop が使用されている場合は開いているアイテムのインデックスを含む配列となります。

<example file="v-expansion-panels/prop-model" />

#### ポップアウト

エクスパンションパネルには **popout** デザインもあります。 これにより、アクティベート時にエクスパンションパネルが拡大されます。

<example file="v-expansion-panels/prop-popout" />

#### Readonly

**readonly** prop は **disabled**と同じことをしますが、外観のスタイルは変化しません。

<example file="v-expansion-panels/prop-readonly" />

### その他

#### 高度な使い方

エクスパンションパネルコンポーネントは、高度な実装をするための豊富なプレイグラウンドを提供しています。 ここでは `v-expansion-panel-header`コンポーネントのスロットを使って、開閉時にコンテンツをフェードイン/アウトさせています。

<example file="v-expansion-panels/misc-advanced" />

#### カスタムアイコン

展開アクションアイコンは**expand-icon** propまたは`actions`スロットでカスタマイズできます。

<example file="v-expansion-panels/misc-custom-icons" />

<backmatter />
