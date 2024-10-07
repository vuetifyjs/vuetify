---
meta:
  title: タイムライン・コンポーネント
  description: タイムラインコンポーネントは時系列情報を水平方向に表示するために使用されます。
  keywords: timelines, vuetify timeline component, vue timeline component
related:
  - /components/cards/
  - /components/icons/
  - /components/grids
---

# Timelines

`v-timeline`は時系列の情報を綺麗に表示したいときに便利です。

<entry-ad />

## 使い方

最も単純な形式の`v-timeline`は、少なくとも1つの`v-timeline-item`を含む垂直タイムラインを表示します。

<example file="v-timeline/usage" />

## API

- [v-timeline](/api/v-timeline)
- [v-timeline-item](/api/v-timeline-item)

<inline-api page="components/timelines" />


<!-- ## Sub-components

### v-timeline-item

v-timeline-item description -->

## サンプル

### Props

#### 色

色付きのドットで、タイムラインを読みやすくする視覚的なブレークポイントを作成します。

<example file="v-timeline/prop-color" />

#### Dense

**dense** タイムライン すべてのコンテンツを右に配置します。 この例では、 カード部分に別のデザインを適用させるために`v-alert` で置き換えています。

<example file="v-timeline/prop-dense" />

#### アイコンドット

条件に応じて `v-timeline-item`のドット内のアイコンをカスタマイズできます。

<example file="v-timeline/prop-icon-dots" />

#### Reverse

**reverse** propを使ってタイムラインアイテムの向きを反対にすることができます。 これはデフォルトと**dense** モードの両方で動作します。

<example file="v-timeline/prop-reverse" />

#### Small

**small** propは、別のスタイルでユニークなデザインを提供することができます。

<example file="v-timeline/prop-small" />

### Slots

#### Icon

`icon` スロットと `v-avatar` を使用して、アバターをドットに挿入します。

<example file="v-timeline/slot-icon" />

#### Opposite (反対)

**opposite** slotは、タイムライン内に、カスタマイズできる追加のレイヤーを提供します。

<example file="v-timeline/slot-opposite" />

#### タイムラインアイテムのデフォルト

`v-timeline-item` の中に `v-card` を置くと、カードの横に吹き出しが表示されます。

<example file="v-timeline/slot-timeline-item-default" />

### その他

#### 高度な使い方

モジュラーコンポーネントを使用すると、高度にカスタマイズされたソリューションを作成できます。

<example file="v-timeline/misc-advanced" />

<backmatter />
