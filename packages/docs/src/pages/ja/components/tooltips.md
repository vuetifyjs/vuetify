---
meta:
  title: ツールチップ・コンポーネント
  description: ツールチップコンポーネントは、親要素に関するテキスト情報を表示します。
  keywords: tooltips, vuetify tooltip component, vue tooltip component
related:
  - /components/badges/
  - /components/icons/
  - /components/menus/
---

# Tooltips

`v-tooltip` コンポーネントは、ユーザーが要素にカーソルを合わせた場合に情報を伝えるのに役立ちます。 `v-model` を通じてツールチップの表示をプログラム的に制御することもできます。 有効にすると、ツールチップは要素を識別するテキストラベルを表示します。例えば、機能の説明などです。

<entry-ad />

## 使い方

Tooltipsはどんな要素もラップすることができます。

<example file="v-tooltip/usage" />

## API

- [v-tooltip](/api/v-tooltip)

<inline-api page="components/tooltips" />

## 注意事項

<alert type="info">

  `v-tooltip`の表示位置の設定は、position プロパティ(` top` | `bottom` |` left` | `right`) で指定します。

</alert>

## サンプル

### Props

#### 配置

Tooltipは対象になる要素の四方向のどこにでも配置することができます。

<example file="v-tooltip/prop-alignment" />

#### 色

ツールチップの色は `color` propで設定できます。

<example file="v-tooltip/prop-color" />

#### Visibility

`v-model`を使用してTooltipの表示を制御できます。

<example file="v-tooltip/prop-visibility" />

<backmatter />
