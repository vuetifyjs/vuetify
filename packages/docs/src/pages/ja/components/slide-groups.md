---
meta:
  title: スライドグループ・コンポーネント
  description: スライドグループコンポーネントは、要素から選択可能なコンテンツを作成できるという点でアイテムグループに似ていますが、1行で実行できます。
  keywords: slide groups, slideable groups, vuetify slide group component, vue slide group component
related:
  - /components/icons/
  - /components/carousels/
  - /components/tabs/
---

# Slide groups

`v-slide-group` コンポーネントは、擬似的にページ分割された情報を表示するために使用されます。 [v-item-group](/components/item-groups) をコアで使用し、 [v-tabs](/components/tabs) や [v-chip-group](/components/chip-groups) などのコンポーネントのベースラインを提供します。

<entry-ad />

## 使い方

[v-window](/components/windows) コンポーネントと同様に、 `v-slide-group` によりアイテムは必要に応じてスペースを取ることができます。 ユーザーは指定された情報を左右に移動できます。

<example file="v-slide-group/usage" />

## API

- [v-slide-group](/api/v-slide-group)
- [v-slide-item](/api/v-slide-item)

<inline-api page="components/slide-groups" />


<!-- ## Sub-components

### v-slide-item

v-slide-item description -->

## サンプル

### Props

#### Active class

**active-class** prop を使用すると、アクティブな項目をカスタマイズするためのクラスを渡すことができます。

<example file="v-slide-group/prop-active-class" />

#### Center active

**center-active** propを使うと、アクティブなアイテムが常に中央に表示されるようになります。

<example file="v-slide-group/prop-center-active" />

#### カスタムアイコン

**next-icon** と **prev-icon** propを使って、矢印の代わりに独自のページネーションアイコンを追加できます。

<example file="v-slide-group/prop-custom-icons" />

### Mandatory（必須）

**mandatory** propを指定すると、少なくとも1つの項目が選択されていなければならないスライドグループを作成します。

<example file="v-slide-group/prop-mandatory" />

#### Multiple

**multiple** プロパティを設定することで、複数の項目を選択できます。

<example file="v-slide-group/prop-multiple" />

### その他

#### 擬似カルーセル

スライドグループをカスタマイズして、シートに情報をクリエイティブに表示します。 選択しているアイテムの情報を利用することで、ユーザーにとって補助的な情報を簡単に表示することができます。

<example file="v-slide-group/misc-pseudo-carousel" />

<backmatter />
