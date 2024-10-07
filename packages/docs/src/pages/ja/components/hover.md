---
meta:
  title: ホバー・コンポーネント
  description: hoverコンポーネントは、選択可能なコンテンツをラップすることで、ユーザーがホバーイベントを起こしたときに簡単に反応できるようにしています。
  keywords: hover, vuetify hover component, vue hover component
related:
  - /components/cards/
  - /components/images/
  - /components/tooltips/
---

# Hover

`v-hover` コンポーネントは、任意のコンポーネントの hover 状態を処理するためのクリーンなインターフェイスを提供します。

<entry-ad />

## 使い方

`v-hover` コンポーネントは、1つの子要素のみを含むラッパーであり、ホバリングされたときにイベントをトリガーすることができます。 `v-hover` が正しく動作するためには、 **value** propが `true` に設定されているか、あるいは、ラップされた要素が `v-slot="{ wrapper }"` を含んでいる必要があります。

<usage name="v-hover" />

## API

- [v-hover](/api/v-hover)

<inline-api page="components/hover" />

## サンプル

### Props

#### Disabled

**disabled** プロパティはホバー機能を無効にします。

<example file="v-hover/prop-disabled" />

#### 開始と終了の遅延

遅延 `v-hover` イベントは、 **open-delay** と **close-delay** プロパティを組み合わせるか、または別々に使用します。

<example file="v-hover/prop-open-and-close-delay" />

### その他

#### ホバーリスト

`v-hover`に`v-for`を組み合わせて使用​​すると、ユーザーがリストを操作するときにアイテム１つだけを目立たせることができます。

<example file="v-hover/misc-hover-list" />

#### トランジション

ユーザーの操作に応答する高度にカスタマイズされたコンポーネントを作成します。

<example file="v-hover/misc-transition" />

<backmatter />
