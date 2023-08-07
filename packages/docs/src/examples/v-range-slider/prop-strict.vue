<template>
  <v-card>
    <v-card-text>
      <v-range-slider
        v-model="value"
        strict
      ></v-range-slider>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref([20, 40])
</script>

<script>
  export default {
    data () {
      return {
        value: [20, 40],
      }
    },
  }
</script>
