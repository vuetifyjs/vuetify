---
meta:
  title: タイムピッカー・コンポーネント
  description: タイムピッカーコンポーネントは、AM/PMおよび24時間フォーマットで時間と分を選択できるスタンドアロンインターフェイスです。
  keywords: time pickers, vuetify time picker component, vue time picker component
related:
  - /components/buttons/
  - /components/date-pickers/
  - /components/text-fields/
---

# Time pickers

`v-time-picker` は、多くの既存 Vuetify コンポーネントで使用できるスタンドアロンコンポーネントです。 時間を選択するための視覚的な表現をユーザーに提供します。

<entry-ad />

## 使い方

タイムピッカーでは、デフォルトでライトテーマが有効になっています。

<usage name="v-time-picker" />

## API

- [v-time-picker](/api/v-time-picker)

<inline-api page="components/time-pickers" />

## サンプル

### Props

#### Allowed times

配列やオブジェクト、関数を使って入力可能な時間を指定できます。 また、時間ステップ/精度/間隔（例：10分）を指定することもできます。

<example file="v-time-picker/prop-allowed-times" />

#### AMPM in title

AM/PMスイッチをピッカーのタイトルに移動できます。

<example file="v-time-picker/prop-ampm-in-title" />

#### Colors

タイムピッカーの色は `color` と `header-color` プロパティを使用して設定できます。 `header-color` prop が指定されていない場合は、 `color` prop の値を使用します。

<example file="v-time-picker/prop-color" />

#### Disabled

無効にされたピッカーを操作することはできません。

<example file="v-time-picker/prop-disabled" />

#### Elevation

`v-time-picker` コンポーネントを強調するには、0 から 24 までの **elevation** を指定します。 Elevationは `box-shadow` css プロパティを変更します。

<example file="v-time-picker/prop-elevation" />

#### フォーマット

タイムピッカーは24時間形式に切り替えることができます。 `format` propはピッカーの表示方法のみを定義し、ピッカーの値（model）は常に24時間形式であることに注意してください。

<example file="v-time-picker/prop-format" />

#### No title

ピッカーのタイトルを削除できます。

<example file="v-time-picker/prop-no-title" />

#### 範囲

これは`min`と`max` propを使ってピッカー同士を結合した例です。

<example file="v-time-picker/prop-range" />

#### Read-only（読み取り専用）

読み取り専用ピッカーは無効化されたものと同じ動作をしますが、デフォルトのものと同じように見えます。

<example file="v-time-picker/prop-readonly" />

#### Scrollable

マウスホイールを使ってタイムピッカーの値を編集することができます。

<example file="v-time-picker/prop-scrollable" />

#### Use seconds

タイムピッカーに秒数を入力することができます。

<example file="v-time-picker/prop-use-seconds" />

#### Width

ピッカーの幅を指定するか、全幅（full width）にすることができます。

<example file="v-time-picker/prop-width" />

### その他

#### ダイアログとメニュー

ピッカーは柔軟性が高いので、思い通りの体験を実現することができます。

<example file="v-time-picker/misc-dialog-and-menu" />

<backmatter />
