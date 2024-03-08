<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-range-slider
          v-model="value"
          label="Disabled"
          disabled
        ></v-range-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref([30, 60])
</script>

<script>
  export default {
    data () {
      return {
        value: [30, 60],
      }
    },
  }
</script>
