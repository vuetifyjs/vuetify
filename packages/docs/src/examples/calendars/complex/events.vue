<template>
  <v-layout>
    <v-flex>
      <v-sheet height="500">
        <v-calendar
          color="primary"
          now="2019-01-08"
          value="2019-01-08"
          :events="events"
        ></v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      events: [
        {
          name: 'Vacation',
          start: '2018-12-30',
          end: '2019-01-02',
        },
        {
          name: 'Meeting',
          start: '2019-01-07',
        },
        {
          name: '30th Birthday',
          start: '2019-01-03',
        },
        {
          name: 'New Year',
          start: '2019-01-01',
        },
        {
          name: 'Conference',
          start: '2019-01-21',
        },
        {
          name: 'Hackathon',
          start: '2019-01-30',
          end: '2019-02-01',
        },
      ],
    }),
  }
</script>

<style lang="sass" scoped>
.my-event
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  border-radius: 2px
  background-color: #1867c0
  color: #ffffff
  border: 1px solid #1867c0
  width: 100%
  font-size: 12px
  padding: 3px
  cursor: pointer
  margin-bottom: 1px
</style>
