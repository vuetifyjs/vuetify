<template>
  <div>
    <v-time-picker
      v-model="time"
      type="month"
      width="290"
      class="mt-3"
    ></v-time-picker>
    <v-time-picker
      v-model="time"
      full-width
      landscape
      type="month"
      class="mt-3"
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
