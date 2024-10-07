---
meta:
  title: カレンダー・コンポーネント
  description: カレンダーコンポーネントは、人気のあるGoogleカレンダーアプリケーションを翻案にしたクリーンでシンプルな実装です。
  keywords: calendars, vuetify calendar component, vue calendar component
  related:
    - /components/date-pickers
    - /components/time-pickers
    - /components/card
---

# Calendars

`v-calendar` コンポーネントは、日、週、月、またはカテゴリビューで情報を表示するために使用されます。 daily ビューには、すべての日または時間の要素のためのスロットがあり、weeklyとmonthlyのビューには、それぞれの日のスロットがあります。 カテゴリビューには、指定されたカテゴリまたは指定されたイベントのカテゴリに基づいて、その日の各カテゴリのためのスロットと時間指定されたセクションがあります。 必要に応じて、イベントの配列を渡すことができ、それらは適切な日時にレンダリングされます。

<entry-ad />

## 使い方

カレンダーには type と value があり、どのタイプのカレンダーをどの期間に表示するかを決定します。 これは最低限の構成、**name**, **start**, **end**のプロパティを持つイベントの配列を示しています。 **end**はオプションで、デフォルトは**start**です。 **start** に時刻がある場合は、時刻イベントと見なされ、それに応じて日ビューに表示されます。 イベントは複数日にわたることができ、それに応じてレンダリングされます。

<example file="v-calendar/usage" />

## API

- [v-calendar](/api/v-calendar)
- [v-calendar-daily](/api/v-calendar-daily)
- [v-calendar-monthly](/api/v-calendar-monthly)
- [v-calendar-weekly](/api/v-calendar-weekly)

<inline-api page="components/calendars" />


<!-- ## Sub-components

### v-calendar-daily

v-calendar-daily description

### v-calendar-monthly

v-calendar-monthly description

### v-calendar-weekly

v-calendar-weekly description -->

## サンプル

### Props

#### Type category

これは**type** が`category` であるイベントカレンダーの例で、2つのスケジュールを並べて比較することができます。

<example file="v-calendar/prop-type-category" />

#### Type day

これは各区間のスロットにコンテンツがあり、**type** が `day`であるカレンダーの例です。

<example file="v-calendar/prop-type-day" />

#### Type week

これは、終日イベントと時間指定イベントがあり、**type** が `week`であるイベントカレンダーの例です。

<example file="v-calendar/prop-type-week" />

### イベント

#### クリック

これは、カレンダーの表示を制御する追加のイベントハンドラと外部コンポーネントを備えたプランナーの例です。

<example file="v-calendar/event-click" />

### Slots

#### Day

Slotを使用すると、各日のコンテンツ、日単位のビューの時間間隔、およびさまざまなラベルを定義できます。

<example file="v-calendar/slot-day" />

#### Day body

`day-body` スロットを使うと、その日のカレンダーの内容をカスタマイズすることができます。 この例では現在時刻を表す線を追加しました。

<example file="v-calendar/slot-day-body" />

### その他

#### ドラッグ&ドロップ

イベントをドラッグしたり、イベントを延長したり、イベントを作成したりできるイベントカレンダーの例です。

<example file="v-calendar/misc-drag-and-drop" />

<backmatter />
