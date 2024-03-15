<template>
  <v-container>
    <v-row justify="space-around">
      <v-date-picker
        v-model="date"
        :allowed-dates="allowedDates"
        max="2018-03-20"
        min="2016-06-15"
      ></v-date-picker>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useDate } from 'vuetify'
  import { ref } from 'vue'

  const date = ref(new Date('2018-03-02'))
  const adapter = useDate()

  function allowedDates (val) {
    return parseInt(adapter.toISO(val).split('-')[2], 10) % 2 === 0
  }
</script>

<script>
  export default {
    data: () => ({
      date: new Date('2018-03-02'),
    }),

    methods: {
      allowedDates: val => {
        return parseInt(this.$vuetify.date.toISO(val).split('-')[2], 10) % 2 === 0
      },
    },
  }
</script>
