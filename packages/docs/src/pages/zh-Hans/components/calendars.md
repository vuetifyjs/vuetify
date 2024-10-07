---
meta:
  title: Calendar 日历
  description: 日历组件是对流行的 Google 日历应用程序进行了简洁的改编。
  keywords: 日历, vuetify 日历组件, vue 日历组件
  related:
    - /components/date-pickers
    - /components/time-pickers
    - /components/cards
---

# Calendars（日历）

`v-calendar ` 组件用于在日、周、月或类别视图中显示信息。 每日视图为所有的day或timed元素提供了插槽，而每周和每月视图则为每一天提供了一个插槽。 类别视图根据给定的类别或给定事件中的类别为day和timed部分提供一个插槽。 您可以选择传入一个事件数组，它们将在适当的日期和时间内呈现。

<entry-ad />

## 使用

日历有一个类型和值来决定在哪个时间段内显示哪个类型的日历。 这显示了最基本的配置，即具有<strong x-id=“1”> name </strong>、<strong x-id=“1”> start </strong>和<strong x-id=“1”> end </strong>属性的事件数组。 ** end ** 是可选的，它默认与 ** start ** 相同。 如果 ** start ** 有一个时间值，则视为定时事件，并将相应地显示在日视图中。 事件可以跨越多天，并将相应地呈现。

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

## 示例

### 属性

#### category类型

这是一个具有 ** category ** ` 类型 </strong> 的事件日历示例, 允许您并列比较两个日程表。</p>

<p spaces-before="0"><example file="v-calendar/prop-type-category" /></p>

<h4 spaces-before="0">day类型</h4>

<p spaces-before="0">这是一个日历示例，每个间隔时段都有内容，并且 <strong x-id=“1”>类型</strong> 为 <code>day`。

<example file="v-calendar/prop-type-day" />

#### week类型

这是一个具有全天和定时事件的事件日历的示例，其中 **类型** 为 `week`。

<example file="v-calendar/prop-type-week" />

### 事件

#### Click

这是一个带有附加事件处理程序和控制日历显示的外部组件的计划器示例。

<example file="v-calendar/event-click" />

### 插槽

#### Day

插槽允许您定义每天的内容、每日视图的时间间隔和各种标签。

<example file="v-calendar/slot-day" />

#### Day body

使用 `day-body` 插槽您可以自定义天的日历内容。 在这个示例中，我们为当前时间添加了一条线。

<example file="v-calendar/slot-day-body" />

### 其他

#### 拖放

这是一个事件日历的例子，您可以拖动事件、延长其长度并创建事件。

<example file="v-calendar/misc-drag-and-drop" />

<backmatter />
