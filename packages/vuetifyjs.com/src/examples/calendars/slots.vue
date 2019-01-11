<template>
  <v-layout>
    <v-flex>
      <v-calendar color="primary">
        <template
          slot="day"
          slot-scope="day"
        >
          <div style="min-height: 5rem">
            <div v-if="day.present">
              Today
            </div>
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
