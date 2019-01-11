<template>
  <v-layout>
    <v-flex>
      <v-calendar color="primary">
        <template
          slot="day"
          slot-scope="day"
        >
          <div
            v-for="event in events"
            :key="event.name"
          >
            <span
              v-if="day.date == event.date"
            >
              {{ event.name }}
            </span>
          </div>
        </template>
      </v-calendar>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      events: [
        {
          name: 'New Year',
          date: '2019-01-01'
        },
        {
          name: 'Conference',
          date: '2019-01-21'
        },
        {
          name: 'Hackathon',
          date: '2019-02-01'
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
