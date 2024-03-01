<template>
  <v-slider
    v-model="slider"
    :max="max"
    :min="min"
    class="align-center"
    hide-details
  >
    <template v-slot:append>
      <v-text-field
        v-model="slider"
        density="compact"
        style="width: 70px"
        type="number"
        hide-details
        single-line
      ></v-text-field>
    </template>
  </v-slider>
</template>

<script setup>
  import { ref } from 'vue'

  const min = ref(-50)
  const max = ref(90)
  const slider = ref(40)
</script>

<script>
  export default {
    data () {
      return {
        min: -50,
        max: 90,
        slider: 40,
      }
    },
  }
</script>
