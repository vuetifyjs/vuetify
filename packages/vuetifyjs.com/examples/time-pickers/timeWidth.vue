<template>
  <div>
    <v-time-picker
      type="month"
      width="290"
      class="mt-3"
      v-model="time"
    ></v-time-picker>
    <v-time-picker
      full-width
      landscape
      type="month"
      class="mt-3"
      v-model="time"
    ></v-time-picker>
  </div>
</template>

<script>
  export default {
    data: () => ({
      time: '11:15'
    })
  }
</script>
