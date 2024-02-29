<template>
  <v-range-slider
    v-model="range"
    :max="10"
    :min="-10"
    :step="1"
    class="align-center"
    hide-details
  >
    <template v-slot:prepend>
      <v-text-field
        v-model="range[0]"
        density="compact"
        style="width: 70px"
        type="number"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>
    <template v-slot:append>
      <v-text-field
        v-model="range[1]"
        density="compact"
        style="width: 70px"
        type="number"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>
  </v-range-slider>
</template>

<script setup>
  import { ref } from 'vue'

  const range = ref([-5, 5])
</script>

<script>
  export default {
    data () {
      return {
        range: [-5, 5],
      }
    },
  }
</script>
