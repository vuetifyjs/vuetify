<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      today: '2019-01-01',
      focus: '2019-01-01',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [
        {
          name: 'Vacation',
          details: 'Going to the beach!',
          start: '2018-12-29',
          end: '2019-01-01',
          color: 'blue',
        },
        {
          name: 'Meeting',
          details: 'Spending time on how we do not have enough time',
          start: '2019-01-07 09:00',
          end: '2019-01-07 09:30',
          color: 'indigo',
        },
        {
          name: 'Large Event',
          details: 'This starts in the middle of an event and spans over multiple events',
          start: '2018-12-31',
          end: '2019-01-04',
          color: 'deep-purple',
        },
        {
          name: '3rd to 7th',
          details: 'Testing',
          start: '2019-01-03',
          end: '2019-01-07',
          color: 'cyan',
        },
        {
          name: 'Big Meeting',
          details: 'A very important meeting about nothing',
          start: '2019-01-07 08:00',
          end: '2019-01-07 11:30',
          color: 'red',
        },
        {
          name: 'Another Meeting',
          details: 'Another important meeting about nothing',
          start: '2019-01-07 10:00',
          end: '2019-01-07 13:30',
          color: 'brown',
        },
        {
          name: '7th to 8th',
          start: '2019-01-07',
          end: '2019-01-08',
          color: 'blue',
        },
        {
          name: 'Lunch',
          details: 'Time to feed',
          start: '2019-01-07 12:00',
          end: '2019-01-07 15:00',
          color: 'deep-orange',
        },
        {
          name: '30th Birthday',
          details: 'Celebrate responsibly',
          start: '2019-01-03',
          color: 'teal',
        },
        {
          name: 'New Year',
          details: 'Eat chocolate until you pass out',
          start: '2019-01-01',
          end: '2019-01-02',
          color: 'green',
        },
        {
          name: 'Conference',
          details: 'The best time of my life',
          start: '2019-01-21',
          end: '2019-01-28',
          color: 'grey darken-1',
        },
        {
          name: 'Hackathon',
          details: 'Code like there is no tommorrow',
          start: '2019-01-30 23:00',
          end: '2019-02-01 08:00',
          color: 'black',
        },
        {
          name: 'event 1',
          start: '2019-01-14 18:00',
          end: '2019-01-14 19:00',
          color: '#4285F4',
        },
        {
          name: 'event 2',
          start: '2019-01-14 18:00',
          end: '2019-01-14 19:00',
          color: '#4285F4',
        },
        {
          name: 'event 5',
          start: '2019-01-14 18:00',
          end: '2019-01-14 19:00',
          color: '#4285F4',
        },
        {
          name: 'event 3',
          start: '2019-01-14 18:30',
          end: '2019-01-14 20:30',
          color: '#4285F4',
        },
        {
          name: 'event 4',
          start: '2019-01-14 19:00',
          end: '2019-01-14 20:00',
          color: '#4285F4',
        },
        {
          name: 'event 6',
          start: '2019-01-14 21:00',
          end: '2019-01-14 23:00',
          color: '#4285F4',
        },
        {
          name: 'event 7',
          start: '2019-01-14 22:00',
          end: '2019-01-14 23:00',
          color: '#4285F4',
        },
      ],
    }),
    computed: {
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
        this.start = start
        this.end = end
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
    },
  }
</script>
