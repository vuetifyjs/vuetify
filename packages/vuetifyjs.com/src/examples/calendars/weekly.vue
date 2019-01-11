<template>
  <v-layout>
    <v-flex>
      <v-calendar color="primary" type="week">
        <template
          slot="dayHeader"
          slot-scope="day"
        >
          <div v-if="day.present" class="text-xs-center">
            Today
          </div>
        </template>

        <template
          slot="interval"
          slot-scope="date"
        >
          <div v-if="date.weekday == 6 || date.weekday == 0">
            <div
              v-for="event in weekend"
              :key="event.name"
              class="text-xs-center"
            >
              <span
                v-if="date.hour == event.hour"
              >
                {{ event.name }}
              </span>
            </div>
          </div>

          <div v-if="date.weekday != 6 && date.weekday != 0">
            <div
              v-for="event in workday"
              :key="event.name"
              class="text-xs-center"
            >
              <span
                v-if="date.hour == event.hour"
              >
                {{ event.name }}
              </span>
            </div>
          </div>
        </template>
      </v-calendar>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      workday: [
        {
          name: 'Wake up',
          hour: '7'
        },
        {
          name: 'Breakfast',
          hour: '7'
        },
        {
          name: 'Go to work',
          hour: '8'
        },
        {
          name: 'Lunch',
          hour: '12'
        },
        {
          name: 'Play on computer',
          hour: '13'
        },
        {
          name: 'Dinner',
          hour: '15'
        }
      ],
      weekend: [
        {
          name: 'Wake up',
          hour: '8'
        },
        {
          name: 'Breakfast',
          hour: '8'
        },
        {
          name: 'Watch TV',
          hour: '9'
        },
        {
          name: 'Lunch',
          hour: '12'
        },
        {
          name: 'Dinner',
          hour: '15'
        }
      ]
    })
  }
</script>

<style lang="stylus" scoped>
  .v-calendar {
    min-height: 400px;
  }
</style>
