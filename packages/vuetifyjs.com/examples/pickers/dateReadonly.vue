<template>
  <div>
    <v-date-picker v-model="date" readonly></v-date-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        date: null
      }
    }
  }
</script>
