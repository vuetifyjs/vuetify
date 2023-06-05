<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          color="primary"
          type="4day"
          :events="events"
          :event-color="getEventColor"
          :event-ripple="false"
          @change="getEvents"
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
          @mouseleave="cancelDrag"
        >
          <template v-slot:event="{ event, timed /*, eventSummary */ }">
            <!--<div class="v-event-draggable">
              <component :is="{ render: eventSummary }"></component>
            </div>-->
            <div
              v-if="timed"
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
            ></div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref('')
  const events = ref([])
  const colors = ref(['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'])
  const names = ref(['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'])
  const dragEvent = ref(null)
  const dragStart = ref(null)
  const createEvent = ref(null)
  const createStart = ref(null)
  const extendOriginal = ref(null)
  function startDrag ({ event, timed }) {
    if (event && timed) {
      dragEvent.value = event
      dragTime = null
      extendOriginal.value = null
    }
  }
  function startTime (tms) {
    const mouse = toTime(tms)
    if (dragEvent.value && dragTime === null) {
      const start = dragEvent.value.start
      dragTime = mouse - start
    } else {
      createStart.value = roundTime(mouse)
      createEvent.value = {
        name: `Event #${events.value.length}`,
        color: rndElement(colors.value),
        start: createStart.value,
        end: createStart.value,
        timed: true,
      }
      events.value.push(createEvent.value)
    }
  }
  function extendBottom (event) {
    createEvent.value = event
    createStart.value = event.start
    extendOriginal.value = event.end
  }
  function mouseMove (tms) {
    const mouse = toTime(tms)
    if (dragEvent.value && dragTime !== null) {
      const start = dragEvent.value.start
      const end = dragEvent.value.end
      const duration = end - start
      const newStartTime = mouse - dragTime
      const newStart = roundTime(newStartTime)
      const newEnd = newStart + duration
      dragEvent.value.start = newStart
      dragEvent.value.end = newEnd
    } else if (createEvent.value && createStart.value !== null) {
      const mouseRounded = roundTime(mouse, false)
      const min = Math.min(mouseRounded, createStart.value)
      const max = Math.max(mouseRounded, createStart.value)
      createEvent.value.start = min
      createEvent.value.end = max
    }
  }
  function endDrag () {
    dragTime = null
    dragEvent.value = null
    createEvent.value = null
    createStart.value = null
    extendOriginal.value = null
  }
  function cancelDrag () {
    if (createEvent.value) {
      if (extendOriginal.value) {
        createEvent.value.end = extendOriginal.value
      } else {
        const i = events.value.indexOf(createEvent.value)
        if (i !== -1) {
          events.value.splice(i, 1)
        }
      }
    }
    createEvent.value = null
    createStart.value = null
    dragTime = null
    dragEvent.value = null
  }
  function roundTime (time, down = true) {
    const roundTo = 15
    const roundDownTime = roundTo * 60 * 1000
    return down ? time - time % roundDownTime : time + (roundDownTime - (time % roundDownTime))
  }
  function toTime (tms) {
    return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
  }
  function getEventColor (event) {
    const rgb = parseInt(event.color.substring(1), 16)
    const r = (rgb >> 16) & 255
    const g = (rgb >> 8) & 255
    const b = (rgb >> 0) & 255
    return event === dragEvent.value ? `rgba(${r}, ${g}, ${b}, 0.7)` : event === createEvent.value ? `rgba(${r}, ${g}, ${b}, 0.7)` : event.color
  }
  function getEvents ({ start, end }) {
    const events = []
    const min = new Date(`${start.date}T00:00:00`).getTime()
    const max = new Date(`${end.date}T23:59:59`).getTime()
    const days = (max - min) / 86400000
    const eventCount = rnd(days, days + 20)
    for (let i = 0; i < eventCount; i++) {
      const timed = rnd(0, 3) !== 0
      const firstTimestamp = rnd(min, max)
      const secondTimestamp = rnd(2, timed ? 8 : 288) * 900000
      const start = firstTimestamp - (firstTimestamp % 900000)
      const end = start + secondTimestamp
      events.push({
        name: rndElement(names.value),
        color: rndElement(colors.value),
        start,
        end,
        timed,
      })
    }
    events.value = events
  }
  function rnd (a, b) {
    return Math.floor((b - a + 1) * Math.random()) + a
  }
  function rndElement (arr) {
    return arr[rnd(0, arr.length - 1)]
  }
</script>

<script>
  export default {
    data: () => ({
      value: '',
      events: [],
      colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      dragEvent: null,
      dragStart: null,
      createEvent: null,
      createStart: null,
      extendOriginal: null,
    }),
    methods: {
      startDrag ({ event, timed }) {
        if (event && timed) {
          this.dragEvent = event
          this.dragTime = null
          this.extendOriginal = null
        }
      },
      startTime (tms) {
        const mouse = this.toTime(tms)

        if (this.dragEvent && this.dragTime === null) {
          const start = this.dragEvent.start

          this.dragTime = mouse - start
        } else {
          this.createStart = this.roundTime(mouse)
          this.createEvent = {
            name: `Event #${this.events.length}`,
            color: this.rndElement(this.colors),
            start: this.createStart,
            end: this.createStart,
            timed: true,
          }

          this.events.push(this.createEvent)
        }
      },
      extendBottom (event) {
        this.createEvent = event
        this.createStart = event.start
        this.extendOriginal = event.end
      },
      mouseMove (tms) {
        const mouse = this.toTime(tms)

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
      },
      cancelDrag () {
        if (this.createEvent) {
          if (this.extendOriginal) {
            this.createEvent.end = this.extendOriginal
          } else {
            const i = this.events.indexOf(this.createEvent)
            if (i !== -1) {
              this.events.splice(i, 1)
            }
          }
        }

        this.createEvent = null
        this.createStart = null
        this.dragTime = null
        this.dragEvent = null
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
      getEventColor (event) {
        const rgb = parseInt(event.color.substring(1), 16)
        const r = (rgb >> 16) & 0xFF
        const g = (rgb >> 8) & 0xFF
        const b = (rgb >> 0) & 0xFF

        return event === this.dragEvent
          ? `rgba(${r}, ${g}, ${b}, 0.7)`
          : event === this.createEvent
            ? `rgba(${r}, ${g}, ${b}, 0.7)`
            : event.color
      },
      getEvents ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`).getTime()
        const max = new Date(`${end.date}T23:59:59`).getTime()
        const days = (max - min) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const timed = this.rnd(0, 3) !== 0
          const firstTimestamp = this.rnd(min, max)
          const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
          const start = firstTimestamp - (firstTimestamp % 900000)
          const end = start + secondTimestamp

          events.push({
            name: this.rndElement(this.names),
            color: this.rndElement(this.colors),
            start,
            end,
            timed,
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      rndElement (arr) {
        return arr[this.rnd(0, arr.length - 1)]
      },
    },
  }
</script>

<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
  }

  &:hover::after {
    display: block;
  }
}
</style>
