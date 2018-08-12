<template>
  <div class="panes">
    <div class="left">

      <v-checkbox
        label="Dark"
        v-model="dark"
      ></v-checkbox>

      <v-menu ref="startMenu"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        v-model="startMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="start">
        <v-text-field
          slot="activator"
          label="Start Date"
          prepend-icon="event"
          readonly
          v-model="start"
        ></v-text-field>
        <v-date-picker v-model="start" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="startMenu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.startMenu.save(start)">OK</v-btn>
        </v-date-picker>
      </v-menu>

      <v-menu ref="nowMenu"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
        v-model="nowMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="now">
        <v-text-field
          slot="activator"
          v-model="now"
          label="Today"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="now" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="nowMenu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.nowMenu.save(now)">OK</v-btn>
        </v-date-picker>
      </v-menu>

      <v-select
        label="Weekdays"
        v-model="weekdays"
        :items="weekdaysOptions"
      ></v-select>

      <v-select
        label="Intervals"
        v-model="intervals"
        :items="intervalsOptions"
      ></v-select>

      <v-select
        label="# of Days"
        v-model="maxDays"
        :items="maxDaysOptions"
      ></v-select>

      <v-select
        label="Styling"
        v-model="styleInterval"
        :items="styleIntervalOptions"
      ></v-select>

      <v-text-field
        label="Last Event"
        readonly
        v-model="lastEvent"
      ></v-text-field>

    </div>
    <div class="right">

      <v-calendar-daily
        :start="start"
        :max-days="maxDays"
        :now="now"
        :dark="dark"
        :weekdays="weekdays"
        :first-interval="intervals.first"
        :interval-minutes="intervals.minutes"
        :interval-count="intervals.count"
        :interval-height="intervals.height"
        :interval-style="intervalStyle"
        :show-interval-label="showIntervalLabel"
        @view-day="lastEvent = 'view-day ' + $event.date"
        @click:time="lastEvent = 'click:time ' + $event.date + ' ' + $event.time"
        @click:day="lastEvent = 'click:day ' + $event.date">

        <template slot="dayHeader" slot-scope="day">
          <div class="dayHeader"
            v-if="day.weekday % 2"
            @click.stop="lastEvent = 'event ' + day.date">
            dayHeader slot {{ day.date }}
          </div>
        </template>

        <template slot="dayBody" slot-scope="day">
          <div class="dayBody"
            v-if="day.weekday % 3 === 2"
            @click.stop="lastEvent = 'event ' + day.date">
            dayBody slot {{ day.date }}
          </div>
        </template>

      </v-calendar-daily>

    </div>
  </div>
</template>

<script>
  let weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]
  let intervalsShown
  let intervalsDefault = {
    first: 0,
    minutes: 60,
    count: 24,
    height: 40
  }
  let stylings = {
    default (interval) {
      return undefined
    },
    workday (interval) {
      var inactive = interval.weekday === 0
        || interval.weekday === 6
        || interval.hour < 9
        || interval.hour >= 17
      var startOfHour = interval.minute === 0
      var dark = this.dark
      var start = dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.4)'
      var mid = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'

      return {
        backgroundColor: inactive ? (dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)') : undefined,
        borderTop: startOfHour ? undefined : '1px dashed ' + mid
      }
    },
    past (interval) {
      return {
        backgroundColor: interval.past ? ( this.dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)' ) : undefined
      }
    }
  }

  export default {
    data: () => ({
      dark: false,
      startMenu: false,
      start: '2018-08-12',
      nowMenu: false,
      now: null,
      lastEvent: '(click on calendar)',
      weekdays: weekdaysDefault,
      weekdaysOptions: [
        { text: 'Sunday - Saturday', value: weekdaysDefault },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] }
      ],
      intervals: intervalsDefault,
      intervalsOptions: [
        { text: 'Default', value: intervalsDefault },
        { text: 'Workday', value: { first: 16, minutes: 30, count: 20, height: 40 } }
      ],
      maxDays: 7,
      maxDaysOptions: [
        { text: '7 days', value: 7 },
        { text: '5 days', value: 5 },
        { text: '4 days', value: 4 },
        { text: '3 days', value: 3 }
      ],
      styleInterval: 'default',
      styleIntervalOptions: [
        { text: 'Default', value: 'default' },
        { text: 'Workday', value: 'workday' },
        { text: 'Past', value: 'past' }
      ]
    }),
    computed: {
      intervalStyle () {
        return stylings[ this.styleInterval ].bind(this)
      }
    },
    methods: {
      showIntervalLabel (interval) {
        return interval.minute === 0
      }
    }
  }
</script>

<style>
.panes {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.left {
  position: fixed;
  left: 0;
  width: 300px;
  top: 0;
  bottom: 0;
  border-right: #bdbdbd 1px solid;
  padding: 8px;
}
.right {
  position: fixed;
  left: 300px;
  top: 0;
  bottom: 0;
  right: 0;
}

.dayHeader {
  margin: 0px 2px 2px 2px;
  padding: 2px 6px;
  background-color: #1976D2;
  color: white;
}

.dayBody {
  position: absolute;
  top: 400px;
  height: 36px;
  margin: 2px;
  padding: 2px 6px;
  background-color: #1976D2;
  color: white;
  left: 0;
  right: 0;
}
</style>
