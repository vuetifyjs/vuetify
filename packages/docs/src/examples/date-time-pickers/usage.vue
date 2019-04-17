<template>
  <div class="d-flex no-grow justify-center">
    <v-date-time-picker v-model="date"></v-date-time-picker>
  </div>
</template>

<script>
  export default {
    data: () => ({
      date: '2019-12-31 23:00',
    }),
  }
</script>

<style lang="stylus" scoped>
  .no-grow
    flex-grow: 0
</style>
