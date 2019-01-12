<template>
  <v-layout>
    <v-flex>
      <v-calendar :now="today" :value="today" color="primary">

        <template
          slot="day"
          slot-scope="{ date }"
        >
          <template v-for="event in eventsMap[date]">
            <!-- all day events don't have time -->
            <div
              v-if="!event.time"
              :key="event.title"
              class="my-event"
              @click="open(event)"
              v-html="event.title"
            ></div>
          </template>
        </template>

      </v-calendar>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      today: '2019-01-08',
      events: [
        {
          title: 'Vacation',
          date: '2018-12-30'
        },
        {
          title: 'Vacation',
          date: '2018-12-31'
        },
        {
          title: 'Vacation',
          date: '2019-01-01'
        },
        {
          title: 'Meeting',
          date: '2019-01-07'
        },
        {
          title: '30th Birthday',
          date: '2019-01-03'
        },
        {
          title: 'New Year',
          date: '2019-01-01'
        },
        {
          title: 'Conference',
          date: '2019-01-21'
        },
        {
          title: 'Hackathon',
          date: '2019-02-01'
        }
      ]
    }),
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    methods: {
      open (event) {
        alert(event.title)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .v-calendar {
    min-height: 500px;
  }
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>
