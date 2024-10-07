---
meta:
  title: オーバーレイ・コンポーネント
  description: オーバーレイコンポーネントを使用すると、コンポーネントまたはアプリケーション全体にスクリムやホバリング効果を簡単に作成できます。
  keywords: overlays, vuetify overlay component, vue overlay component
related:
  - /components/cards/
  - /components/sheets/
  - /components/dialog/
---

# Overlays

`v-overlay` コンポーネントは、特定の要素やその一部に重点を置くために使用されます。 アプリケーション内の状態変化のユーザーに通知し、ローダー、ダイアログなどの作成に使用できます。

<entry-ad />

## 使い方

最も単純な形式では、`v-overlay`コンポーネントはアプリケーション上に淡色表示されたレイヤーを追加します。

<example file="v-overlay/usage" />

## API

- [v-overlay](/api/v-overlay)

<inline-api page="components/overlays" />

## サンプル

### Props

#### Absolute

**Absolute** オーバーレイは絶対的に配置され、親要素の内部に含まれます。

<example file="v-overlay/prop-absolute" />

#### Opacity

**Opacity** を使用すると、 `v-overlay` コンポーネントの透明度をカスタマイズできます。

<example file="v-overlay/prop-opacity" />

#### Z index

**z-index** では、 `v-overlay` コンポーネントのスタック順を簡単に変更することができます。

<example file="v-overlay/prop-z-index" />

### その他

#### 上級

[v-hover](/components/hover)を使用して、情報カードに素敵なスクリムを追加し、ユーザーが実行できるアクションを追加できます。

<example file="v-overlay/misc-advanced" />

#### ローダー

`v-overlay`を背景にし、進行状況表示コンポーネントを追加して、カスタム ローダーを簡単に作成できます。

<example file="v-overlay/misc-loader" />

<backmatter />
