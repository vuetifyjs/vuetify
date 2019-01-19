<template>
  <div>
    <v-date-picker v-model="date" type="month" readonly></v-date-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        date: new Date().toISOString().substr(0, 7)
      }
    }
  }
</script>
