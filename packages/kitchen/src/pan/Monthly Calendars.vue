<template>
  <v-container>
    <v-layout column>
      <main-header>Monthly Calendars</main-header>

      <core-title>Default</core-title>
      <core-section>
        <v-calendar
          now="2019-02-15"
          value="2019-02-15"
          color="primary"
        >
          <v-layout
            slot="day"
            slot-scope="{ date }"
            fill-height
          >
            {{ date }}
          </v-layout>
        </v-calendar>
      </core-section>

      <core-title>Color</core-title>
      <core-section>
        <v-calendar
          now="2019-02-15"
          value="2019-02-15"
          color="success"
        >
          <v-layout
            slot="day"
            slot-scope="{ date }"
            fill-height
          >
            {{ date }}
          </v-layout>
        </v-calendar>
      </core-section>

      <core-title>Scoped slots</core-title>
      <core-section>
        <v-calendar
          now="2019-02-15"
          value="2019-02-15"
          color="primary"
        >
          <v-layout
            slot="day"
            slot-scope="{ day, date }"
            fill-height
          >
            <p :class="{ 'red--text': day % 2 }">{{ date }}</p>
          </v-layout>
        </v-calendar>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'MonthlyCalendars',

    data: () => ({}),
  }
</script>
