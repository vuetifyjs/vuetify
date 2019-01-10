<template>
  <v-layout>
    <v-flex>
      <v-calendar color="primary">
        <template
          slot="day"
          slot-scope="day"
        >
          <div v-if="day.present">
            Today
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
