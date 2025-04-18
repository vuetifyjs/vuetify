<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <v-date-input
        v-model="notClosingOnSelection"
        :close-on-selection="false"
        label="Not closing on selection"
        max-width="368"
        multiple="range"
      ></v-date-input>
    </v-col>
    <v-col cols="12" md="6">
      <v-date-input
        v-model="closingOnSelection"
        label="Closing on selection"
        max-width="368"
        multiple="range"
      ></v-date-input>
    </v-col>
  </v-row>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const closingOnSelection = shallowRef(null)
  const notClosingOnSelection = shallowRef(null)
</script>

<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>
