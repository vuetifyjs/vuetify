---
meta:
  title: チップグループ・コンポーネント
  description: チップグループコンポーネントは、多数の選択可能なチップを単一または複数のラインに結合します。
  keywords: chip groups, vuetify chip group component, vue chip group component
related:
  - /components/chips/
  - /components/slide-groups/
  - /components/item-groups/
---

# Chip groups

`v-chip-group`は、グループ化可能な機能を提供することで`v-chip` コンポーネントの機能を強化します。 チップを利用した選択グループを作成するために使用されます。

<entry-ad />

## 使い方

チップグループを使用すると、より複雑な実装のためのフィルタリングオプションを簡単に選択できます。 デフォルトでは `v-chip-group` は右側にオーバーフローしますが、 **column** のみのモードにも変更できます。

<usage name="v-chip-group" />

## API

- [v-chip-group](/api/v-chip-group)
- [v-chip](/api/v-chip)

<inline-api page="components/chip-groups" />

## サンプル

### Props

#### Column

**column** propがあるチップグループは、チップを折り返すことができます。

<example file="v-chip-group/prop-column" />

#### フィルター結果

**filter** プロパティで、追加時の視覚フィードバックを提供するチップ グループを簡単に作成できます。 チップが選択されていることをユーザーに伝える代替ビジュアルスタイルが作成されます。

<example file="v-chip-group/prop-filter" />

#### Mandatory（必須）

**mandatory**（必須項目） prop を持つチップグループは、常に値を選択する必要があります。

<example file="v-chip-group/prop-mandatory" />

#### Multiple

**multiple** prop を持つチップグループは、複数の値を選択できます。

<example file="v-chip-group/prop-multiple" />

### その他

#### 製品カード

`v-chip`コンポーネントは、そのモデルに使う値を明示的に指定することができます。 これは`v-chip-group`コンポーネントに渡され、チップのインデックスを値として使いたくない場合に便利です。

<example file="v-chip-group/misc-product-card" />

#### 歯ブラシカード

チップグループは、アイテムグループやラジオコントロールと同じアクションを実行するカスタムインターフェースを作成することができますが、スタイルは異なります。

<example file="v-chip-group/misc-toothbrush-card" />

<backmatter />
