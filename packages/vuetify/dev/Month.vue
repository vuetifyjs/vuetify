<template>
  <v-calendar
    ref="calendar"
    type="month"
    :weekdays="[1,2,3,4,5,6,0]"
    :events="events"
    @mouseenter:day="mouseenterDay"
    @mousedown:event="startDrag"
    @mousedown:day="startTime"
    @mousemove:day="mouseMove"
    @mouseup:day="endDrag"
  >
  </v-calendar>
</template>
<script>
const dateStr = '2022-12-26 01:07:00'
const start = new Date(dateStr).valueOf()
const end = start + 2 * 60 * 60 * 1000
const otherEnd = end + 2 * 60 * 60 * 1000

const week = {
  start: start + 24 * 60 * 60 * 1000,
  end: end + 2*24 * 60 * 60 * 1000
}
const month = {
  start: start,
  end: end + 9*24 * 60 * 60 * 1000
}

export default {
  mounted() {
    console.log(this.$refs.test)
  },
  data: () => ({
    events: [
      {
        name: `red`,
        color: 'red',
        start:  month.start,
        end: month.end,
        timed: true,
      },
      {
        name: `red`,
        color: 'red',
        start:  week.start,
        end: week.end,
        timed: true,
      },
      {
        name: `black`,
        color: 'black',
        start:  start,
        end: otherEnd,
        timed: true,
      },
      {
        name: `blue`,
        color: 'blue',
        start:  start,
        end: end,
        timed: true,
      },
    ],
    dragEvent: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
  }),
  methods: {

    mouseenterDay(a,b){
      console.log(a,b,'****mouseenterDay')
    },
    clickDay(a,b){
      console.log(a,b,'****clickDay')
    },
    stop(){},
    startDrag (tms) {
      const { event, timed } = tms
      console.log(tms,'==========startDrag======')
      // 在月视图中如何将timed转换为true
      if (event) {
        this.dragEvent = event
        this.dragTime = null
        this.extendOriginal = null
      }
    },
    startTime (tms) {

      console.log(tms.date,'*******startTime*********startTime**************startTime****')
      // 将日期转换为时间戳，精确到分钟
      const mouse = this.toTime(tms)
      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start

        this.dragTime = mouse - start
      } else {
        // 获取开始的边界时间
        this.createStart = this.roundTime(mouse)
        this.createEvent = {
          name: `Event #${this.events.length}`,
          color: 'black',
          start: this.createStart,
          end: this.createStart,
          timed: true,
        }
        this.events.push(this.createEvent)
      }
    },
    mouseMove (tms) {
      const mouse = this.toTime(tms)
      console.log(tms.date,'*******mouseMove*********mouseMove**************mouseMove****')
      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start
        const end = this.dragEvent.end
        const duration = end - start
        const newStartTime = mouse - this.dragTime
        const newStart = this.roundTime(newStartTime)
        const newEnd = newStart + duration

        this.dragEvent.start = newStart
        this.dragEvent.end = newEnd
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false)

        const min = Math.min(mouseRounded, this.createStart)
        const max = Math.max(mouseRounded, this.createStart)

        this.createEvent.start = min
        this.createEvent.end = max
      }
    },
    endDrag () {
      this.dragTime = null
      this.dragEvent = null
      this.createEvent = null
      this.createStart = null
      this.extendOriginal = null
      console.log(this.events)
    },
    roundTime (time, down = true) {
      const roundTo = 15 // minutes
      const roundDownTime = roundTo * 60 * 1000
      return down
        ? time - time % roundDownTime
        : time + (roundDownTime - (time % roundDownTime))
    },
    toTime (tms) {
      return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
    },
  },
}
</script>
