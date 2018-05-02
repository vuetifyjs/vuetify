<template>
  <div>
    <v-time-picker
      v-model="time"
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
      class="mt-3"
      format="24hr"
      scrollable
      min="9:30"
      max="22:15"
    ></v-time-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        time: '11:15'
      }
    },
    methods: {
      allowedHours: v => v % 2,
      allowedMinutes: v => v >= 10 && v <= 50
    }
  }
</script>
