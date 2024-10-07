---
meta:
  title: スナックバー・コンポーネント
  description: snackbarコンポーネントは、アプリケーションが実行したプロセスをユーザーに通知します。 一時的なもので、しばしばアクションが含まれている場合があります。 タイマーはスナックバーの上にカーソルを置くと停止します。
  keywords: snackbars, vuetify snackbar component, vue snackbar component
related:
  - /components/buttons/
  - /styles/colors/
  - /components/forms/
---

# Snackbars

`v-snackbar` コンポーネントは、ユーザーへのクイックメッセージを表示するために使用されます。 スナックバーは位置決め、除去の遅延、およびコールバックをサポートします。

<entry-ad />

## 使い方

最もシンプルな形式の`v-snackbar`は、一時的で閉じることができる通知を表示します。

<example file="v-snackbar/usage" />

## API

- [v-snackbar](/api/v-snackbar)

<inline-api page="components/snackbars" />

## サンプル

### Props

#### Multi line

**multi-line** プロパティは `v-snackbar` の高さを拡張し、コンテンツ用のスペースを少し増やします。

<example file="v-snackbar/prop-multi-line" />

#### Timeout

**timeout** プロパティで、 `v-snackbar` が非表示になるまでの遅延をカスタマイズできます。

<example file="v-snackbar/prop-timeout" />

#### バリエーション

**text**、 **shaped**、 **outlined**などのプロパティを使用して、スナックバーに異なるスタイルを適用します。

<example file="v-snackbar/prop-variants" />

#### Vertical

**vertical** プロパティを使用すると、 `v-snackbar` 内のコンテンツを垂直方向にスタックできます。

<example file="v-snackbar/prop-vertical" />

<backmatter />
