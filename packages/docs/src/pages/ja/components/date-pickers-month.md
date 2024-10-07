---
meta:
  title: マンスピッカー・コンポーネント
  description: month picker コンポーネントは、月または月と年の両方を選択できるスタンドアロンインターフェイスです。
  keywords: month pickers, vuetify month picker component, vue month picker component
related:
  - /components/date-pickers/
  - /components/menus/
  - /components/time-pickers/
---

# Date pickers - month

`v-date-picker` は単独で月を選択するコンポーネントとして使用できます。

<entry-ad />

## 使い方

Month pickerは、縦並び portrait **(デフォルト)** と横向き landscape の2つの方向のバリエーションがあります。

<example file="v-date-picker-month/usage" />

## API

- [v-date-picker](/api/v-date-picker)

<inline-api page="components/date-pickers-month" />

## 注意事項

<alert type="warning">

  `v-date-picker` は ISO 8601 **date** 文字列 (*YYYY-MM-DD*) を受け付けます。 ISO 8601などの詳細については、ISO（国際標準化機構）[国際規格](https://www.iso.org/standards.html) の公式ページをご覧ください。

</alert>

## サンプル

### Props

#### Allowed months

配列やオブジェクト、関数を使って入力可能な月を指定できます。

<example file="v-date-picker-month/prop-allowed-months" />

#### Color

Month ピッカーの色は **color** と **header-color** プロパティを使用して設定できます。 **header-color** prop が指定されていない場合、 `color` prop 値が使用されます。

<example file="v-date-picker-month/prop-colors" />

#### Icons

ピッカーで使用されるデフォルトのアイコンをオーバーライドできます。

<example file="v-date-picker-month/prop-icons" />

#### Multiple

Month ピッカーは **multiple** propを用いることで、複数の月を選択できるようになりました。 **multiple** を使用する場合、month ピッカーはそのモデルが配列であると想定します。

<example file="v-date-picker-month/prop-multiple" />

#### Readonly

**readonly** propを追加することにより、新しい日付の選択を無効にすることができます。

<example file="v-date-picker-month/prop-readonly" />

#### Show current

デフォルトでは、現在の月はアウトライン化されたボタンを使用して表示されます - **show-current** prop を使用すると、ボーダーを削除したり、現在の月として他の月を選択することができます。

<example file="v-date-picker-month/prop-show-current" />

#### Width

ピッカーの幅を指定するか、全幅にすることができます。

<example file="v-date-picker-month/prop-width" />

### その他

#### ダイアログとメニュー

ピッカーを `v-text-field`に統合する場合、 **readonly** プロパティを使用することをお勧めします。 これにより、モバイルキーボードがトリガーされなくなります。 垂直方向のスペースを節約するには、ピッカータイトルを非表示にすることもできます。

ピッカーにはスロットがあり、保存とキャンセルの機能をフックすることができます。 これによって古い値を保持することができるので、ユーザーがキャンセルした場合に値を置き換えることができます。

<example file="v-date-picker-month/misc-dialog-and-menu" />

#### 国際化

Month ピッカーはJavaScriptのDateオブジェクトを通じて国際化に対応しています。 **locale** プロパティを使用して、BCP 47 言語タグを指定してください。

<example file="v-date-picker-month/misc-internationalization" />

#### 方向

Month pickerは、縦並び portrait **(デフォルト)** と横向き landscape の2つの方向のバリエーションがあります。

<example file="v-date-picker-month/misc-orientation" />

<backmatter />
