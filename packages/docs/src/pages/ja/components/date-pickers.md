---
meta:
  title: デートピッカー・コンポーネント
  description: date picker コンポーネントは、日付、月、および年の選択を可能にするスタンドアロンインターフェイスです。
  keywords: date pickers, vuetify date picker component, vue date picker component
related:
  - /components/buttons/
  - /components/text-fields/
  - /components/time-pickers/
---

# Date pickers

`v-date-picker` は、日付や期間を選択できるようにするための完全な機能を備えたコンポーネントです。

<entry-ad />

## 使い方

Date pickerは、縦並び portrait **(デフォルト)** と横向き landscape の2つの方向のバリエーションがあります。 デフォルトでは、day(Date Pickerの場合) やmonth(Month Pickerの場合) で`input`イベントが発生しますが、**reactive**propを使えば、年/月をクリックした後でもモデルを更新することができます。

<example file="v-date-picker/usage" />

## API

- [v-date-picker](/api/v-date-picker)

<inline-api page="components/date-pickers" />

## 注意事項

<alert type="warning">

  `v-date-picker` は ISO 8601 **date** 文字列 (*YYYY-MM-DD*) を受け付けます。 ISO 8601などの詳細については、ISO（国際標準化機構）[国際規格](https://www.iso.org/standards.html) の公式ページをご覧ください。

</alert>

## サンプル

### Props

#### 許可された日付

配列、オブジェクト、および関数を使用して、入力可能な日付を指定できます。

<example file="v-date-picker/prop-allowed-dates" />

#### Colors

デートピッカーの色は **color** と **header-color** propsを使用して設定できます。 **header-color** prop が指定されていない場合、 **color** prop 値が使用されます。

<example file="v-date-picker/prop-colors" />

#### Elevation

`v-date-picker` コンポーネントは、Elevationの最大値が 24 までサポートされています。 Elevationの詳細については、公式の [Material Design elevations](https://material.io/design/environment/elevation.html) ページをご覧ください。

<example file="v-date-picker/prop-elevation" />

#### Icons

ピッカーで使用されるデフォルトのアイコンをオーバーライドできます。

<example file="v-date-picker/prop-icons" />

#### Multiple

**multiple** プロパティを設定することで、複数の日付を選択できます。 **multiple** を使用する場合、 date picker はそのモデルが配列であると想定します。

<example file="v-date-picker/prop-multiple" />

#### Picker date

表示された月/年（ピッカーの種類とアクティブビューに応じて）である **picker-date** を監視し、変更されたときに何らかのアクションを実行できます。 これには `.sync` 修飾子を使用します。

<example file="v-date-picker/prop-picker-date" />

#### Range

**range**  prop で日付の範囲を選択できます。 **range** プロパティを使用する場合、モデルは長さ2または空の配列であると想定します。

<example file="v-date-picker/prop-range" />

#### Readonly

**readonly** propを追加することにより、新しい日付の選択を無効にすることができます。

<example file="v-date-picker/prop-readonly" />

#### Show current

デフォルトでは、現在の日付はアウトライン化されたボタンを使用して表示されます - **show-current** prop を使用すると、ボーダーを削除したり、現在の日付として他の日付を選択することができます。

<example file="v-date-picker/prop-show-current" />

#### 兄弟月を表示

デフォルトでは前月と次月の日付は表示されません。 それらは**show-adjacent-months** propを使って表示することができます。

<example file="v-date-picker/prop-show-adjacent-months" />

#### Width

ピッカーの幅を指定するか、全幅（full width）にすることができます。

<example file="v-date-picker/prop-width" />

### イベント

#### 日付ボタン

`@click`, `@dblclick`, `@mouseenter`などのイベントを処理して、*日・月・年*のボタンを操作することができます。

<example file="v-date-picker/event-button-events" />

#### イベント日

配列やオブジェクト、関数を使ってイベントを指定できます。 イベントのデフォルトカラーを変更するには、**event-color** propを使ってください。 複数のイベントインジケータを表示したい場合、**イベント**関数またはオブジェクトは色の配列（materialまたはcss）を返すことができます。

<example file="v-date-picker/event-events" />

### その他

#### アクティブピッカー

誕生日ピッカーを作成することができます - デフォルトの年ピッカーから始まり、日付範囲を制限し、日を選択した後にピッカーメニューを閉じると、完璧な誕生日ピッカーになります。

<example file="v-date-picker/misc-birthday" />

#### ダイアログとメニュー

ピッカーを `v-text-field`に統合する場合、 **readonly** プロパティを使用することをお勧めします。 これにより、モバイルキーボードがトリガーされなくなります。 垂直方向のスペースを節約するには、ピッカータイトルを非表示にすることもできます。

ピッカーにはスロットがあり、保存とキャンセルの機能をフックすることができます。 これによって古い値を保持することができるので、ユーザーがキャンセルした場合に値を置き換えることができます。

<example file="v-date-picker/misc-dialog-and-menu" />

#### 書式設定

カスタム形式 (YYYY-MM-DD とは異なる) で日付を表示したい場合は、書式設定機能を使用する必要があります。

<example file="v-date-picker/misc-formatting" />

#### 外部ライブラリでの書式設定

また、Moment.js やdate-fnsなどの外部ライブラリでも日付の書式設定が可能です。

<example file="v-date-picker/misc-formatting-external-libraries" />

#### 国際化

日付ピッカーは JavaScript Date オブジェクトを通じて国際化をサポートします。 **locale** propを使用して、BCP 47 言語タグを指定してください。そして**first-day-of-week**で週の初めの曜日を設定してください。

<example file="v-date-picker/misc-internationalization" />

#### 方向

Date pickerは、縦並び portrait **(デフォルト)** と横向き landscape の2つの方向のバリエーションがあります。

<example file="v-date-picker/misc-orientation" />

<backmatter />
