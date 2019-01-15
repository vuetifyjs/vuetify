<template>
  <v-layout>
    <v-flex>
      <v-sheet height="400">
        <v-calendar color="primary" type="day">
          <template
            slot="dayHeader"
            slot-scope="{ present }"
          >
            <div v-if="present" class="text-xs-center">
              Today
            </div>
          </template>

          <template
            slot="interval"
            slot-scope="{ hour }"
          >
            <div
              class="text-xs-center"
            >
              {{ hour }} o'clock
            </div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({})
  }
</script>
