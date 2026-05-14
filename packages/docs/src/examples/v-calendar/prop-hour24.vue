<template>
  <v-row>
    <v-col>
      <v-select
        v-model="format"
        :items="['ampm', '24hr']"
        class="mb-2"
        label="Format"
        density="compact"
        hide-details
      ></v-select>
      <v-sheet height="400">
        <v-calendar
          ref="calendar"
          :events="events"
          :format="format"
          :model-value="today"
          :now="today"
          color="primary"
          type="week"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
  import { onMounted, ref } from 'vue'

  const calendar = ref()
  const format = ref('ampm')

  const today = '2019-01-08'
  const events = [
    {
      name: 'Morning Standup',
      start: '2019-01-07 09:00',
      end: '2019-01-07 09:30',
    },
    {
      name: 'Lunch Break',
      start: '2019-01-09 12:00',
      end: '2019-01-09 13:00',
    },
    {
      name: 'Afternoon Review',
      start: '2019-01-10 15:30',
      end: '2019-01-10 16:30',
    },
  ]

  onMounted(() => {
    calendar.value.scrollToTime('08:00')
  })
</script>

<script>
  export default {
    data: () => ({
      format: 'ampm',
      today: '2019-01-08',
      events: [
        {
          name: 'Morning Standup',
          start: '2019-01-07 09:00',
          end: '2019-01-07 09:30',
        },
        {
          name: 'Lunch Break',
          start: '2019-01-09 12:00',
          end: '2019-01-09 13:00',
        },
        {
          name: 'Afternoon Review',
          start: '2019-01-10 15:30',
          end: '2019-01-10 16:30',
        },
      ],
    }),
    mounted () {
      this.$refs.calendar.scrollToTime('08:00')
    },
  }
</script>
