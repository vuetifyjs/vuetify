<template>
  <div>
    <v-date-picker
      v-model="date"
      :allowed-dates="allowedMonths"
      type="month"
      class="mt-3"
      min="2017-06"
      max="2019-10"
    ></v-date-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        date: '2017-12'
      }
    },

    methods: {
      allowedMonths: val => parseInt(val.split('-')[1], 10) % 2 === 0
    }
  }
</script>
