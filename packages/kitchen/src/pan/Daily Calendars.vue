<template>
  <v-container>
    <v-layout column>
      <main-header>Daily Calendars</main-header>

      <core-title>Default</core-title>
      <core-section>
        <v-sheet height="400">
          <v-calendar
            color="primary"
            type="day"
          >
            <template
              slot="dayHeader"
              slot-scope="{ date }"
            >
              <p class="ma-2 text-center">{{ date }}</p>
            </template>
            <template
              slot="interval"
              slot-scope="{ date, time }"
            >
              <p class="ma-2 text-center">{{ date }} {{ time }}</p>
            </template>
          </v-calendar>
        </v-sheet>
      </core-section>

      <core-title>With hidden header</core-title>
      <core-section>
        <v-sheet height="400">
          <v-calendar
            now="2019-02-15"
            value="2019-02-14"
            color="primary"
            type="day"
            hide-header
          >
            <template
              slot="dayHeader"
              slot-scope="{ date }"
            >
              <p class="ma-2 text-center">{{ date }}</p>
            </template>
            <template
              slot="interval"
              slot-scope="{ date, time }"
            >
              <p class="ma-2 text-center">{{ date }} {{ time }}</p>
            </template>
          </v-calendar>
        </v-sheet>
      </core-section>

      <core-title>With custom (current) locale</core-title>
      <core-section>
        <v-sheet height="400">
          <v-calendar
            now="2019-02-15"
            value="2019-02-14"
            color="primary"
            type="day"
            :locale="locale"
          >
            <template
              slot="dayHeader"
              slot-scope="{ date }"
            >
              <p class="ma-2 text-center">{{ date }}</p>
            </template>
            <template
              slot="interval"
              slot-scope="{ date, time }"
            >
              <p class="ma-2 text-center">{{ date }} {{ time }}</p>
            </template>
          </v-calendar>
        </v-sheet>
      </core-section>

      <core-title>With long weekdays</core-title>
      <core-section>
        <v-sheet height="400">
          <v-calendar
            now="2019-02-15"
            value="2019-02-14"
            color="primary"
            type="day"
            :short-weekdays="false"
          >
            <template
              slot="dayHeader"
              slot-scope="{ date }"
            >
              <p class="ma-2 text-center">{{ date }}</p>
            </template>
            <template
              slot="interval"
              slot-scope="{ date, time }"
            >
              <p class="ma-2 text-center">{{ date }} {{ time }}</p>
            </template>
          </v-calendar>
        </v-sheet>
      </core-section>

      <core-title>With long weekdays and current locale</core-title>
      <core-section>
        <v-sheet height="400">
          <v-calendar
            now="2019-02-15"
            value="2019-02-14"
            color="primary"
            type="day"
            :short-weekdays="false"
            :locale="locale"
          >
            <template
              slot="dayHeader"
              slot-scope="{ date }"
            >
              <p class="ma-2 text-center">{{ date }}</p>
            </template>
            <template
              slot="interval"
              slot-scope="{ date, time }"
            >
              <p class="ma-2 text-center">{{ date }} {{ time }}</p>
            </template>
          </v-calendar>
        </v-sheet>
      </core-section>

      <!--<core-title>With events</core-title>
      <core-section>
        <v-sheet height="400">
          <v-calendar
            now="2019-01-08"
            value="2019-01-08"
            :events="events"
            color="primary"
            type="day"
          ></v-calendar>
        </v-sheet>
      </core-section>-->

      <core-title>Color</core-title>
      <core-section>
        <v-sheet height="400">
          <v-calendar
            color="success"
            type="day"
          >
            <template
              slot="dayHeader"
              slot-scope="{ date }"
            >
              <p class="ma-2 text-center">{{ date }}</p>
            </template>
            <template
              slot="interval"
              slot-scope="{ date, time }"
            >
              <p class="ma-2 text-center">{{ date }} {{ time }}</p>
            </template>
          </v-calendar>
        </v-sheet>
      </core-section>

      <core-title>Scoped slots</core-title>
      <core-section>
        <v-sheet height="400">
          <v-calendar
            now="2019-02-15"
            value="2019-02-14"
            color="primary"
            type="day"
          >
            <template
              slot="interval"
              slot-scope="{ date, time, hour }"
            >
              <p :class="{ 'ma-2': true, 'text-center': true, 'accent--text': hour % 2 }">{{ date }} {{ time }}</p>
            </template>
            <template
              slot="dayHeader"
              slot-scope="{ date, day }"
            >
              <p :class="{ 'ma-2': true, 'text-center': true, 'accent--text': day % 2 }">{{ date }}</p>
            </template>
          </v-calendar>
        </v-sheet>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'DailyCalendars',

    data: () => ({
      events: [
        {
          name: 'Weekly Meeting',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: 'Thomas\' Birthday',
          start: '2019-01-10',
        },
        {
          name: 'Mash Potatoes',
          start: '2019-01-09 12:30',
          end: '2019-01-09 15:30',
        },
      ],
    }),

    computed: {
      locale: () => navigator.languages[0] || navigator.language,
    },
  }
</script>
