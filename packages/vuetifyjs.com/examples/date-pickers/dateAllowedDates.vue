<template>
  <div>
    <v-date-picker
      class="mt-3"
      v-model="date"
      min="2016-06-15"
      max="2018-03-20"
      :allowed-dates="allowedDates"
    ></v-date-picker>
  </div>
</template>

<script>
  export default {
    data: () => ({
      date: '2018-03-02'
    }),

    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0
    }
  }
</script>
