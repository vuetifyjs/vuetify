<template>
  <div>
    <v-sheet class="d-flex" tile>
      <v-btn
        class="ma-2"
        variant="text"
        icon
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        class="ma-2"
        density="comfortable"
        label="type"
        variant="outlined"
        hide-details
      ></v-select>
      <v-select
        v-model="mode"
        :items="modes"
        class="ma-2"
        density="comfortable"
        label="event-overlap-mode"
        variant="outlined"
        hide-details
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        class="ma-2"
        density="comfortable"
        label="weekdays"
        variant="outlined"
        hide-details
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
        class="ma-2"
        variant="text"
        icon
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :event-color="getEventColor"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :events="events"
        :type="type"
        :weekdays="weekday"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const type = ref('month')
  const types = ['month', 'week', 'day', '4day']
  const mode = ref('stack')
  const modes = ['stack', 'column']
  const weekday = ref([0, 1, 2, 3, 4, 5, 6])
  const weekdays = [
    { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
    { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
    { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
    { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
  ]
  const value = ref('')
  const events = ref([])
  const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey-darken-1']
  const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']

  function rnd (a, b) {
    return Math.floor((b - a + 1) * Math.random()) + a
  }

  function getEvents ({ start, end }) {
    const evts = []

    const min = new Date(`${start.date}T00:00:00`)
    const max = new Date(`${end.date}T23:59:59`)
    const days = (max.getTime() - min.getTime()) / 86400000
    const eventCount = rnd(days, days + 20)

    for (let i = 0; i < eventCount; i++) {
      const allDay = rnd(0, 3) === 0
      const firstTimestamp = rnd(min.getTime(), max.getTime())
      const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
      const second = new Date(first.getTime() + secondTimestamp)

      evts.push({
        name: names[rnd(0, names.length - 1)],
        start: first,
        end: second,
        color: colors[rnd(0, colors.length - 1)],
        timed: !allDay,
      })
    }

    events.value = evts
  }

  function getEventColor (event) {
    return event.color
  }
</script>

<script>
  export default {
    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey-darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    methods: {
      getEvents ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.events = events
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>
