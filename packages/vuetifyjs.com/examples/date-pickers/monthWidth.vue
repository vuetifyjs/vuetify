<template>
  <div>
    <v-date-picker
      type="month"
      width="290"
      class="mt-3"
      v-model="date"
    ></v-date-picker>
    <v-date-picker
      full-width
      landscape
      type="month"
      class="mt-3"
      v-model="date"
    ></v-date-picker>
  </div>
</template>

<script>
  export default {
    data: () => ({
      date: '2018-03'
    })
  }
</script>
