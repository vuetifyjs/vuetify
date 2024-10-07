---
meta:
  title: スイッチ・コンポーネント
  description: スイッチコンポーネントは、シンプルで見た目どおりのトグルで、2つの値を選択するために使用されます。
  keywords: switch, switch component, vuetify switch component, vue switch component
related:
  - /components/checkboxes/
  - /components/forms/
  - /components/radio-buttons/
---

# Switches

`v-switch` コンポーネントを使用すると、2つの異なる値を選択することができます。 チェックボックスとは見た目が異なりますが、トグルまたはオン/オフスイッチに非常に似ています。

<entry-ad />

## 使い方

最も単純な形式の `v-switch` は、2 つの値の間のトグルを提供します。

<example file="v-switch/usage" />

## API

- [v-switch](/api/v-switch)

<inline-api page="components/switches" />

## サンプル

### Props

#### Colors

スイッチは、 **color** プロパティに組み込みの色とコンテキスト名を使用することで色付けできます。

<example file="v-switch/prop-colors" />

#### Flat

**flat** propを使うとスイッチを平らにできます。

<example file="v-switch/prop-flat" />

#### Inset

インセットモードでスイッチをレンダリングできます。

<example file="v-switch/prop-inset" />

#### 配列としてのモデル

複数の`v-switch`は配列を使うことによって同じ**v-model**を共有できます。

<example file="v-switch/prop-model-as-array" />

#### ブール値としてのモデル

単一の `v-switch` は **値** としてブール値を持ちます。

<example file="v-switch/prop-model-as-boolean" />

#### 状態

`v-switch` は、**default**, **disabled**, **loading**など、さまざまな状態を持つことができます。

<example file="v-switch/prop-states" />

### Slots

#### Label

スイッチラベルは `label` スロットで定義でき、HTML コンテンツを使用することができます。

<example file="v-switch/slot-label" />

<backmatter />
