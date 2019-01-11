<template>
  <v-layout>
    <v-flex>
      <v-calendar
        color="primary"
      ></v-calendar>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .v-calendar {
    min-height: 400px;
  }
</style>
