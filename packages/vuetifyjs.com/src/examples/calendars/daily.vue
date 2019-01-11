<template>
  <v-layout>
    <v-flex>
      <v-calendar color="primary" type="day">
        <template
          slot="dayHeader"
          slot-scope="day"
        >
          <div v-if="day.present" class="text-xs-center">
            Today
          </div>
        </template>

        <template
          slot="interval"
          slot-scope="date"
        >
          <div
            class="text-xs-center"
          >
            {{ date.hour }} o'clock
          </div>
        </template>
      </v-calendar>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({})
  }
</script>

<style lang="stylus" scoped>
  .v-calendar {
    min-height: 400px;
  }
</style>
