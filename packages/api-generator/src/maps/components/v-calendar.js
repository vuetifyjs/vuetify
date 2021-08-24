const {
  VCalendarDay,
  VCalendarEventEvent,
  VCalendarEventSlot,
  VTimestamp,
  VTimestampWithCategory,
  VTimestampWithTime,
  VTimestampWithTimeCategory,
} = require('../helpers/variables')

function createMouseEventDesc (ob, eventType) {
  return `${JSON.stringify(VTimestampWithTime, null, 2).replace(/"/g, '')}, ${eventType}`
}

module.exports = {
  'v-calendar': {
    slots: [
      {
        name: 'category',
        props: VTimestampWithCategory,
      },
      {
        name: 'event',
        props: VCalendarEventSlot,
      },
      {
        name: 'day',
        props: VCalendarDay,
      },
      {
        name: 'day-body',
        props: VTimestampWithTime,
      },
      {
        name: 'day-header',
        props: VTimestampWithTime,
      },
      {
        name: 'day-label',
        props: VTimestamp,
      },
      {
        name: 'day-label-header',
        props: VTimestamp,
      },
      {
        name: 'day-month',
        props: VTimestamp,
      },
      {
        name: 'interval',
        props: VTimestampWithTime,
      },
    ],
    functions: [
      {
        name: 'checkChange',
        signature: '(): void',
      },
      {
        name: 'updateTimes',
        signature: '(): void',
      },
      {
        name: 'next',
        signature: '(amount: number = 1): void',
      },
      {
        name: 'prev',
        signature: '(amount: number = 1): void',
      },
      {
        name: 'move',
        signature: '(amount: number = 1): void',
      },
      {
        name: 'timeToY',
        signature: '(time: number | string | { hour: number, minute: number }, clamp: boolean = true): number | false',
      },
      {
        name: 'timeDelta',
        signature: '(time: number | string | { hour: number, minute: number }): number | false',
      },
      {
        name: 'minutesToPixels',
        signature: '(minutes: number): number',
      },
      {
        name: 'scrollToTime',
        signature: '(time: number | string | { hour: number, minute: number }): boolean',
      },
      {
        name: 'getVisibleEvents',
        signature: '(): CalendarEventParsed[]',
      },
      {
        name: 'parseEvent',
        signature: '(input: CalendarEvent, index: number = 0): CalendarEventParsed',
      },
      {
        name: 'parseTimestamp',
        signature: '(input: VTimestampInput, required?: false): CalendarTimestamp | null',
      },
      {
        name: 'timestampToDate',
        signature: '(timestamp: CalendarTimestamp): Date',
      },
    ],
    events: [
      {
        name: 'input',
        value: VTimestamp,
      },
      {
        name: 'moved',
        value: VTimestamp,
      },
      {
        name: 'change',
        value: { start: VTimestamp, end: VTimestamp },
      },
      {
        name: 'click:date',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'contextmenu:date',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'click:more',
        value: createMouseEventDesc(VTimestamp, 'MouseEvent'),
      },
      {
        name: 'click:day',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'contextmenu:day',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'mousedown:day',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'mousemove:day',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'mouseup:day',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'mouseenter:day',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'mouseleave:day',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'touchstart:day',
        value: createMouseEventDesc(VTimestampWithTime, 'TouchEvent'),
      },
      {
        name: 'touchmove:day',
        value: createMouseEventDesc(VTimestampWithTime, 'TouchEvent'),
      },
      {
        name: 'touchend:day',
        value: createMouseEventDesc(VTimestampWithTime, 'TouchEvent'),
      },
      {
        name: 'click:event',
        value: VCalendarEventEvent,
      },
      {
        name: 'contextmenu:event',
        value: VCalendarEventEvent,
      },
      {
        name: 'mousedown:event',
        value: VCalendarEventEvent,
      },
      {
        name: 'mousemove:event',
        value: VCalendarEventEvent,
      },
      {
        name: 'mouseup:event',
        value: VCalendarEventEvent,
      },
      {
        name: 'mouseenter:event',
        value: VCalendarEventEvent,
      },
      {
        name: 'mouseleave:event',
        value: VCalendarEventEvent,
      },
      {
        name: 'touchstart:event',
        value: VCalendarEventEvent,
      },
      {
        name: 'touchmove:event',
        value: VCalendarEventEvent,
      },
      {
        name: 'touchend:event',
        value: VCalendarEventEvent,
      },
      {
        name: 'click:day-category',
        value: createMouseEventDesc(VTimestampWithCategory, 'MouseEvent'),
      },
      {
        name: 'contextmenu:day-category',
        value: createMouseEventDesc(VTimestampWithCategory, 'MouseEvent'),
      },
      {
        name: 'mousedown:day-category',
        value: createMouseEventDesc(VTimestampWithCategory, 'MouseEvent'),
      },
      {
        name: 'mousemove:day-category',
        value: createMouseEventDesc(VTimestampWithCategory, 'MouseEvent'),
      },
      {
        name: 'mouseup:day-category',
        value: createMouseEventDesc(VTimestampWithCategory, 'MouseEvent'),
      },
      {
        name: 'mouseenter:day-category',
        value: createMouseEventDesc(VTimestampWithCategory, 'MouseEvent'),
      },
      {
        name: 'mouseleave:day-category',
        value: createMouseEventDesc(VTimestampWithCategory, 'MouseEvent'),
      },
      {
        name: 'touchstart:day-category',
        value: createMouseEventDesc(VTimestampWithCategory, 'TouchEvent'),
      },
      {
        name: 'touchmove:day-category',
        value: createMouseEventDesc(VTimestampWithCategory, 'TouchEvent'),
      },
      {
        name: 'touchend:day-category',
        value: createMouseEventDesc(VTimestampWithCategory, 'TouchEvent'),
      },
      {
        name: 'click:time',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'contextmenu:time',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'mousedown:time',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'mousemove:time',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'mouseup:time',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'mouseenter:time',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'mouseleave:time',
        value: createMouseEventDesc(VTimestampWithTime, 'MouseEvent'),
      },
      {
        name: 'touchstart:time',
        value: createMouseEventDesc(VTimestampWithTime, 'TouchEvent'),
      },
      {
        name: 'touchmove:time',
        value: createMouseEventDesc(VTimestampWithTime, 'TouchEvent'),
      },
      {
        name: 'touchend:time',
        value: createMouseEventDesc(VTimestampWithTime, 'TouchEvent'),
      },
      {
        name: 'click:time-category',
        value: createMouseEventDesc(VTimestampWithTimeCategory, 'MouseEvent'),
      },
      {
        name: 'contextmenu:time-category',
        value: createMouseEventDesc(VTimestampWithTimeCategory, 'MouseEvent'),
      },
      {
        name: 'mousedown:time-category',
        value: createMouseEventDesc(VTimestampWithTimeCategory, 'MouseEvent'),
      },
      {
        name: 'mousemove:time-category',
        value: createMouseEventDesc(VTimestampWithTimeCategory, 'MouseEvent'),
      },
      {
        name: 'mouseup:time-category',
        value: createMouseEventDesc(VTimestampWithTimeCategory, 'MouseEvent'),
      },
      {
        name: 'mouseenter:time-category',
        value: createMouseEventDesc(VTimestampWithTimeCategory, 'MouseEvent'),
      },
      {
        name: 'mouseleave:time-category',
        value: createMouseEventDesc(VTimestampWithTimeCategory, 'MouseEvent'),
      },
      {
        name: 'touchstart:time-category',
        value: createMouseEventDesc(VTimestampWithTimeCategory, 'TouchEvent'),
      },
      {
        name: 'touchmove:time-category',
        value: createMouseEventDesc(VTimestampWithTimeCategory, 'TouchEvent'),
      },
      {
        name: 'touchend:time-category',
        value: createMouseEventDesc(VTimestampWithTimeCategory, 'TouchEvent'),
      },
      {
        name: 'click:interval',
        value: createMouseEventDesc(VTimestamp, 'MouseEvent'),
      },
      {
        name: 'contextmenu:interval',
        value: createMouseEventDesc(VTimestamp, 'MouseEvent'),
      },
      {
        name: 'mousedown:interval',
        value: createMouseEventDesc(VTimestamp, 'MouseEvent'),
      },
      {
        name: 'mousemove:interval',
        value: createMouseEventDesc(VTimestamp, 'MouseEvent'),
      },
      {
        name: 'mouseup:interval',
        value: createMouseEventDesc(VTimestamp, 'MouseEvent'),
      },
      {
        name: 'mouseenter:interval',
        value: createMouseEventDesc(VTimestamp, 'MouseEvent'),
      },
      {
        name: 'mouseleave:interval',
        value: createMouseEventDesc(VTimestamp, 'MouseEvent'),
      },
      {
        name: 'touchstart:interval',
        value: createMouseEventDesc(VTimestamp, 'TouchEvent'),
      },
      {
        name: 'touchmove:interval',
        value: createMouseEventDesc(VTimestamp, 'TouchEvent'),
      },
      {
        name: 'touchend:interval',
        value: createMouseEventDesc(VTimestamp, 'TouchEvent'),
      },
    ],
  },
}
