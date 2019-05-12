const { VTimestamp, VTimestampWithTime } = require('../variables')

module.exports = {
  'v-calendar': {
    scopedSlots: [
      {
        name: 'day',
        props: VTimestamp
      },
      {
        name: 'dayBody',
        props: VTimestampWithTime
      },
      {
        name: 'dayHeader',
        props: VTimestamp
      },
      {
        name: 'dayLabel',
        props: VTimestamp
      },
      {
        name: 'dayMonth',
        props: VTimestamp
      },
      {
        name: 'interval',
        props: VTimestampWithTime
      }
    ],
    functions: [
      {
        name: 'updateTimes',
        signature: '(): void'
      },
      {
        name: 'next',
        signature: '(amount: number = 1): void'
      },
      {
        name: 'prev',
        signature: '(amount: number = 1): void'
      },
      {
        name: 'move',
        signature: '(amount: number = 1): void'
      },
      {
        name: 'timeToY',
        signature: '(time: number | string | { hour: number, minute: number }, clamp: boolean = true): number | false'
      },
      {
        name: 'minutesToPixels',
        signature: '(minutes: number): number'
      },
      {
        name: 'scrollToTime',
        signature: '(time: number | string | { hour: number, minute: number }): boolean'
      }
    ],
    events: [
      {
        name: 'input',
        value: VTimestamp
      },
      {
        name: 'moved',
        value: VTimestamp
      },
      {
        name: 'change',
        value: { start: VTimestamp, end: VTimestamp }
      },
      {
        name: 'click:date',
        value: VTimestampWithTime
      },
      {
        name: 'contextmenu:date',
        value: VTimestampWithTime
      },
      {
        name: 'click:day',
        value: VTimestampWithTime
      },
      {
        name: 'contextmenu:day',
        value: VTimestampWithTime
      },
      {
        name: 'mousedown:day',
        value: VTimestampWithTime
      },
      {
        name: 'mousemove:day',
        value: VTimestampWithTime
      },
      {
        name: 'mouseup:day',
        value: VTimestampWithTime
      },
      {
        name: 'mouseenter:day',
        value: VTimestampWithTime
      },
      {
        name: 'mouseleave:day',
        value: VTimestampWithTime
      },
      {
        name: 'touchstart:day',
        value: VTimestampWithTime
      },
      {
        name: 'touchmove:day',
        value: VTimestampWithTime
      },
      {
        name: 'touchend:day',
        value: VTimestampWithTime
      },
      {
        name: 'click:time',
        value: VTimestampWithTime
      },
      {
        name: 'contextmenu:time',
        value: VTimestampWithTime
      },
      {
        name: 'mousedown:time',
        value: VTimestampWithTime
      },
      {
        name: 'mousemove:time',
        value: VTimestampWithTime
      },
      {
        name: 'mouseup:time',
        value: VTimestampWithTime
      },
      {
        name: 'mouseenter:time',
        value: VTimestampWithTime
      },
      {
        name: 'mouseleave:time',
        value: VTimestampWithTime
      },
      {
        name: 'touchstart:time',
        value: VTimestampWithTime
      },
      {
        name: 'touchmove:time',
        value: VTimestampWithTime
      },
      {
        name: 'touchend:time',
        value: VTimestampWithTime
      },
      {
        name: 'click:interval',
        value: VTimestamp
      },
      {
        name: 'contextmenu:interval',
        value: VTimestamp
      },
      {
        name: 'mousedown:interval',
        value: VTimestamp
      },
      {
        name: 'mousemove:interval',
        value: VTimestamp
      },
      {
        name: 'mouseup:interval',
        value: VTimestamp
      },
      {
        name: 'mouseenter:interval',
        value: VTimestamp
      },
      {
        name: 'mouseleave:interval',
        value: VTimestamp
      },
      {
        name: 'touchstart:interval',
        value: VTimestamp
      },
      {
        name: 'touchmove:interval',
        value: VTimestamp
      },
      {
        name: 'touchend:interval',
        value: VTimestamp
      }
    ]
  }
}
