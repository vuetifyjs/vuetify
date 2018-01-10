<template>
  <div>
    <v-date-picker type="month" v-model="date" readonly></v-date-picker>
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
