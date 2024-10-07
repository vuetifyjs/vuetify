---
meta:
  title: ラジオボタン・コンポーネント
  description: ラジオボタンは、ユーザーがラジオグループを使用していずれかのオプションの中から1つだけを選択することを可能にします。
  keywords: radio groups, radio buttons, vuetify radio group component, vuetify radio component, vue radio component, vue radio group component
related:
  - /components/button-groups/
  - /components/forms/
  - /components/checkboxes/
---

# Radio buttons

`v-radio` コンポーネントは単純なラジオボタンです。 `v-radio-group` コンポーネントと組み合わせると、あらかじめ定義された一連のオプションからユーザが選択できるようにグループ化可能な機能を提供できます。

<entry-ad />

## 使い方

`v-radio` はそれ自体で使用することができますが、 `v-radio-group` と組み合わせて使用するのがベストです。 **v-radio-group** の `v-model` を使用すると、グループ内で選択したラジオボタンの値にアクセスできます。

<example file="v-radio-group/usage" />

## API

- [v-radio](/api/v-radio)
- [v-radio-group](/api/v-radio-group)

<inline-api page="components/radio-buttons" />

## サンプル

### Props

#### Color

ラジオは、 **color** プロパティを使用して、組み込みの色とコンテキスト名を使用して色を付けることができます。

<example file="v-radio-group/prop-colors" />

#### 方向

ラジオグループは、それぞれのpropsを使用して、縦方向の行（row）または横並びの列（column）にできます。 既定値は column です。

<example file="v-radio-group/prop-direction" />

#### Mandatory（必須）

ラジオグループはデフォルトでは必須ではありません。 これは**mandatory** propで変更できます。

<example file="v-radio-group/prop-mandatory" />

### Slots

#### Label

ラジオグループ・ラベルは `label` スロットで定義でき、HTML コンテンツを使用することができます。

<example file="v-radio-group/slot-label" />

<backmatter />
