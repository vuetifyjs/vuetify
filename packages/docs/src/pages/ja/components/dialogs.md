---
meta:
  title: Dialog component
  description: ダイアログコンポーネントは、特定のタスクについてユーザーに通知し、重要な情報を含む場合や、特定のアクションを取るようにユーザーに要求したりすることができます。
  keywords: dialogs, vuetify dialog component, vue dialog component
related:
  - /components/buttons/
  - /components/cards/
  - /components/menus/
---

# Dialogs

`v-dialog` コンポーネントは特定のタスクについてユーザーに知らせ、重要な情報を含む、決定を必要とする、または複数のタスクを含むかもしれません。 割り込みとなるダイアログは控えめに使用してください。

<entry-ad />

## 使い方

ダイアログには、activatorとcontent（デフォルト）の2つのslotが含まれています。 プライバシーポリシーに適しています。

<example file="v-dialog/usage" />

## API

- [v-dialog](/api/v-dialog)

<inline-api page="components/dialogs" />

## サンプル

### Props

#### Fullscreen

スペースが限られているため、モバイルデバイスにとって、フルスクリーンのダイアログは大画面のデバイスで使用されるダイアログよりも適している可能性があります。

<example file="v-dialog/prop-fullscreen" />

#### Transitions

ダイアログを上または下から表示させることができます。

<example file="v-dialog/prop-transitions" />

#### Persistent （永続的表示）

Simple Dialogと似ていますが、外側に触れたり**esc**キーを押しても閉じない点が異なります。

<example file="v-dialog/prop-persistent" />

#### Scrollable

スクロール可能なコンテンツを持つダイアログの例です。

<example file="v-dialog/prop-scrollable" />

### その他

#### フォーム

ダイアログ内のフォームのシンプルな例です。

<example file="v-dialog/misc-form" />

#### ローダー

`v-dialog` コンポーネントを使用すると、アプリケーション用にカスタマイズされたローディングエクスペリエンスを簡単に作成できます。

<example file="v-dialog/misc-loader" />

#### ネスト

ダイアログはネストできます: ダイアログから別のダイアログを開くことができます。

<example file="v-dialog/misc-nesting" />

#### オーバーフロー

利用可能なウィンドウスペースに収まらないモーダルは、コンテナでスクロールされます。

<example file="v-dialog/misc-overflowed" />

#### activatorを使用しない場合

何らかの理由で activator スロットを使用しない場合は、ダイアログをトリガするイベントに `.stop` 修飾子を必ず追加してください。

<example file="v-dialog/misc-without-activator" />

<backmatter />
