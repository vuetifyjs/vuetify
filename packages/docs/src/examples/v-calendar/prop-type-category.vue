<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn
            class="mr-4"
            color="grey-darken-2"
            variant="outlined"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            color="grey-darken-2"
            size="small"
            variant="text"
            icon
            @click="prev"
          >
            <v-icon size="small">
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            color="grey-darken-2"
            size="small"
            variant="text"
            icon
            @click="next"
          >
            <v-icon size="small">
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="calendar">
            {{ calendar.title }}
          </v-toolbar-title>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          :categories="categories"
          :event-color="getEventColor"
          :events="events"
          color="primary"
          type="category"
          category-show-all
          @change="fetchEvents"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
  import { onMounted, ref } from 'vue'

  const calendar = ref()

  const focus = ref('')
  const events = ref([])
  const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey-darken-1']
  const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
  const categories = ['John Smith', 'Tori Walker']

  function getEventColor (event) {
    return event.color
  }

  function setToday () {
    focus.value = ''
  }

  function prev () {
    calendar.value.prev()
  }

  function next () {
    calendar.value.next()
  }

  function fetchEvents ({ start, end }) {
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
        category: categories[rnd(0, categories.length - 1)],
      })
    }

    events.value = evts
  }

  function rnd (a, b) {
    return Math.floor((b - a + 1) * Math.random()) + a
  }

  onMounted(() => {
    calendar.value.checkChange()
  })
</script>

<script>
  export default {
    data: () => ({
      focus: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey-darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      categories: ['John Smith', 'Tori Walker'],
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      fetchEvents ({ start, end }) {
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
            category: this.categories[this.rnd(0, this.categories.length - 1)],
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>
